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
const client_1 = require("@prisma/client");
let ReadinessService = class ReadinessService {
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
        const [idDocs, verifs] = await Promise.all([
            this.prisma.document.findMany({
                where: {
                    organizationId,
                    OR: [
                        { caseId },
                        { personId: c.clientPersonId }
                    ],
                    docType: "ID"
                },
                take: 1
            }),
            this.prisma.verification.findMany({
                where: { organizationId, caseId, status: client_1.VerificationStatus.PASSED },
                orderBy: { verifiedAt: "desc" },
                take: 50
            })
        ]);
        const has = (type) => verifs.some(v => v.type === type);
        const items = [
            {
                key: "ID_UPLOADED",
                label: "ID document uploaded",
                ok: idDocs.length > 0
            },
            {
                key: "DOT_MEDICAL_PASSED",
                label: "DOT Medical verification passed",
                ok: has(client_1.VerificationType.DOT_MEDICAL)
            },
            {
                key: "MVR_PASSED",
                label: "MVR verification passed",
                ok: has(client_1.VerificationType.MVR)
            },
            {
                key: "CLEARINGHOUSE_PASSED",
                label: "Clearinghouse verification passed",
                ok: has(client_1.VerificationType.CLEARINGHOUSE)
            }
        ];
        const total = items.length;
        const done = items.filter(i => i.ok).length;
        const percent = total === 0 ? 0 : Math.round((done / total) * 100);
        return { caseId, percent, done, total, items };
    }
};
exports.ReadinessService = ReadinessService;
exports.ReadinessService = ReadinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReadinessService);
//# sourceMappingURL=readiness.service.js.map