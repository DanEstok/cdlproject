import { OnModuleInit } from "@nestjs/common";
import { Queue } from "bullmq";
export declare class JobsService implements OnModuleInit {
    private connection;
    taskQueue: Queue<any, any, string>;
    onModuleInit(): Promise<void>;
}
