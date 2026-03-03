import { Injectable, BadRequestException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import { CompleteDocumentDto, PresignDocumentDto } from "./dto";
import { VerificationStatus, VerificationType } from "@prisma/client";
import { computeDefaultNextDueAt } from "../verifications/rules";

@Injectable()
export class DocumentsService {
  private s3: S3Client;
  private bucket: string;

  constructor(private prisma: PrismaService, private audit: AuditService) {
    this.bucket = process.env.S3_BUCKET || "";
    this.s3 = new S3Client({
      region: process.env.S3_REGION,
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ""
      },
      forcePathStyle: true
    });
  }

  private async ensureTask(
  organizationId: string,
  caseId: string,
  title: string,
  marker: string,
  dueInDays?: number
) {
  const existing = await this.prisma.task.findFirst({
    where: {
      organizationId,
      caseId,
      title,
      description: { contains: marker }
    }
  });
  if (existing) return;

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

  async presign(organizationId: string, dto: PresignDocumentDto) {
    if (!this.bucket) throw new BadRequestException("S3_BUCKET not configured");

    const storageKey = `${organizationId}/${uuid()}-${dto.fileName}`;
    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: storageKey,
      ContentType: dto.mimeType
    });
    const uploadUrl = await getSignedUrl(this.s3, cmd, { expiresIn: 60 * 10 });

    return { storageKey, uploadUrl };
  }

  async presignDownload(
    organizationId: string,
    actor: { userId: string; clerkUserId: string },
    documentId: string
  ) {
    if (!this.bucket) throw new BadRequestException("S3_BUCKET not configured");

    const doc = await this.prisma.document.findFirst({
      where: { id: documentId, organizationId }
    });
    if (!doc) throw new ForbiddenException("Document not found");

    const cmd = new GetObjectCommand({
      Bucket: this.bucket,
      Key: doc.storageKey,
      ResponseContentDisposition: `attachment; filename="${doc.fileName}"` 
    });

    const downloadUrl = await getSignedUrl(this.s3, cmd, { expiresIn: 60 * 5 });

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

  async complete(organizationId: string, actor: { userId: string; clerkUserId: string }, dto: CompleteDocumentDto) {
    if (dto.caseId) {
      const c = await this.prisma.case.findFirst({ where: { id: dto.caseId, organizationId } });
      if (!c) throw new BadRequestException("Invalid caseId");
    }
    if (dto.personId) {
      const p = await this.prisma.person.findFirst({ where: { id: dto.personId, organizationId } });
      if (!p) throw new BadRequestException("Invalid personId");
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
    const docTypeToVerification: Partial<Record<string, VerificationType>> = {
      DOT_MEDICAL: VerificationType.DOT_MEDICAL,
      MVR: VerificationType.MVR,
      CLEARINGHOUSE: VerificationType.CLEARINGHOUSE
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
        const nextDueAt =
          doc.expiresAt ??
          computeDefaultNextDueAt(vType, verifiedAt) ??
          undefined;

        const v = await this.prisma.verification.create({
          data: {
            organizationId,
            caseId: doc.caseId,
            type: vType,
            status: VerificationStatus.PASSED,
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

  async list(organizationId: string, params: { caseId?: string; personId?: string }) {
    return this.prisma.document.findMany({
      where: { organizationId, caseId: params.caseId, personId: params.personId },
      orderBy: { createdAt: "desc" },
      take: 50
    });
  }
}
