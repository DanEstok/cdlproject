import { ProgramsService } from "./programs.service";
export declare class ProgramsController {
    private programs;
    constructor(programs: ProgramsService);
    list(req: any): Promise<{
        id: string;
        organizationId: string;
        programKey: string;
        displayName: string;
        description: string | null;
        enabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(req: any, body: {
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
    update(req: any, programKey: string, body: {
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
    clone(req: any, programKey: string, body: {
        programKey: string;
        displayName: string;
        description?: string;
    }): Promise<{
        cloned: number;
    }>;
}
