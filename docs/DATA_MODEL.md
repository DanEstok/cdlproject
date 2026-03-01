# Data Model (Prisma-first)

## Tenancy
- Organization: root boundary
- All entities include organizationId

## Tables (MVP)
### Organization
- id (uuid)
- name
- createdAt

### User (internal projection; auth comes from Clerk)
- id (uuid)
- organizationId
- clerkUserId (string)
- role (enum: ADMIN, CASE_MANAGER, COMPLIANCE, WORKFORCE, BILLING, AUDITOR)
- isActive

### Person
- id
- organizationId
- type (enum: CLIENT, CONTACT, PARTNER_CONTACT)
- firstName, lastName
- phone, email
- dob (nullable; sensitive)
- address fields (nullable)
- createdAt, updatedAt

### Case
- id
- organizationId
- clientPersonId (FK Person)
- status (enum: OPEN, PAUSED, CLOSED)
- openedAt, closedAt
- primaryCaseManagerUserId (FK User nullable)
- notes (internal quick summary)
- createdAt, updatedAt

### ProgramEnrollment
- id
- organizationId
- caseId
- programType (enum: CCM, SOBER_COACHING, SAP, DBE_PATHWAY)
- status (enum: ACTIVE, COMPLETED, DROPPED)
- startedAt, endedAt

### Task
- id
- organizationId
- caseId
- assignedToUserId (nullable)
- assignedToPersonId (nullable) # for client-facing tasks
- title
- description
- status (TODO/IN_PROGRESS/BLOCKED/DONE/CANCELLED)
- dueAt (nullable)
- completedAt (nullable)
- createdAt, updatedAt

### Note
- id
- organizationId
- caseId
- authorUserId
- noteType (enum: CASE_NOTE, COACHING_NOTE, COMPLIANCE_NOTE)
- templateKey (string nullable)
- contentJson (jsonb) # structured fields
- narrative (text nullable) # human readable
- status (enum: DRAFT, SIGNED)
- signedAt (nullable)
- createdAt, updatedAt

### Document
- id
- organizationId
- caseId (nullable)
- personId (nullable)
- uploadedByUserId (nullable)
- uploadedByPersonId (nullable)
- fileName
- mimeType
- storageKey
- sizeBytes
- docType (enum: ID, DOT_MEDICAL, MVR, CLEARINGHOUSE, COURT, HOUSING, EMPLOYMENT, OTHER)
- issueDate (nullable)
- expiresAt (nullable)
- createdAt

### Verification
- id
- organizationId
- caseId
- type (enum: DOT_MEDICAL, MVR, CLEARINGHOUSE)
- status (enum: PENDING, PASSED, FAILED, UNKNOWN)
- verifiedAt (nullable)
- nextDueAt (nullable)
- verifiedByUserId (nullable)
- notes (nullable)
- evidenceDocumentId (nullable)

### TimeEntry
- id
- organizationId
- caseId
- userId
- minutes
- workType (enum: INTAKE, CASE_MGMT, COMPLIANCE, WORKFORCE, ADMIN_MODULES)
- performedAt
- notes (nullable)

### Invoice
- id
- organizationId
- caseId (nullable)
- clientPersonId (nullable)
- stripeInvoiceId (string)
- status (enum: DRAFT, OPEN, PAID, VOID, UNCOLLECTIBLE)
- amountCents
- currency
- hostedInvoiceUrl (nullable)
- createdAt, updatedAt

### AuditEvent (append-only)
- id
- organizationId
- actorUserId (nullable)
- actorClerkUserId (nullable)
- action (string) # e.g. "CASE_CREATED"
- entityType (string)
- entityId (string)
- diffJson (jsonb nullable)
- createdAt

## Indexing Notes
- Composite indexes on (organizationId, createdAt)
- Case: (organizationId, status)
- Task: (organizationId, status, dueAt)
- Document: (organizationId, expiresAt)
