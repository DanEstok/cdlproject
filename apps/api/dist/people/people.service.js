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
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
let PeopleService = class PeopleService {
    prisma;
    audit;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async create(organizationId, actor, dto) {
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
    async list(organizationId, params) {
        const where = { organizationId };
        if (params.type)
            where.type = params.type;
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
    async get(organizationId, id) {
        const person = await this.prisma.person.findFirst({ where: { id, organizationId } });
        if (!person)
            throw new common_1.NotFoundException("Person not found");
        return person;
    }
    async update(organizationId, actor, id, dto) {
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
};
exports.PeopleService = PeopleService;
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], PeopleService);
