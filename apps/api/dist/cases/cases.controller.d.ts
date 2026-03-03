import { CasesService } from "./cases.service";
import { CreateCaseDto, UpdateCaseDto } from "./dto";
export declare class CasesController {
    private cases;
    constructor(cases: CasesService);
    create(req: any, dto: CreateCaseDto): Promise<{
        client: {
            id: string;
            createdAt: Date;
            organizationId: string;
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
        createdAt: Date;
        organizationId: string;
        clientPersonId: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        updatedAt: Date;
    }>;
    list(req: any, status?: string, search?: string): Promise<({
        client: {
            id: string;
            createdAt: Date;
            organizationId: string;
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
        createdAt: Date;
        organizationId: string;
        clientPersonId: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        updatedAt: Date;
    })[]>;
    get(req: any, id: string): Promise<{
        client: {
            id: string;
            createdAt: Date;
            organizationId: string;
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
            caseId: string;
            status: import("@prisma/client").$Enums.EnrollmentStatus;
            programType: import("@prisma/client").$Enums.ProgramType;
            startedAt: Date;
            endedAt: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        organizationId: string;
        clientPersonId: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        updatedAt: Date;
    }>;
    update(req: any, id: string, dto: UpdateCaseDto): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        clientPersonId: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        updatedAt: Date;
    }>;
    close(req: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        clientPersonId: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        updatedAt: Date;
    }>;
}
