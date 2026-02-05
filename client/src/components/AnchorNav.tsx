import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PremiumButton } from "@/components/PremiumButton";

export function AnchorNav({
  onContactClick,
}: {
  onContactClick: () => void;
  onOpenLeads: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled ? "bg-white/80 backdrop-blur-md py-3 md:py-4 border-b border-black/5" : "bg-transparent py-6 md:py-8"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xl md:text-2xl font-black italic tracking-tighter">
          Butta.
        </button>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-black/40">
            <button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black transition-colors">Process</button>
            <button onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-black transition-colors">Why Us</button>
          </div>
          <PremiumButton variant="gold" onClick={onContactClick} className="px-4 py-2 md:px-6 md:py-2 text-[10px] md:text-xs">
            Direct Line
          </PremiumButton>
        </div>
      </div>
    </nav>
  );
}
