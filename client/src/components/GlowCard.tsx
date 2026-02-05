import React from "react";
import { cn } from "@/lib/utils";

export function GlowCard({
  className,
  children,
  "data-testid": dataTestId,
}: {
  className?: string;
  children: React.ReactNode;
  "data-testid"?: string;
}) {
  return (
    <div
      data-testid={dataTestId}
      className={cn(
        "group relative rounded-2xl p-[1px] transition-all duration-300",
        "bg-gradient-to-b from-white/10 via-white/5 to-white/0",
        "hover:from-primary/35 hover:via-primary/10 hover:to-transparent",
        className,
      )}
    >
      <div
        className={cn(
          "grid-noise relative rounded-2xl",
          "bg-gradient-to-b from-card/80 to-card/50",
          "border border-border/70",
          "shadow-[var(--shadow-sm)]",
          "group-hover:shadow-[var(--shadow-md)] transition-all duration-300",
        )}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute -inset-12 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.22),transparent_55%)]" />
          <div className="absolute -inset-12 bg-[radial-gradient(circle_at_80%_60%,hsl(var(--accent)/0.16),transparent_55%)]" />
        </div>
        <div className="relative p-6">{children}</div>
      </div>
    </div>
  );
}
