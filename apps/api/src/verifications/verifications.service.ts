import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CreateVerificationDto, UpdateVerificationDto } from "./dto";
import { VerificationStatus, VerificationType } from "@prisma/client";
import { computeDefaultNextDueAt } from "./rules";

@Injectable()
export class VerificationsService {
  constructor(private prisma: PrismaService, private audit: AuditService) {}

  private async ensureCase(organizationId: string, caseId: string) {
    const c = await this.prisma.case.findFirst({ where: { id: caseId, organizationId } });
    if (!c) throw new BadRequestException("Invalid caseId");
    return c;
  }

  private normalizeStatus(status?: string): VerificationStatus {
    if (!status) return VerificationStatus.PENDING;
    const s = status.toUpperCase();
    if (s === "PASSED") return VerificationStatus.PASSED;
    if (s === "FAILED") return VerificationStatus.FAILED;
    if (s === "UNKNOWN") return VerificationStatus.UNKNOWN;
    return VerificationStatus.PENDING;
  }

  /**
   * Creates or ensures the proper follow-up task exists.
   * Rules:
   * - FAILED => create Resolve task (due in 7 days)
   * - PASSED + nextDueAt => create Renew task due at nextDueAt
   */
  private async ensureAutoTasksForVerification(v: {
    id: string;
    organizationId: string;
    caseId: string;
    type: VerificationType;
    status: VerificationStatus;
    nextDueAt: Date | null;
  }) {
    const marker = `verificationId=${v.id}`;

    if (v.status === VerificationStatus.FAILED) {
      const title = `Resolve verification failure: ${v.type}`;

      const existing = await this.prisma.task.findFirst({
        where: {
          organizationId: v.organizationId,
          caseId: v.caseId,
          title,
          description: { contains: marker }
        }
      });

      if (!existing) {
        const dueAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.prisma.task.create({
          data: {
            organizationId: v.organizationId,
            caseId: v.caseId,
            title,
            description: `Auto-generated follow-up for FAILED verification. ${marker}`,
            status: "TODO",
            dueAt
          }
        });
      }
      return;
    }

    if (v.status === VerificationStatus.PASSED && v.nextDueAt) {
      const title = `Renew verification: ${v.type}`;

      const existing = await this.prisma.task.findFirst({
        where: {
          organizationId: v.organizationId,
          caseId: v.caseId,
          title,
          description: { contains: marker }
        }
      });

      if (!existing) {
        await this.prisma.task.create({
          data: {
            organizationId: v.organizationId,
            caseId: v.caseId,
            title,
            description: `Auto-generated renewal reminder. ${marker}`,
            status: "TODO",
            dueAt: v.nextDueAt
          }
        });
      }
    }
  }

  async create(organizationId: string, actor: any, caseId: string, dto: CreateVerificationDto) {
    await this.ensureCase(organizationId, caseId);

    if (dto.evidenceDocumentId) {
      const doc = await this.prisma.document.findFirst({
        where: { id: dto.evidenceDocumentId, organizationId }
      });
      if (!doc) throw new BadRequestException("Invalid evidenceDocumentId");
    }

    const status = this.normalizeStatus(dto.status);
    const now = new Date();

    // Default nextDueAt behavior:
    // - if caller provides nextDueAt, use it
    // - else if status PASSED, compute a default nextDueAt based on type
    // - else leave null
    const computedNextDue =
      dto.nextDueAt
        ? new Date(dto.nextDueAt)
        : status === VerificationStatus.PASSED
          ? computeDefaultNextDueAt(dto.type as any, now)
          : null;

    const verifiedAt =
      status === VerificationStatus.PASSED || status === VerificationStatus.FAILED
        ? now
        : undefined;

    const v = await this.prisma.verification.create({
      data: {
        organizationId,
        caseId,
        type: dto.type as any,
        status,
        nextDueAt: computedNextDue ?? undefined,
        notes: dto.notes,
        evidenceDocumentId: dto.evidenceDocumentId,
        verifiedByUserId: actor.userId,
        verifiedAt
      }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "VERIFICATION_CREATED",
      entityType: "Verification",
      entityId: v.id,
      diffJson: { caseId, type: v.type, status: v.status, nextDueAt: v.nextDueAt?.toISOString() }
    });

    await this.ensureAutoTasksForVerification(v);

    return v;
  }

  async list(organizationId: string, caseId: string) {
    await this.ensureCase(organizationId, caseId);
    return this.prisma.verification.findMany({
      where: { organizationId, caseId },
      orderBy: [{ createdAt: "desc" }],
      take: 100
    });
  }

  async update(organizationId: string, actor: any, id: string, dto: UpdateVerificationDto) {
    const v = await this.prisma.verification.findFirst({ where: { id, organizationId } });
    if (!v) throw new NotFoundException("Verification not found");

    if (dto.evidenceDocumentId) {
      const doc = await this.prisma.document.findFirst({
        where: { id: dto.evidenceDocumentId, organizationId }
      });
      if (!doc) throw new BadRequestException("Invalid evidenceDocumentId");
    }

    const nextStatus = dto.status ? this.normalizeStatus(dto.status) : v.status;

    // If status becomes PASSED and nextDueAt is not provided and not already set,
    // compute default next due based on type.
    const now = new Date();
    const nextDueAt =
      dto.nextDueAt
        ? new Date(dto.nextDueAt)
        : nextStatus === VerificationStatus.PASSED && !v.nextDueAt
          ? computeDefaultNextDueAt(v.type, now)
          : dto.nextDueAt === undefined
            ? v.nextDueAt
            : null;

    const verifiedAt =
      (nextStatus === VerificationStatus.PASSED || nextStatus === VerificationStatus.FAILED)
        ? now
        : v.verifiedAt;

    const updated = await this.prisma.verification.update({
      where: { id },
      data: {
        status: nextStatus,
        nextDueAt: nextDueAt ?? undefined,
        notes: dto.notes ?? v.notes,
        evidenceDocumentId: dto.evidenceDocumentId ?? v.evidenceDocumentId,
        verifiedByUserId: actor.userId,
        verifiedAt
      }
    });

    await this.audit.write({
      organizationId,
      actorUserId: actor.userId,
      actorClerkUserId: actor.clerkUserId,
      action: "VERIFICATION_UPDATED",
      entityType: "Verification",
      entityId: id,
      diffJson: {
        status: updated.status,
        nextDueAt: updated.nextDueAt?.toISOString(),
        evidenceDocumentId: updated.evidenceDocumentId
      }
    });

    await this.ensureAutoTasksForVerification(updated);

    return updated;
  }
}
