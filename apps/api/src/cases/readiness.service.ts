import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReadinessService {
  constructor(private prisma: PrismaService) {}

  private async ensureCase(organizationId: string, caseId: string) {
    const c = await this.prisma.case.findFirst({ where: { id: caseId, organizationId } });
    if (!c) throw new BadRequestException("Invalid caseId");
    return c;
  }

  async getCaseReadiness(organizationId: string, caseId: string) {
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

    const hasDocType = (docType: string) => docs.some(d => d.docType === docType);
    const hasPassedVerification = (verificationType: string) => passedVerifs.some(v => v.type === verificationType);

    const items = reqs.map((r) => {
      let ok = false;

      if (r.kind === "DOC_PRESENT" && r.docType) ok = hasDocType(r.docType);
      if (r.kind === "VERIFICATION_PASSED" && r.verificationType) ok = hasPassedVerification(r.verificationType);

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
}
