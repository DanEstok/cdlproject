import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;

  // For MVP: create a tiny addendum automatically.
  await apiFetch(`/notes/${id}/addendum`, {
    method: "POST",
    body: JSON.stringify({
      contentJson: { text: "Addendum created from staff UI", createdAt: new Date().toISOString() },
      narrative: "Addendum created from staff UI"
    })
  });

  const referer = req.headers.get("referer") || "/cases";
  return NextResponse.redirect(referer);
}
