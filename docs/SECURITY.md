# Security & Privacy (MVP rules)

## Access Control
- RBAC enforced in API
- All queries must include organizationId scope
- Auditors are read-only

## Client Privacy
- SMS templates must not include sensitive details
- Notifications use generic language: "You have a task due tomorrow."

## Signed Notes
- Signed notes immutable
- Addendum is separate record linked to noteId

## Audit Trail
- Every mutation creates AuditEvent
- AuditEvent is append-only

## Data Protection
- TLS everywhere
- Secrets in env vars + secret manager later
- Document URLs are presigned and time-limited
