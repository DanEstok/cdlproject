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
        organizationId: string;
        caseId: string | null;
    }>;
    list(req: any, caseId?: string, personId?: string): Promise<{
        id: string;
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
        organizationId: string;
        caseId: string | null;
    }[]>;
}
