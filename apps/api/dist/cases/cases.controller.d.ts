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
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
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
        organizationId: string;
        programKey: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.CaseStatus;
        notes: string | null;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
    list(req: any, status?: string, search?: string): Promise<({
        client: {
            id: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
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
        organizationId: string;
        programKey: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.CaseStatus;
        notes: string | null;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    })[]>;
    get(req: any, id: string): Promise<{
        client: {
            id: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
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
            organizationId: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
            caseId: string;
            programType: import("@prisma/client").$Enums.ProgramType;
            startedAt: Date;
            endedAt: Date | null;
        }[];
    } & {
        id: string;
        organizationId: string;
        programKey: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.CaseStatus;
        notes: string | null;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
    update(req: any, id: string, dto: UpdateCaseDto): Promise<{
        id: string;
        organizationId: string;
        programKey: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.CaseStatus;
        notes: string | null;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
    readinessForCase(req: any, id: string): Promise<{
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
    setProgram(req: any, id: string, body: {
        programKey: string;
    }): Promise<{
        id: string;
        organizationId: string;
        programKey: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.CaseStatus;
        notes: string | null;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
    close(req: any, id: string): Promise<{
        id: string;
        organizationId: string;
        programKey: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.CaseStatus;
        notes: string | null;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
}
