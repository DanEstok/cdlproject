"use client";

import { useState } from "react";

type DocType =
  | "ID"
  | "DOT_MEDICAL"
  | "MVR"
  | "CLEARINGHOUSE"
  | "COURT"
  | "HOUSING"
  | "EMPLOYMENT"
  | "OTHER";

export function DocumentUploader({
  apiBase,
  token,
  caseId,
  clientPersonId
}: {
  apiBase: string;
  token: string;
  caseId: string;
  clientPersonId: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocType>("OTHER");
  const [issueDate, setIssueDate] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  async function upload() {
    if (!file) return;

    setStatus("Presigning upload…");

    // 1) Presign
    const presignRes = await fetch(`${apiBase}/documents/presign`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        sizeBytes: file.size
      })
    });

    if (!presignRes.ok) {
      const t = await presignRes.text();
      throw new Error(`Presign failed: ${t}`);
    }

    const { storageKey, uploadUrl } = (await presignRes.json()) as {
      storageKey: string;
      uploadUrl: string;
    };

    // 2) Upload file directly to S3/R2
    setStatus("Uploading file to storage…");

    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream"
      },
      body: file
    });

    if (!putRes.ok) {
      const t = await putRes.text();
      throw new Error(`Upload failed: ${t}`);
    }

    // 3) Complete (save metadata in DB)
    setStatus("Finalizing document record…");

    const attachPerson = docType === "ID"; // default rule: IDs belong to the person
    const attachCase = true;              // keep everything case-scoped too (best for workflows)

    const completeRes = await fetch(`${apiBase}/documents/complete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        storageKey,
        fileName: file.name,
        mimeType: file.type || "application/octet-stream",
        sizeBytes: file.size,
        docType,
        caseId: attachCase ? caseId : undefined,
        personId: attachPerson ? clientPersonId : undefined,
        issueDate: issueDate || undefined,
        expiresAt: expiresAt || undefined
      })
    });

    if (!completeRes.ok) {
      const t = await completeRes.text();
      throw new Error(`Complete failed: ${t}`);
    }

    setStatus("Done. If this was DOT_MEDICAL/MVR/CLEARINGHOUSE, a verification was created automatically. Refreshing…");
    // simplest MVP: refresh the page to re-fetch list
    window.location.reload();
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginTop: 10 }}>
      <strong>Upload document</strong>

      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label>
            Type{" "}
            <select value={docType} onChange={(e) => setDocType(e.target.value as DocType)}>
              <option value="ID">ID</option>
              <option value="DOT_MEDICAL">DOT_MEDICAL</option>
              <option value="MVR">MVR</option>
              <option value="CLEARINGHOUSE">CLEARINGHOUSE</option>
              <option value="COURT">COURT</option>
              <option value="HOUSING">HOUSING</option>
              <option value="EMPLOYMENT">EMPLOYMENT</option>
              <option value="OTHER">OTHER</option>
            </select>
          </label>

          <label>
            Issue date (ISO){" "}
            <input
              placeholder="2026-03-02"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
            />
          </label>

          <label>
            Expires at (ISO){" "}
            <input
              placeholder="2027-03-02"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
            />
          </label>
        </div>

        <button type="button" onClick={upload} disabled={!file}>
          Upload
        </button>

        {status ? <div style={{ fontSize: 13, opacity: 0.85 }}>{status}</div> : null}
      </div>
    </div>
  );
}
