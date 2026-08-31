import * as React from "react";
import { cn } from "./cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left font-sans">
        {label ? (
          <label
            htmlFor={inputId}
            className="block text-xs font-cinzel font-bold uppercase tracking-wider text-[var(--debut-text-noir,#26131C)]"
          >
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] px-3.5 py-2 text-base text-[var(--debut-text-noir,#26131C)] placeholder:text-[var(--debut-text-muted,#704D5B)]/60 transition-colors focus:border-[var(--debut-bg-coral,#E65C4F)] focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 template-focus-ring",
            error && "border-red-500 focus:border-red-600",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-red-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[var(--debut-text-muted,#704D5B)]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
