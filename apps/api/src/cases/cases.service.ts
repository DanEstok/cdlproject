import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CreateCaseDto, UpdateCaseDto } from "./dto";

@Injectable()
export class CasesService {
  constructor(private prisma: PrismaService, private audit: AuditService) {}

  async create(organizationId: string, actor: { userId: string; clerkUserId: string }, dto: CreateCaseDto) {
    const client = await this.prisma.person.findFirst({
      where: { id: dto.clientPersonId, organizationId }
    });
    if (!client) throw new BadRequestException("Invalid clientPersonId");

    const c = await this.prisma.case.create({
      data: {
        organizationId,
        clientPersonId: dto.clientPersonId,
        notes: dto.notes,
        primaryCaseManagerUserId: actor.userId
      },
      include: { client: true }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "CASE_CREATED",
      entityType: "Case",
      entityId: c.id
    });

    return c;
  }

  async list(organizationId: string, params: { status?: string; search?: string }) {
    const where: any = { organizationId };
    if (params.status) where.status = params.status;

    if (params.search) {
      where.client = {
        OR: [
          { firstName: { contains: params.search, mode: "insensitive" } },
          { lastName: { contains: params.search, mode: "insensitive" } }
        ]
      };
    }

    return this.prisma.case.findMany({
      where,
      include: { client: true },
      orderBy: { createdAt: "desc" },
      take: 50
    });
  }

  async get(organizationId: string, id: string) {
    const c = await this.prisma.case.findFirst({
      where: { id, organizationId },
      include: { client: true, enrollments: true }
    });
    if (!c) throw new NotFoundException("Case not found");
    return c;
  }

  async update(organizationId: string, actor: { userId: string; clerkUserId: string }, id: string, dto: UpdateCaseDto) {
    await this.get(organizationId, id);
    const updated = await this.prisma.case.update({ where: { id }, data: dto });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "CASE_UPDATED",
      entityType: "Case",
      entityId: id,
      diffJson: dto
    });

    return updated;
  }

  async close(organizationId: string, actor: any, id: string) {
    return this.prisma.case.update({
      where: { id },
      data: { status: "CLOSED", closedAt: new Date() }
    });
  }

  async setProgram(organizationId: string, caseId: string, programKey: string) {
    return this.prisma.case.update({
      where: { id: caseId },
      data: { programKey }
    });
  }
}
