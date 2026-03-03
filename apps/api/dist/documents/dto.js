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
exports.CompleteDocumentDto = exports.PresignDocumentDto = exports.DocumentType = void 0;
const class_validator_1 = require("class-validator");
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
class PresignDocumentDto {
}
exports.PresignDocumentDto = PresignDocumentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PresignDocumentDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PresignDocumentDto.prototype, "mimeType", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PresignDocumentDto.prototype, "sizeBytes", void 0);
class CompleteDocumentDto {
}
exports.CompleteDocumentDto = CompleteDocumentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteDocumentDto.prototype, "storageKey", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteDocumentDto.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CompleteDocumentDto.prototype, "mimeType", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CompleteDocumentDto.prototype, "sizeBytes", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(DocumentType),
    __metadata("design:type", String)
], CompleteDocumentDto.prototype, "docType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompleteDocumentDto.prototype, "caseId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompleteDocumentDto.prototype, "personId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompleteDocumentDto.prototype, "issueDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CompleteDocumentDto.prototype, "expiresAt", void 0);
//# sourceMappingURL=dto.js.map