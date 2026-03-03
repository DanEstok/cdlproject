import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await ensureProvisioned();

  const form = await req.formData();
  const evidenceDocumentId = String(form.get("evidenceDocumentId") || "").trim();

  await apiFetch(`/verifications/${params.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      evidenceDocumentId: evidenceDocumentId || null
    })
  });

  const referer = req.headers.get("referer") || "/cases";
  return NextResponse.redirect(referer);
}
