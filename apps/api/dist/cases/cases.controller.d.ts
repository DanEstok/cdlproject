import { CasesService } from "./cases.service";
import { ReadinessService } from "./readiness.service";
import { CreateCaseDto, UpdateCaseDto } from "./dto";
export declare class CasesController {
    private cases;
    private readiness;
    constructor(cases: CasesService, readiness: ReadinessService);
    create(req: any, dto: CreateCaseDto): Promise<{
        client: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            type: import("@prisma/client").$Enums.PersonType;
            firstName: string;
            lastName: string;
            phone: string | null;
            email: string | null;
            dob: Date | null;
            address1: string | null;
            address2: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    }>;
    list(req: any, status?: string, search?: string): Promise<({
        client: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            type: import("@prisma/client").$Enums.PersonType;
            firstName: string;
            lastName: string;
            phone: string | null;
            email: string | null;
            dob: Date | null;
            address1: string | null;
            address2: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    })[]>;
    get(req: any, id: string): Promise<{
        client: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            organizationId: string;
            type: import("@prisma/client").$Enums.PersonType;
            firstName: string;
            lastName: string;
            phone: string | null;
            email: string | null;
            dob: Date | null;
            address1: string | null;
            address2: string | null;
            city: string | null;
            state: string | null;
            postalCode: string | null;
        };
        enrollments: {
            id: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
            organizationId: string;
            caseId: string;
            programType: import("@prisma/client").$Enums.ProgramType;
            startedAt: Date;
            endedAt: Date | null;
        }[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    }>;
    update(req: any, id: string, dto: UpdateCaseDto): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    }>;
    readinessForCase(req: any, id: string): Promise<{
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
    close(req: any, id: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    }>;
}
