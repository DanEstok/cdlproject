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
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TaskStatus;
        caseId: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        dueAt: Date | null;
        completedAt: Date | null;
    }>;
    list(organizationId: string, caseId: string, params: {
        status?: string;
    }): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TaskStatus;
        caseId: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        dueAt: Date | null;
        completedAt: Date | null;
    }[]>;
    myTasks(organizationId: string, userId: string, params: {
        status?: string;
    }): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TaskStatus;
        caseId: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        dueAt: Date | null;
        completedAt: Date | null;
    }[]>;
    get(organizationId: string, id: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TaskStatus;
        caseId: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        dueAt: Date | null;
        completedAt: Date | null;
    }>;
    update(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string, dto: UpdateTaskDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TaskStatus;
        caseId: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        dueAt: Date | null;
        completedAt: Date | null;
    }>;
    complete(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.TaskStatus;
        caseId: string;
        assignedToUserId: string | null;
        assignedToPersonId: string | null;
        title: string;
        description: string | null;
        dueAt: Date | null;
        completedAt: Date | null;
    }>;
}
