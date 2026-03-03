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
exports.TimelineService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TimelineService = class TimelineService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ensureCase(organizationId, caseId) {
        const c = await this.prisma.case.findFirst({ where: { id: caseId, organizationId } });
        if (!c)
            throw new common_1.BadRequestException("Invalid caseId");
        return c;
    }
    async caseTimeline(organizationId, caseId) {
        await this.ensureCase(organizationId, caseId);
        const [tasks, notes, docs, verifs, audits] = await Promise.all([
            this.prisma.task.findMany({
                where: { organizationId, caseId },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            this.prisma.note.findMany({
                where: { organizationId, caseId },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            this.prisma.document.findMany({
                where: { organizationId, caseId },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            this.prisma.verification.findMany({
                where: { organizationId, caseId },
                orderBy: { createdAt: "desc" },
                take: 50
            }),
            this.prisma.auditEvent.findMany({
                where: { organizationId, entityType: "Case", entityId: caseId },
                orderBy: { createdAt: "desc" },
                take: 50
            })
        ]);
        const items = [];
        for (const t of tasks) {
            items.push({
                at: t.createdAt.toISOString(),
                kind: "TASK",
                title: t.title,
                subtitle: `${t.status}${t.dueAt ? ` | due ${t.dueAt.toISOString().slice(0, 10)}` : ""}`,
                refId: t.id
            });
        }
        for (const n of notes) {
            items.push({
                at: n.createdAt.toISOString(),
                kind: "NOTE",
                title: `${n.noteType} (${n.status})`,
                subtitle: n.narrative ?? "",
                refId: n.id
            });
        }
        for (const d of docs) {
            items.push({
                at: d.createdAt.toISOString(),
                kind: "DOCUMENT",
                title: `${d.docType}: ${d.fileName}`,
                subtitle: d.expiresAt ? `expires ${d.expiresAt.toISOString().slice(0, 10)}` : "",
                refId: d.id
            });
        }
        for (const v of verifs) {
            items.push({
                at: v.createdAt.toISOString(),
                kind: "VERIFICATION",
                title: `${v.type}: ${v.status}`,
                subtitle: v.nextDueAt ? `next due ${v.nextDueAt.toISOString().slice(0, 10)}` : "",
                refId: v.id
            });
        }
        for (const a of audits) {
            items.push({
                at: a.createdAt.toISOString(),
                kind: "AUDIT",
                title: a.action,
                subtitle: a.entityType,
                refId: a.id
            });
        }
        items.sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0));
        return items.slice(0, 200);
    }
};
exports.TimelineService = TimelineService;
exports.TimelineService = TimelineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimelineService);
//# sourceMappingURL=timeline.service.js.map