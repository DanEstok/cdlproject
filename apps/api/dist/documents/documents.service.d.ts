import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CompleteDocumentDto, PresignDocumentDto } from "./dto";
export declare class DocumentsService {
    private prisma;
    private audit;
    private s3;
    private bucket;
    constructor(prisma: PrismaService, audit: AuditService);
    private ensureTask;
    presign(organizationId: string, dto: PresignDocumentDto): Promise<{
        storageKey: string;
        uploadUrl: string;
    }>;
    presignDownload(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, documentId: string): Promise<{
        downloadUrl: string;
    }>;
    complete(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, dto: CompleteDocumentDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        caseId: string | null;
        personId: string | null;
        uploadedByUserId: string | null;
        uploadedByPersonId: string | null;
        fileName: string;
        mimeType: string;
        storageKey: string;
        sizeBytes: number;
        docType: import("@prisma/client").$Enums.DocumentType;
        issueDate: Date | null;
        expiresAt: Date | null;
    }>;
    list(organizationId: string, params: {
        caseId?: string;
        personId?: string;
    }): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        caseId: string | null;
        personId: string | null;
        uploadedByUserId: string | null;
        uploadedByPersonId: string | null;
        fileName: string;
        mimeType: string;
        storageKey: string;
        sizeBytes: number;
        docType: import("@prisma/client").$Enums.DocumentType;
        issueDate: Date | null;
        expiresAt: Date | null;
    }[]>;
}
