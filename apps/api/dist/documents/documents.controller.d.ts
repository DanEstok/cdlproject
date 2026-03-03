import { DocumentsService } from "./documents.service";
import { CompleteDocumentDto, PresignDocumentDto } from "./dto";
export declare class DocumentsController {
    private docs;
    constructor(docs: DocumentsService);
    presign(req: any, dto: PresignDocumentDto): Promise<{
        storageKey: string;
        uploadUrl: string;
    }>;
    complete(req: any, dto: CompleteDocumentDto): Promise<{
        id: string;
        organizationId: string;
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
        createdAt: Date;
    }>;
    list(req: any, caseId?: string, personId?: string): Promise<{
        id: string;
        organizationId: string;
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
        createdAt: Date;
    }[]>;
    presignDownload(req: any, body: {
        documentId: string;
    }): Promise<{
        downloadUrl: string;
    }>;
}
