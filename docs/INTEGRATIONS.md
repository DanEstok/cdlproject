# Integrations

## Clerk (Auth)
- Staff and client are separate Clerk applications OR single app with roles
- API validates JWT and maps clerkUserId to internal User row
- Organization membership determines organizationId

## Twilio (SMS)
- Outbound messages: reminders, notifications
- Store message SID + delivery status callback (Phase 2)
- Never include DV/MAT details in SMS

## DocuSign (E-sign)
MVP:
- Generate envelope for:
  - program agreement
  - consent/release
- Webhook to record completion and attach executed PDF as Document

## Stripe (Billing)
- Create invoices via API
- Webhooks:
  - invoice.finalized
  - invoice.paid
  - invoice.voided
- Store hosted invoice URL in Invoice table

## S3-compatible Storage
- API issues presigned upload URL
- Client uploads directly
- API finalizes metadata
