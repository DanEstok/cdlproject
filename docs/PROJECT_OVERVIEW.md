# Project Overview: Recovery + Re-entry + Workforce + Compliance Platform

## Mission
Build a custom platform that unifies:
1) Trauma-informed case management (CCM-aligned workflows)
2) Safety-sensitive workforce re-entry compliance (SAP lane)
3) Second-chance trucking ownership pathway with DBE packet support (Apache Driven model)
4) Billing and reporting to support grant and contract compliance

## Core Products
- Public Website (marketing + intake entry points)
- Staff App (Operations Console)
- Client App (PWA portal)
- Partner App (referrals + attestations; scaffold now, ship later)
- API + Database + Document storage + Workflow engine

## MVP Scope (Phase 1)
- Staff App:
  - Create client + case + program enrollment
  - Intake forms (structured)
  - Case plan templates (goals, milestones, tasks)
  - Case notes + note templates + sign-off
  - Document upload + metadata + linking to milestones
  - Task queues + due dates + reminders (jobs)
  - Basic compliance checklist (DOT medical, MVR, Clearinghouse status as manual verifications)
  - Basic billing: time entries + invoice generation via Stripe
- Client App:
  - Login + profile
  - Checklist view (tasks assigned to client)
  - Document upload
  - Appointment list (integrated with scheduling tool)
  - SMS reminders (no sensitive info)
- Website:
  - Program pages
  - Referral/Intake forms that create Lead/Referral records
- API:
  - Auth integration
  - CRUD for People/Cases/Tasks/Notes/Documents/Billing
  - Workflow jobs (reminders, escalations)
  - Audit event logging (append-only)

## Phase 2+
- Structured CDL pipeline + DBE packet builder + partner portal + analytics dashboards.
