import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
export declare class ProvisionController {
    private prisma;
    private audit;
    constructor(prisma: PrismaService, audit: AuditService);
    provision(req: any): Promise<{
        provisioned: boolean;
        user: {
            id: string;
            clerkUserId: string;
            organizationId: string;
            role: import("@prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        organization?: undefined;
    } | {
        provisioned: boolean;
        user: {
            id: string;
            clerkUserId: string;
            organizationId: string;
            role: import("@prisma/client").$Enums.UserRole;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        organization: {
            id: string;
            createdAt: Date;
            name: string;
        };
    }>;
}
