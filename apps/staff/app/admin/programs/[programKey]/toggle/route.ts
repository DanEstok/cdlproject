import { NextResponse } from "next/server";
import { ensureProvisioned, apiFetch } from "../../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ programKey: string }> }) {
  await ensureProvisioned();

  const { programKey } = await params;
  const form = await req.formData();
  const enabled = String(form.get("enabled") || "true") === "true";
  const programKeyDecoded = decodeURIComponent(programKey);

  await apiFetch(`/programs/${encodeURIComponent(programKeyDecoded)}`, {
    method: "PATCH",
    body: JSON.stringify({ enabled })
  });

  return NextResponse.redirect(new URL("/admin/programs", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
