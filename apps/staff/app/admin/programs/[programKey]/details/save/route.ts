import { NextResponse } from "next/server";
import { ensureProvisioned, apiFetch } from "../../../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ programKey: string }> }) {
  await ensureProvisioned();

  const { programKey } = await params;
  const form = await req.formData();

  const displayName = String(form.get("displayName") || "").trim();
  const description = String(form.get("description") || "").trim();

  await apiFetch(`/programs/${encodeURIComponent(programKey)}`, {
    method: "PATCH",
    body: JSON.stringify({
      displayName: displayName || undefined,
      description: description || undefined
    })
  });

  return NextResponse.redirect(
    new URL(`/admin/programs/${encodeURIComponent(programKey)}`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001")
  );
}
