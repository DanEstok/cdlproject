import { NotesService } from "./notes.service";
import { AddendumDto, CreateNoteDto, UpdateNoteDto } from "./dto";
export declare class NotesController {
    private notes;
    constructor(notes: NotesService);
    create(req: any, caseId: string, dto: CreateNoteDto): Promise<{
        id: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        status: import("@prisma/client").$Enums.NoteStatus;
        signedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }>;
    list(req: any, caseId: string): Promise<{
        id: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        status: import("@prisma/client").$Enums.NoteStatus;
        signedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }[]>;
    update(req: any, id: string, dto: UpdateNoteDto): Promise<{
        id: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        status: import("@prisma/client").$Enums.NoteStatus;
        signedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }>;
    sign(req: any, id: string): Promise<{
        id: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        status: import("@prisma/client").$Enums.NoteStatus;
        signedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }>;
    addendum(req: any, id: string, dto: AddendumDto): Promise<{
        id: string;
        authorUserId: string;
        noteType: import("@prisma/client").$Enums.NoteType;
        templateKey: string | null;
        contentJson: import("@prisma/client/runtime/library").JsonValue;
        narrative: string | null;
        status: import("@prisma/client").$Enums.NoteStatus;
        signedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        organizationId: string;
        caseId: string;
    }>;
}
