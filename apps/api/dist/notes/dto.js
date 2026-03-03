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
exports.AddendumDto = exports.UpdateNoteDto = exports.CreateNoteDto = exports.NoteStatus = exports.NoteType = void 0;
const class_validator_1 = require("class-validator");
var NoteType;
(function (NoteType) {
    NoteType["INTAKE"] = "INTAKE";
    NoteType["PROGRESS"] = "PROGRESS";
    NoteType["DISCHARGE"] = "DISCHARGE";
    NoteType["ASSESSMENT"] = "ASSESSMENT";
    NoteType["TREATMENT"] = "TREATMENT";
    NoteType["REFERRAL"] = "REFERRAL";
    NoteType["OTHER"] = "OTHER";
})(NoteType || (exports.NoteType = NoteType = {}));
var NoteStatus;
(function (NoteStatus) {
    NoteStatus["DRAFT"] = "DRAFT";
    NoteStatus["SIGNED"] = "SIGNED";
})(NoteStatus || (exports.NoteStatus = NoteStatus = {}));
class CreateNoteDto {
}
exports.CreateNoteDto = CreateNoteDto;
__decorate([
    (0, class_validator_1.IsEnum)(NoteType),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "noteType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "templateKey", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateNoteDto.prototype, "contentJson", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "narrative", void 0);
class UpdateNoteDto {
}
exports.UpdateNoteDto = UpdateNoteDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateNoteDto.prototype, "contentJson", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateNoteDto.prototype, "narrative", void 0);
class AddendumDto {
}
exports.AddendumDto = AddendumDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], AddendumDto.prototype, "contentJson", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddendumDto.prototype, "narrative", void 0);
//# sourceMappingURL=dto.js.map