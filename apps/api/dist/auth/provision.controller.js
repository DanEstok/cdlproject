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
exports.ProvisionController = void 0;
const common_1 = require("@nestjs/common");
const provision_auth_guard_1 = require("./provision-auth.guard");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
let ProvisionController = class ProvisionController {
    constructor(prisma, audit) {
        this.prisma = prisma;
        this.audit = audit;
    }
    async provision(req) {
        const clerkUserId = req.user?.clerkUserId;
        if (!clerkUserId)
            throw new Error("Missing clerkUserId");
        const existing = await this.prisma.user.findUnique({ where: { clerkUserId } });
        if (existing) {
            return { provisioned: true, user: existing };
        }
        const org = await this.prisma.organization.create({
            data: { name: `Org for ${clerkUserId.slice(0, 8)}` }
        });
        const user = await this.prisma.user.create({
            data: {
                organizationId: org.id,
                clerkUserId,
                role: "ADMIN"
            }
        });
        await this.audit.write({
            organizationId: org.id,
            actorUserId: user.id,
            actorClerkUserId: clerkUserId,
            action: "USER_PROVISIONED",
            entityType: "User",
            entityId: user.id,
            diffJson: { organizationId: org.id, role: user.role }
        });
        return { provisioned: true, user, organization: org };
    }
};
exports.ProvisionController = ProvisionController;
__decorate([
    (0, common_1.Post)("provision"),
    (0, common_1.UseGuards)(provision_auth_guard_1.ProvisionAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProvisionController.prototype, "provision", null);
exports.ProvisionController = ProvisionController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, audit_service_1.AuditService])
], ProvisionController);
//# sourceMappingURL=provision.controller.js.map