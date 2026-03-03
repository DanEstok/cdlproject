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
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    }>;
    list(organizationId: string, params: {
        status?: string;
        search?: string;
    }): Promise<({
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
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    })[]>;
    get(organizationId: string, id: string): Promise<{
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
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    }>;
    update(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string, dto: UpdateCaseDto): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    }>;
    close(organizationId: string, actor: any, id: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        notes: string | null;
        primaryCaseManagerUserId: string | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        clientPersonId: string;
    }>;
    setProgram(organizationId: string, caseId: string, programKey: string): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
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
