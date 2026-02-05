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
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold " +
    "transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 " +
    "disabled:opacity-55 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    gold:
      "text-primary-foreground " +
      "bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(42_98%_62%))] " +
      "shadow-[0_18px_45px_-20px_hsl(var(--primary)/0.65)] " +
      "hover:shadow-[0_22px_58px_-22px_hsl(var(--primary)/0.75)] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent text-foreground/90 " +
      "hover:bg-white/5 active:bg-white/7 border border-transparent",
    outline:
      "bg-white/0 text-foreground/90 border border-border/80 " +
      "hover:bg-white/5 hover:border-border active:bg-white/7",
    danger:
      "text-destructive-foreground " +
      "bg-[linear-gradient(135deg,hsl(var(--destructive)),hsl(0_84%_54%))] " +
      "shadow-[0_18px_45px_-20px_hsl(var(--destructive)/0.55)] hover:-translate-y-0.5 active:translate-y-0",
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200",
          variant === "gold" &&
            "opacity-100 [mask-image:radial-gradient(120px_60px_at_30%_20%,black,transparent_60%)] " +
              "bg-[radial-gradient(circle_at_30%_20%,hsl(0_0%_100%/0.35),transparent_55%)]",
        )}
      />
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span className="relative">{children}</span>
    </button>
  );
}
