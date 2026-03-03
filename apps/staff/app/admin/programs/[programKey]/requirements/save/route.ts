import { NextResponse } from "next/server";
import { ensureProvisioned, apiFetch } from "../../../../lib/api";

export async function POST(req: Request, { params }: { params: { programKey: string } }) {
  await ensureProvisioned();

  const programKey = decodeURIComponent(params.programKey);
  const form = await req.formData();
  const itemsJson = String(form.get("itemsJson") || "");

  let items: any[] = [];
  try {
    items = JSON.parse(itemsJson);
    if (!Array.isArray(items)) throw new Error("itemsJson must be an array");
  } catch (e: any) {
    return new Response(`Invalid JSON payload: ${e.message}`, { status: 400 });
  }

  // Basic server-side sanity: remove blank labels
  items = items
    .map((i) => ({
      kind: i.kind,
      label: String(i.label || "").trim(),
      weight: Number(i.weight || 1),
      enabled: Boolean(i.enabled),
      docType: i.docType ?? null,
      verificationType: i.verificationType ?? null
    }))
    .filter((i) => i.label);

  await apiFetch(`/readiness/programs/${encodeURIComponent(programKey)}/requirements`, {
    method: "PUT",
    body: JSON.stringify({ items })
  });

  return NextResponse.redirect(
    new URL(`/admin/programs/${encodeURIComponent(programKey)}`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001")
  );
}
