import { TasksService } from "./tasks.service";
import { CreateTaskDto, UpdateTaskDto } from "./dto";
export declare class TasksController {
    private tasks;
    constructor(tasks: TasksService);
    create(req: any, caseId: string, dto: CreateTaskDto): Promise<{
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
    list(req: any, caseId: string, status?: string): Promise<{
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
    my(req: any, status?: string): Promise<{
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
    update(req: any, id: string, dto: UpdateTaskDto): Promise<{
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
    complete(req: any, id: string): Promise<{
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
