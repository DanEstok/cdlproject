import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";
export declare class TasksController {
    private tasks;
    constructor(tasks: TasksService);
    create(req: any, caseId: string, dto: CreateTaskDto): Promise<{
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
    list(req: any, caseId: string, status?: string): Promise<{
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
    my(req: any, status?: string): Promise<{
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
    update(req: any, id: string, dto: UpdateTaskDto): Promise<{
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
    complete(req: any, id: string): Promise<{
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
