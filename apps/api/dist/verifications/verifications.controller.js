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
exports.VerificationsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const verifications_service_1 = require("./verifications.service");
const dto_1 = require("./dto");
let VerificationsController = class VerificationsController {
    constructor(verifs) {
        this.verifs = verifs;
    }
    create(req, caseId, dto) {
        return this.verifs.create(req.user.organizationId, req.user, caseId, dto);
    }
    list(req, caseId) {
        return this.verifs.list(req.user.organizationId, caseId);
    }
    update(req, id, dto) {
        return this.verifs.update(req.user.organizationId, req.user, id, dto);
    }
    completeFromEvidence(req, id) {
        return this.verifs.completeFromEvidence(req.user.organizationId, req.user, id);
    }
};
exports.VerificationsController = VerificationsController;
__decorate([
    (0, common_1.Post)("cases/:caseId/verifications"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("caseId")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.CreateVerificationDto]),
    __metadata("design:returntype", void 0)
], VerificationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("cases/:caseId/verifications"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("caseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VerificationsController.prototype, "list", null);
__decorate([
    (0, common_1.Patch)("verifications/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateVerificationDto]),
    __metadata("design:returntype", void 0)
], VerificationsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("verifications/:id/complete-from-evidence"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], VerificationsController.prototype, "completeFromEvidence", null);
exports.VerificationsController = VerificationsController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [verifications_service_1.VerificationsService])
], VerificationsController);
//# sourceMappingURL=verifications.controller.js.map