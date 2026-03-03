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
exports.CasesController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const cases_service_1 = require("./cases.service");
const readiness_service_1 = require("./readiness.service");
const dto_1 = require("./dto");
let CasesController = class CasesController {
    constructor(cases, readiness) {
        this.cases = cases;
        this.readiness = readiness;
    }
    create(req, dto) {
        return this.cases.create(req.user.organizationId, req.user, dto);
    }
    list(req, status, search) {
        return this.cases.list(req.user.organizationId, { status, search });
    }
    get(req, id) {
        return this.cases.get(req.user.organizationId, id);
    }
    update(req, id, dto) {
        return this.cases.update(req.user.organizationId, req.user, id, dto);
    }
    readinessForCase(req, id) {
        return this.readiness.getCaseReadiness(req.user.organizationId, id);
    }
    close(req, id) {
        return this.cases.close(req.user.organizationId, req.user, id);
    }
};
exports.CasesController = CasesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateCaseDto]),
    __metadata("design:returntype", void 0)
], CasesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)("status")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], CasesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CasesController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dto_1.UpdateCaseDto]),
    __metadata("design:returntype", void 0)
], CasesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(":id/readiness"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CasesController.prototype, "readinessForCase", null);
__decorate([
    (0, common_1.Post)(":id/close"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CasesController.prototype, "close", null);
exports.CasesController = CasesController = __decorate([
    (0, common_1.Controller)("cases"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [cases_service_1.CasesService, readiness_service_1.ReadinessService])
], CasesController);
//# sourceMappingURL=cases.controller.js.map