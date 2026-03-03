import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CreateCaseDto, UpdateCaseDto } from "./dto";
export declare class CasesService {
    private prisma;
    private audit;
    constructor(prisma: PrismaService, audit: AuditService);
    create(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, dto: CreateCaseDto): Promise<{
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
    list(organizationId: string, params: {
        status?: string;
        search?: string;
    }): Promise<({
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
    get(organizationId: string, id: string): Promise<{
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
    update(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string, dto: UpdateCaseDto): Promise<{
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
    close(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string): Promise<{
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
