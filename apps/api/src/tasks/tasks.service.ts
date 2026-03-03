import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";

@Injectable()
export class TasksService {
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
    dto: CreateTaskDto
  ) {
    await this.ensureCase(organizationId, caseId);

    const task = await this.prisma.task.create({
      data: {
        organizationId,
        caseId,
        title: dto.title,
        description: dto.description,
        status: dto.status ?? "TODO",
        dueAt: dto.dueAt ? new Date(dto.dueAt) : undefined,
        assignedToUserId: dto.assignedToUserId,
        assignedToPersonId: dto.assignedToPersonId
      }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "TASK_CREATED",
      entityType: "Task",
      entityId: task.id,
      diffJson: { caseId }
    });

    return task;
  }

  async list(organizationId: string, caseId: string, params: { status?: string }) {
    await this.ensureCase(organizationId, caseId);
    const where: any = { organizationId, caseId };
    if (params.status) where.status = params.status;
    return this.prisma.task.findMany({ where, orderBy: { createdAt: "desc" }, take: 100 });
  }

  async myTasks(organizationId: string, userId: string, params: { status?: string }) {
    const where: any = { organizationId, assignedToUserId: userId };
    if (params.status) where.status = params.status;
    return this.prisma.task.findMany({
      where,
      orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }],
      take: 200
    });
  }

  async get(organizationId: string, id: string) {
    const task = await this.prisma.task.findFirst({ where: { id, organizationId } });
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  async update(
    organizationId: string,
    actor: { userId: string; clerkUserId: string },
    id: string,
    dto: UpdateTaskDto
  ) {
    await this.get(organizationId, id);

    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        dueAt: dto.dueAt ? new Date(dto.dueAt) : dto.dueAt === undefined ? undefined : null,
        assignedToUserId: dto.assignedToUserId,
        assignedToPersonId: dto.assignedToPersonId
      }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "TASK_UPDATED",
      entityType: "Task",
      entityId: id,
      diffJson: dto
    });

    return updated;
  }

  async complete(organizationId: string, actor: { userId: string; clerkUserId: string }, id: string) {
    await this.get(organizationId, id);

    const updated = await this.prisma.task.update({
      where: { id },
      data: { status: "DONE", completedAt: new Date() }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "TASK_COMPLETED",
      entityType: "Task",
      entityId: id
    });

    return updated;
  }
}
