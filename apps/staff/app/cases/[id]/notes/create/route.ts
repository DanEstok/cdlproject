import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../../lib/api";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await ensureProvisioned();

  const form = await req.formData();
  const noteType = String(form.get("noteType") || "CASE_NOTE");
  const narrative = String(form.get("narrative") || "").trim();

  // contentJson is structured fields. MVP: store a minimal structure.
  await apiFetch(`/cases/${params.id}/notes`, {
    method: "POST",
    body: JSON.stringify({
      noteType,
      templateKey: "DEFAULT",
      narrative,
      contentJson: {
        narrative,
        createdFrom: "staff-form"
      }
    })
  });

  return NextResponse.redirect(new URL(`/cases/${params.id}`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
