import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../../lib/api";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await ensureProvisioned();

  const form = await req.formData();
  const programKey = String(form.get("programKey") || "").trim();

  await apiFetch(`/cases/${params.id}/program`, {
    method: "PATCH",
    body: JSON.stringify({ programKey })
  });

  const referer = req.headers.get("referer") || `/cases/${params.id}`;
  return NextResponse.redirect(referer);
}
