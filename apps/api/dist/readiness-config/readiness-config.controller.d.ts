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
        kind: import("@prisma/client").$Enums.ReadinessRequirementKind;
        label: string;
        weight: number;
        enabled: boolean;
        docType: string | null;
        verificationType: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    replaceReqs(req: any, programKey: string, body: {
        items: any[];
    }): Promise<{
        inserted: number;
    }>;
}
