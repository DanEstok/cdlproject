import { ensureProvisioned, apiFetch } from "../../../lib/api";

type Program = {
  programKey: string;
  displayName: string;
  description?: string | null;
  enabled: boolean;
};

export default async function ProgramsAdminPage() {
  await ensureProvisioned();
  const programs = await apiFetch<Program[]>("/programs");

  return (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <a href="/cases">← Back to cases</a>
      <h2 style={{ marginTop: 12 }}>Programs</h2>

      <p style={{ opacity: 0.85 }}>
        Programs control which readiness checklist applies to a case. Create one, clone one, then edit its requirements.
      </p>

      <section style={{ marginTop: 16, border: "1px solid #ddd", padding: 12 }}>
        <h3 style={{ marginTop: 0 }}>Create Program</h3>
        <form action="/admin/programs/create" method="post" style={{ display: "grid", gap: 10, maxWidth: 560 }}>
          <label style={{ display: "grid", gap: 6 }}>
            Program Key (UPPERCASE_WITH_UNDERSCORES)
            <input name="programKey" placeholder="APACHE_DRIVEN_TRUCKING" required />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            Display Name
            <input name="displayName" placeholder="Apache Driven Trucker Pathway" required />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            Description (optional)
            <textarea name="description" rows={3} />
          </label>
          <button type="submit">Create</button>
        </form>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Existing Programs</h3>
        <div style={{ display: "grid", gap: 10 }}>
          {programs.map((p) => (
            <div key={p.programKey} style={{ border: "1px solid #ddd", padding: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 18 }}>
                    <strong>{p.displayName}</strong>
                    <span style={{ marginLeft: 10, fontSize: 12, opacity: 0.7 }}>{p.programKey}</span>
                  </div>
                  {p.description ? <div style={{ marginTop: 6, opacity: 0.85 }}>{p.description}</div> : null}
                  <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
                    Status: {p.enabled ? "Enabled" : "Disabled"}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <a href={`/admin/programs/${encodeURIComponent(p.programKey)}`}>Edit requirements</a>

                  <form action={`/admin/programs/${encodeURIComponent(p.programKey)}/toggle`} method="post">
                    <input type="hidden" name="enabled" value={p.enabled ? "false" : "true"} />
                    <button type="submit">{p.enabled ? "Disable" : "Enable"}</button>
                  </form>

                  <a href={`/admin/programs/${encodeURIComponent(p.programKey)}/clone`}>Clone</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
