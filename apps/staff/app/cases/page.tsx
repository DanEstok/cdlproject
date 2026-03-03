import { ensureProvisioned, apiFetch } from "../../lib/api";

export default async function CasesPage() {
  await ensureProvisioned();

  const data = await apiFetch<any[]>("/cases");

  return (
    <div style={{ padding: 24 }}>
      <h2>Cases</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
