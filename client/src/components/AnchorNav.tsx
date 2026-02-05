import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/PremiumButton";
import { Badge } from "@/components/ui/badge";
import { Car, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

type NavItem = { id: string; label: string };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function AnchorNav({
  onContactClick,
  onOpenLeads,
}: {
  onContactClick: () => void;
  onOpenLeads: () => void;
}) {
  const items: NavItem[] = useMemo(
    () => [
      { id: "how", label: "How it Works" },
      { id: "inventory", label: "Inventory" },
      { id: "why", label: "Why Butta" },
    ],
    [],
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-50",
        "bg-background/55 backdrop-blur-xl",
        "border-b transition-all duration-300",
        scrolled ? "border-border/80" : "border-transparent",
      )}
      data-testid="nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className={cn(
              "group inline-flex items-center gap-2",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 rounded-xl px-2 py-1",
            )}
            data-testid="nav-logo"
          >
            <div className="relative">
              <div className="h-9 w-9 rounded-xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(42_98%_62%))] shadow-[0_18px_55px_-28px_hsl(var(--primary)/0.8)] grid place-items-center">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="absolute -inset-2 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.24),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="leading-tight text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold tracking-tight">Butta the Auctioner</span>
                <Badge
                  variant="secondary"
                  className="hidden sm:inline-flex bg-white/5 text-foreground/80 border-border/60"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
                  Dealer Direct
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground hidden sm:block">
                Auction buys • transparent pricing • fast delivery
              </div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-2">
            {items.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => scrollToId(it.id)}
                className={cn(
                  "px-3 py-2 rounded-xl text-sm text-foreground/80",
                  "hover:text-foreground hover:bg-white/5",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20",
                  "transition-all duration-200",
                )}
                data-testid={`nav-link-${it.id}`}
              >
                {it.label}
              </button>
            ))}
            <button
              type="button"
              onClick={onOpenLeads}
              className={cn(
                "px-3 py-2 rounded-xl text-sm text-foreground/80 inline-flex items-center gap-2",
                "hover:text-foreground hover:bg-white/5",
                "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20",
                "transition-all duration-200",
              )}
              data-testid="nav-open-leads"
              title="Leads (admin)"
            >
              <ShieldCheck className="h-4 w-4 text-accent" />
              Leads
            </button>
          </div>

          <div className="flex items-center gap-2">
            <PremiumButton
              variant="outline"
              className="hidden sm:inline-flex"
              onClick={() => scrollToId("inventory")}
              data-testid="nav-browse"
            >
              Browse cars
            </PremiumButton>
            <PremiumButton
              variant="gold"
              onClick={onContactClick}
              data-testid="nav-contact"
            >
              <PhoneCall className="h-4 w-4" />
              Contact Butta
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
}
