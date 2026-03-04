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
exports.ReadinessService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReadinessService = class ReadinessService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ensureCase(organizationId, caseId) {
        const c = await this.prisma.case.findFirst({ where: { id: caseId, organizationId } });
        if (!c)
            throw new common_1.BadRequestException("Invalid caseId");
        return c;
    }
    async getCaseReadiness(organizationId, caseId) {
        const c = await this.ensureCase(organizationId, caseId);
        // Pull requirements for the programKey
        const reqs = await this.prisma.readinessRequirement.findMany({
            where: { organizationId, programKey: c.programKey, enabled: true },
            orderBy: [{ weight: "desc" }, { label: "asc" }]
        });
        // Pull current evidence
        const [docs, passedVerifs] = await Promise.all([
            this.prisma.document.findMany({
                where: {
                    organizationId,
                    OR: [{ caseId }, { personId: c.clientPersonId }]
                },
                select: { id: true, docType: true }
            }),
            this.prisma.verification.findMany({
                where: { organizationId, caseId, status: "PASSED" },
                select: { id: true, type: true }
            })
        ]);
        const hasDocType = (docType) => docs.some(d => d.docType === docType);
        const hasPassedVerification = (verificationType) => passedVerifs.some(v => v.type === verificationType);
        const items = reqs.map((r) => {
            let ok = false;
            if (r.kind === "DOC_PRESENT" && r.docType)
                ok = hasDocType(r.docType);
            if (r.kind === "VERIFICATION_PASSED" && r.verificationType)
                ok = hasPassedVerification(r.verificationType);
            return {
                id: r.id,
                key: `${r.kind}:${r.docType || r.verificationType || r.label}`,
                label: r.label,
                kind: r.kind,
                weight: r.weight,
                ok
            };
        });
        const totalWeight = items.reduce((sum, i) => sum + (i.weight || 1), 0);
        const doneWeight = items.filter(i => i.ok).reduce((sum, i) => sum + (i.weight || 1), 0);
        const percent = totalWeight === 0 ? 0 : Math.round((doneWeight / totalWeight) * 100);
        return {
            caseId,
            programKey: c.programKey,
            percent,
            doneWeight,
            totalWeight,
            items
        };
    }
};
exports.ReadinessService = ReadinessService;
exports.ReadinessService = ReadinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReadinessService);
