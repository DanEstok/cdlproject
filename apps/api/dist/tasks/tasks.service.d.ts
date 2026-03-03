import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";
export declare class TasksService {
    private prisma;
    private audit;
    constructor(prisma: PrismaService, audit: AuditService);
    private ensureCase;
    create(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, caseId: string, dto: CreateTaskDto): Promise<{
        id: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }>;
    list(organizationId: string, caseId: string, params: {
        status?: string;
    }): Promise<{
        id: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }[]>;
    myTasks(organizationId: string, userId: string, params: {
        status?: string;
    }): Promise<{
        id: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }[]>;
    get(organizationId: string, id: string): Promise<{
        id: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }>;
    update(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string, dto: UpdateTaskDto): Promise<{
        id: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }>;
    complete(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string): Promise<{
        id: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        status: import("@prisma/client").$Enums.TaskStatus;
        dueAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }>;
}
