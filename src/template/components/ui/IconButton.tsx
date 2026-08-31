import React, { forwardRef } from "react";
import { cn } from "./cn";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant = "secondary", size = "md", "aria-label": ariaLabel, children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none shrink-0 template-focus-ring btn-press-physics";

    const variantStyles = {
      primary:
        "bg-[var(--debut-bg-coral,#E65C4F)] text-white hover:bg-[var(--debut-bg-coral-hover,#D85244)] active:scale-95 shadow-md",
      secondary:
        "bg-[var(--debut-surface-alabaster,#FFFFFF)] text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] active:scale-95 border border-[var(--debut-rose-gold-border,#E8C4C8)] shadow-xs",
      ghost:
        "text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] active:scale-95",
      outline:
        "border border-[var(--debut-rose-gold-border,#E8C4C8)] text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] active:scale-95",
    };

    const sizeStyles = {
      sm: "w-9 h-9 min-w-[36px] min-h-[36px] rounded-lg text-xs",
      md: "w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl text-sm",
      lg: "w-13 h-13 min-w-[48px] min-h-[48px] rounded-2xl text-base",
    };

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
