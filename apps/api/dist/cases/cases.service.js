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
exports.CasesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
let CasesService = class CasesService {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async create(organizationId, actor, dto) {
        const client = await this.prisma.person.findFirst({
            where: { id: dto.clientPersonId, organizationId }
        });
        if (!client)
            throw new common_1.BadRequestException("Invalid clientPersonId");
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
    async list(organizationId, params) {
        const where = { organizationId };
        if (params.status)
            where.status = params.status;
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
    async get(organizationId, id) {
        const c = await this.prisma.case.findFirst({
            where: { id, organizationId },
            include: { client: true, enrollments: true }
        });
        if (!c)
            throw new common_1.NotFoundException("Case not found");
        return c;
    }
    async update(organizationId, actor, id, dto) {
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
    async close(organizationId, actor, id) {
        await this.get(organizationId, id);
        const updated = await this.prisma.case.update({
            where: { id },
            data: { status: "CLOSED", closedAt: new Date() }
        });
        await this.audit.write({
            organizationId,
            actorUserId: actor.userId,
            actorClerkUserId: actor.clerkUserId,
            action: "CASE_CLOSED",
            entityType: "Case",
            entityId: id
        });
        return updated;
    }
};
exports.CasesService = CasesService;
exports.CasesService = CasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], CasesService);
//# sourceMappingURL=cases.service.js.map