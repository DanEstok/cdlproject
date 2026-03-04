import React from "react";

type ButtonVariant = "primary" | "secondary" | "destructive";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
  destructive: "bg-rose-600 text-white hover:bg-rose-700"
};

export function Button({ children, variant = "primary", type = "button", disabled = false, className = "", onClick, asChild = false, size = "md" }: ButtonProps) {
  const sizeClasses = {
    sm: "h-8 px-3 text-xs",
    md: "h-9 px-4 text-sm", 
    lg: "h-10 px-6 text-base"
  };
  
  const baseClasses = `${sizeClasses[size]} rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`;
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${children.props.className || ""} ${baseClasses}`,
    });
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
