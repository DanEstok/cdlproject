import { NextResponse } from "next/server";
import { ensureProvisioned, apiFetch } from "../../../../../../lib/api";

export async function POST(req: Request, { params }: { params: { programKey: string } }) {
  await ensureProvisioned();

  const fromKey = decodeURIComponent(params.programKey);
  const form = await req.formData();

  const programKey = String(form.get("programKey") || "").trim();
  const displayName = String(form.get("displayName") || "").trim();
  const description = String(form.get("description") || "").trim();

  await apiFetch(`/programs/${encodeURIComponent(fromKey)}/clone`, {
    method: "POST",
    body: JSON.stringify({
      programKey,
      displayName,
      description: description || undefined
    })
  });

  return NextResponse.redirect(new URL("/admin/programs", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
