import Link from "next/link";
import { ensureProvisioned, apiFetch } from "../../../lib/api";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Card, CardHeader, CardTitle, CardDesc, CardContent } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Table, THead, TH, TR, TD } from "../../../components/ui/Table";

function verifTone(s: string) {
  const v = (s || "").toUpperCase();
  if (v === "PASSED") return "ok";
  if (v === "FAILED") return "danger";
  if (v === "UNKNOWN") return "warn";
  return "neutral";
}

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await ensureProvisioned();

  const { id } = await params;

  // Replace these with your real endpoints and types
  const c = await apiFetch<any>(`/cases/${id}`);
  const readiness = await apiFetch<any>(`/cases/${id}/readiness`);
  const docs = await apiFetch<any[]>(`/documents?caseId=${id}`);
  const verifs = await apiFetch<any[]>(`/cases/${id}/verifications`);
  const timeline = await apiFetch<any[]>(`/cases/${id}/timeline`);
  const programs = await apiFetch<any[]>(`/programs`);
  const enabledPrograms = programs.filter((p: any) => p.enabled);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Case: ${c.client?.firstName || ""} ${c.client?.lastName || ""}`}
        subtitle={`${c.id} • ${readiness.programKey} • Status: ${c.status}`}
        actions={
          <>
            <Button variant="secondary">Add Task</Button>
            <Button variant="secondary">Add Note</Button>
            <Button variant="primary">Upload Document</Button>
          </>
        }
      />

      {/* Program selector */}
      <Card>
        <CardHeader>
          <CardTitle>Program</CardTitle>
          <CardDesc>Changes the readiness checklist and scoring.</CardDesc>
        </CardHeader>
        <CardContent>
          <form action={`/cases/${id}/program/set`} method="post" className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <select
              name="programKey"
              defaultValue={readiness.programKey}
              className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {enabledPrograms.map((p: any) => (
                <option key={p.programKey} value={p.programKey}>
                  {p.displayName}
                </option>
              ))}
            </select>
            <Button type="submit" variant="secondary">Set Program</Button>
          </form>
        </CardContent>
      </Card>

      {/* Top grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-4">
        {/* Readiness */}
        <Card>
          <CardHeader>
            <CardTitle>Readiness</CardTitle>
            <CardDesc>Weighted checklist, program-specific.</CardDesc>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-sm text-slate-600">Score</div>
                <div className="text-3xl font-semibold">{readiness.percent}%</div>
                <div className="text-xs text-slate-600">
                  {readiness.doneWeight}/{readiness.totalWeight} points
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge tone={readiness.percent >= 80 ? "ok" : readiness.percent >= 50 ? "warn" : "danger"}>
                  {readiness.percent >= 80 ? "On track" : readiness.percent >= 50 ? "In progress" : "Needs attention"}
                </Badge>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              {readiness.items.map((i: any) => (
                <div key={i.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                  <div className="text-sm">
                    <div className="font-medium">{i.label}</div>
                    <div className="text-xs text-slate-600">{i.kind} • weight {i.weight}</div>
                  </div>
                  <div className="text-sm">{i.ok ? "✅" : "⬜"}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Snapshot */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Snapshot</CardTitle>
            <CardDesc>Quick scan of key verifications.</CardDesc>
          </CardHeader>
          <CardContent className="space-y-3">
            {["DOT_MEDICAL", "MVR", "CLEARINGHOUSE"].map((t) => {
              const v = verifs.find((x: any) => x.type === t);
              return (
                <div key={t} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
                  <div>
                    <div className="text-sm font-medium">{t}</div>
                    <div className="text-xs text-slate-600">
                      {v?.nextDueAt ? `next due ${new Date(v.nextDueAt).toLocaleDateString()}` : "no next due"}
                    </div>
                  </div>
                  <Badge tone={verifTone(v?.status || "PENDING") as any}>{v?.status || "PENDING"}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Docs + Verifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDesc>Evidence files, expiring docs, uploads.</CardDesc>
          </CardHeader>
          <CardContent>
            <Table>
              <THead>
                <tr>
                  <TH>Type</TH>
                  <TH>File</TH>
                  <TH>Expires</TH>
                  <TH className="text-right">Action</TH>
                </tr>
              </THead>
              <tbody>
                {docs.map((d: any) => (
                  <TR key={d.id}>
                    <TD><Badge tone="info">{d.docType}</Badge></TD>
                    <TD>
                      <div className="font-medium">{d.fileName}</div>
                      <div className="text-xs text-slate-600">{d.id}</div>
                    </TD>
                    <TD className="text-sm text-slate-700">
                      {d.expiresAt ? new Date(d.expiresAt).toLocaleDateString() : "—"}
                    </TD>
                    <TD className="text-right">
                      <Link href={`/documents/${d.id}/download`}>
                        <Button variant="secondary" size="sm">Download</Button>
                      </Link>
                    </TD>
                  </TR>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verifications</CardTitle>
            <CardDesc>Status, next due, and evidence.</CardDesc>
          </CardHeader>
          <CardContent className="space-y-3">
            {verifs.map((v: any) => (
              <div key={v.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-sm font-semibold">{v.type}</div>
                      <Badge tone={verifTone(v.status) as any}>{v.status}</Badge>
                      {v.nextDueAt ? <Badge tone="neutral">next due {new Date(v.nextDueAt).toLocaleDateString()}</Badge> : null}
                    </div>
                    {v.notes ? <div className="mt-2 text-sm text-slate-700 whitespace-pre-wrap">{v.notes}</div> : null}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <form action={`/verifications/${v.id}/complete-from-evidence`} method="post">
                      <Button variant="primary" size="sm" disabled={!v.evidenceDocumentId}>Complete</Button>
                    </form>
                    {v.evidenceDocumentId ? (
                      <Link href={`/documents/${v.evidenceDocumentId}/download`}>
                        <Button variant="secondary" size="sm">View Evidence</Button>
                      </Link>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <form action={`/verifications/${v.id}/evidence`} method="post" className="flex items-center gap-2 flex-wrap">
                    <select
                      name="evidenceDocumentId"
                      defaultValue={v.evidenceDocumentId || ""}
                      className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">No evidence</option>
                      {docs.map((d: any) => (
                        <option key={d.id} value={d.id}>
                          {d.docType}: {d.fileName}
                        </option>
                      ))}
                    </select>
                    <Button variant="secondary" size="sm" type="submit">Save Evidence</Button>
                  </form>

                  <div className="ml-auto flex gap-2">
                    <form action={`/verifications/${v.id}/set`} method="post">
                      <input type="hidden" name="status" value="PASSED" />
                      <Button size="sm" variant="secondary">Pass</Button>
                    </form>
                    <form action={`/verifications/${v.id}/set`} method="post">
                      <input type="hidden" name="status" value="FAILED" />
                      <Button size="sm" variant="danger">Fail</Button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDesc>Unified feed of tasks, notes, documents, verifications, and audits.</CardDesc>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeline.map((i: any) => (
            <div key={`${i.kind}-${i.refId}`} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 px-3 py-2">
              <div>
                <div className="text-xs text-slate-600">{new Date(i.at).toLocaleString()} • {i.kind}</div>
                <div className="text-sm font-medium">{i.title}</div>
                {i.subtitle ? <div className="text-sm text-slate-700 mt-1">{i.subtitle}</div> : null}
              </div>
              {i.kind === "DOCUMENT" ? (
                <Link href={`/documents/${i.refId}/download`}>
                  <Button size="sm" variant="secondary">Download</Button>
                </Link>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
