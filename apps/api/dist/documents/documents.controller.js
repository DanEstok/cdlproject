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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const documents_service_1 = require("./documents.service");
const dto_1 = require("./dto");
let DocumentsController = class DocumentsController {
    docs;
    constructor(docs) {
        this.docs = docs;
    }
    presign(req, dto) {
        return this.docs.presign(req.user.organizationId, dto);
    }
    complete(req, dto) {
        return this.docs.complete(req.user.organizationId, req.user, dto);
    }
    list(req, caseId, personId) {
        return this.docs.list(req.user.organizationId, { caseId, personId });
    }
    presignDownload(req, body) {
        return this.docs.presignDownload(req.user.organizationId, req.user, body.documentId);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)("presign"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.PresignDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "presign", null);
__decorate([
    (0, common_1.Post)("complete"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CompleteDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "complete", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("caseId")),
    __param(2, (0, common_1.Query)("personId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "list", null);
__decorate([
    (0, common_1.Post)("presign-download"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "presignDownload", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)("documents"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
