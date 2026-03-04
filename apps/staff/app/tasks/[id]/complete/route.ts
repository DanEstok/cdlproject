import { NextResponse } from "next/server";
import { apiFetch, ensureProvisioned } from "../../../../lib/api";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;
  await apiFetch(`/tasks/${id}/complete`, { method: "POST" });
  return NextResponse.redirect(new URL("/tasks", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"));
}
