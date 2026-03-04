import Link from "next/link";
import { ensureProvisioned, apiFetch } from "../../../lib/api";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardDesc, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";
import { Badge } from "../../../components/ui/Badge";

type Program = {
  programKey: string;
  displayName: string;
  description?: string | null;
  enabled: boolean;
};

export default async function ProgramsAdminPage() {
  await ensureProvisioned();
  const programs = await apiFetch<Program[]>("/programs");

  const enabledCount = programs.filter((p: Program) => p.enabled).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Programs"
        subtitle={`${enabledCount} enabled • ${programs.length} total`}
        actions={
          <Link href="/cases">
            <Button variant="secondary">Back to cases</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4">
        {/* Create */}
        <Card>
          <CardHeader>
            <CardTitle>Create program</CardTitle>
            <CardDesc>Programs control readiness requirements and case scoring.</CardDesc>
          </CardHeader>
          <CardContent>
            <form action="/admin/programs/create" method="post" className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Program key</label>
                <div className="text-xs text-slate-600 mb-2">
                  Use uppercase with underscores, example: <span className="font-mono">APACHE_DRIVEN_TRUCKING</span>
                </div>
                <Input name="programKey" placeholder="APACHE_DRIVEN_TRUCKING" required />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Display name</label>
                <Input name="displayName" placeholder="Apache Driven Trucker Pathway" required />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Description</label>
                <Textarea name="description" rows={4} placeholder="Optional short description shown to staff." />
              </div>

              <Button type="submit" variant="primary">Create program</Button>
            </form>
          </CardContent>
        </Card>

        {/* List */}
        <Card>
          <CardHeader>
            <CardTitle>Existing programs</CardTitle>
            <CardDesc>Edit requirements, clone, or disable programs.</CardDesc>
          </CardHeader>
          <CardContent className="space-y-3">
            {programs.map((p: Program) => (
              <div key={p.programKey} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-sm font-semibold">{p.displayName}</div>
                      <Badge tone={p.enabled ? "ok" : "neutral"}>{p.enabled ? "Enabled" : "Disabled"}</Badge>
                    </div>

                    <div className="mt-1 text-xs text-slate-600 font-mono">
                      {p.programKey}
                    </div>

                    {p.description ? (
                      <div className="mt-2 text-sm text-slate-700">
                        {p.description}
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-slate-600">
                        No description.
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <Link href={`/admin/programs/${encodeURIComponent(p.programKey)}`}>
                      <Button size="sm" variant="secondary">Edit</Button>
                    </Link>

                    <Link href={`/admin/programs/${encodeURIComponent(p.programKey)}/clone`}>
                      <Button size="sm" variant="secondary">Clone</Button>
                    </Link>

                    <form action={`/admin/programs/${encodeURIComponent(p.programKey)}/toggle`} method="post">
                      <input type="hidden" name="enabled" value={p.enabled ? "false" : "true"} />
                      <Button size="sm" variant={p.enabled ? "ghost" : "primary"}>
                        {p.enabled ? "Disable" : "Enable"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}

            {programs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-600">
                No programs found yet. Create one to get started.
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
