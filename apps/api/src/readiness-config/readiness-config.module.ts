import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { ReadinessConfigController } from "./readiness-config.controller";
import { ReadinessConfigService } from "./readiness-config.service";

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ReadinessConfigController],
  providers: [ReadinessConfigService],
  exports: [ReadinessConfigService]
})
export class ReadinessConfigModule {}
