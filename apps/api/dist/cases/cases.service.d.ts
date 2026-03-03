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
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
    list(organizationId: string, params: {
        status?: string;
        search?: string;
    }): Promise<({
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
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    })[]>;
    get(organizationId: string, id: string): Promise<{
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
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
    update(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string, dto: UpdateCaseDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
    close(organizationId: string, actor: any, id: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
    setProgram(organizationId: string, caseId: string, programKey: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        status: import("@prisma/client").$Enums.CaseStatus;
        programKey: string;
        openedAt: Date;
        closedAt: Date | null;
        primaryCaseManagerUserId: string | null;
        clientPersonId: string;
    }>;
}
