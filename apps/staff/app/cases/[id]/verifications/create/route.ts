import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;
  const form = await req.formData();
  const type = String(form.get("type") || "DOT_MEDICAL");
  const status = String(form.get("status") || "PENDING");
  const nextDueAt = String(form.get("nextDueAt") || "").trim();
  const notes = String(form.get("notes") || "").trim();
  const evidenceDocumentId = String(form.get("evidenceDocumentId") || "").trim();

  await apiFetch(`/cases/${id}/verifications`, {
    method: "POST",
    body: JSON.stringify({
      type,
      status,
      nextDueAt: nextDueAt || undefined,
      notes: notes || undefined,
      evidenceDocumentId: evidenceDocumentId || undefined
    })
  });

  return NextResponse.redirect(new URL(`/cases/${id}`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
