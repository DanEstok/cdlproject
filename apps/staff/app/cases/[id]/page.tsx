import { ensureProvisioned, apiFetch } from "../../../lib/api";
import { auth } from "@clerk/nextjs/server";
import { DocumentUploader } from "../../../components/DocumentUploader";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Card, CardContent, CardHeader } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge, StatusBadge } from "../../../components/ui/Badge";
import { DataList, DataListItem } from "../../../components/ui/DataList";
import { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableCell } from "../../../components/ui/Table";

type Case = {
  id: string;
  status: string;
  notes?: string | null;
  clientPersonId: string;
  client: { firstName: string; lastName: string };
};

type Task = {
  id: string;
  title: string;
  status: string;
  dueAt?: string | null;
};

type Note = {
  id: string;
  noteType: string;
  status: string;
  narrative?: string | null;
  createdAt: string;
  templateKey?: string | null;
};

type Document = {
  id: string;
  fileName: string;
  docType: string;
  createdAt: string;
  issueDate?: string | null;
  expiresAt?: string | null;
};

type Verification = {
  id: string;
  type: string;
  status: string;
  nextDueAt?: string | null;
  verifiedAt?: string | null;
  notes?: string | null;
  evidenceDocumentId?: string | null;
  createdAt: string;
};

type TimelineItem = {
  at: string;
  kind: "TASK" | "NOTE" | "DOCUMENT" | "VERIFICATION";
  refId: string;
  title: string;
  description?: string | null;
};

type Readiness = {
  programKey: string | null;
  percent: number;
  doneWeight: number;
  totalWeight: number;
  items: Array<{
    key: string;
    label: string;
    ok: boolean;
    weight: number;
  }>;
};

export default async function CasePage({ params }: { params: { id: string } }) {
  await ensureProvisioned();

  const c = await apiFetch<Case>(`/cases/${params.id}`);
  const tasks = await apiFetch<Task[]>(`/cases/${params.id}/tasks`);
  const notes = await apiFetch<Note[]>(`/cases/${params.id}/notes`);
  const docs = await apiFetch<Document[]>(`/documents?caseId=${params.id}`);
  const verifs = await apiFetch<Verification[]>(`/cases/${params.id}/verifications`);
  const timeline = await apiFetch<TimelineItem[]>(`/cases/${params.id}/timeline`);
  const readiness = await apiFetch<Readiness>(`/cases/${params.id}/readiness`);
  const programs = await apiFetch<Array<{ programKey: string; displayName: string; enabled: boolean }>>(`/programs`);
  const enabledPrograms = programs.filter(p => p.enabled);

  // For uploader (client-side), we need an actual token for browser calls
  const session = await auth();
  const token = await session.getToken();
  if (!token) {
    return <div className="p-6">Not authenticated.</div>;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL!;
  if (!apiBase) {
    return <div className="p-6">Missing NEXT_PUBLIC_API_BASE_URL</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Case: ${c.client.firstName} ${c.client.lastName}`}
        subtitle={`Case ID: ${c.id}`}
        actions={
          <div className="flex items-center gap-3">
            <StatusBadge status={c.status} />
            <Button asChild>
              <a href="/cases">← Back to Cases</a>
            </Button>
          </div>
        }
      />

      {/* Summary Strip */}
      <Card>
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{readiness.percent}%</div>
              <div className="text-sm text-slate-600">Readiness</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{tasks.length}</div>
              <div className="text-sm text-slate-600">Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{docs.length}</div>
              <div className="text-sm text-slate-600">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{verifs.length}</div>
              <div className="text-sm text-slate-600">Verifications</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Wider */}
        <div className="lg:col-span-2 space-y-6">
          {/* Readiness Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Readiness Checklist</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <span className="text-sm font-bold text-slate-900">
                    {readiness.doneWeight}/{readiness.totalWeight} ({readiness.percent}%)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${readiness.percent}%` }}
                  ></div>
                </div>
                <div className="space-y-2">
                  {readiness.items.map((i) => (
                    <div key={i.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                      <span className="text-lg">{i.ok ? "✅" : "⬜"}</span>
                      <span className={`text-sm ${i.ok ? "text-slate-900" : "text-slate-500"}`}>
                        {i.label}
                      </span>
                      <span className="text-xs text-slate-400 ml-auto">({i.weight})</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Documents</h3>
                <DocumentUploader clientPersonId={c.clientPersonId} caseId={c.id} token={token} apiBase={apiBase} />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>File Name</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {docs.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.fileName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{doc.docType}</Badge>
                      </TableCell>
                      <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="secondary" size="sm" asChild>
                          <a href={`/documents/${doc.id}/download`}>Download</a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((i) => (
                  <div key={`${i.kind}-${i.refId}`} className="flex items-start gap-4 p-4 rounded-lg border border-slate-200">
                    <div className="text-2xl">
                      {i.kind === "TASK" ? "✅" : i.kind === "NOTE" ? "📝" : i.kind === "DOCUMENT" ? "📄" : "🔍"}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-slate-900">{i.title}</span>
                        <span className="text-xs text-slate-500">
                          {new Date(i.at).toLocaleDateString()}
                        </span>
                      </div>
                      {i.description && (
                        <p className="text-sm text-slate-600">{i.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Narrower */}
        <div className="space-y-6">
          {/* Client Info Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Client Information</h3>
            </CardHeader>
            <CardContent>
              <DataList>
                <DataListItem label="Name" value={`${c.client.firstName} ${c.client.lastName}`} />
                <DataListItem label="Case ID" value={c.id} />
                <DataListItem label="Status" value={<StatusBadge status={c.status} />} />
              </DataList>
            </CardContent>
          </Card>

          {/* Program Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Program</h3>
            </CardHeader>
            <CardContent>
              <form action={`/cases/${params.id}/program/set`} method="post" className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Program</label>
                  <select 
                    name="programKey" 
                    defaultValue={readiness.programKey || ""}
                    className="w-full h-9 rounded-xl border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  >
                    {enabledPrograms.map((p) => (
                      <option key={p.programKey} value={p.programKey}>
                        {p.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="w-full">Set Program</Button>
              </form>
              <p className="text-xs text-slate-500 mt-2">
                Readiness checklist and scoring update based on the selected program.
              </p>
            </CardContent>
          </Card>

          {/* Tasks Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Recent Tasks</h3>
                <Button variant="secondary" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                    <div>
                      <div className="font-medium text-slate-900">{task.title}</div>
                      {task.dueAt && (
                        <div className="text-sm text-slate-500">Due: {new Date(task.dueAt).toLocaleDateString()}</div>
                      )}
                    </div>
                    <StatusBadge status={task.status} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verifications Card */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Verifications</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {verifs.map((verif) => (
                  <div key={verif.id} className="p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900">{verif.type}</span>
                      <StatusBadge status={verif.status} />
                    </div>
                    {verif.nextDueAt && (
                      <div className="text-xs text-slate-500">Next due: {new Date(verif.nextDueAt).toLocaleDateString()}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
