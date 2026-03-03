import { NextResponse } from "next/server";
import { ensureProvisioned, apiFetch } from "../../../../lib/api";

export async function POST(req: Request, { params }: { params: { programKey: string } }) {
  await ensureProvisioned();

  const form = await req.formData();
  const enabled = String(form.get("enabled") || "true") === "true";
  const programKey = decodeURIComponent(params.programKey);

  await apiFetch(`/programs/${encodeURIComponent(programKey)}`, {
    method: "PATCH",
    body: JSON.stringify({ enabled })
  });

  return NextResponse.redirect(new URL("/admin/programs", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
