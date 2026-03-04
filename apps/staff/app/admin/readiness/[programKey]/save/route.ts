import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ programKey: string }> }) {
  await ensureProvisioned();

  const { programKey } = await params;

  const form = await req.formData();
  const itemsJson = String(form.get("itemsJson") || "");

  let items: any[] = [];
  try {
    items = JSON.parse(itemsJson);
    if (!Array.isArray(items)) throw new Error("itemsJson must be an array");
  } catch (e: any) {
    return new Response(`Invalid JSON: ${e.message}`, { status: 400 });
  }

  await apiFetch(`/readiness/programs/${encodeURIComponent(programKey)}/requirements`, {
    method: "PUT",
    body: JSON.stringify({ items })
  });

  return NextResponse.redirect(new URL(`/admin/readiness/${encodeURIComponent(programKey)}`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
