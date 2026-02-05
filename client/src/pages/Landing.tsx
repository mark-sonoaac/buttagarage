import React, { useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { AnchorNav } from "@/components/AnchorNav";
import { ContactButtaDialog } from "@/components/ContactButtaDialog";
import { LeadsDrawer } from "@/components/LeadsDrawer";
import { Section, Container } from "@/components/Section";
import { PremiumButton } from "@/components/PremiumButton";
import { InView } from "@/components/InView";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Car, Gavel, PhoneCall, Sparkles, ShieldCheck } from "lucide-react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Landing() {
  const [contactOpen, setContactOpen] = useState(false);
  const [leadsOpen, setLeadsOpen] = useState(false);

  const seo = useMemo(() => ({
    title: "Butta the Auctioner — Premium Auto Sourcing",
    description: "Bespoke vehicle sourcing straight from auto auctions. Professional, transparent, and direct.",
  }), []);

  return (
    <div className="min-h-screen bg-white text-black" id="top" data-testid="page">
      <Seo title={seo.title} description={seo.description} />
      <AnchorNav onContactClick={() => setContactOpen(true)} onOpenLeads={() => setLeadsOpen(true)} />

      <main className="space-y-20 md:space-y-32 py-16 md:py-20 overflow-x-hidden">
        {/* HERO */}
        <Section>
          <Container>
            <div className="max-w-4xl text-left md:text-left px-4 md:px-0">
              <Badge variant="outline" className="mb-6 rounded-full px-4 py-1 border-black/10 text-black/60 font-medium">
                Established 2024
              </Badge>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] font-black mb-8 break-words" data-testid="hero-headline">
                Auction Prices.<br className="hidden sm:block" />Street Ready.
              </h1>
              <p className="text-lg md:text-2xl text-black/60 max-w-2xl mb-12 font-light leading-relaxed" data-testid="hero-subheadline">
                Butta buys direct. No middleman markups. Just clean vehicles at prices the big dealers can't touch.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <PremiumButton variant="gold" onClick={() => setContactOpen(true)} className="w-full sm:w-auto bg-black text-white hover:bg-black/90 px-8 py-6 rounded-full text-lg shadow-none" data-testid="hero-cta-contact">
                  Start Sourcing
                </PremiumButton>
                <PremiumButton variant="outline" onClick={() => scrollToId("how")} className="w-full sm:w-auto border-black/10 hover:bg-black/5 px-8 py-6 rounded-full text-lg shadow-none" data-testid="hero-cta-how">
                  The Process
                </PremiumButton>
              </div>
            </div>
          </Container>
        </Section>

        {/* HOW IT WORKS - ASYMMETRIC / OVAL */}
        <Section id="how">
          <Container className="px-4 md:px-0">
            <div className="space-y-16 md:space-y-24">
              <div className="md:stagger-left max-w-lg">
                <div className="oval-text bg-black text-white p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl mb-4 font-black">1. The Spec</h3>
                  <p className="text-white/70 text-base md:text-lg">Send your budget and must-haves. We clear the noise and find the target.</p>
                </div>
              </div>

              <div className="md:stagger-right max-w-lg md:ml-auto">
                <div className="oval-text bg-white border-black border-2 p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl mb-4 font-black text-black">2. The Bid</h3>
                  <p className="text-black/60 text-base md:text-lg">We use auction access to source condition-verified vehicles with discipline.</p>
                </div>
              </div>

              <div className="md:stagger-left max-w-lg">
                <div className="oval-text bg-black text-white p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl mb-4 font-black">3. The Key</h3>
                  <p className="text-white/70 text-base md:text-lg">Transparent breakdown. Direct handoff. No games, just your next drive.</p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* WHY BUTTA - STAGGERED CARDS */}
        <Section id="why">
          <Container className="px-4 md:px-0">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-7xl font-black leading-none">Why trust Butta?</h2>
                <p className="text-lg md:text-xl text-black/60">We operate with the transparency the industry is missing.</p>
              </div>
              <div className="space-y-8 md:space-y-12">
                {[
                  { title: "No Markups", body: "You pay what we pay at auction, plus a flat service fee." },
                  { title: "Verified Condition", body: "Every car is vetted via condition reports and expert eyes." },
                  { title: "Direct Access", body: "We skip the retail overhead to pass the savings to you." }
                ].map((item, i) => (
                  <InView key={i} delayMs={i * 100}>
                    <div className={cn("p-8 md:p-10 border border-black/5 rounded-[32px] md:rounded-[40px] hover:border-black/20 transition-all", i % 2 === 0 ? "md:stagger-right" : "md:stagger-left")}>
                      <h4 className="text-xl md:text-2xl font-black mb-2">{item.title}</h4>
                      <p className="text-black/60 leading-relaxed text-sm md:text-base">{item.body}</p>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container className="text-center px-4 md:px-0">
            <div className="max-w-3xl mx-auto py-16 md:py-20 border-y border-black/5">
              <h2 className="text-4xl md:text-7xl font-black mb-8 md:mb-10 italic">Ready to drive?</h2>
              <PremiumButton variant="gold" onClick={() => setContactOpen(true)} className="w-full sm:w-auto bg-black text-white px-10 py-6 md:px-12 md:py-8 rounded-full text-lg md:text-xl" data-testid="footer-cta">
                Contact Butta Directly
              </PremiumButton>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="py-12 border-t border-black/5">
        <Container className="px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-black italic">Butta.</div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-black/40">
              <button onClick={() => setLeadsOpen(true)} className="hover:text-black">Admin</button>
              <button onClick={() => scrollToId("how")} className="hover:text-black">Process</button>
              <button onClick={() => scrollToId("why")} className="hover:text-black">Why Us</button>
            </div>
            <p className="text-sm text-black/30">© 2024 Butta the Auctioner</p>
          </div>
        </Container>

        <ContactButtaDialog open={contactOpen} onOpenChange={setContactOpen} />
        <LeadsDrawer open={leadsOpen} onOpenChange={setLeadsOpen} />
      </footer>
    </div>
  );
}
