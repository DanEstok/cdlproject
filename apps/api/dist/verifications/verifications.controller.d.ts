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
        type: import("@prisma/client").$Enums.VerificationType;
        status: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        nextDueAt: Date | null;
        verifiedByUserId: string | null;
        notes: string | null;
        evidenceDocumentId: string | null;
        caseId: string;
    }>;
    list(req: any, caseId: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.VerificationType;
        status: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        nextDueAt: Date | null;
        verifiedByUserId: string | null;
        notes: string | null;
        evidenceDocumentId: string | null;
        caseId: string;
    }[]>;
    update(req: any, id: string, dto: UpdateVerificationDto): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.VerificationType;
        status: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        nextDueAt: Date | null;
        verifiedByUserId: string | null;
        notes: string | null;
        evidenceDocumentId: string | null;
        caseId: string;
    }>;
    completeFromEvidence(req: any, id: string): Promise<{
        id: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.VerificationType;
        status: import("@prisma/client").$Enums.VerificationStatus;
        verifiedAt: Date | null;
        nextDueAt: Date | null;
        verifiedByUserId: string | null;
        notes: string | null;
        evidenceDocumentId: string | null;
        caseId: string;
    }>;
}
