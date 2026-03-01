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
const prisma_service_1 = require("../../common/prisma/prisma.service");
let PeopleService = class PeopleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPersonDto, organizationId) {
        const person = await this.prisma.person.create({
            data: {
                ...createPersonDto,
                organizationId,
                dob: createPersonDto.dob ? new Date(createPersonDto.dob) : null,
            },
        });
        await this.createAuditEvent({
            organizationId,
            actorUserId: null,
            action: 'PERSON_CREATED',
            entityType: 'Person',
            entityId: person.id,
            diffJson: { before: null, after: person },
        });
        return person;
    }
    async findAll(organizationId, type, search) {
        const where = {
            organizationId,
            ...(type && { type }),
            ...(search && {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        return this.prisma.person.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, organizationId) {
        return this.prisma.person.findFirst({
            where: { id, organizationId },
        });
    }
    async update(id, updatePersonDto, organizationId) {
        const existing = await this.findOne(id, organizationId);
        if (!existing) {
            throw new Error('Person not found');
        }
        const updated = await this.prisma.person.update({
            where: { id },
            data: {
                ...updatePersonDto,
                dob: updatePersonDto.dob ? new Date(updatePersonDto.dob) : undefined,
            },
        });
        await this.createAuditEvent({
            organizationId,
            actorUserId: null,
            action: 'PERSON_UPDATED',
            entityType: 'Person',
            entityId: id,
            diffJson: { before: existing, after: updated },
        });
        return updated;
    }
    async createAuditEvent(data) {
        return this.prisma.auditEvent.create({
            data: {
                ...data,
                actorClerkUserId: null,
            },
        });
    }
};
exports.PeopleService = PeopleService;
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PeopleService);
//# sourceMappingURL=people.service.js.map