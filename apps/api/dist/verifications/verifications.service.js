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
exports.VerificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
const client_1 = require("@prisma/client");
const rules_1 = require("./rules");
let VerificationsService = class VerificationsService {
    prisma;
    audit;
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
    normalizeStatus(status) {
        if (!status)
            return client_1.VerificationStatus.PENDING;
        const s = status.toUpperCase();
        if (s === "PASSED")
            return client_1.VerificationStatus.PASSED;
        if (s === "FAILED")
            return client_1.VerificationStatus.FAILED;
        if (s === "UNKNOWN")
            return client_1.VerificationStatus.UNKNOWN;
        return client_1.VerificationStatus.PENDING;
    }
    /**
     * Creates or ensures the proper follow-up task exists.
     * Rules:
     * - FAILED => create Resolve task (due in 7 days)
     * - PASSED + nextDueAt => create Renew task due at nextDueAt
     */
    async ensureAutoTasksForVerification(v) {
        const marker = `verificationId=${v.id}`;
        if (v.status === client_1.VerificationStatus.FAILED) {
            const title = `Resolve verification failure: ${v.type}`;
            const existing = await this.prisma.task.findFirst({
                where: {
                    organizationId: v.organizationId,
                    caseId: v.caseId,
                    title,
                    description: { contains: marker }
                }
            });
            if (!existing) {
                const dueAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                await this.prisma.task.create({
                    data: {
                        organizationId: v.organizationId,
                        caseId: v.caseId,
                        title,
                        description: `Auto-generated follow-up for FAILED verification. ${marker}`,
                        status: "TODO",
                        dueAt
                    }
                });
            }
            return;
        }
        if (v.status === client_1.VerificationStatus.PASSED && v.nextDueAt) {
            const title = `Renew verification: ${v.type}`;
            const existing = await this.prisma.task.findFirst({
                where: {
                    organizationId: v.organizationId,
                    caseId: v.caseId,
                    title,
                    description: { contains: marker }
                }
            });
            if (!existing) {
                await this.prisma.task.create({
                    data: {
                        organizationId: v.organizationId,
                        caseId: v.caseId,
                        title,
                        description: `Auto-generated renewal reminder. ${marker}`,
                        status: "TODO",
                        dueAt: v.nextDueAt
                    }
                });
            }
        }
    }
    async create(organizationId, actor, caseId, dto) {
        await this.ensureCase(organizationId, caseId);
        if (dto.evidenceDocumentId) {
            const doc = await this.prisma.document.findFirst({
                where: { id: dto.evidenceDocumentId, organizationId }
            });
            if (!doc)
                throw new common_1.BadRequestException("Invalid evidenceDocumentId");
        }
        const status = this.normalizeStatus(dto.status);
        const now = new Date();
        // Default nextDueAt behavior:
        // - if caller provides nextDueAt, use it
        // - else if status PASSED, compute a default nextDueAt based on type
        // - else leave null
        const computedNextDue = dto.nextDueAt
            ? new Date(dto.nextDueAt)
            : status === client_1.VerificationStatus.PASSED
                ? (0, rules_1.computeDefaultNextDueAt)(dto.type, now)
                : null;
        const verifiedAt = status === client_1.VerificationStatus.PASSED || status === client_1.VerificationStatus.FAILED
            ? now
            : undefined;
        const v = await this.prisma.verification.create({
            data: {
                organizationId,
                caseId,
                type: dto.type,
                status,
                nextDueAt: computedNextDue ?? undefined,
                notes: dto.notes,
                evidenceDocumentId: dto.evidenceDocumentId,
                verifiedByUserId: actor.userId,
                verifiedAt
            }
        });
        await this.audit.write({
            organizationId,
            actorUserId: actor.userId,
            actorClerkUserId: actor.clerkUserId,
            action: "VERIFICATION_CREATED",
            entityType: "Verification",
            entityId: v.id,
            diffJson: { caseId, type: v.type, status: v.status, nextDueAt: v.nextDueAt?.toISOString() }
        });
        await this.ensureAutoTasksForVerification(v);
        return v;
    }
    async list(organizationId, caseId) {
        await this.ensureCase(organizationId, caseId);
        return this.prisma.verification.findMany({
            where: { organizationId, caseId },
            orderBy: [{ createdAt: "desc" }],
            take: 100
        });
    }
    async update(organizationId, actor, id, dto) {
        const v = await this.prisma.verification.findFirst({ where: { id, organizationId } });
        if (!v)
            throw new common_1.NotFoundException("Verification not found");
        if (dto.evidenceDocumentId) {
            const doc = await this.prisma.document.findFirst({
                where: { id: dto.evidenceDocumentId, organizationId }
            });
            if (!doc)
                throw new common_1.BadRequestException("Invalid evidenceDocumentId");
        }
        const nextStatus = dto.status ? this.normalizeStatus(dto.status) : v.status;
        // If status becomes PASSED and nextDueAt is not provided and not already set,
        // compute default next due based on type.
        const now = new Date();
        const nextDueAt = dto.nextDueAt
            ? new Date(dto.nextDueAt)
            : nextStatus === client_1.VerificationStatus.PASSED && !v.nextDueAt
                ? (0, rules_1.computeDefaultNextDueAt)(v.type, now)
                : dto.nextDueAt === undefined
                    ? v.nextDueAt
                    : null;
        const verifiedAt = (nextStatus === client_1.VerificationStatus.PASSED || nextStatus === client_1.VerificationStatus.FAILED)
            ? now
            : v.verifiedAt;
        const updated = await this.prisma.verification.update({
            where: { id },
            data: {
                status: nextStatus,
                nextDueAt: nextDueAt ?? undefined,
                notes: dto.notes ?? v.notes,
                evidenceDocumentId: dto.evidenceDocumentId ?? v.evidenceDocumentId,
                verifiedByUserId: actor.userId,
                verifiedAt
            }
        });
        await this.audit.write({
            organizationId,
            actorUserId: actor.userId,
            actorClerkUserId: actor.clerkUserId,
            action: "VERIFICATION_UPDATED",
            entityType: "Verification",
            entityId: id,
            diffJson: {
                status: updated.status,
                nextDueAt: updated.nextDueAt?.toISOString(),
                evidenceDocumentId: updated.evidenceDocumentId
            }
        });
        await this.ensureAutoTasksForVerification(updated);
        return updated;
    }
    async completeFromEvidence(organizationId, actor, id) {
        const v = await this.prisma.verification.findFirst({ where: { id, organizationId } });
        if (!v)
            throw new common_1.NotFoundException("Verification not found");
        if (!v.evidenceDocumentId) {
            throw new common_1.BadRequestException("No evidenceDocumentId linked to this verification.");
        }
        const doc = await this.prisma.document.findFirst({
            where: { id: v.evidenceDocumentId, organizationId }
        });
        if (!doc)
            throw new common_1.BadRequestException("Evidence document not found.");
        const verifiedAt = doc.issueDate ?? new Date();
        const nextDueAt = doc.expiresAt ??
            (0, rules_1.computeDefaultNextDueAt)(v.type, verifiedAt) ??
            null;
        const updated = await this.prisma.verification.update({
            where: { id },
            data: {
                status: client_1.VerificationStatus.PASSED,
                verifiedAt,
                verifiedByUserId: actor.userId,
                nextDueAt: nextDueAt ?? undefined,
                notes: v.notes
                    ? `${v.notes}\nCompleted from evidence document: ${doc.fileName}`
                    : `Completed from evidence document: ${doc.fileName}`
            }
        });
        await this.audit.write({
            organizationId,
            actorUserId: actor.userId,
            actorClerkUserId: actor.clerkUserId,
            action: "VERIFICATION_COMPLETED_FROM_EVIDENCE",
            entityType: "Verification",
            entityId: id,
            diffJson: {
                evidenceDocumentId: v.evidenceDocumentId,
                verifiedAt: updated.verifiedAt?.toISOString(),
                nextDueAt: updated.nextDueAt?.toISOString()
            }
        });
        await this.ensureAutoTasksForVerification(updated);
        return updated;
    }
};
exports.VerificationsService = VerificationsService;
exports.VerificationsService = VerificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], VerificationsService);
