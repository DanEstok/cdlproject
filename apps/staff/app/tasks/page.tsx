import { ensureProvisioned, apiFetch } from "../../lib/api";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  dueAt?: string | null;
  caseId: string;
};

export default async function MyTasksPage() {
  await ensureProvisioned();

  const tasks = await apiFetch<Task[]>("/tasks/my?status=TODO");

  return (
    <div style={{ padding: 24 }}>
      <h2>My Tasks</h2>
      <p>Showing TODO tasks assigned to you.</p>

      <ul style={{ marginTop: 16 }}>
        {tasks.map((t) => (
          <li key={t.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <strong>{t.title}</strong>
                <div style={{ fontSize: 13, opacity: 0.8 }}>{t.description || ""}</div>
                <div style={{ fontSize: 12, marginTop: 6 }}>
                  Status: {t.status} {t.dueAt ? `| Due: ${new Date(t.dueAt).toLocaleString()}` : ""}
                </div>
                <div style={{ marginTop: 6 }}>
                  <a href={`/cases/${t.caseId}`}>Open Case</a>
                </div>
              </div>

              <form action={`/tasks/${t.id}/complete`} method="post">
                <button type="submit">Mark Done</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
