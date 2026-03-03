import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function POST(req: Request) {
  await ensureProvisioned();

  const form = await req.formData();
  const firstName = String(form.get("firstName") || "").trim();
  const lastName = String(form.get("lastName") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const email = String(form.get("email") || "").trim();
  const caseNotes = String(form.get("caseNotes") || "").trim();

  const person = await apiFetch<{ id: string }>("/people", {
    method: "POST",
    body: JSON.stringify({
      type: "CLIENT",
      firstName,
      lastName,
      phone: phone || undefined,
      email: email || undefined
    })
  });

  const c = await apiFetch<{ id: string }>("/cases", {
    method: "POST",
    body: JSON.stringify({
      clientPersonId: person.id,
      notes: caseNotes || undefined
    })
  });

  return NextResponse.redirect(new URL(`/cases/${c.id}`, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
