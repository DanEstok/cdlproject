import { ensureProvisioned, apiFetch } from "../../../lib/api";
import { auth } from "@clerk/nextjs/server";
import { DocumentUploader } from "../../../components/DocumentUploader";

type Case = {
  id: string;
  status: string;
  notes?: string | null;
  client: { firstName: string; lastName: string };
};

type Task = {
  id: string;
  title: string;
  status: string;
  dueAt?: string | null;
};

type Note = {
  id: string;
  noteType: string;
  status: string;
  narrative?: string | null;
  createdAt: string;
  templateKey?: string | null;
};

type Document = {
  id: string;
  fileName: string;
  docType: string;
  createdAt: string;
  issueDate?: string | null;
  expiresAt?: string | null;
};

type Verification = {
  id: string;
  type: string;
  status: string;
  nextDueAt?: string | null;
  verifiedAt?: string | null;
  notes?: string | null;
  evidenceDocumentId?: string | null;
  createdAt: string;
};

type TimelineItem = {
  at: string;
  kind: "TASK" | "NOTE" | "DOCUMENT" | "VERIFICATION" | "AUDIT";
  title: string;
  subtitle?: string;
  refId: string;
};

export default async function CasePage({ params }: { params: { id: string } }) {
  await ensureProvisioned();

  const c = await apiFetch<Case>(`/cases/${params.id}`);
  const tasks = await apiFetch<Task[]>(`/cases/${params.id}/tasks`);
  const notes = await apiFetch<Note[]>(`/cases/${params.id}/notes`);
  const docs = await apiFetch<Document[]>(`/documents?caseId=${params.id}`);
  const verifs = await apiFetch<Verification[]>(`/cases/${params.id}/verifications`);
  const timeline = await apiFetch<TimelineItem[]>(`/cases/${params.id}/timeline`);

  // For uploader (client-side), we need an actual token for browser calls
  const session = await auth();
  const token = await session.getToken();
  if (!token) {
    return <div style={{ padding: 24 }}>Not authenticated.</div>;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
  if (!apiBase) {
    return <div style={{ padding: 24 }}>Missing NEXT_PUBLIC_API_BASE_URL</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <a href="/cases">← Back to cases</a>

      <h2 style={{ marginTop: 12 }}>
        Case: {c.client.firstName} {c.client.lastName}
      </h2>

      <div style={{ marginTop: 8 }}>
        <strong>Status:</strong> {c.status}
      </div>

      {/* TIMELINE */}
      <section style={{ marginTop: 20 }}>
        <h3>Timeline</h3>
        <ul style={{ marginTop: 12 }}>
          {timeline.map((i) => (
            <li key={`${i.kind}-${i.refId}`} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{i.kind}</strong> | {new Date(i.at).toLocaleString()}
                  <div style={{ marginTop: 4 }}>
                    <strong>{i.title}</strong>
                  </div>
                  {i.subtitle ? <div style={{ marginTop: 4, fontSize: 13, opacity: 0.85 }}>{i.subtitle}</div> : null}
                </div>

                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  {i.kind === "DOCUMENT" ? <a href={`/documents/${i.refId}/download`}>Download</a> : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* DOCUMENTS */}
      <section style={{ marginTop: 20 }}>
        <h3>Documents</h3>
        <DocumentUploader apiBase={apiBase} token={token} caseId={params.id} />

        <ul style={{ marginTop: 12 }}>
          {docs.map((d) => (
            <li key={d.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{d.fileName}</strong>
                  <div style={{ fontSize: 12, marginTop: 4, opacity: 0.85 }}>
                    Type: {d.docType} | Uploaded: {new Date(d.createdAt).toLocaleString()}
                    {d.issueDate ? ` | Issue: ${new Date(d.issueDate).toLocaleDateString()}` : ""}
                    {d.expiresAt ? ` | Expires: ${new Date(d.expiresAt).toLocaleDateString()}` : ""}
                  </div>
                </div>
                <div>
                  <a href={`/documents/${d.id}/download`}>Download</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* VERIFICATIONS */}
      <section style={{ marginTop: 28 }}>
        <h3>Verifications</h3>

        <form action={`/cases/${params.id}/verifications/create`} method="post" style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
          <select name="type" defaultValue="DOT_MEDICAL">
            <option value="DOT_MEDICAL">DOT_MEDICAL</option>
            <option value="MVR">MVR</option>
            <option value="CLEARINGHOUSE">CLEARINGHOUSE</option>
          </select>

          <select name="status" defaultValue="PENDING">
            <option value="PENDING">PENDING</option>
            <option value="PASSED">PASSED</option>
            <option value="FAILED">FAILED</option>
            <option value="UNKNOWN">UNKNOWN</option>
          </select>

          <input name="nextDueAt" placeholder="Next due ISO (optional)" />
          <input name="notes" placeholder="Notes (optional)" />

          <button type="submit">Add Verification</button>
        </form>

        <ul style={{ marginTop: 12 }}>
          {verifs.map((v) => (
            <li key={v.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{v.type}</strong> | {v.status}
                  <div style={{ fontSize: 12, marginTop: 4, opacity: 0.85 }}>
                    Created: {new Date(v.createdAt).toLocaleString()}
                    {v.verifiedAt ? ` | Verified: ${new Date(v.verifiedAt).toLocaleString()}` : ""}
                    {v.nextDueAt ? ` | Next due: ${new Date(v.nextDueAt).toLocaleString()}` : ""}
                  </div>
                  {v.notes ? <div style={{ marginTop: 6, fontSize: 13 }}>{v.notes}</div> : null}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <form action={`/verifications/${v.id}/set`} method="post">
                    <input type="hidden" name="status" value="PASSED" />
                    <button type="submit">PASS</button>
                  </form>
                  <form action={`/verifications/${v.id}/set`} method="post">
                    <input type="hidden" name="status" value="FAILED" />
                    <button type="submit">FAIL</button>
                  </form>
                  <form action={`/verifications/${v.id}/set`} method="post">
                    <input type="hidden" name="status" value="PENDING" />
                    <button type="submit">PENDING</button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* TASKS */}
      <section style={{ marginTop: 28 }}>
        <h3>Tasks</h3>
        <CreateTaskForm caseId={params.id} />
        <ul style={{ marginTop: 12 }}>
          {tasks.map((t) => (
            <li key={t.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 6 }}>
              <div>
                <strong>{t.title}</strong>
              </div>
              <div style={{ fontSize: 12 }}>
                {t.status} {t.dueAt ? `| Due: ${new Date(t.dueAt).toLocaleString()}` : ""}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* NOTES */}
      <section style={{ marginTop: 28 }}>
        <h3>Notes</h3>
        <CreateNoteForm caseId={params.id} />
        <ul style={{ marginTop: 12 }}>
          {notes.map((n) => (
            <li key={n.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <strong>{n.noteType}</strong> | {n.status} | {new Date(n.createdAt).toLocaleString()}
                  <div style={{ fontSize: 13, marginTop: 6 }}>{n.narrative || ""}</div>
                  {n.templateKey?.startsWith("ADDENDUM:") ? (
                    <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
                      {`Linked to ${n.templateKey.replace("ADDENDUM:", "")}`}
                    </div>
                  ) : null}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <form action={`/notes/${n.id}/sign`} method="post">
                    <button type="submit" disabled={n.status === "SIGNED"}>
                      Sign
                    </button>
                  </form>

                  <form action={`/notes/${n.id}/addendum`} method="post">
                    <button type="submit" disabled={n.status !== "SIGNED"}>
                      Addendum
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CreateTaskForm({ caseId }: { caseId: string }) {
  return (
    <form action={`/cases/${caseId}/tasks/create`} method="post" style={{ display: "flex", gap: 8, marginTop: 8 }}>
      <input name="title" placeholder="Task title" required />
      <input name="dueAt" placeholder="Due ISO date (optional)" />
      <button type="submit">Add Task</button>
    </form>
  );
}

function CreateNoteForm({ caseId }: { caseId: string }) {
  return (
    <form action={`/cases/${caseId}/notes/create`} method="post" style={{ display: "flex", gap: 8, marginTop: 8 }}>
      <select name="noteType" defaultValue="CASE_NOTE">
        <option value="CASE_NOTE">CASE_NOTE</option>
        <option value="COACHING_NOTE">COACHING_NOTE</option>
        <option value="COMPLIANCE_NOTE">COMPLIANCE_NOTE</option>
      </select>
      <input name="narrative" placeholder="Narrative summary" />
      <button type="submit">Add Note</button>
    </form>
  );
}
