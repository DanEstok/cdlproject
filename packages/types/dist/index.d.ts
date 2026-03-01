export declare enum UserRole {
    ADMIN = "ADMIN",
    CASE_MANAGER = "CASE_MANAGER",
    COMPLIANCE = "COMPLIANCE",
    WORKFORCE = "WORKFORCE",
    BILLING = "BILLING",
    AUDITOR = "AUDITOR"
}
export declare enum PersonType {
    CLIENT = "CLIENT",
    CONTACT = "CONTACT",
    PARTNER_CONTACT = "PARTNER_CONTACT"
}
export declare enum CaseStatus {
    OPEN = "OPEN",
    PAUSED = "PAUSED",
    CLOSED = "CLOSED"
}
export declare enum ProgramType {
    CCM = "CCM",
    SOBER_COACHING = "SOBER_COACHING",
    SAP = "SAP",
    DBE_PATHWAY = "DBE_PATHWAY"
}
export declare enum ProgramStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    DROPPED = "DROPPED"
}
export declare enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    BLOCKED = "BLOCKED",
    DONE = "DONE",
    CANCELLED = "CANCELLED"
}
export declare enum NoteType {
    CASE_NOTE = "CASE_NOTE",
    COACHING_NOTE = "COACHING_NOTE",
    COMPLIANCE_NOTE = "COMPLIANCE_NOTE"
}
export declare enum NoteStatus {
    DRAFT = "DRAFT",
    SIGNED = "SIGNED"
}
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
export declare enum VerificationType {
    DOT_MEDICAL = "DOT_MEDICAL",
    MVR = "MVR",
    CLEARINGHOUSE = "CLEARINGHOUSE"
}
export declare enum VerificationStatus {
    PENDING = "PENDING",
    PASSED = "PASSED",
    FAILED = "FAILED",
    UNKNOWN = "UNKNOWN"
}
export declare enum WorkType {
    INTAKE = "INTAKE",
    CASE_MGMT = "CASE_MGMT",
    COMPLIANCE = "COMPLIANCE",
    WORKFORCE = "WORKFORCE",
    ADMIN_MODULES = "ADMIN_MODULES"
}
export declare enum InvoiceStatus {
    DRAFT = "DRAFT",
    OPEN = "OPEN",
    PAID = "PAID",
    VOID = "VOID",
    UNCOLLECTIBLE = "UNCOLLECTIBLE"
}
export interface BaseEntity {
    id: string;
    organizationId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Organization extends BaseEntity {
    name: string;
}
export interface User extends BaseEntity {
    clerkUserId: string;
    role: UserRole;
    isActive: boolean;
}
export interface Person extends BaseEntity {
    type: PersonType;
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    dob?: Date;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
}
export interface Case extends BaseEntity {
    clientPersonId: string;
    status: CaseStatus;
    openedAt: Date;
    closedAt?: Date;
    primaryCaseManagerUserId?: string;
    notes?: string;
}
export interface ProgramEnrollment extends BaseEntity {
    caseId: string;
    programType: ProgramType;
    status: ProgramStatus;
    startedAt: Date;
    endedAt?: Date;
}
export interface Task extends BaseEntity {
    caseId: string;
    assignedToUserId?: string;
    assignedToPersonId?: string;
    title: string;
    description?: string;
    status: TaskStatus;
    dueAt?: Date;
    completedAt?: Date;
}
export interface Note extends BaseEntity {
    caseId: string;
    authorUserId: string;
    noteType: NoteType;
    templateKey?: string;
    contentJson: Record<string, any>;
    narrative?: string;
    status: NoteStatus;
    signedAt?: Date;
}
export interface Document extends BaseEntity {
    caseId?: string;
    personId?: string;
    uploadedByUserId?: string;
    uploadedByPersonId?: string;
    fileName: string;
    mimeType: string;
    storageKey: string;
    sizeBytes: number;
    docType: DocumentType;
    issueDate?: Date;
    expiresAt?: Date;
}
export interface Verification extends BaseEntity {
    caseId: string;
    type: VerificationType;
    status: VerificationStatus;
    verifiedAt?: Date;
    nextDueAt?: Date;
    verifiedByUserId?: string;
    notes?: string;
    evidenceDocumentId?: string;
}
export interface TimeEntry extends BaseEntity {
    caseId: string;
    userId: string;
    minutes: number;
    workType: WorkType;
    performedAt: Date;
    notes?: string;
}
export interface Invoice extends BaseEntity {
    caseId?: string;
    clientPersonId?: string;
    stripeInvoiceId: string;
    status: InvoiceStatus;
    amountCents: number;
    currency: string;
    hostedInvoiceUrl?: string;
}
export interface AuditEvent extends BaseEntity {
    actorUserId?: string;
    actorClerkUserId?: string;
    action: string;
    entityType: string;
    entityId: string;
    diffJson?: Record<string, any>;
}
export interface CreatePersonDto {
    type: PersonType;
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    dob?: string;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
}
export interface CreateCaseDto {
    clientPersonId?: string;
    client?: CreatePersonDto;
    notes?: string;
}
export interface CreateTaskDto {
    caseId: string;
    assignedToUserId?: string;
    assignedToPersonId?: string;
    title: string;
    description?: string;
    dueAt?: string;
}
export interface CreateNoteDto {
    caseId: string;
    noteType: NoteType;
    templateKey?: string;
    contentJson: Record<string, any>;
    narrative?: string;
}
export interface PresignDocumentDto {
    fileName: string;
    mimeType: string;
    sizeBytes: number;
}
export interface CompleteDocumentDto {
    storageKey: string;
    docType: DocumentType;
    caseId?: string;
    personId?: string;
    issueDate?: string;
    expiresAt?: string;
}
export interface CreateVerificationDto {
    caseId: string;
    type: VerificationType;
    notes?: string;
    evidenceDocumentId?: string;
}
export interface CreateTimeEntryDto {
    caseId: string;
    minutes: number;
    workType: WorkType;
    performedAt: string;
    notes?: string;
}
export interface CreateInvoiceDto {
    caseId?: string;
    clientPersonId?: string;
    lineItems: {
        timeEntryId?: string;
        description: string;
        amountCents: number;
    }[];
}
