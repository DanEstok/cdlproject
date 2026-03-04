import Link from "next/link";
import { ensureProvisioned, apiFetch } from "../../../../lib/api";
import { PageHeader } from "../../../../components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardDesc, CardContent } from "../../../../components/ui/Card";
import { Input } from "../../../../components/ui/Input";
import { Textarea } from "../../../../components/ui/Textarea";
import { Button } from "../../../../components/ui/Button";
import { Badge } from "../../../../components/ui/Badge";
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
    const program = programs.find((p: Program) => p.programKey === programKey);

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
    const initial: Req[] = reqs.map((r: any) => ({
      kind: r.kind,
      label: r.label,
      weight: r.weight,
      enabled: r.enabled,
      docType: r.docType,
      verificationType: r.verificationType
    }));

    return (
      <div className="space-y-6">
        <PageHeader
          title={program?.displayName || programKey}
          subtitle={program ? program.programKey : programKey}
          actions={
            <>
              <Link href="/admin/programs">
                <Button variant="secondary">Back</Button>
              </Link>
              <Link href={`/admin/programs/${encodeURIComponent(programKey)}/clone`}>
                <Button variant="secondary">Clone</Button>
              </Link>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4">
          {/* Program details */}
          <Card>
            <CardHeader>
              <CardTitle>Program details</CardTitle>
              <CardDesc>Displayed to staff in the program selector.</CardDesc>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge tone={program?.enabled ? "ok" : "neutral"}>{program?.enabled ? "Enabled" : "Disabled"}</Badge>
                <Badge tone="info">{programKey}</Badge>
              </div>

              <form
                action={`/admin/programs/${encodeURIComponent(programKey)}/details/save`}
                method="post"
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-sm font-medium">Display name</label>
                  <Input name="displayName" defaultValue={program?.displayName || programKey} />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea name="description" rows={5} defaultValue={program?.description || ""} />
                </div>

                <div className="flex items-center gap-2">
                  <Button type="submit" variant="primary">Save details</Button>
                  <Link href="/admin/programs">
                    <Button type="button" variant="secondary">Done</Button>
                  </Link>
                </div>
              </form>

              <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                <div className="font-semibold">Tip</div>
                <div className="mt-1 text-slate-600">
                  Keep labels short and specific. Requirements should be evidence-driven and auditable.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements editor */}
          <Card>
            <CardHeader>
              <CardTitle>Readiness requirements</CardTitle>
              <CardDesc>Add, reorder, enable/disable, and weight checklist items.</CardDesc>
            </CardHeader>
            <CardContent>
              <RequirementsEditor
                programKey={programKey}
                initial={initial}
                saveAction={`/admin/programs/${encodeURIComponent(programKey)}/requirements/save`}
              />
            </CardContent>
          </Card>
        </div>
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
