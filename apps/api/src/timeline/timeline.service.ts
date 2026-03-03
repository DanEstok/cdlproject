import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

export type TimelineItem = {
  at: string;
  kind: "TASK" | "NOTE" | "DOCUMENT" | "VERIFICATION" | "AUDIT";
  title: string;
  subtitle?: string;
  refId: string;
};

@Injectable()
export class TimelineService {
  constructor(private prisma: PrismaService) {}

  private async ensureCase(organizationId: string, caseId: string) {
    const c = await this.prisma.case.findFirst({ where: { id: caseId, organizationId } });
    if (!c) throw new BadRequestException("Invalid caseId");
    return c;
  }

  async caseTimeline(organizationId: string, caseId: string): Promise<TimelineItem[]> {
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

    const items: TimelineItem[] = [];

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

    // sort newest first
    items.sort((a, b) => (a.at < b.at ? 1 : a.at > b.at ? -1 : 0));
    return items.slice(0, 200);
  }
}
