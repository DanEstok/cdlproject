import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { ProvisionAuthGuard } from "./provision-auth.guard";
import { PrismaModule } from "../prisma/prisma.module";
import { AuditModule } from "../audit/audit.module";
import { ProvisionController } from "./provision.controller";

@Module({
  imports: [PrismaModule, AuditModule],
  providers: [AuthService, AuthGuard, ProvisionAuthGuard],
  exports: [AuthService, AuthGuard, ProvisionAuthGuard],
  controllers: [ProvisionController]
})
export class AuthModule {}
