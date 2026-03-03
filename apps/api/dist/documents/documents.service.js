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
let DocumentsService = class DocumentsService {
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
//# sourceMappingURL=documents.service.js.map