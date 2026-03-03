import { PrismaService } from "../prisma/prisma.service";
export declare class ReadinessService {
    private prisma;
    constructor(prisma: PrismaService);
    private ensureCase;
    getCaseReadiness(organizationId: string, caseId: string): Promise<{
        caseId: string;
        programKey: string;
        percent: number;
        doneWeight: number;
        totalWeight: number;
        items: {
            id: string;
            key: string;
            label: string;
            kind: import("@prisma/client").$Enums.ReadinessRequirementKind;
            weight: number;
            ok: boolean;
        }[];
    }>;
}
