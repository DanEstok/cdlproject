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
exports.ReadinessConfigService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReadinessConfigService = class ReadinessConfigService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ensureDefaults(organizationId) {
        // Only create if none exist at all for this org
        const count = await this.prisma.readinessRequirement.count({ where: { organizationId } });
        if (count > 0)
            return { created: 0, skipped: true };
        const defaults = [
            // Apache Driven trucking baseline
            {
                programKey: "APACHE_DRIVEN_TRUCKING",
                kind: "DOC_PRESENT",
                label: "ID document uploaded",
                docType: "ID",
                weight: 2
            },
            {
                programKey: "APACHE_DRIVEN_TRUCKING",
                kind: "VERIFICATION_PASSED",
                label: "DOT Medical passed",
                verificationType: "DOT_MEDICAL",
                weight: 3
            },
            {
                programKey: "APACHE_DRIVEN_TRUCKING",
                kind: "VERIFICATION_PASSED",
                label: "MVR passed",
                verificationType: "MVR",
                weight: 3
            },
            {
                programKey: "APACHE_DRIVEN_TRUCKING",
                kind: "VERIFICATION_PASSED",
                label: "Clearinghouse passed",
                verificationType: "CLEARINGHOUSE",
                weight: 3
            },
            // Recovery Case Mgmt Ohio baseline (example starter set, you'll adjust)
            {
                programKey: "RECOVERY_CASE_MGMT_OH",
                kind: "DOC_PRESENT",
                label: "ID document uploaded",
                docType: "ID",
                weight: 2
            },
            {
                programKey: "RECOVERY_CASE_MGMT_OH",
                kind: "DOC_PRESENT",
                label: "Housing documentation uploaded",
                docType: "HOUSING",
                weight: 2
            },
            {
                programKey: "RECOVERY_CASE_MGMT_OH",
                kind: "DOC_PRESENT",
                label: "Court documentation uploaded (if applicable)",
                docType: "COURT",
                weight: 1
            }
        ];
        const created = await this.prisma.readinessRequirement.createMany({
            data: defaults.map((d) => ({
                organizationId,
                programKey: d.programKey,
                kind: d.kind,
                label: d.label,
                weight: d.weight ?? 1,
                enabled: d.enabled ?? true,
                docType: d.docType,
                verificationType: d.verificationType
            }))
        });
        return { created: created.count, skipped: false };
    }
    async listPrograms(organizationId) {
        const rows = await this.prisma.readinessRequirement.findMany({
            where: { organizationId },
            select: { programKey: true },
            distinct: ["programKey"]
        });
        const programKeys = rows.map(r => r.programKey).sort();
        return { programKeys };
    }
    async getRequirements(organizationId, programKey) {
        return this.prisma.readinessRequirement.findMany({
            where: { organizationId, programKey },
            orderBy: [{ enabled: "desc" }, { weight: "desc" }, { label: "asc" }]
        });
    }
    async replaceRequirements(organizationId, programKey, items) {
        // Replace-all MVP: delete program rows then insert new
        await this.prisma.readinessRequirement.deleteMany({ where: { organizationId, programKey } });
        if (!items?.length)
            return { inserted: 0 };
        const inserted = await this.prisma.readinessRequirement.createMany({
            data: items.map((i) => ({
                organizationId,
                programKey,
                kind: i.kind,
                label: i.label,
                weight: i.weight ?? 1,
                enabled: i.enabled ?? true,
                docType: i.docType ?? null,
                verificationType: i.verificationType ?? null
            }))
        });
        return { inserted: inserted.count };
    }
};
exports.ReadinessConfigService = ReadinessConfigService;
exports.ReadinessConfigService = ReadinessConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReadinessConfigService);
