export declare enum NoteType {
    INTAKE = "INTAKE",
    PROGRESS = "PROGRESS",
    DISCHARGE = "DISCHARGE",
    ASSESSMENT = "ASSESSMENT",
    TREATMENT = "TREATMENT",
    REFERRAL = "REFERRAL",
    OTHER = "OTHER"
}
export declare enum NoteStatus {
    DRAFT = "DRAFT",
    SIGNED = "SIGNED"
}
export declare class CreateNoteDto {
    noteType: NoteType;
    templateKey?: string;
    contentJson: Record<string, any>;
    narrative?: string;
}
export declare class UpdateNoteDto {
    contentJson?: Record<string, any>;
    narrative?: string;
}
export declare class AddendumDto {
    contentJson: Record<string, any>;
    narrative?: string;
}
