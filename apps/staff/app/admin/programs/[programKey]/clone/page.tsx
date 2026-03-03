import { ensureProvisioned, apiFetch } from "../../../../lib/api";

type Program = {
  programKey: string;
  displayName: string;
  description?: string | null;
  enabled: boolean;
};

export default async function CloneProgramPage({ params }: { params: { programKey: string } }) {
  await ensureProvisioned();
  const fromKey = decodeURIComponent(params.programKey);

  const programs = await apiFetch<Program[]>("/programs");
  const source = programs.find((p) => p.programKey === fromKey);

  return (
    <div style={{ padding: 24, maxWidth: 760 }}>
      <a href="/admin/programs">← Back</a>
      <h2 style={{ marginTop: 12 }}>Clone Program</h2>

      <div style={{ marginTop: 8, opacity: 0.85 }}>
        Source: <strong>{source?.displayName || fromKey}</strong> ({fromKey})
      </div>

      <form action={`/admin/programs/${encodeURIComponent(fromKey)}/clone/submit`} method="post" style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <label style={{ display: "grid", gap: 6 }}>
          New Program Key
          <input name="programKey" placeholder="SACRAMENTO_TRANSITIONAL_HOUSING" required />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          Display Name
          <input name="displayName" placeholder="Sacramento Transitional Housing" required />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          Description (optional)
          <textarea name="description" rows={3} />
        </label>
        <button type="submit">Clone</button>
      </form>
    </div>
  );
}
