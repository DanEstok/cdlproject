export declare class CreateCaseDto {
    clientPersonId: string;
    notes?: string;
}
export declare class UpdateCaseDto {
    notes?: string;
    status?: "OPEN" | "PAUSED" | "CLOSED";
}
