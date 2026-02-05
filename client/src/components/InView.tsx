import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function InView({
  children,
  className,
  delayMs = 0,
  once = true,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  once?: boolean;
  "data-testid"?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.2 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      data-testid={dataTestId}
      style={{ animationDelay: `${delayMs}ms` }}
      className={cn(
        "will-change-transform",
        inView ? "animate-in-up" : "opacity-0 translate-y-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
