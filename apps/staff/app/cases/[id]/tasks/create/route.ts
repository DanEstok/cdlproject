import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;
  const form = await req.formData();
  const title = String(form.get("title") || "").trim();
  const dueAt = String(form.get("dueAt") || "").trim();

  await apiFetch(`/cases/${id}/tasks`, {
    method: "POST",
    body: JSON.stringify({
      title,
      dueAt: dueAt || undefined
    })
  });

  return NextResponse.redirect(new URL(`/cases/${id}`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
