import Link from "next/link";
import { ensureProvisioned, apiFetch } from "../../../../lib/api";
import { PageHeader } from "../../../../components/ui/PageHeader";
import { Card, CardContent } from "../../../../components/ui/Card";
import { Button } from "../../../../components/ui/Button";
import { Textarea } from "../../../../components/ui/Textarea";

export default async function ProgramReadinessPage({ params }: { params: Promise<{ programKey: string }> }) {
  await ensureProvisioned();

  const { programKey } = await params;
  const reqs = await apiFetch<any[]>(`/readiness/programs/${encodeURIComponent(programKey)}/requirements`);

  const initial = reqs.map((r: any) => ({
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
        title={`Edit Readiness: ${programKey}`}
        subtitle="Manage program requirements and checklist items"
        actions={
          <Link href="/admin/readiness">
            <Button variant="secondary">Back</Button>
          </Link>
        }
      />

      <Card>
        <CardContent>
          <form action={`/admin/readiness/${encodeURIComponent(programKey)}/save`} method="post" className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm font-semibold text-slate-900">Requirements Configuration</div>
              <div className="text-sm text-slate-600">
                Paste a JSON array of items. Each item:{" "}
                <code className="bg-slate-100 px-2 py-1 rounded text-xs">
                  {"{ kind, label, weight, enabled, docType?, verificationType? }"}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">JSON Configuration</label>
              <Textarea
                name="itemsJson"
                defaultValue={JSON.stringify(initial, null, 2)}
                rows={20}
                className="font-mono text-xs"
                placeholder="Paste JSON configuration here..."
              />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" variant="primary">
                Save Requirements
              </Button>
              <Link href={`/admin/readiness/${encodeURIComponent(programKey)}`}>
                <Button variant="secondary">Reload</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm font-semibold text-slate-900">Quick Reference</div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-slate-700">Kind Values:</div>
                <div className="text-slate-600">DOC_PRESENT, VERIFICATION_PASSED</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-slate-700">Required Fields:</div>
                <div className="text-slate-600">kind, label, weight (1-10), enabled</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-slate-700">Optional Fields:</div>
                <div className="text-slate-600">docType (for DOC_PRESENT), verificationType (for VERIFICATION_PASSED)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
