import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

type ReqInput = {
  programKey: string;
  kind: "DOC_PRESENT" | "VERIFICATION_PASSED";
  label: string;
  weight?: number;
  enabled?: boolean;
  docType?: string;
  verificationType?: string;
};

@Injectable()
export class ReadinessConfigService {
  constructor(private prisma: PrismaService) {}

  async ensureDefaults(organizationId: string) {
    // Only create if none exist at all for this org
    const count = await this.prisma.readinessRequirement.count({ where: { organizationId } });
    if (count > 0) return { created: 0, skipped: true };

    const defaults: ReqInput[] = [
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
        kind: d.kind as any,
        label: d.label,
        weight: d.weight ?? 1,
        enabled: d.enabled ?? true,
        docType: d.docType,
        verificationType: d.verificationType
      }))
    });

    return { created: created.count, skipped: false };
  }

  async listPrograms(organizationId: string) {
    const rows = await this.prisma.readinessRequirement.findMany({
      where: { organizationId },
      select: { programKey: true },
      distinct: ["programKey"]
    });
    const programKeys = rows.map(r => r.programKey).sort();
    return { programKeys };
  }

  async getRequirements(organizationId: string, programKey: string) {
    return this.prisma.readinessRequirement.findMany({
      where: { organizationId, programKey },
      orderBy: [{ enabled: "desc" }, { weight: "desc" }, { label: "asc" }]
    });
  }

  async replaceRequirements(organizationId: string, programKey: string, items: any[]) {
    // Replace-all MVP: delete program rows then insert new
    await this.prisma.readinessRequirement.deleteMany({ where: { organizationId, programKey } });

    if (!items?.length) return { inserted: 0 };

    const inserted = await this.prisma.readinessRequirement.createMany({
      data: items.map((i: any) => ({
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
}
