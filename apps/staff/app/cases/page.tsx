import Link from "next/link";
import { ensureProvisioned, apiFetch } from "../../lib/api";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Table, THead, TH, TR, TD } from "../../components/ui/Table";

type CaseRow = {
  id: string;
  status: string;
  programKey: string;
  client: { firstName: string; lastName: string };
};

function statusTone(s: string) {
  const v = (s || "").toUpperCase();
  if (v.includes("CLOSED") || v.includes("DONE")) return "ok";
  if (v.includes("HOLD") || v.includes("WARN")) return "warn";
  return "neutral";
}

export default async function CasesPage() {
  await ensureProvisioned();

  const cases = await apiFetch<CaseRow[]>("/cases");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cases"
        subtitle="Track compliance, verifications, tasks, and progress across programs."
        actions={
          <>
            <Button variant="secondary">Filters</Button>
            <Button variant="primary">New Case</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <div className="text-xs text-slate-600">Open cases</div>
            <div className="mt-1 text-2xl font-semibold">{cases.length}</div>
            <div className="mt-2 text-sm text-slate-600">Fast view, no fluff.</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-xs text-slate-600">Due soon</div>
            <div className="mt-1 text-2xl font-semibold">—</div>
            <div className="mt-2 text-sm text-slate-600">Hook to tasks later.</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="text-xs text-slate-600">Failed verifications</div>
            <div className="mt-1 text-2xl font-semibold">—</div>
            <div className="mt-2 text-sm text-slate-600">Hook to verifications later.</div>
          </CardContent>
        </Card>
      </div>

      <Table>
        <THead>
          <tr>
            <TH>Client</TH>
            <TH>Program</TH>
            <TH>Status</TH>
            <TH className="text-right">Action</TH>
          </tr>
        </THead>

        <tbody>
          {cases.map((c: CaseRow) => (
            <TR key={c.id}>
              <TD>
                <div className="font-medium">{c.client.firstName} {c.client.lastName}</div>
                <div className="text-xs text-slate-600">{c.id}</div>
              </TD>
              <TD>
                <Badge tone="info">{c.programKey}</Badge>
              </TD>
              <TD>
                <Badge tone={statusTone(c.status) as any}>{c.status}</Badge>
              </TD>
              <TD className="text-right">
                <Link href={`/cases/${c.id}`}>
                  <Button variant="secondary" size="sm">Open</Button>
                </Link>
              </TD>
            </TR>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
