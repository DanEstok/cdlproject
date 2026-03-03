import { auth } from "@clerk/nextjs/server";

async function fetchCases(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cases`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to load cases");
  return res.json();
}

export default async function CasesPage() {
  const { getToken } = auth();
  const token = await getToken();

  if (!token) {
    return <div style={{ padding: 24 }}>Not authenticated.</div>;
  }

  const data = await fetchCases(token);

  return (
    <div style={{ padding: 24 }}>
      <h2>Cases</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
