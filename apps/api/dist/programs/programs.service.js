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
exports.ProgramsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
function isValidProgramKey(k) {
    // strict-ish: uppercase, digits, underscores
    return /^[A-Z0-9_]{3,64}$/.test(k);
}
let ProgramsService = class ProgramsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(organizationId) {
        const rows = await this.prisma.programConfig.findMany({
            where: { organizationId },
            orderBy: [{ enabled: "desc" }, { displayName: "asc" }]
        });
        // If no program configs exist yet, infer from ReadinessRequirement programKeys
        if (rows.length === 0) {
            const inferred = await this.prisma.readinessRequirement.findMany({
                where: { organizationId },
                select: { programKey: true },
                distinct: ["programKey"]
            });
            // Create minimal configs for inferred keys
            if (inferred.length) {
                await this.prisma.programConfig.createMany({
                    data: inferred.map((r) => ({
                        organizationId,
                        programKey: r.programKey,
                        displayName: r.programKey,
                        enabled: true
                    }))
                });
                return this.prisma.programConfig.findMany({
                    where: { organizationId },
                    orderBy: [{ enabled: "desc" }, { displayName: "asc" }]
                });
            }
        }
        return rows;
    }
    async create(organizationId, body) {
        const programKey = (body.programKey || "").trim().toUpperCase();
        if (!isValidProgramKey(programKey))
            throw new common_1.BadRequestException("Invalid programKey format.");
        const displayName = (body.displayName || "").trim();
        if (!displayName)
            throw new common_1.BadRequestException("displayName required.");
        return this.prisma.programConfig.create({
            data: {
                organizationId,
                programKey,
                displayName,
                description: body.description?.trim() || null,
                enabled: true
            }
        });
    }
    async update(organizationId, programKey, body) {
        const key = programKey.toUpperCase();
        const existing = await this.prisma.programConfig.findUnique({
            where: { organizationId_programKey: { organizationId, programKey: key } }
        });
        if (!existing)
            throw new common_1.BadRequestException("Program not found.");
        return this.prisma.programConfig.update({
            where: { organizationId_programKey: { organizationId, programKey: key } },
            data: {
                displayName: body.displayName !== undefined ? body.displayName.trim() : existing.displayName,
                description: body.description !== undefined ? (body.description.trim() || null) : existing.description,
                enabled: body.enabled !== undefined ? body.enabled : existing.enabled
            }
        });
    }
    async clone(organizationId, fromProgramKey, to) {
        const fromKey = fromProgramKey.toUpperCase();
        const toKey = (to.programKey || "").trim().toUpperCase();
        if (!isValidProgramKey(toKey))
            throw new common_1.BadRequestException("Invalid destination programKey.");
        if (!to.displayName?.trim())
            throw new common_1.BadRequestException("Destination displayName required.");
        const fromReqs = await this.prisma.readinessRequirement.findMany({
            where: { organizationId, programKey: fromKey }
        });
        await this.prisma.programConfig.create({
            data: {
                organizationId,
                programKey: toKey,
                displayName: to.displayName.trim(),
                description: to.description?.trim() || null,
                enabled: true
            }
        });
        if (fromReqs.length) {
            await this.prisma.readinessRequirement.createMany({
                data: fromReqs.map((r) => ({
                    organizationId,
                    programKey: toKey,
                    kind: r.kind,
                    label: r.label,
                    weight: r.weight,
                    enabled: r.enabled,
                    docType: r.docType,
                    verificationType: r.verificationType
                }))
            });
        }
        return { cloned: fromReqs.length };
    }
};
exports.ProgramsService = ProgramsService;
exports.ProgramsService = ProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgramsService);
