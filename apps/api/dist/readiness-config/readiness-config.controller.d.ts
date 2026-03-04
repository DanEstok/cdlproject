import { ReadinessConfigService } from "./readiness-config.service";
export declare class ReadinessConfigController {
    private cfg;
    constructor(cfg: ReadinessConfigService);
    ensureDefaults(req: any): Promise<{
        created: number;
        skipped: boolean;
    }>;
    listPrograms(req: any): Promise<{
        programKeys: string[];
    }>;
    getReqs(req: any, programKey: string): Promise<{
        id: string;
        organizationId: string;
        programKey: string;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
        kind: import("@prisma/client").$Enums.ReadinessRequirementKind;
        label: string;
        weight: number;
        docType: string | null;
        verificationType: string | null;
    }[]>;
    replaceReqs(req: any, programKey: string, body: {
        items: any[];
    }): Promise<{
        inserted: number;
    }>;
}
