import { NotesService } from "./notes.service";
import { AddendumDto, CreateNoteDto, UpdateNoteDto } from "./dto";
export declare class NotesController {
    private notes;
    constructor(notes: NotesService);
    create(req: any, caseId: string, dto: CreateNoteDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.NoteStatus;
        caseId: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        signedAt: Date | null;
    }>;
    list(req: any, caseId: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.NoteStatus;
        caseId: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        signedAt: Date | null;
    }[]>;
    update(req: any, id: string, dto: UpdateNoteDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.NoteStatus;
        caseId: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        signedAt: Date | null;
    }>;
    sign(req: any, id: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.NoteStatus;
        caseId: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        signedAt: Date | null;
    }>;
    addendum(req: any, id: string, dto: AddendumDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.NoteStatus;
        caseId: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        signedAt: Date | null;
    }>;
}
