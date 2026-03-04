import React from "react";

interface FormRowProps {
  label: string;
  children: React.ReactNode;
  hint?: string;
  error?: string;
  className?: string;
}

export function FormRow({ label, children, hint, error, className = "" }: FormRowProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-slate-500">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-rose-600">{error}</p>
      )}
    </div>
  );
}
