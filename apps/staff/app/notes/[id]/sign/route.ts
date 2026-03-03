import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await ensureProvisioned();
  await apiFetch(`/notes/${params.id}/sign`, { method: "POST" });

  const referer = req.headers.get("referer") || "/cases";
  return NextResponse.redirect(referer);
}
