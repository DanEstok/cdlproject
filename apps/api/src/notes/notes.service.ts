import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { AddendumDto, CreateNoteDto, UpdateNoteDto } from "./dto";

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService, private audit: AuditService) {}

  private async ensureCase(organizationId: string, caseId: string) {
    const c = await this.prisma.case.findFirst({ where: { id: caseId, organizationId } });
    if (!c) throw new BadRequestException("Invalid caseId");
    return c;
  }

  async create(
    organizationId: string,
    actor: { userId: string; clerkUserId: string },
    caseId: string,
    dto: CreateNoteDto
  ) {
    await this.ensureCase(organizationId, caseId);

    const note = await this.prisma.note.create({
      data: {
        organizationId,
        caseId,
        authorUserId: actor.userId,
        noteType: dto.noteType as any,
        templateKey: dto.templateKey,
        contentJson: dto.contentJson as any,
        narrative: dto.narrative,
        status: "DRAFT"
      }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "NOTE_CREATED",
      entityType: "Note",
      entityId: note.id,
      diffJson: { caseId, noteType: note.noteType }
    });

    return note;
  }

  async list(organizationId: string, caseId: string) {
    await this.ensureCase(organizationId, caseId);
    return this.prisma.note.findMany({
      where: { organizationId, caseId },
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }

  async get(organizationId: string, id: string) {
    const note = await this.prisma.note.findFirst({ where: { id, organizationId } });
    if (!note) throw new NotFoundException("Note not found");
    return note;
  }

  async update(
    organizationId: string,
    actor: { userId: string; clerkUserId: string; role: string },
    id: string,
    dto: UpdateNoteDto
  ) {
    const note = await this.get(organizationId, id);

    // Immutability: signed notes cannot be edited; only addendum allowed.
    if (note.status === "SIGNED") {
      throw new ForbiddenException("Signed notes are immutable. Use addendum.");
    }

    // Only author or admin can edit draft (MVP rule)
    if (note.authorUserId !== actor.userId && actor.role !== "ADMIN") {
      throw new ForbiddenException("Not allowed to edit this note.");
    }

    const updated = await this.prisma.note.update({
      where: { id },
      data: {
        contentJson: dto.contentJson ?? note.contentJson,
        narrative: dto.narrative ?? note.narrative
      }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "NOTE_UPDATED",
      entityType: "Note",
      entityId: id,
      diffJson: dto
    });

    return updated;
  }

  async sign(organizationId: string, actor: { userId: string; clerkUserId: string; role: string }, id: string) {
    const note = await this.get(organizationId, id);
    if (note.status === "SIGNED") return note;

    // Only author or admin can sign (MVP)
    if (note.authorUserId !== actor.userId && actor.role !== "ADMIN") {
      throw new ForbiddenException("Not allowed to sign this note.");
    }

    const signed = await this.prisma.note.update({
      where: { id },
      data: { status: "SIGNED", signedAt: new Date() }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "NOTE_SIGNED",
      entityType: "Note",
      entityId: id
    });

    return signed;
  }

  async addendum(
    organizationId: string,
    actor: { userId: string; clerkUserId: string },
    id: string,
    dto: AddendumDto
  ) {
    const note = await this.get(organizationId, id);

    if (note.status !== "SIGNED") {
      throw new BadRequestException("Addendums are only allowed for signed notes.");
    }

    // Addendum is stored as a new note, linked by templateKey convention.
    const add = await this.prisma.note.create({
      data: {
        organizationId,
        caseId: note.caseId,
        authorUserId: actor.userId,
        noteType: note.noteType as any,
        templateKey: `ADDENDUM:${note.id}`,
        contentJson: dto.contentJson as any,
        narrative: dto.narrative,
        status: "SIGNED",
        signedAt: new Date()
      }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "NOTE_ADDENDUM_CREATED",
      entityType: "Note",
      entityId: add.id,
      diffJson: { parentNoteId: note.id }
    });

    return add;
  }
}
