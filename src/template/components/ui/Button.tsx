import React, { forwardRef } from "react";
import { cn } from "./cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading = false, disabled, children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold font-sans transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none template-focus-ring btn-press-physics";

    const variantStyles = {
      primary:
        "bg-[var(--debut-bg-coral,#E65C4F)] text-white hover:bg-[var(--debut-bg-coral-hover,#D85244)] active:scale-[0.98] shadow-md hover:shadow-lg",
      secondary:
        "bg-[var(--debut-surface-alabaster,#FFFFFF)] text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] active:scale-[0.98] border border-[var(--debut-rose-gold-border,#E8C4C8)] shadow-xs",
      ghost:
        "text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]",
      outline:
        "border border-[var(--debut-rose-gold-border,#E8C4C8)] text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs rounded-lg gap-1.5 min-h-[36px]",
      md: "h-11 px-5 text-sm rounded-xl gap-2 min-h-[44px]",
      lg: "h-13 px-7 text-base rounded-2xl gap-2.5 min-h-[48px]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
