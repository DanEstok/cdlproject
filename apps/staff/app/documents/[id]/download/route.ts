import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await ensureProvisioned();

  const res = await apiFetch<{ downloadUrl: string }>(`/documents/presign-download`, {
    method: "POST",
    body: JSON.stringify({ documentId: params.id })
  });

  return NextResponse.redirect(res.downloadUrl);
}
