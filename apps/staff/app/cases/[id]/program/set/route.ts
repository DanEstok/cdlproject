import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;
  const form = await req.formData();
  const programKey = String(form.get("programKey") || "").trim();

  await apiFetch(`/cases/${id}/program`, {
    method: "PATCH",
    body: JSON.stringify({ programKey })
  });

  const referer = req.headers.get("referer") || `/cases/${id}`;
  return NextResponse.redirect(referer);
}
