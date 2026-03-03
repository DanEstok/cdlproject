import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async write(params: {
    organizationId: string;
    actorUserId?: string;
    actorClerkUserId?: string;
    action: string;
    entityType: string;
    entityId: string;
    diffJson?: any;
  }) {
    return this.prisma.auditEvent.create({
      data: {
        organizationId: params.organizationId,
        actorUserId: params.actorUserId,
        actorClerkUserId: params.actorClerkUserId,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        diffJson: params.diffJson ?? undefined
      }
    });
  }
}
