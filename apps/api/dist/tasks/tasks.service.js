"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
let TasksService = class TasksService {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async ensureCase(organizationId, caseId) {
        const c = await this.prisma.case.findFirst({ where: { id: caseId, organizationId } });
        if (!c)
            throw new common_1.BadRequestException("Invalid caseId");
        return c;
    }
    async create(organizationId, actor, caseId, dto) {
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
    async list(organizationId, caseId, params) {
        await this.ensureCase(organizationId, caseId);
        const where = { organizationId, caseId };
        if (params.status)
            where.status = params.status;
        return this.prisma.task.findMany({ where, orderBy: { createdAt: "desc" }, take: 100 });
    }
    async myTasks(organizationId, userId, params) {
        const where = { organizationId, assignedToUserId: userId };
        if (params.status)
            where.status = params.status;
        return this.prisma.task.findMany({
            where,
            orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }],
            take: 200
        });
    }
    async get(organizationId, id) {
        const task = await this.prisma.task.findFirst({ where: { id, organizationId } });
        if (!task)
            throw new common_1.NotFoundException("Task not found");
        return task;
    }
    async update(organizationId, actor, id, dto) {
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
    async complete(organizationId, actor, id) {
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
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map