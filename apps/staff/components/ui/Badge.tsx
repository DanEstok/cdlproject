import React from "react";

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "primary" | "secondary";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses = {
  success: "bg-emerald-100 text-emerald-700 border-emerald-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200", 
  danger: "bg-rose-100 text-rose-700 border-rose-200",
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
  primary: "bg-blue-100 text-blue-700 border-blue-200",
  secondary: "bg-slate-100 text-slate-700 border-slate-200"
};

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Status-specific badges
export function StatusBadge({ status }: { status: string }) {
  const getStatusVariant = (status: string): BadgeVariant => {
    switch (status.toUpperCase()) {
      case "DONE":
      case "PASSED":
      case "COMPLETED":
        return "success";
      case "IN_PROGRESS":
      case "PENDING":
        return "warning";
      case "FAILED":
      case "ERROR":
        return "danger";
      default:
        return "neutral";
    }
  };

  return <Badge variant={getStatusVariant(status)}>{status}</Badge>;
}
