# Roadmap + Build Order

## Sprint 0 (Repo + Foundations)
- monorepo scaffolding
- shared UI package + tailwind config
- API NestJS skeleton + Prisma + Postgres
- Clerk auth wiring end-to-end

## Sprint 1 (Core Case Management)
- People + Case CRUD
- Case Detail page with tabs
- Tasks CRUD
- Notes CRUD + sign-off immutability
- Audit log on mutations

## Sprint 2 (Documents + Reminders)
- Presigned upload + complete flow
- Document listing + linking to case/person
- Expiry tracking
- BullMQ jobs: due reminders + expiry reminders
- Twilio SMS integration for reminders

## Sprint 3 (Verifications + Billing MVP)
- Verifications CRUD (DOT/MVR/Clearinghouse manual)
- Time entries
- Stripe invoice creation + webhooks

## Sprint 4 (Client Portal MVP)
- Client checklist + upload
- Appointment list scaffolding
- PWA install support

## Sprint 5 (Website intake)
- Public site + referral form -> Lead queue
