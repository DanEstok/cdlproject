"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { PageHeader } from "../../../components/ui/PageHeader";
import { Card, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Textarea } from "../../../components/ui/Textarea";

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
    <div className="space-y-6">
      <PageHeader
        title="Create New Case"
        subtitle="Add a new client and create their case record."
        actions={
          <Link href="/cases">
            <Button variant="secondary">Back to Cases</Button>
          </Link>
        }
      />

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <div className="space-y-4">
              <div className="text-sm font-semibold text-slate-900">Client Information</div>
              <div className="text-sm text-slate-600">
                This creates a CLIENT person record, then creates a case linked to that client.
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First name</label>
                <Input name="firstName" required disabled={isSubmitting} placeholder="Enter first name" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Last name</label>
                <Input name="lastName" required disabled={isSubmitting} placeholder="Enter last name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone (optional)</label>
                <Input name="phone" disabled={isSubmitting} placeholder="(555) 123-4567" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email (optional)</label>
                <Input name="email" type="email" disabled={isSubmitting} placeholder="client@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Case notes (optional)</label>
              <Textarea 
                name="caseNotes" 
                rows={4} 
                disabled={isSubmitting} 
                placeholder="Add any initial notes about this case..."
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Case"}
              </Button>
              <Link href="/cases">
                <Button type="button" variant="secondary" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
