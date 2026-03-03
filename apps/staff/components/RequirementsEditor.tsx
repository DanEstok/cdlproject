"use client";

import { useMemo, useState } from "react";

type ReqRow = {
  kind: "DOC_PRESENT" | "VERIFICATION_PASSED";
  label: string;
  weight: number;
  enabled: boolean;
  docType?: string | null;
  verificationType?: string | null;
};

function validateRow(r: ReqRow) {
  if (!r.label?.trim()) return "Label is required.";
  if (!Number.isFinite(r.weight) || r.weight < 1 || r.weight > 10) return "Weight must be 1-10.";

  if (r.kind === "DOC_PRESENT") {
    if (!r.docType?.trim()) return "docType is required for DOC_PRESENT.";
  }
  if (r.kind === "VERIFICATION_PASSED") {
    if (!r.verificationType?.trim()) return "verificationType is required for VERIFICATION_PASSED.";
  }
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

  const validationErrors = useMemo(() => rows.map(validateRow), [rows]);
  const hasErrors = validationErrors.some(Boolean);

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
    const errs = rows.map(validateRow).filter(Boolean) as string[];
    if (errs.length) {
      e.preventDefault();
      setError(errs[0]);
    } else {
      setError("");
    }
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <h3 style={{ margin: 0 }}>Requirements</h3>
          <div style={{ marginTop: 4, fontSize: 13, opacity: 0.85 }}>
            Program: <strong>{programKey}</strong>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => add("DOC_PRESENT")}>+ Doc requirement</button>
          <button type="button" onClick={() => add("VERIFICATION_PASSED")}>+ Verification requirement</button>
        </div>
      </div>

      {error ? (
        <div style={{ marginTop: 10, padding: 10, border: "1px solid #f2c", background: "#fff5fb" }}>
          <strong>Fix:</strong> {error}
        </div>
      ) : null}

      <form action={saveAction} method="post" onSubmit={beforeSubmit} style={{ marginTop: 12 }}>
        <input type="hidden" name="itemsJson" value={JSON.stringify(rows)} />

        <div style={{ display: "grid", gap: 10 }}>
          {rows.map((r, i) => {
            const rowErr = validationErrors[i];
            return (
              <div key={i} style={{ border: "1px solid #ddd", padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                    <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      Enabled
                      <input
                        type="checkbox"
                        checked={r.enabled}
                        onChange={(e) => updateRow(i, { enabled: e.target.checked })}
                      />
                    </label>

                    <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      Kind
                      <select
                        value={r.kind}
                        onChange={(e) => {
                          const k = e.target.value as ReqRow["kind"];
                          updateRow(i, {
                            kind: k,
                            docType: k === "DOC_PRESENT" ? (r.docType || "ID") : null,
                            verificationType: k === "VERIFICATION_PASSED" ? (r.verificationType || "DOT_MEDICAL") : null
                          });
                        }}
                      >
                        <option value="DOC_PRESENT">DOC_PRESENT</option>
                        <option value="VERIFICATION_PASSED">VERIFICATION_PASSED</option>
                      </select>
                    </label>

                    <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      Weight
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={r.weight}
                        onChange={(e) => updateRow(i, { weight: Number(e.target.value) })}
                        style={{ width: 70 }}
                      />
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                    <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1}>↓</button>
                    <button type="button" onClick={() => remove(i)}>Remove</button>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                  <label style={{ display: "grid", gap: 6 }}>
                    Label
                    <input
                      value={r.label}
                      onChange={(e) => updateRow(i, { label: e.target.value })}
                      placeholder="Example: DOT Medical passed"
                    />
                  </label>

                  {r.kind === "DOC_PRESENT" ? (
                    <label style={{ display: "grid", gap: 6 }}>
                      docType
                      <input
                        value={r.docType || ""}
                        onChange={(e) => updateRow(i, { docType: e.target.value, verificationType: null })}
                        placeholder="ID, HOUSING, COURT, DOT_MEDICAL, etc."
                      />
                    </label>
                  ) : null}

                  {r.kind === "VERIFICATION_PASSED" ? (
                    <label style={{ display: "grid", gap: 6 }}>
                      verificationType
                      <input
                        value={r.verificationType || ""}
                        onChange={(e) => updateRow(i, { verificationType: e.target.value, docType: null })}
                        placeholder="DOT_MEDICAL, MVR, CLEARINGHOUSE"
                      />
                    </label>
                  ) : null}

                  {rowErr ? (
                    <div style={{ fontSize: 13, opacity: 0.85, border: "1px solid #f2c", padding: 10, background: "#fff5fb" }}>
                      {rowErr}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button type="submit" disabled={hasErrors}>Save requirements</button>
          <span style={{ fontSize: 13, opacity: 0.85 }}>
            {hasErrors ? "Fix validation errors to save." : "Ready to save."}
          </span>
        </div>
      </form>
    </div>
  );
}
