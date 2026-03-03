import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
export declare class JobsService implements OnModuleInit {
    private prisma;
    private connection;
    private queue;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    private runDocumentExpiryScan;
}
