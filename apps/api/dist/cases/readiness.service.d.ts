import { PrismaService } from "../prisma/prisma.service";
export declare class ReadinessService {
    private prisma;
    constructor(prisma: PrismaService);
    private ensureCase;
    getCaseReadiness(organizationId: string, caseId: string): Promise<{
        caseId: string;
        percent: number;
        done: number;
        total: number;
        items: {
            key: string;
            label: string;
            ok: boolean;
        }[];
    }>;
}
