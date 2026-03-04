import { ensureProvisioned, apiFetch } from "../../../../lib/api";
import { RequirementsEditor } from "../../../../components/RequirementsEditor";

type Program = {
  programKey: string;
  displayName: string;
  description?: string | null;
  enabled: boolean;
};

type Req = {
  kind: "DOC_PRESENT" | "VERIFICATION_PASSED";
  label: string;
  weight: number;
  enabled: boolean;
  docType?: string | null;
  verificationType?: string | null;
};

export default async function ProgramEditorPage({ params }: { params: { programKey: string } }) {
  try {
    await ensureProvisioned();

    const programKey = decodeURIComponent(params.programKey);
    const programs = await apiFetch<Program[]>("/programs");
    const program = programs.find((p) => p.programKey === programKey);

    if (!program) {
      return (
        <div style={{ padding: 24, maxWidth: 600 }}>
          <h2>Program Not Found</h2>
          <p style={{ marginTop: 16, opacity: 0.85 }}>
            Program "{programKey}" was not found.
          </p>
          <p style={{ marginTop: 16 }}>
            <a href="/admin/programs" style={{ color: "#0070f3" }}>← Back to programs</a>
          </p>
        </div>
      );
    }

    const reqs = await apiFetch<any[]>(`/readiness/programs/${encodeURIComponent(programKey)}/requirements`);

    const initial: Req[] = reqs.map((r) => ({
      kind: r.kind,
      label: r.label,
      weight: r.weight,
      enabled: r.enabled,
      docType: r.docType,
      verificationType: r.verificationType
    }));

    return (
      <div style={{ padding: 24, maxWidth: 1000 }}>
        <a href="/admin/programs">← Back</a>
        <h2 style={{ marginTop: 12 }}>{program.displayName || programKey}</h2>
        <div style={{ fontSize: 13, opacity: 0.8 }}>{programKey}</div>
        {program.description ? <p style={{ opacity: 0.85 }}>{program.description}</p> : null}

        <section style={{ marginTop: 16, border: "1px solid #ddd", padding: 12 }}>
          <h3 style={{ marginTop: 0 }}>Program details</h3>
          <form action={`/admin/programs/${encodeURIComponent(programKey)}/details/save`} method="post" style={{ display: "grid", gap: 10, maxWidth: 600 }}>
            <label style={{ display: "grid", gap: 6 }}>
              Display name
              <input name="displayName" defaultValue={program.displayName || programKey} />
            </label>
            <label style={{ display: "grid", gap: 6 }}>
              Description
              <textarea name="description" rows={3} defaultValue={program.description || ""} />
            </label>
            <button type="submit">Save details</button>
          </form>
        </section>

        <RequirementsEditor
          programKey={programKey}
          initial={initial}
          saveAction={`/admin/programs/${encodeURIComponent(programKey)}/requirements/save`}
        />
      </div>
    );
  } catch (error) {
    if (error instanceof Error && error.message === "No auth token") {
      return (
        <div style={{ padding: 24, maxWidth: 600 }}>
          <h2>Authentication Required</h2>
          <p style={{ marginTop: 16, opacity: 0.85 }}>
            You need to be logged in to access the admin program editor.
          </p>
          <p style={{ marginTop: 8 }}>
            <a href="/" style={{ color: "#0070f3" }}>Return to home page to log in</a>
          </p>
        </div>
      );
    }
    
    return (
      <div style={{ padding: 24, maxWidth: 600 }}>
        <h2>Error</h2>
        <p style={{ marginTop: 16, opacity: 0.85 }}>
          An error occurred while loading the program editor.
        </p>
        <p style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <p style={{ marginTop: 16 }}>
          <a href="/admin/programs" style={{ color: "#0070f3" }}>← Back to programs</a>
        </p>
      </div>
    );
  }
}
