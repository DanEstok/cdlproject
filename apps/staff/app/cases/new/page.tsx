import { ensureProvisioned } from "../../../lib/api";

export default async function NewCasePage() {
  await ensureProvisioned();

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <a href="/cases">← Back to cases</a>
      <h2 style={{ marginTop: 12 }}>Create New Case</h2>

      <p style={{ opacity: 0.85 }}>
        This creates a CLIENT person record, then creates a case linked to that client.
      </p>

      <form action="/cases/new/create" method="post" style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label>First name</label>
          <input name="firstName" required />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Last name</label>
          <input name="lastName" required />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Phone (optional)</label>
          <input name="phone" />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Email (optional)</label>
          <input name="email" type="email" />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Case notes (optional)</label>
          <textarea name="caseNotes" rows={3} />
        </div>

        <button type="submit" style={{ marginTop: 8 }}>
          Create Case
        </button>
      </form>
    </div>
  );
}
