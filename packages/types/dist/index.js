"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceStatus = exports.WorkType = exports.VerificationStatus = exports.VerificationType = exports.DocumentType = exports.NoteStatus = exports.NoteType = exports.TaskStatus = exports.ProgramStatus = exports.ProgramType = exports.CaseStatus = exports.PersonType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["CASE_MANAGER"] = "CASE_MANAGER";
    UserRole["COMPLIANCE"] = "COMPLIANCE";
    UserRole["WORKFORCE"] = "WORKFORCE";
    UserRole["BILLING"] = "BILLING";
    UserRole["AUDITOR"] = "AUDITOR";
})(UserRole || (exports.UserRole = UserRole = {}));
var PersonType;
(function (PersonType) {
    PersonType["CLIENT"] = "CLIENT";
    PersonType["CONTACT"] = "CONTACT";
    PersonType["PARTNER_CONTACT"] = "PARTNER_CONTACT";
})(PersonType || (exports.PersonType = PersonType = {}));
var CaseStatus;
(function (CaseStatus) {
    CaseStatus["OPEN"] = "OPEN";
    CaseStatus["PAUSED"] = "PAUSED";
    CaseStatus["CLOSED"] = "CLOSED";
})(CaseStatus || (exports.CaseStatus = CaseStatus = {}));
var ProgramType;
(function (ProgramType) {
    ProgramType["CCM"] = "CCM";
    ProgramType["SOBER_COACHING"] = "SOBER_COACHING";
    ProgramType["SAP"] = "SAP";
    ProgramType["DBE_PATHWAY"] = "DBE_PATHWAY";
})(ProgramType || (exports.ProgramType = ProgramType = {}));
var ProgramStatus;
(function (ProgramStatus) {
    ProgramStatus["ACTIVE"] = "ACTIVE";
    ProgramStatus["COMPLETED"] = "COMPLETED";
    ProgramStatus["DROPPED"] = "DROPPED";
})(ProgramStatus || (exports.ProgramStatus = ProgramStatus = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "TODO";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["BLOCKED"] = "BLOCKED";
    TaskStatus["DONE"] = "DONE";
    TaskStatus["CANCELLED"] = "CANCELLED";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var NoteType;
(function (NoteType) {
    NoteType["CASE_NOTE"] = "CASE_NOTE";
    NoteType["COACHING_NOTE"] = "COACHING_NOTE";
    NoteType["COMPLIANCE_NOTE"] = "COMPLIANCE_NOTE";
})(NoteType || (exports.NoteType = NoteType = {}));
var NoteStatus;
(function (NoteStatus) {
    NoteStatus["DRAFT"] = "DRAFT";
    NoteStatus["SIGNED"] = "SIGNED";
})(NoteStatus || (exports.NoteStatus = NoteStatus = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["ID"] = "ID";
    DocumentType["DOT_MEDICAL"] = "DOT_MEDICAL";
    DocumentType["MVR"] = "MVR";
    DocumentType["CLEARINGHOUSE"] = "CLEARINGHOUSE";
    DocumentType["COURT"] = "COURT";
    DocumentType["HOUSING"] = "HOUSING";
    DocumentType["EMPLOYMENT"] = "EMPLOYMENT";
    DocumentType["OTHER"] = "OTHER";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var VerificationType;
(function (VerificationType) {
    VerificationType["DOT_MEDICAL"] = "DOT_MEDICAL";
    VerificationType["MVR"] = "MVR";
    VerificationType["CLEARINGHOUSE"] = "CLEARINGHOUSE";
})(VerificationType || (exports.VerificationType = VerificationType = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "PENDING";
    VerificationStatus["PASSED"] = "PASSED";
    VerificationStatus["FAILED"] = "FAILED";
    VerificationStatus["UNKNOWN"] = "UNKNOWN";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
var WorkType;
(function (WorkType) {
    WorkType["INTAKE"] = "INTAKE";
    WorkType["CASE_MGMT"] = "CASE_MGMT";
    WorkType["COMPLIANCE"] = "COMPLIANCE";
    WorkType["WORKFORCE"] = "WORKFORCE";
    WorkType["ADMIN_MODULES"] = "ADMIN_MODULES";
})(WorkType || (exports.WorkType = WorkType = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "DRAFT";
    InvoiceStatus["OPEN"] = "OPEN";
    InvoiceStatus["PAID"] = "PAID";
    InvoiceStatus["VOID"] = "VOID";
    InvoiceStatus["UNCOLLECTIBLE"] = "UNCOLLECTIBLE";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
