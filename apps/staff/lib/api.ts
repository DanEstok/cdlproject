import { auth } from "@clerk/nextjs/server";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const session = await auth();
  const token = await session.getToken();
  if (!token) throw new Error("No auth token");

  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    cache: "no-store"
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

export async function ensureProvisioned() {
  // Call on server pages after login to auto-provision user/org in API.
  return apiFetch<{ provisioned: boolean }>(`/auth/provision`, { method: "POST" });
}
