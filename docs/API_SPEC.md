# API Spec (REST, MVP)

Base URL: /api/v1
Auth: Clerk JWT in Authorization: Bearer <token>
All requests scoped by organizationId derived from JWT + internal user mapping.

## Conventions
- Pagination: ?limit=50&cursor=<id>
- Standard response envelope:
  { "data": ..., "meta": { ... } }

## Endpoints

### Health
GET /health

### People
POST /people
GET /people?type=CLIENT&search=...
GET /people/:id
PATCH /people/:id

### Cases
POST /cases
GET /cases?status=OPEN&search=...
GET /cases/:id
PATCH /cases/:id
POST /cases/:id/close

### Program Enrollments
POST /cases/:id/enrollments
GET /cases/:id/enrollments

### Tasks
POST /cases/:id/tasks
GET /cases/:id/tasks?status=TODO
PATCH /tasks/:id
POST /tasks/:id/complete

### Notes
POST /cases/:id/notes
GET /cases/:id/notes
POST /notes/:id/sign
POST /notes/:id/addendum

### Documents
POST /documents/presign  # returns presigned upload URL + storageKey
POST /documents/complete  # finalize after upload; saves metadata
GET /documents?caseId=...
GET /documents/:id
PATCH /documents/:id

### Verifications
POST /cases/:id/verifications
GET /cases/:id/verifications
PATCH /verifications/:id

### Billing
POST /cases/:id/time-entries
GET /cases/:id/time-entries
POST /invoices  # create Stripe invoice
GET /invoices?status=OPEN
POST /webhooks/stripe  # Stripe webhook receiver (raw body)

### Audit
GET /audit?entityType=CASE&entityId=...

## MVP Required DTOs
- CreatePersonDto
- CreateCaseDto (includes clientPersonId OR inline person creation)
- CreateTaskDto
- CreateNoteDto (contentJson required)
- PresignDocumentDto (fileName, mimeType, sizeBytes)
- CompleteDocumentDto (storageKey, docType, caseId/personId, issueDate, expiresAt)
- CreateVerificationDto
- CreateTimeEntryDto
- CreateInvoiceDto (line items: time entries or services)
