import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;

  const form = await req.formData();
  const evidenceDocumentId = String(form.get("evidenceDocumentId") || "").trim();

  await apiFetch(`/verifications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      evidenceDocumentId: evidenceDocumentId || null
    })
  });

  const referer = req.headers.get("referer") || "/cases";
  return NextResponse.redirect(referer);
}
