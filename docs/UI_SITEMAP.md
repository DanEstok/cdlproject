# UI Sitemap + Screen Specs (MVP)

## apps/web (Public)
- /
- /programs
- /programs/ccm
- /programs/sap
- /programs/sober-coaching
- /programs/dbe-pathway
- /partners
- /resources
- /intake (form)
- /referral (partner referral form)
- /privacy
- /terms

Intake/referral submission:
- creates Referral record (MVP can map to Case creation queue)

## apps/staff (Operations Console)
Navigation:
- Dashboard
- Cases
- Tasks
- Documents
- Verifications
- Billing
- People
- Settings (Admin)

Screens:
1) Dashboard
- open cases count, overdue tasks, expiring docs, unpaid invoices

2) Cases List
- filters: status, program type, assigned staff, search
- columns: client, status, next task due, program badges

3) Case Detail (tabs)
- Overview: demographics, enrollments, quick status
- Plan: goals/milestones/tasks
- Tasks: list + create
- Notes: list + create + sign
- Documents: upload + link + expiry
- Verifications: DOT/MVR/Clearinghouse records
- Billing: time entries + invoices

4) Task Queue
- "My Tasks" + "Overdue" + "Unassigned"

5) Billing
- time entry review
- invoice creation wizard
- stripe invoice links + status

## apps/client (Client Portal - PWA)
- /login
- /home (checklist + next appointment)
- /tasks
- /documents (upload + status)
- /appointments
- /messages (Phase 2)
- /profile

## apps/partner (Scaffold)
- /login
- /referrals/new
- /referrals (submitted list)
- /attestations (Phase 2)
