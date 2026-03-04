import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ProvisionAuthGuard } from "./provision-auth.guard";
import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";

/**
 * Purpose:
 * - When a staff user logs in for the first time, create:
 *   - Organization (if none exists for this clerkUserId)
 *   - User record mapped to clerkUserId
 *
 * Strategy:
 * - If user exists: return it
 * - Else: create new org + user
 *
 * Note:
 * - This is MVP-friendly. Later you can add invitation flows and org membership management.
 */
@Controller("auth")
export class ProvisionController {
  constructor(private prisma: PrismaService, private audit: AuditService) {}

  @Post("provision")
  @UseGuards(ProvisionAuthGuard)
  async provision(@Req() req: any) {
    const clerkUserId = req.user?.clerkUserId as string;
    if (!clerkUserId) throw new Error("Missing clerkUserId");

    // If already provisioned, return user.
    const existing = await this.prisma.user.findUnique({ where: { clerkUserId } });
    if (existing) {
      return { provisioned: true, user: existing };
    }

    // Create new org + user. Org name can be updated later in settings.
    const org = await this.prisma.organization.create({
      data: { name: `Org for ${clerkUserId.slice(0, 8)}` }
    });

    const user = await this.prisma.user.create({
      data: {
        organizationId: org.id,
        clerkUserId,
        role: "ADMIN"
      }
    });

    await this.audit.write({
      organizationId: org.id,
      actorUserId: user.id,
      actorClerkUserId: clerkUserId,
      action: "USER_PROVISIONED",
      entityType: "User",
      entityId: user.id,
      diffJson: { organizationId: org.id, role: user.role }
    });

    return { provisioned: true, user, organization: org };
  }
}
