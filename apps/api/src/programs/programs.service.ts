import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

function isValidProgramKey(k: string) {
  // strict-ish: uppercase, digits, underscores
  return /^[A-Z0-9_]{3,64}$/.test(k);
}

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async list(organizationId: string) {
    const rows = await this.prisma.programConfig.findMany({
      where: { organizationId },
      orderBy: [{ enabled: "desc" }, { displayName: "asc" }]
    });

    // If no program configs exist yet, infer from ReadinessRequirement programKeys
    if (rows.length === 0) {
      const inferred = await this.prisma.readinessRequirement.findMany({
        where: { organizationId },
        select: { programKey: true },
        distinct: ["programKey"]
      });

      // Create minimal configs for inferred keys
      if (inferred.length) {
        await this.prisma.programConfig.createMany({
          data: inferred.map((r) => ({
            organizationId,
            programKey: r.programKey,
            displayName: r.programKey,
            enabled: true
          }))
        });

        return this.prisma.programConfig.findMany({
          where: { organizationId },
          orderBy: [{ enabled: "desc" }, { displayName: "asc" }]
        });
      }
    }

    return rows;
  }

  async create(organizationId: string, body: { programKey: string; displayName: string; description?: string }) {
    const programKey = (body.programKey || "").trim().toUpperCase();
    if (!isValidProgramKey(programKey)) throw new BadRequestException("Invalid programKey format.");

    const displayName = (body.displayName || "").trim();
    if (!displayName) throw new BadRequestException("displayName required.");

    return this.prisma.programConfig.create({
      data: {
        organizationId,
        programKey,
        displayName,
        description: body.description?.trim() || null,
        enabled: true
      }
    });
  }

  async update(organizationId: string, programKey: string, body: { displayName?: string; description?: string; enabled?: boolean }) {
    const key = programKey.toUpperCase();
    const existing = await this.prisma.programConfig.findUnique({
      where: { organizationId_programKey: { organizationId, programKey: key } }
    });
    if (!existing) throw new BadRequestException("Program not found.");

    return this.prisma.programConfig.update({
      where: { organizationId_programKey: { organizationId, programKey: key } },
      data: {
        displayName: body.displayName !== undefined ? body.displayName.trim() : existing.displayName,
        description: body.description !== undefined ? (body.description.trim() || null) : existing.description,
        enabled: body.enabled !== undefined ? body.enabled : existing.enabled
      }
    });
  }

  async clone(
    organizationId: string,
    fromProgramKey: string,
    to: { programKey: string; displayName: string; description?: string }
  ) {
    const fromKey = fromProgramKey.toUpperCase();
    const toKey = (to.programKey || "").trim().toUpperCase();
    if (!isValidProgramKey(toKey)) throw new BadRequestException("Invalid destination programKey.");
    if (!to.displayName?.trim()) throw new BadRequestException("Destination displayName required.");

    const fromReqs = await this.prisma.readinessRequirement.findMany({
      where: { organizationId, programKey: fromKey }
    });

    await this.prisma.programConfig.create({
      data: {
        organizationId,
        programKey: toKey,
        displayName: to.displayName.trim(),
        description: to.description?.trim() || null,
        enabled: true
      }
    });

    if (fromReqs.length) {
      await this.prisma.readinessRequirement.createMany({
        data: fromReqs.map((r) => ({
          organizationId,
          programKey: toKey,
          kind: r.kind,
          label: r.label,
          weight: r.weight,
          enabled: r.enabled,
          docType: r.docType,
          verificationType: r.verificationType
        }))
      });
    }

    return { cloned: fromReqs.length };
  }
}
