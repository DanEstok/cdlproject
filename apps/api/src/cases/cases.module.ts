import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { AuditModule } from "../audit/audit.module";
import { CasesController } from "./cases.controller";
import { CasesService } from "./cases.service";

@Module({
  imports: [PrismaModule, AuthModule, AuditModule],
  controllers: [CasesController],
  providers: [CasesService]
})
export class CasesModule {}
