import { PrismaService } from "../prisma/prisma.service";
import { AuditService } from "../audit/audit.service";
import { CreateVerificationDto, UpdateVerificationDto } from "./dto";
export declare class VerificationsService {
    private prisma;
    private audit;
    constructor(prisma: PrismaService, audit: AuditService);
    private ensureCase;
    private normalizeStatus;
    private ensureAutoTasksForVerification;
    create(organizationId: string, actor: any, caseId: string, dto: CreateVerificationDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        type: import("@prisma/client").$Enums.VerificationType;
        status: import("@prisma/client").$Enums.VerificationStatus;
        caseId: string;
        verifiedAt: Date | null;
        nextDueAt: Date | null;
        verifiedByUserId: string | null;
        evidenceDocumentId: string | null;
    }>;
    list(organizationId: string, caseId: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        type: import("@prisma/client").$Enums.VerificationType;
        status: import("@prisma/client").$Enums.VerificationStatus;
        caseId: string;
        verifiedAt: Date | null;
        nextDueAt: Date | null;
        verifiedByUserId: string | null;
        evidenceDocumentId: string | null;
    }[]>;
    update(organizationId: string, actor: any, id: string, dto: UpdateVerificationDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        type: import("@prisma/client").$Enums.VerificationType;
        status: import("@prisma/client").$Enums.VerificationStatus;
        caseId: string;
        verifiedAt: Date | null;
        nextDueAt: Date | null;
        verifiedByUserId: string | null;
        evidenceDocumentId: string | null;
    }>;
    completeFromEvidence(organizationId: string, actor: any, id: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        type: import("@prisma/client").$Enums.VerificationType;
        status: import("@prisma/client").$Enums.VerificationStatus;
        caseId: string;
        verifiedAt: Date | null;
        nextDueAt: Date | null;
        verifiedByUserId: string | null;
        evidenceDocumentId: string | null;
    }>;
}
