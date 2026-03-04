import Link from "next/link";
import { ensureProvisioned, apiFetch } from "../../lib/api";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  dueAt?: string | null;
  caseId: string;
};

function statusTone(status: string) {
  const s = (status || "").toUpperCase();
  if (s === "DONE") return "ok";
  if (s === "OVERDUE") return "danger";
  if (s === "IN_PROGRESS") return "info";
  return "neutral";
}

export default async function MyTasksPage() {
  await ensureProvisioned();

  const tasks = await apiFetch<Task[]>("/tasks/my?status=TODO");

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Tasks"
        subtitle={`${tasks.length} tasks assigned to you`}
        actions={
          <Link href="/cases">
            <Button variant="secondary">View Cases</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <div className="text-xs text-slate-600">Pending</div>
            <div className="mt-1 text-2xl font-semibold">{tasks.filter(t => t.status === "TODO").length}</div>
            <div className="mt-2 text-sm text-slate-600">Tasks to complete</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-xs text-slate-600">In Progress</div>
            <div className="mt-1 text-2xl font-semibold">{tasks.filter(t => t.status === "IN_PROGRESS").length}</div>
            <div className="mt-2 text-sm text-slate-600">Currently working on</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-xs text-slate-600">Overdue</div>
            <div className="mt-1 text-2xl font-semibold">
              {tasks.filter(t => t.dueAt && new Date(t.dueAt) < new Date()).length}
            </div>
            <div className="mt-2 text-sm text-slate-600">Need attention</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <div className="text-sm font-semibold text-slate-900">{task.title}</div>
                      <Badge tone={statusTone(task.status)}>{task.status}</Badge>
                      {task.dueAt ? (
                        <Badge tone={new Date(task.dueAt) < new Date() ? "danger" : "neutral"}>
                          Due: {new Date(task.dueAt).toLocaleDateString()}
                        </Badge>
                      ) : null}
                    </div>
                    
                    {task.description ? (
                      <div className="text-sm text-slate-700 mb-3">{task.description}</div>
                    ) : null}

                    <div className="flex items-center gap-3 flex-wrap">
                      <Link href={`/cases/${task.caseId}`}>
                        <Button variant="secondary" size="sm">Open Case</Button>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <form action={`/tasks/${task.id}/complete`} method="post">
                      <Button type="submit" variant="primary" size="sm">
                        Mark Done
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}

            {tasks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600">
                <div className="text-lg font-semibold text-slate-900 mb-2">No tasks found</div>
                <div>You don't have any tasks assigned to you right now.</div>
                <div className="mt-4">
                  <Link href="/cases">
                    <Button variant="secondary">Browse Cases</Button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
