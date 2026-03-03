import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import { CompleteDocumentDto, PresignDocumentDto } from "./dto";

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

  async complete(organizationId: string, actor: { userId: string; clerkUserId: string }, dto: CompleteDocumentDto) {
    // Optional: validate caseId/personId belong to org
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
