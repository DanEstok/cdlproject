# Architecture

## High-Level
- Monorepo with Next.js apps + NestJS API
- API is the system-of-record; apps are clients
- Storage for documents in S3-compatible object store
- Postgres for relational data
- Redis + BullMQ for jobs (reminders, expirations, webhooks processing)

## Services
### apps/api (NestJS)
Modules:
- AuthModule (Clerk JWT verification + RBAC)
- TenancyModule (org scoping)
- PeopleModule
- CasesModule
- ProgramsModule
- TasksModule
- NotesModule
- DocumentsModule
- VerificationsModule
- BillingModule
- AuditModule
- WebhooksModule (Stripe, DocuSign, Twilio status callbacks)

### apps/staff
- Admin console for staff
- RBAC protected routes
- Data grid views: cases, tasks, verifications, billing

### apps/client
- PWA client portal
- Minimal PHI/sensitive data on screen
- Upload-first UX

### apps/web
- Marketing + intake
- Intake creates Referral record in API

### apps/partner (scaffold)
- Referral submission
- Attestation endpoints later

## Deployment (MVP)
- API: container
- Apps: Next.js on Vercel or containerized
- Postgres + Redis: managed in production; docker-compose in dev

## Events & Jobs
- TaskReminderJob (daily scan for due tasks)
- DocumentExpiryJob (daily scan for expiry)
- StripeWebhookJob (process invoice/payment events)
- NotificationJob (send SMS/email templates)

## Security
- Clerk for auth + session
- API verifies JWT and enforces org scoping for every request
- Audit log always enabled
