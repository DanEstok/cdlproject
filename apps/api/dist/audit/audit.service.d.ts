import { PrismaService } from "../prisma/prisma.service";
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    write(params: {
        organizationId: string;
        actorUserId?: string;
        actorClerkUserId?: string;
        action: string;
        entityType: string;
        entityId: string;
        diffJson?: any;
    }): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        actorUserId: string | null;
        actorClerkUserId: string | null;
        action: string;
        entityType: string;
        entityId: string;
        diffJson: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
