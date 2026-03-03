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
exports.ReadinessConfigController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const readiness_config_service_1 = require("./readiness-config.service");
let ReadinessConfigController = class ReadinessConfigController {
    constructor(cfg) {
        this.cfg = cfg;
    }
    ensureDefaults(req) {
        return this.cfg.ensureDefaults(req.user.organizationId);
    }
    listPrograms(req) {
        return this.cfg.listPrograms(req.user.organizationId);
    }
    getReqs(req, programKey) {
        return this.cfg.getRequirements(req.user.organizationId, programKey);
    }
    replaceReqs(req, programKey, body) {
        return this.cfg.replaceRequirements(req.user.organizationId, programKey, body.items || []);
    }
};
exports.ReadinessConfigController = ReadinessConfigController;
__decorate([
    (0, common_1.Post)("ensure-defaults"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReadinessConfigController.prototype, "ensureDefaults", null);
__decorate([
    (0, common_1.Get)("programs"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReadinessConfigController.prototype, "listPrograms", null);
__decorate([
    (0, common_1.Get)("programs/:programKey/requirements"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("programKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ReadinessConfigController.prototype, "getReqs", null);
__decorate([
    (0, common_1.Put)("programs/:programKey/requirements"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)("programKey")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ReadinessConfigController.prototype, "replaceReqs", null);
exports.ReadinessConfigController = ReadinessConfigController = __decorate([
    (0, common_1.Controller)("readiness"),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [readiness_config_service_1.ReadinessConfigService])
], ReadinessConfigController);
//# sourceMappingURL=readiness-config.controller.js.map