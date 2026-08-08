import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#86BC25] text-white hover:bg-[#709F1E] shadow-[0_1px_0_0_rgba(0,0,0,0.08)]",
  secondary:
    "bg-transparent text-white border border-white/30 hover:border-white/70 hover:bg-white/5",
  ghost:
    "bg-transparent text-slate-800 border border-slate-200 hover:border-slate-400",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-none px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
