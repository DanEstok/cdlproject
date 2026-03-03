import { Injectable, OnModuleInit } from "@nestjs/common";
import { Queue } from "bullmq";
import IORedis from "ioredis";

@Injectable()
export class JobsService implements OnModuleInit {
  private connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379");
  taskQueue = new Queue("tasks", { connection: this.connection });

  async onModuleInit() {
    // In MVP, just ensure queue initializes.
  }
}
