import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { AddendumDto, CreateNoteDto, UpdateNoteDto } from "./dto";
export declare class NotesService {
    private prisma;
    private audit;
    constructor(prisma: PrismaService, audit: AuditService);
    private ensureCase;
    create(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, caseId: string, dto: CreateNoteDto): Promise<{
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
    list(organizationId: string, caseId: string): Promise<{
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
    get(organizationId: string, id: string): Promise<{
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
    update(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
        role: string;
    }, id: string, dto: UpdateNoteDto): Promise<{
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
    sign(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
        role: string;
    }, id: string): Promise<{
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
    addendum(organizationId: string, actor: {
        userId: string;
        clerkUserId: string;
    }, id: string, dto: AddendumDto): Promise<{
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
