# Product Requirements Document (PRD)

## Users and Roles
### Staff Roles
- Admin: manage org settings, users, permissions
- Case Manager: intakes, plans, notes, referrals, client comms
- Compliance Specialist: safety-sensitive checklist verification, renewals
- Workforce Coordinator: training, CDL pipeline, employer placement
- Billing Specialist: invoices, packages, payment status
- Auditor (read-only): compliance review and export

### External Roles
- Client: checklist, uploads, appointments, secure messaging
- Partner: referral submission, attestations, limited status view

## Key Objects (domain)
- Person: client + contacts
- Case: client enrollment instance
- Program Enrollment: CCM / SAP lane / Sober Coaching / DBE pathway
- Task: action item with owner, due date, status
- Note: case note with template fields + sign-off
- Document: uploaded file + metadata + retention tags + links to objects
- Verification: structured record (MVR check, DOT medical, Clearinghouse query)
- Billing: time entries, services, invoices, payments
- Audit Event: immutable log of user actions and data changes

## Functional Requirements
### FR1: Authentication & RBAC
- Staff and external users authenticate via Clerk
- Org-level tenancy: one org contains staff + clients + partners
- Role-based access control
- Sensitive-case flag restricts access to DV-related fields (Phase 2; scaffold now)

### FR2: Intake & Case Creation
- Create Person (client) + Case in one flow
- Intake form stored as structured data
- Generate initial tasks based on program template

### FR3: Case Plans
- Plan template system:
  - program-specific goals/milestones/tasks
  - tasks can be assigned to staff or client
  - milestones can require evidence (documents)

### FR4: Case Notes
- Note templates with required fields (e.g., contact method, summary, next steps)
- Notes can be "draft" then "signed"
- Signed notes are immutable (only addendums)

### FR5: Documents
- Upload from staff or client portal
- Document metadata: type, issue date, expiration date, linked person/case/milestone
- Automatic expiration reminders for expiring documents (DOT medical, IDs)
- Virus scanning hook (Phase 2; stub now)

### FR6: Tasks & Workflows
- Task statuses: TODO, IN_PROGRESS, BLOCKED, DONE, CANCELLED
- Reminders via SMS/email based on due date
- Escalation rules: overdue tasks create supervisor queue item

### FR7: Compliance Verifications (MVP: manual record, evidence upload)
- Verification types:
  - DOT Medical Card
  - MVR Check
  - Clearinghouse Query
- Each verification stores: date, outcome, verifiedBy, evidenceDocumentIds, nextDueDate

### FR8: Billing (MVP)
- Time entry logging per case
- Service catalog (intake fee, packet assembly fee, monthly retainer)
- Stripe invoice creation + payment link
- Payment status sync webhook

### FR9: Audit Logging
- Every create/update/delete emits AuditEvent
- AuditEvent is append-only; never edited
- Minimum fields: actorUserId, action, entityType, entityId, timestamp, diff summary

## Non-Functional Requirements
- Availability: 99.5% target for MVP
- Security: MFA for staff, encryption in transit, least-privilege
- Performance: staff app list views load < 1.5s for 5k cases
- Compliance posture: audit-ready records, immutable signed notes, retention tagging

## Out of Scope (MVP)
- Automated Clearinghouse integration (track manually)
- Full partner portal workflows (scaffold only)
- Embedded BI (Metabase) dashboards
- Native mobile app (PWA only)
