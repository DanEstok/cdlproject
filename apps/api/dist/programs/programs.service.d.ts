import { PrismaService } from "../prisma/prisma.service";
export declare class ProgramsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(organizationId: string): Promise<{
        id: string;
        organizationId: string;
        programKey: string;
        displayName: string;
        description: string | null;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(organizationId: string, body: {
        programKey: string;
        displayName: string;
        description?: string;
    }): Promise<{
        id: string;
        organizationId: string;
        programKey: string;
        displayName: string;
        description: string | null;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(organizationId: string, programKey: string, body: {
        displayName?: string;
        description?: string;
        enabled?: boolean;
    }): Promise<{
        id: string;
        organizationId: string;
        programKey: string;
        displayName: string;
        description: string | null;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    clone(organizationId: string, fromProgramKey: string, to: {
        programKey: string;
        displayName: string;
        description?: string;
    }): Promise<{
        cloned: number;
    }>;
}
