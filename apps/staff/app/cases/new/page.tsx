"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function NewCasePage() {
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const caseNotes = formData.get("caseNotes") as string;

    try {
      const token = await getToken();
      if (!token) throw new Error("No auth token");

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!apiBase) throw new Error("Missing API base URL");

      // Create person
      const personRes = await fetch(`${apiBase}/people`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "CLIENT",
          firstName,
          lastName,
          phone: phone || undefined,
          email: email || undefined
        })
      });

      if (!personRes.ok) throw new Error("Failed to create person");

      const person = await personRes.json();

      // Create case
      const caseRes = await fetch(`${apiBase}/cases`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientPersonId: person.id,
          notes: caseNotes || undefined
        })
      });

      if (!caseRes.ok) throw new Error("Failed to create case");

      const caseData = await caseRes.json();
      
      // Redirect to case detail
      window.location.href = `/cases/${caseData.id}`;
    } catch (error) {
      console.error("Error creating case:", error);
      alert("Failed to create case. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <a href="/cases">← Back to cases</a>
      <h2 style={{ marginTop: 12 }}>Create New Case</h2>

      <p style={{ opacity: 0.85 }}>
        This creates a CLIENT person record, then creates a case linked to that client.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <div style={{ display: "grid", gap: 6 }}>
          <label>First name</label>
          <input name="firstName" required disabled={isSubmitting} />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Last name</label>
          <input name="lastName" required disabled={isSubmitting} />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Phone (optional)</label>
          <input name="phone" disabled={isSubmitting} />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Email (optional)</label>
          <input name="email" type="email" disabled={isSubmitting} />
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label>Case notes (optional)</label>
          <textarea name="caseNotes" rows={3} disabled={isSubmitting} />
        </div>

        <button type="submit" style={{ marginTop: 8 }} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Case"}
        </button>
      </form>
    </div>
  );
}
