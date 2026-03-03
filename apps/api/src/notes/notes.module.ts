import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "../auth/auth.module";
import { AuditModule } from "../audit/audit.module";
import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";

@Module({
  imports: [PrismaModule, AuthModule, AuditModule],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
