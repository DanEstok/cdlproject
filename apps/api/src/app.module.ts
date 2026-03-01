import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PeopleModule } from './modules/people/people.module';
import { CasesModule } from './modules/cases/cases.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { NotesModule } from './modules/notes/notes.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { VerificationsModule } from './modules/verifications/verifications.module';
import { BillingModule } from './modules/billing/billing.module';
import { AuditModule } from './modules/audit/audit.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    PrismaModule,
    AuthModule,
    PeopleModule,
    CasesModule,
    TasksModule,
    NotesModule,
    DocumentsModule,
    VerificationsModule,
    BillingModule,
    AuditModule,
    WebhooksModule,
  ],
})
export class AppModule {}
