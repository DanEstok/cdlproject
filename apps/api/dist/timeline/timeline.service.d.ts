import { PrismaService } from "../prisma/prisma.service";
export type TimelineItem = {
    at: string;
    kind: "TASK" | "NOTE" | "DOCUMENT" | "VERIFICATION" | "AUDIT";
    title: string;
    subtitle?: string;
    refId: string;
};
export declare class TimelineService {
    private prisma;
    constructor(prisma: PrismaService);
    private ensureCase;
    caseTimeline(organizationId: string, caseId: string): Promise<TimelineItem[]>;
}
