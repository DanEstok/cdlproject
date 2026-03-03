export declare enum DocumentType {
    ID = "ID",
    DOT_MEDICAL = "DOT_MEDICAL",
    MVR = "MVR",
    CLEARINGHOUSE = "CLEARINGHOUSE",
    COURT = "COURT",
    HOUSING = "HOUSING",
    EMPLOYMENT = "EMPLOYMENT",
    OTHER = "OTHER"
}
export declare class PresignDocumentDto {
    fileName: string;
    mimeType: string;
    sizeBytes: number;
}
export declare class CompleteDocumentDto {
    storageKey: string;
    fileName: string;
    mimeType: string;
    sizeBytes: number;
    docType: DocumentType;
    caseId?: string;
    personId?: string;
    issueDate?: string;
    expiresAt?: string;
}
