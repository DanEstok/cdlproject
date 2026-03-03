import { Injectable, OnModuleInit } from "@nestjs/common";
import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class JobsService implements OnModuleInit {
  private connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");
  private queue = new Queue("system", { connection: this.connection });

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // Repeat daily at ~3:15 AM server time (local dev, good enough for now)
    await this.queue.add(
      "document-expiry-scan",
      {},
      { repeat: { pattern: "15 3 * * *" }, removeOnComplete: true, removeOnFail: true }
    );

    // Worker in-process (dev-friendly)
    // In production, run this in a separate process.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const worker = new Worker(
      "system",
      async (job) => {
        if (job.name === "document-expiry-scan") {
          await this.runDocumentExpiryScan();
        }
      },
      { connection: this.connection }
    );
  }

  private async runDocumentExpiryScan() {
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
      if (!d.caseId) continue;

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

      if (existing) continue;

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
}
