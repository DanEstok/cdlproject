import { ensureProvisioned, apiFetch } from "../../lib/api";

export default async function ReadinessAdminPage() {
  await ensureProvisioned();

  const programs = await apiFetch<{ programKeys: string[] }>(`/readiness/programs`);
  const defaultProgram = programs.programKeys[0] || "APACHE_DRIVEN_TRUCKING";

  const reqs = await apiFetch<any[]>(`/readiness/programs/${encodeURIComponent(defaultProgram)}/requirements`);

  return (
    <div style={{ padding: 24, maxWidth: 980 }}>
      <h2>Readiness Config</h2>
      <p style={{ opacity: 0.85 }}>
        MVP editor. Pick a program, then edit its checklist JSON and save.
      </p>

      <div style={{ marginTop: 12 }}>
        <a href={`/admin/readiness/${encodeURIComponent(defaultProgram)}`}>Edit {defaultProgram}</a>
      </div>

      <h3 style={{ marginTop: 24 }}>Programs</h3>
      <ul>
        {programs.programKeys.map((k) => (
          <li key={k}>
            <a href={`/admin/readiness/${encodeURIComponent(k)}`}>{k}</a>
          </li>
        ))}
      </ul>

      <h3 style={{ marginTop: 24 }}>Preview: {defaultProgram}</h3>
      <pre style={{ background: "#f7f7f7", padding: 12, overflowX: "auto" }}>
        {JSON.stringify(reqs, null, 2)}
      </pre>
    </div>
  );
}
