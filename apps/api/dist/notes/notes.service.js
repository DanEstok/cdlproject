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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
let NotesService = class NotesService {
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
        const note = await this.prisma.note.create({
            data: {
                organizationId,
                caseId,
                authorUserId: actor.userId,
                noteType: dto.noteType,
                templateKey: dto.templateKey,
                contentJson: dto.contentJson,
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
    async list(organizationId, caseId) {
        await this.ensureCase(organizationId, caseId);
        return this.prisma.note.findMany({
            where: { organizationId, caseId },
            orderBy: { createdAt: "desc" },
            take: 200
        });
    }
    async get(organizationId, id) {
        const note = await this.prisma.note.findFirst({ where: { id, organizationId } });
        if (!note)
            throw new common_1.NotFoundException("Note not found");
        return note;
    }
    async update(organizationId, actor, id, dto) {
        const note = await this.get(organizationId, id);
        if (note.status === "SIGNED") {
            throw new common_1.ForbiddenException("Signed notes are immutable. Use addendum.");
        }
        if (note.authorUserId !== actor.userId && actor.role !== "ADMIN") {
            throw new common_1.ForbiddenException("Not allowed to edit this note.");
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
    async sign(organizationId, actor, id) {
        const note = await this.get(organizationId, id);
        if (note.status === "SIGNED")
            return note;
        if (note.authorUserId !== actor.userId && actor.role !== "ADMIN") {
            throw new common_1.ForbiddenException("Not allowed to sign this note.");
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
    async addendum(organizationId, actor, id, dto) {
        const note = await this.get(organizationId, id);
        if (note.status !== "SIGNED") {
            throw new common_1.BadRequestException("Addendums are only allowed for signed notes.");
        }
        const add = await this.prisma.note.create({
            data: {
                organizationId,
                caseId: note.caseId,
                authorUserId: actor.userId,
                noteType: note.noteType,
                templateKey: `ADDENDUM:${note.id}`,
                contentJson: dto.contentJson,
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
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], NotesService);
//# sourceMappingURL=notes.service.js.map