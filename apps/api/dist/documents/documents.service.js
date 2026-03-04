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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
const client_1 = require("@prisma/client");
const rules_1 = require("../verifications/rules");
let DocumentsService = class DocumentsService {
    prisma;
    audit;
    s3;
    bucket;
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
        this.bucket = process.env.S3_BUCKET || "";
        this.s3 = new client_s3_1.S3Client({
            region: process.env.S3_REGION,
            endpoint: process.env.S3_ENDPOINT,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ""
            },
            forcePathStyle: true
        });
    }
    async ensureTask(organizationId, caseId, title, marker, dueInDays) {
        const existing = await this.prisma.task.findFirst({
            where: {
                organizationId,
                caseId,
                title,
                description: { contains: marker }
            }
        });
        if (existing)
            return;
        const dueAt = dueInDays ? new Date(Date.now() + dueInDays * 24 * 60 * 60 * 1000) : undefined;
        await this.prisma.task.create({
            data: {
                organizationId,
                caseId,
                title,
                description: `Auto-generated from document upload. ${marker}`,
                status: "TODO",
                dueAt
            }
        });
    }
    async presign(organizationId, dto) {
        if (!this.bucket)
            throw new common_1.BadRequestException("S3_BUCKET not configured");
        const storageKey = `${organizationId}/${(0, uuid_1.v4)()}-${dto.fileName}`;
        const cmd = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: storageKey,
            ContentType: dto.mimeType
        });
        const uploadUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, cmd, { expiresIn: 60 * 10 });
        return { storageKey, uploadUrl };
    }
    async presignDownload(organizationId, actor, documentId) {
        if (!this.bucket)
            throw new common_1.BadRequestException("S3_BUCKET not configured");
        const doc = await this.prisma.document.findFirst({
            where: { id: documentId, organizationId }
        });
        if (!doc)
            throw new common_1.ForbiddenException("Document not found");
        const cmd = new client_s3_1.GetObjectCommand({
            Bucket: this.bucket,
            Key: doc.storageKey,
            ResponseContentDisposition: `attachment; filename="${doc.fileName}"`
        });
        const downloadUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, cmd, { expiresIn: 60 * 5 });
        await this.audit.write({
            organizationId,
            actorUserId: actor.userId,
            actorClerkUserId: actor.clerkUserId,
            action: "DOCUMENT_DOWNLOAD_PRESIGNED",
            entityType: "Document",
            entityId: doc.id
        });
        return { downloadUrl };
    }
    async complete(organizationId, actor, dto) {
        if (dto.caseId) {
            const c = await this.prisma.case.findFirst({ where: { id: dto.caseId, organizationId } });
            if (!c)
                throw new common_1.BadRequestException("Invalid caseId");
        }
        if (dto.personId) {
            const p = await this.prisma.person.findFirst({ where: { id: dto.personId, organizationId } });
            if (!p)
                throw new common_1.BadRequestException("Invalid personId");
        }
        const doc = await this.prisma.document.create({
            data: {
                organizationId,
                caseId: dto.caseId,
                personId: dto.personId,
                uploadedByUserId: actor.userId,
                fileName: dto.fileName,
                mimeType: dto.mimeType,
                storageKey: dto.storageKey,
                sizeBytes: dto.sizeBytes,
                docType: dto.docType,
                issueDate: dto.issueDate ? new Date(dto.issueDate) : undefined,
                expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined
            }
        });
        await this.audit.write({
            organizationId,
            actorUserId: actor.userId,
            actorClerkUserId: actor.clerkUserId,
            action: "DOCUMENT_CREATED",
            entityType: "Document",
            entityId: doc.id
        });
        // Auto-create a verification when uploading key compliance documents
        // Map docType -> verification type
        const docTypeToVerification = {
            DOT_MEDICAL: client_1.VerificationType.DOT_MEDICAL,
            MVR: client_1.VerificationType.MVR,
            CLEARINGHOUSE: client_1.VerificationType.CLEARINGHOUSE
        };
        const vType = docTypeToVerification[dto.docType];
        if (vType && doc.caseId) {
            const existing = await this.prisma.verification.findFirst({
                where: {
                    organizationId,
                    caseId: doc.caseId,
                    type: vType,
                    evidenceDocumentId: doc.id
                }
            });
            if (!existing) {
                // Smart parsing:
                // - verifiedAt = issueDate if present else now
                // - nextDueAt = expiresAt if present else default interval
                const verifiedAt = doc.issueDate ?? new Date();
                const nextDueAt = doc.expiresAt ??
                    (0, rules_1.computeDefaultNextDueAt)(vType, verifiedAt) ??
                    undefined;
                const v = await this.prisma.verification.create({
                    data: {
                        organizationId,
                        caseId: doc.caseId,
                        type: vType,
                        status: client_1.VerificationStatus.PASSED,
                        verifiedAt,
                        nextDueAt,
                        notes: `Auto-PASSED from uploaded evidence document: ${doc.fileName}`,
                        evidenceDocumentId: doc.id,
                        verifiedByUserId: actor.userId
                    }
                });
                await this.audit.write({
                    organizationId,
                    actorUserId: actor.userId,
                    actorClerkUserId: actor.clerkUserId,
                    action: "VERIFICATION_AUTO_PASSED_FROM_DOCUMENT",
                    entityType: "Verification",
                    entityId: v.id,
                    diffJson: { documentId: doc.id, type: v.type, verifiedAt: v.verifiedAt?.toISOString() }
                });
            }
        }
        // Auto-create workflow tasks based on uploaded document type
        if (doc.caseId) {
            const marker = `documentId=${doc.id};docType=${doc.docType}`;
            // ID uploaded -> kick off compliance sequence
            if (doc.docType === "ID") {
                await this.ensureTask(doc.organizationId, doc.caseId, "Run MVR (Motor Vehicle Record)", marker, 2);
                await this.ensureTask(doc.organizationId, doc.caseId, "Run Clearinghouse (DACH) query", marker, 2);
                await this.ensureTask(doc.organizationId, doc.caseId, "Schedule DOT physical / obtain medical card", marker, 7);
            }
            // DOT medical uploaded -> optional follow-up tasks
            if (doc.docType === "DOT_MEDICAL") {
                await this.ensureTask(doc.organizationId, doc.caseId, "Verify DOT medical details and expiration date", marker, 3);
            }
            // MVR uploaded -> review task
            if (doc.docType === "MVR") {
                await this.ensureTask(doc.organizationId, doc.caseId, "Review MVR for disqualifiers and points", marker, 3);
            }
            // Clearinghouse uploaded -> review task
            if (doc.docType === "CLEARINGHOUSE") {
                await this.ensureTask(doc.organizationId, doc.caseId, "Review Clearinghouse result and document outcomes", marker, 3);
            }
        }
        return doc;
    }
    async list(organizationId, params) {
        return this.prisma.document.findMany({
            where: { organizationId, caseId: params.caseId, personId: params.personId },
            orderBy: { createdAt: "desc" },
            take: 50
        });
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], DocumentsService);
