import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type PremiumButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "ghost" | "outline" | "danger";
  isLoading?: boolean;
};

export function PremiumButton({
  className,
  variant = "gold",
  isLoading,
  disabled,
  children,
  ...props
}: PremiumButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 transition-all duration-300 ease-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 " +
    "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants: Record<string, string> = {
    gold: "bg-black text-white hover:bg-black/90 px-6 py-4 rounded-full font-bold uppercase tracking-widest",
    ghost: "bg-transparent text-black/60 hover:text-black px-6 py-4",
    outline: "bg-transparent text-black border-2 border-black/10 hover:border-black px-6 py-4 rounded-full font-bold",
    danger: "bg-red-600 text-white hover:bg-red-700 px-6 py-4 rounded-full font-bold",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
