import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { AuditModule } from "../audit/audit.module";
import { PeopleController } from "./people.controller";
import { PeopleService } from "./people.service";

@Module({
  imports: [PrismaModule, AuthModule, AuditModule],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule {}
