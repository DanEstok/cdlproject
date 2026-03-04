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
exports.UpdateVerificationDto = exports.CreateVerificationDto = exports.VerificationStatus = exports.VerificationType = void 0;
const class_validator_1 = require("class-validator");
var VerificationType;
(function (VerificationType) {
    VerificationType["BACKGROUND_CHECK"] = "BACKGROUND_CHECK";
    VerificationType["DRUG_TEST"] = "DRUG_TEST";
    VerificationType["EMPLOYMENT_VERIFICATION"] = "EMPLOYMENT_VERIFICATION";
    VerificationType["EDUCATION_VERIFICATION"] = "EDUCATION_VERIFICATION";
    VerificationType["REFERENCE_CHECK"] = "REFERENCE_CHECK";
    VerificationType["CREDIT_CHECK"] = "CREDIT_CHECK";
    VerificationType["PROFESSIONAL_LICENSE"] = "PROFESSIONAL_LICENSE";
    VerificationType["CERTIFICATION"] = "CERTIFICATION";
    VerificationType["MEDICAL_EXAM"] = "MEDICAL_EXAM";
    VerificationType["OTHER"] = "OTHER";
})(VerificationType || (exports.VerificationType = VerificationType = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "PENDING";
    VerificationStatus["IN_PROGRESS"] = "IN_PROGRESS";
    VerificationStatus["COMPLETED"] = "COMPLETED";
    VerificationStatus["FAILED"] = "FAILED";
    VerificationStatus["EXPIRED"] = "EXPIRED";
    VerificationStatus["NOT_REQUIRED"] = "NOT_REQUIRED";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
class CreateVerificationDto {
    type;
    status;
    nextDueAt;
    notes;
    evidenceDocumentId;
}
exports.CreateVerificationDto = CreateVerificationDto;
__decorate([
    (0, class_validator_1.IsEnum)(VerificationType),
    __metadata("design:type", String)
], CreateVerificationDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(VerificationStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVerificationDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVerificationDto.prototype, "nextDueAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVerificationDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVerificationDto.prototype, "evidenceDocumentId", void 0);
class UpdateVerificationDto {
    status;
    nextDueAt;
    notes;
    evidenceDocumentId;
}
exports.UpdateVerificationDto = UpdateVerificationDto;
__decorate([
    (0, class_validator_1.IsEnum)(VerificationStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVerificationDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVerificationDto.prototype, "nextDueAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVerificationDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVerificationDto.prototype, "evidenceDocumentId", void 0);
