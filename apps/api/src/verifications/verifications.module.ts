import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { AuditModule } from "../audit/audit.module";
import { VerificationsController } from "./verifications.controller";
import { VerificationsService } from "./verifications.service";
import { TasksModule } from "../tasks/tasks.module";

@Module({
  imports: [PrismaModule, AuthModule, AuditModule, TasksModule],
  controllers: [VerificationsController],
  providers: [VerificationsService]
})
export class VerificationsModule {}
