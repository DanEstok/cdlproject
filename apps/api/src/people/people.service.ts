import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CreatePersonDto, UpdatePersonDto } from "./dto";

@Injectable()
export class PeopleService {
  constructor(private prisma: PrismaService, private audit: AuditService) {}

  async create(organizationId: string, actor: { userId: string; clerkUserId: string }, dto: CreatePersonDto) {
    const person = await this.prisma.person.create({
      data: {
        organizationId,
        type: dto.type ?? "CLIENT",
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        email: dto.email
      }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "PERSON_CREATED",
      entityType: "Person",
      entityId: person.id
    });

    return person;
  }

  async list(organizationId: string, params: { type?: string; search?: string }) {
    const where: any = { organizationId };
    if (params.type) where.type = params.type;

    if (params.search) {
      where.OR = [
        { firstName: { contains: params.search, mode: "insensitive" } },
        { lastName: { contains: params.search, mode: "insensitive" } },
        { email: { contains: params.search, mode: "insensitive" } },
        { phone: { contains: params.search, mode: "insensitive" } }
      ];
    }

    return this.prisma.person.findMany({ where, orderBy: { createdAt: "desc" }, take: 50 });
  }

  async get(organizationId: string, id: string) {
    const person = await this.prisma.person.findFirst({ where: { id, organizationId } });
    if (!person) throw new NotFoundException("Person not found");
    return person;
  }

  async update(organizationId: string, actor: { userId: string; clerkUserId: string }, id: string, dto: UpdatePersonDto) {
    await this.get(organizationId, id);
    const updated = await this.prisma.person.update({
      where: { id },
      data: { ...dto }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "PERSON_UPDATED",
      entityType: "Person",
      entityId: id,
      diffJson: dto
    });

    return updated;
  }
}
