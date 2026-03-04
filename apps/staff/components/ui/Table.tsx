import React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className={`overflow-hidden rounded-lg border border-slate-200 ${className}`}>
      <table className="min-w-full divide-y divide-slate-200">
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHeader({ children, className = "" }: TableHeaderProps) {
  return (
    <thead className={`bg-slate-50 ${className}`}>
      <tr>{children}</tr>
    </thead>
  );
}

interface TableHeaderCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHeaderCell({ children, className = "" }: TableHeaderCellProps) {
  return (
    <th className={`px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function TableBody({ children, className = "" }: TableBodyProps) {
  return (
    <tbody className={`bg-white divide-y divide-slate-200 ${className}`}>
      {children}
    </tbody>
  );
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
}

export function TableRow({ children, className = "" }: TableRowProps) {
  return (
    <tr className={`hover:bg-slate-50 ${className}`}>
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableCell({ children, className = "" }: TableCellProps) {
  return (
    <td className={`px-4 py-3 text-sm text-slate-900 ${className}`}>
      {children}
    </td>
  );
}
