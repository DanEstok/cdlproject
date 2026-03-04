import { cn } from "./cn";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  asChild?: boolean;
};

export function Button({
  className,
  variant = "secondary",
  size = "md",
  asChild = false,
  children,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = size === "sm" ? "h-8 px-3 text-sm" : "h-9 px-4 text-sm";
  const variants =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "danger"
        ? "bg-rose-600 text-white hover:bg-rose-700"
        : variant === "ghost"
          ? "bg-transparent hover:bg-slate-100"
          : "bg-white border border-slate-200 hover:bg-slate-50";

  const buttonClasses = cn(base, sizes, variants, className);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(children.props.className, buttonClasses),
    });
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
