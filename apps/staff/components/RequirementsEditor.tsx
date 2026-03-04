"use client";

import { useMemo, useState } from "react";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

type ReqRow = {
  kind: "DOC_PRESENT" | "VERIFICATION_PASSED";
  label: string;
  weight: number;
  enabled: boolean;
  docType?: string | null;
  verificationType?: string | null;
};

function validateRow(r: ReqRow) {
  if (!r.label?.trim()) return "Label required";
  if (!Number.isFinite(r.weight) || r.weight < 1 || r.weight > 10) return "Weight 1–10";

  if (r.kind === "DOC_PRESENT" && !r.docType?.trim()) return "docType required";
  if (r.kind === "VERIFICATION_PASSED" && !r.verificationType?.trim()) return "verificationType required";

  return null;
}

export function RequirementsEditor({
  programKey,
  initial,
  saveAction
}: {
  programKey: string;
  initial: ReqRow[];
  saveAction: string;
}) {
  const [rows, setRows] = useState<ReqRow[]>(initial);
  const [error, setError] = useState<string>("");

  const errors = useMemo(() => rows.map(validateRow), [rows]);
  const hasErrors = errors.some(Boolean);

  function updateRow(i: number, patch: Partial<ReqRow>) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  function move(i: number, dir: -1 | 1) {
    setRows((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
      return copy;
    });
  }

  function remove(i: number) {
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  function add(kind: ReqRow["kind"]) {
    setRows((prev) => [
      ...prev,
      {
        kind,
        label: "",
        weight: 1,
        enabled: true,
        docType: kind === "DOC_PRESENT" ? "ID" : null,
        verificationType: kind === "VERIFICATION_PASSED" ? "DOT_MEDICAL" : null
      }
    ]);
  }

  function beforeSubmit(e: React.FormEvent) {
    const first = errors.find(Boolean);
    if (first) {
      e.preventDefault();
      setError(first as string);
    } else {
      setError("");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-sm font-semibold">Checklist</div>
          <Badge tone="info">{programKey}</Badge>
          <Badge tone={hasErrors ? "warn" : "ok"}>{hasErrors ? "Needs review" : "Valid"}</Badge>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button type="button" variant="secondary" onClick={() => add("DOC_PRESENT")}>
            + Doc requirement
          </Button>
          <Button type="button" variant="secondary" onClick={() => add("VERIFICATION_PASSED")}>
            + Verification requirement
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <div className="font-semibold">Fix required</div>
          <div className="mt-1">{error}</div>
        </div>
      ) : null}

      <form action={saveAction} method="post" onSubmit={beforeSubmit}>
        <input type="hidden" name="itemsJson" value={JSON.stringify(rows)} />

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">On</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Kind</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Label</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Rule</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">Weight</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide">Actions</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, i) => {
                const rowErr = errors[i];
                return (
                  <tr key={i} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm">
                      <input
                        type="checkbox"
                        checked={r.enabled}
                        onChange={(e) => updateRow(i, { enabled: e.target.checked })}
                      />
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <select
                        value={r.kind}
                        onChange={(e) => {
                          const kind = e.target.value as ReqRow["kind"];
                          updateRow(i, {
                            kind,
                            docType: kind === "DOC_PRESENT" ? (r.docType || "ID") : null,
                            verificationType: kind === "VERIFICATION_PASSED" ? (r.verificationType || "DOT_MEDICAL") : null
                          });
                        }}
                        className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="DOC_PRESENT">DOC_PRESENT</option>
                        <option value="VERIFICATION_PASSED">VERIFICATION_PASSED</option>
                      </select>
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <input
                        value={r.label}
                        onChange={(e) => updateRow(i, { label: e.target.value })}
                        placeholder="Example: DOT Medical passed"
                        className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                      {rowErr ? <div className="mt-1 text-xs text-rose-700">{rowErr}</div> : null}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      {r.kind === "DOC_PRESENT" ? (
                        <input
                          value={r.docType || ""}
                          onChange={(e) => updateRow(i, { docType: e.target.value, verificationType: null })}
                          placeholder="ID, HOUSING, COURT"
                          className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      ) : (
                        <input
                          value={r.verificationType || ""}
                          onChange={(e) => updateRow(i, { verificationType: e.target.value, docType: null })}
                          placeholder="DOT_MEDICAL, MVR"
                          className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                      )}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={r.weight}
                        onChange={(e) => updateRow(i, { weight: Number(e.target.value) })}
                        className="h-9 w-24 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </td>

                    <td className="px-4 py-3 text-sm text-right">
                      <div className="inline-flex gap-2">
                        <Button type="button" size="sm" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}>
                          ↑
                        </Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => move(i, 1)} disabled={i === rows.length - 1}>
                          ↓
                        </Button>
                        <Button type="button" size="sm" variant="danger" onClick={() => remove(i)}>
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-600">
                    No requirements yet. Add one to begin.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <Button type="submit" variant="primary" disabled={hasErrors}>
            Save requirements
          </Button>
          <div className="text-sm text-slate-600">
            {hasErrors ? "Fix validation issues before saving." : "Changes are ready to save."}
          </div>
        </div>
      </form>
    </div>
  );
}
