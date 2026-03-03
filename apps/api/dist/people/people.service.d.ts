import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CreatePersonDto, UpdatePersonDto } from "./dto";
export declare class PeopleService {
    private prisma;
    private audit;
    constructor(prisma: PrismaService, audit: AuditService);
    create(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, dto: CreatePersonDto): Promise<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }>;
    list(organizationId: string, params: {
        type?: string;
        search?: string;
    }): Promise<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }[]>;
    get(organizationId: string, id: string): Promise<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }>;
    update(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string, dto: UpdatePersonDto): Promise<{
        id: string;
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
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
    }>;
}
