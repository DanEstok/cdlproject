import { ensureProvisioned, apiFetch } from "../../../lib/api";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";

type Program = {
  programKey: string;
  displayName: string;
  description?: string | null;
  enabled: boolean;
};

export default async function ProgramsAdminPage() {
  try {
    await ensureProvisioned();
    const programs = await apiFetch<Program[]>("/programs");

    return (
      <div className="space-y-6">
        <PageHeader 
          title="Programs" 
          subtitle="Programs control which readiness checklist applies to a case. Create one, clone one, then edit its requirements."
          actions={
            <Button asChild>
              <a href="/admin/programs/create">Create Program</a>
            </Button>
          }
        />

        {/* Create Program Card */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">Create New Program</h3>
          </CardHeader>
          <CardContent>
            <form action="/admin/programs/create" method="post" className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Program Key (UPPERCASE_WITH_UNDERSCORES)
                </label>
                <input 
                  name="programKey" 
                  placeholder="APACHE_DRIVEN_TRUCKING" 
                  required 
                  className="w-full h-9 rounded-xl border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Display Name
                </label>
                <input 
                  name="displayName" 
                  placeholder="Apache Driven Trucker Pathway" 
                  required 
                  className="w-full h-9 rounded-xl border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Description (optional)
                </label>
                <textarea 
                  name="description" 
                  rows={3} 
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                />
              </div>
              <Button type="submit">Create Program</Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Programs */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900">Existing Programs</h3>
          <div className="grid gap-4">
            {programs.map((p) => (
              <Card key={p.programKey}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-slate-900">{p.displayName}</h4>
                        <Badge variant={p.enabled ? "success" : "neutral"}>
                          {p.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{p.programKey}</p>
                      {p.description && (
                        <p className="text-sm text-slate-600">{p.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="secondary" asChild>
                        <a href={`/admin/programs/${encodeURIComponent(p.programKey)}`}>Edit</a>
                      </Button>
                      
                      <form action={`/admin/programs/${encodeURIComponent(p.programKey)}/toggle`} method="post">
                        <input type="hidden" name="enabled" value={p.enabled ? "false" : "true"} />
                        <Button variant="secondary" type="submit">
                          {p.enabled ? "Disable" : "Enable"}
                        </Button>
                      </form>

                      <Button variant="secondary" asChild>
                        <a href={`/admin/programs/${encodeURIComponent(p.programKey)}/clone`}>Clone</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof Error && error.message === "No auth token") {
      return (
        <div className="p-6 max-w-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Authentication Required</h2>
          <p className="text-slate-600 mb-4">
            You need to be logged in to access the admin programs page.
          </p>
          <Button asChild>
            <a href="/">Return to home page to log in</a>
          </Button>
        </div>
      );
    }
    
    return (
      <div className="p-6 max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Error</h2>
        <p className="text-slate-600 mb-4">
          An error occurred while loading the programs page.
        </p>
        <p className="text-sm text-slate-500 mb-4">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <Button asChild>
          <a href="/cases">← Back to cases</a>
        </Button>
      </div>
    );
  }
}
