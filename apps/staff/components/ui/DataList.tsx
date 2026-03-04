import React from "react";

interface DataListProps {
  children: React.ReactNode;
  className?: string;
}

export function DataList({ children, className = "" }: DataListProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {children}
    </div>
  );
}

interface DataListItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function DataListItem({ label, value, className = "" }: DataListItemProps) {
  return (
    <div className={`flex justify-between items-center py-2 ${className}`}>
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className="text-sm text-slate-900">{value}</span>
    </div>
  );
}
