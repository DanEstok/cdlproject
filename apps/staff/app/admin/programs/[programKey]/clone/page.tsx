import Link from "next/link";
import { ensureProvisioned, apiFetch } from "../../../../../lib/api";
import { PageHeader } from "../../../../../components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardDesc, CardContent } from "../../../../../components/ui/Card";
import { Input } from "../../../../../components/ui/Input";
import { Textarea } from "../../../../../components/ui/Textarea";
import { Button } from "../../../../../components/ui/Button";
import { Badge } from "../../../../../components/ui/Badge";

type Program = {
  programKey: string;
  displayName: string;
  description?: string | null;
  enabled: boolean;
};

export default async function CloneProgramPage({ params }: { params: { programKey: string } }) {
  await ensureProvisioned();

  const fromKey = decodeURIComponent(params.programKey);
  const programs = await apiFetch<Program[]>("/programs");
  const source = programs.find((p: Program) => p.programKey === fromKey);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clone program"
        subtitle={`Source: ${source?.displayName || fromKey}`}
        actions={
          <Link href="/admin/programs">
            <Button variant="secondary">Back</Button>
          </Link>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>New program details</CardTitle>
          <CardDesc>
            This clones the requirements from the source program and creates a new program key.
          </CardDesc>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge tone="info">{fromKey}</Badge>
            <span className="text-sm text-slate-600">→</span>
            <Badge tone="neutral">new program</Badge>
          </div>

          <form action={`/admin/programs/${encodeURIComponent(fromKey)}/clone/submit`} method="post" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">New program key</label>
              <div className="text-xs text-slate-600 mb-2">
                Uppercase with underscores, example: <span className="font-mono">SACRAMENTO_TRANSITIONAL_HOUSING</span>
              </div>
              <Input name="programKey" placeholder="SACRAMENTO_TRANSITIONAL_HOUSING" required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Display name</label>
              <Input name="displayName" placeholder="Sacramento Transitional Housing" required />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea name="description" rows={4} placeholder="Optional description shown to staff." />
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <Button type="submit" variant="primary">Clone program</Button>
              <Link href="/admin/programs">
                <Button type="button" variant="secondary">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {source ? (
        <Card>
          <CardHeader>
            <CardTitle>Source overview</CardTitle>
            <CardDesc>What you're cloning from.</CardDesc>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="font-semibold">{source.displayName}</div>
              <div className="text-xs text-slate-600 font-mono mt-1">{source.programKey}</div>
              {source.description ? <div className="mt-2 text-slate-700">{source.description}</div> : null}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
