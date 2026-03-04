import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;

  const res = await apiFetch<{ downloadUrl: string }>(`/documents/presign-download`, {
    method: "POST",
    body: JSON.stringify({ documentId: id })
  });

  return NextResponse.redirect(res.downloadUrl);
}
