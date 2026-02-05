import { cn } from "@/lib/utils";
import React from "react";

export function Section({
  id,
  className,
  children,
  subtleTopBorder = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  subtleTopBorder?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        subtleTopBorder && "border-t border-border/70",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
