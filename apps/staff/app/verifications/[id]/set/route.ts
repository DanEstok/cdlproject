import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;

  const form = await req.formData();
  const status = String(form.get("status") || "PENDING");

  await apiFetch(`/verifications/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });

  const referer = req.headers.get("referer") || "/cases";
  return NextResponse.redirect(referer);
}
