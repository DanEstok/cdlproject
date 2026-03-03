import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { VerificationStatus, VerificationType } from "@prisma/client";

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
        where: { organizationId, caseId, status: VerificationStatus.PASSED },
        orderBy: { verifiedAt: "desc" },
        take: 50
      })
    ]);

    const has = (type: VerificationType) => verifs.some(v => v.type === type);

    const items = [
      {
        key: "ID_UPLOADED",
        label: "ID document uploaded",
        ok: idDocs.length > 0
      },
      {
        key: "DOT_MEDICAL_PASSED",
        label: "DOT Medical verification passed",
        ok: has(VerificationType.DOT_MEDICAL)
      },
      {
        key: "MVR_PASSED",
        label: "MVR verification passed",
        ok: has(VerificationType.MVR)
      },
      {
        key: "CLEARINGHOUSE_PASSED",
        label: "Clearinghouse verification passed",
        ok: has(VerificationType.CLEARINGHOUSE)
      }
    ];

    const total = items.length;
    const done = items.filter(i => i.ok).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    return { caseId, percent, done, total, items };
  }
}
