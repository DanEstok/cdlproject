import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { AuditModule } from "./audit/audit.module";
import { PeopleModule } from "./people/people.module";
import { CasesModule } from "./cases/cases.module";
import { DocumentsModule } from "./documents/documents.module";
import { TasksModule } from "./tasks/tasks.module";
import { NotesModule } from "./notes/notes.module";
import { JobsModule } from "./jobs/jobs.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AuditModule,
    PeopleModule,
    CasesModule,
    DocumentsModule,
    TasksModule,
    NotesModule,
    JobsModule,
  ],
  controllers: [HealthController]
})
export class AppModule {}
