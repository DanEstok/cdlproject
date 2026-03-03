import { PrismaService } from "../prisma/prisma.service";
export declare class ReadinessConfigService {
    private prisma;
    constructor(prisma: PrismaService);
    ensureDefaults(organizationId: string): Promise<{
        created: number;
        skipped: boolean;
    }>;
    listPrograms(organizationId: string): Promise<{
        programKeys: string[];
    }>;
    getRequirements(organizationId: string, programKey: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        programKey: string;
        kind: import("@prisma/client").$Enums.ReadinessRequirementKind;
        label: string;
        weight: number;
        enabled: boolean;
        docType: string | null;
        verificationType: string | null;
    }[]>;
    replaceRequirements(organizationId: string, programKey: string, items: any[]): Promise<{
        inserted: number;
    }>;
}
