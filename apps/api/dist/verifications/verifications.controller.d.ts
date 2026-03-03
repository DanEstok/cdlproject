import { VerificationsService } from "./verifications.service";
import { CreateVerificationDto, UpdateVerificationDto } from "./dto";
export declare class VerificationsController {
    private verifs;
    constructor(verifs: VerificationsService);
    create(req: any, caseId: string, dto: CreateVerificationDto): Promise<{
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
    list(req: any, caseId: string): Promise<{
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
    update(req: any, id: string, dto: UpdateVerificationDto): Promise<{
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
    completeFromEvidence(req: any, id: string): Promise<{
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
