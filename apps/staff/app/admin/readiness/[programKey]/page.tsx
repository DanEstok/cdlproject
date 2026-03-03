import { ensureProvisioned, apiFetch } from "../../../lib/api";

export default async function ProgramReadinessPage({ params }: { params: { programKey: string } }) {
  await ensureProvisioned();

  const programKey = decodeURIComponent(params.programKey);
  const reqs = await apiFetch<any[]>(`/readiness/programs/${encodeURIComponent(programKey)}/requirements`);

  const initial = reqs.map((r) => ({
    kind: r.kind,
    label: r.label,
    weight: r.weight,
    enabled: r.enabled,
    docType: r.docType,
    verificationType: r.verificationType
  }));

  return (
    <div style={{ padding: 24, maxWidth: 980 }}>
      <a href="/admin/readiness">← Back</a>
      <h2 style={{ marginTop: 12 }}>Edit Readiness: {programKey}</h2>

      <form action={`/admin/readiness/${encodeURIComponent(programKey)}/save`} method="post">
        <p style={{ opacity: 0.85 }}>
          Paste a JSON array of items. Each item:
          {" "}
          <code>{"{ kind, label, weight, enabled, docType?, verificationType? }"}</code>
        </p>

        <textarea
          name="itemsJson"
          defaultValue={JSON.stringify(initial, null, 2)}
          rows={26}
          style={{ width: "100%", fontFamily: "monospace", fontSize: 13 }}
        />

        <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
          <button type="submit">Save Requirements</button>
          <a href={`/admin/readiness/${encodeURIComponent(programKey)}`}>Reload</a>
        </div>
      </form>
    </div>
  );
}
