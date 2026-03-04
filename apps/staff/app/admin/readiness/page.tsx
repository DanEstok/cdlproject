import Link from "next/link";
import { ensureProvisioned, apiFetch } from "../../../lib/api";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

export default async function ReadinessAdminPage() {
  await ensureProvisioned();

  const programs = await apiFetch<{ programKeys: string[] }>(`/readiness/programs`);
  const defaultProgram = programs.programKeys[0] || "APACHE_DRIVEN_TRUCKING";

  const reqs = await apiFetch<any[]>(`/readiness/programs/${encodeURIComponent(defaultProgram)}/requirements`);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Readiness Configuration"
        subtitle="Manage program readiness requirements and checklists"
        actions={
          <Link href="/admin/programs">
            <Button variant="secondary">Manage Programs</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm font-semibold text-slate-900">Quick Actions</div>
              <div className="text-sm text-slate-600">
                MVP editor. Pick a program, then edit its checklist JSON and save.
              </div>
              <Link href={`/admin/readiness/${encodeURIComponent(defaultProgram)}`}>
                <Button variant="primary">Edit {defaultProgram}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm font-semibold text-slate-900">Programs</div>
              <div className="text-sm text-slate-600">
                {programs.programKeys.length} programs configured
              </div>
              <div className="space-y-2">
                {programs.programKeys.map((k: string) => (
                  <Link
                    key={k}
                    href={`/admin/readiness/${encodeURIComponent(k)}`}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50"
                  >
                    <div className="text-sm font-medium">{k}</div>
                    <Badge tone="info">Edit</Badge>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm font-semibold text-slate-900">Preview: {defaultProgram}</div>
            <div className="text-sm text-slate-600">
              Current requirements configuration for the default program
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(reqs, null, 2)}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
