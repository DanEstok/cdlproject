# Workflows (Jobs + Rules)

## Workflow Engine (MVP)
BullMQ jobs executed by API.

## WF1: Task Reminders
Runs daily at 9am org-local time.
- Find tasks due in 48h and 24h -> send reminder
- Find tasks overdue -> send escalation email to assigned staff + add "OVERDUE" label

## WF2: Document Expiry
Runs daily at 9am.
- Find documents with expiresAt in 30/14/7 days -> notify assigned case manager + client (if client-safe)
- Create automatic renewal task

## WF3: Verification Renewal
When verification.nextDueAt approaches:
- Create task: "Renew DOT Medical" etc.
- Require evidence upload to mark complete

## WF4: Stripe Webhooks
On invoice.paid:
- Mark invoice PAID
- Write AuditEvent
- Notify billing user

## WF5: Intake from Website
When referral submitted:
- Create Lead record (MVP: store as Person + placeholder Case in UNASSIGNED queue)
- Notify Admin queue
