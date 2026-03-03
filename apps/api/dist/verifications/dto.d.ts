export declare enum VerificationType {
    BACKGROUND_CHECK = "BACKGROUND_CHECK",
    DRUG_TEST = "DRUG_TEST",
    EMPLOYMENT_VERIFICATION = "EMPLOYMENT_VERIFICATION",
    EDUCATION_VERIFICATION = "EDUCATION_VERIFICATION",
    REFERENCE_CHECK = "REFERENCE_CHECK",
    CREDIT_CHECK = "CREDIT_CHECK",
    PROFESSIONAL_LICENSE = "PROFESSIONAL_LICENSE",
    CERTIFICATION = "CERTIFICATION",
    MEDICAL_EXAM = "MEDICAL_EXAM",
    OTHER = "OTHER"
}
export declare enum VerificationStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    EXPIRED = "EXPIRED",
    NOT_REQUIRED = "NOT_REQUIRED"
}
export declare class CreateVerificationDto {
    type: VerificationType;
    status?: VerificationStatus;
    nextDueAt?: string;
    notes?: string;
    evidenceDocumentId?: string;
}
export declare class UpdateVerificationDto {
    status?: VerificationStatus;
    nextDueAt?: string;
    notes?: string;
    evidenceDocumentId?: string;
}
