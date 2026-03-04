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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const prisma_service_1 = require("../prisma/prisma.service");
let JobsService = class JobsService {
    prisma;
    connection = new ioredis_1.default(process.env.REDIS_URL || "redis://localhost:6379");
    queue = new bullmq_1.Queue("system", { connection: this.connection });
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        // Repeat daily at ~3:15 AM server time (local dev, good enough for now)
        await this.queue.add("document-expiry-scan", {}, { repeat: { pattern: "15 3 * * *" }, removeOnComplete: true, removeOnFail: true });
        // Worker in-process (dev-friendly)
        // In production, run this in a separate process.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const worker = new bullmq_1.Worker("system", async (job) => {
            if (job.name === "document-expiry-scan") {
                await this.runDocumentExpiryScan();
            }
        }, { connection: this.connection });
    }
    async runDocumentExpiryScan() {
        const now = new Date();
        const in30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const docs = await this.prisma.document.findMany({
            where: {
                expiresAt: { gte: now, lte: in30 }
            },
            take: 500,
            orderBy: { expiresAt: "asc" }
        });
        for (const d of docs) {
            // Skip if no caseId (we only auto-task for case-scoped docs in MVP)
            if (!d.caseId)
                continue;
            const title = `Renew document: ${d.docType}`;
            const marker = `documentId=${d.id}`;
            const existing = await this.prisma.task.findFirst({
                where: {
                    organizationId: d.organizationId,
                    caseId: d.caseId,
                    title,
                    description: { contains: marker }
                }
            });
            if (existing)
                continue;
            const dueAt = d.expiresAt ?? in30;
            await this.prisma.task.create({
                data: {
                    organizationId: d.organizationId,
                    caseId: d.caseId,
                    title,
                    description: `Auto-generated. ${marker}. File: ${d.fileName}. Expires at: ${d.expiresAt?.toISOString()}`,
                    status: "TODO",
                    dueAt
                }
            });
        }
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobsService);
