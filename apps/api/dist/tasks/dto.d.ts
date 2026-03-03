export declare enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    CANCELLED = "CANCELLED"
}
export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueAt?: string;
    assignedToUserId?: string;
    assignedToPersonId?: string;
}
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueAt?: string;
    assignedToUserId?: string;
    assignedToPersonId?: string;
}
