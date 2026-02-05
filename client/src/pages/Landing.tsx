import React, { useMemo, useState } from "react";
import { Seo } from "@/components/Seo";
import { AnchorNav } from "@/components/AnchorNav";
import { ContactButtaDialog } from "@/components/ContactButtaDialog";
import { LeadsDrawer } from "@/components/LeadsDrawer";
import { Section, Container } from "@/components/Section";
import { GlowCard } from "@/components/GlowCard";
import { PremiumButton } from "@/components/PremiumButton";
import { InView } from "@/components/InView";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  ArrowRight,
  BadgeCheck,
  Car,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Gavel,
  Handshake,
  Mail,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const inventoryCards = [
  {
    name: "Clean Daily Drivers",
    priceNote: "Auction buy + transparent fees",
    points: ["Inspected basics", "Budget-friendly", "Quick turnaround"],
    accent: "from-primary/20 via-white/5 to-transparent",
    icon: Car,
  },
  {
    name: "Family SUVs & Vans",
    priceNote: "Roomy, safe, reliable picks",
    points: ["3rd-row options", "No surprise add-ons", "Trade-in guidance"],
    accent: "from-accent/18 via-white/5 to-transparent",
    icon: Truck,
  },
  {
    name: "Work Trucks",
    priceNote: "Ready for the grind",
    points: ["Towing-focused options", "Fleet-style sourcing", "Delivery available"],
    accent: "from-rose-500/15 via-white/5 to-transparent",
    icon: Handshake,
  },
] as const;

export default function Landing() {
  const [contactOpen, setContactOpen] = useState(false);
  const [leadsOpen, setLeadsOpen] = useState(false);

  const seo = useMemo(
    () => ({
      title: "Butta the Auctioner — Dealer-Direct Auction Cars",
      description:
        "Buy your next car the smart way. Butta the Auctioner sources clean vehicles from auto auctions with transparent pricing and fast delivery. Contact Butta to get matched today.",
    }),
    [],
  );

  return (
    <div className="min-h-screen mesh-bg" id="top" data-testid="page">
      <Seo title={seo.title} description={seo.description} />
      <AnchorNav onContactClick={() => setContactOpen(true)} onOpenLeads={() => setLeadsOpen(true)} />

      <main>
        {/* HERO */}
        <Section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-28 -left-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.35),transparent_55%)] blur-2xl" />
            <div className="absolute top-10 -right-24 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_40%_40%,hsl(var(--accent)/0.22),transparent_58%)] blur-2xl" />
            <div className="absolute -bottom-40 left-1/3 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_50%_50%,hsl(330_86%_60%/0.18),transparent_60%)] blur-2xl" />
          </div>

          <Container className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center">
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-3 py-1.5 text-xs text-foreground/80 shadow-[var(--shadow-2xs)]">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span data-testid="hero-pill">Auction access. Dealer speed. Street-level honesty.</span>
                </div>

                <h1
                  className="mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-balance"
                  data-testid="hero-headline"
                >
                  Drive off with an{" "}
                  <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(42_98%_62%),hsl(var(--accent)))]">
                    auction deal
                  </span>{" "}
                  — without the auction chaos.
                </h1>

                <p
                  className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl"
                  data-testid="hero-subheadline"
                >
                  Butta the Auctioner finds clean vehicles through auto auctions, breaks down the numbers clearly,
                  and helps you buy with confidence. Transparent pricing, quick sourcing, and a premium buying
                  experience.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                  <PremiumButton
                    variant="gold"
                    onClick={() => setContactOpen(true)}
                    data-testid="hero-cta-contact"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Contact Butta
                    <ArrowRight className="h-4 w-4 opacity-80" />
                  </PremiumButton>

                  <PremiumButton
                    variant="outline"
                    onClick={() => scrollToId("inventory")}
                    data-testid="hero-cta-browse"
                  >
                    Browse inventory style
                    <ArrowRight className="h-4 w-4 opacity-70" />
                  </PremiumButton>

                  <button
                    type="button"
                    onClick={() => setLeadsOpen(true)}
                    className={cn(
                      "sm:ml-auto inline-flex items-center gap-2 text-sm text-foreground/75",
                      "hover:text-foreground transition-colors",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 rounded-xl px-3 py-2",
                    )}
                    data-testid="hero-open-leads"
                    title="Leads (admin)"
                  >
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    Open leads
                  </button>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                  {[
                    { icon: BadgeCheck, label: "Verified pricing breakdown", value: "No hidden add-ons" },
                    { icon: Clock3, label: "Fast sourcing", value: "Same-week options" },
                    { icon: CheckCircle2, label: "Clean deal flow", value: "Simple, guided steps" },
                  ].map((s, idx) => (
                    <div
                      key={idx}
                      className="glass rounded-2xl p-4 grid-noise"
                      data-testid={`hero-stat-${idx}`}
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <s.icon className="h-4 w-4 text-primary" />
                        <span>{s.label}</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero right: abstract "pricing card" */}
              <div className="relative">
                <div className="absolute -inset-6 rounded-[2.25rem] bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.25),transparent_55%)] blur-xl" />
                <div className="relative glass rounded-[2.25rem] p-6 sm:p-7 grid-noise" data-testid="hero-card">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Today’s deal format</div>
                      <div className="mt-1 text-2xl font-semibold">
                        Auction Buy <span className="text-muted-foreground">→</span> Customer Ready
                      </div>
                    </div>
                    <Badge className="bg-primary text-primary-foreground" data-testid="hero-badge">
                      Premium
                    </Badge>
                  </div>

                  <div className="mt-6 rounded-2xl border border-border/70 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Vehicle price</span>
                      <span className="font-semibold">$8,900</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Auction / transport</span>
                      <span className="font-semibold">$650</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Butta fee</span>
                      <span className="font-semibold">$450</span>
                    </div>
                    <div className="mt-4 h-px bg-border/70" />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-foreground/85">Out-the-door estimate</span>
                      <span className="text-xl font-semibold text-transparent bg-clip-text bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(42_98%_62%))]">
                        $10,000
                      </span>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      No smoke. No mirrors. Just numbers you can trust.
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { icon: Gavel, label: "Auction access", sub: "We source for you" },
                      { icon: CircleDollarSign, label: "Transparent totals", sub: "Clear line items" },
                      { icon: Truck, label: "Delivery options", sub: "Local & regional" },
                      { icon: ShieldCheck, label: "Dealer mindset", sub: "Professional process" },
                    ].map((f, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-border/70 bg-[linear-gradient(180deg,hsl(var(--card)/0.65),hsl(225_28%_10%/0.35))] p-3"
                        data-testid={`hero-feature-${idx}`}
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <f.icon className="h-4 w-4 text-accent" />
                          {f.label}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{f.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <PremiumButton
                      variant="gold"
                      className="w-full"
                      onClick={() => setContactOpen(true)}
                      data-testid="hero-card-cta"
                    >
                      Get matched to a deal
                      <ArrowRight className="h-4 w-4 opacity-80" />
                    </PremiumButton>
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground">
                    “Send your budget + must-haves. We’ll source options and break down the total.”
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* HOW IT WORKS */}
        <Section id="how" subtleTopBorder className="relative">
          <Container className="py-14 sm:py-18 lg:py-20">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <Badge
                  variant="secondary"
                  className="bg-white/5 border-border/70 text-foreground/80"
                  data-testid="how-badge"
                >
                  How it works
                </Badge>
                <h2 className="mt-4 text-3xl sm:text-4xl" data-testid="how-title">
                  A premium purchase flow — from text to title.
                </h2>
                <p className="mt-3 text-muted-foreground max-w-2xl" data-testid="how-subtitle">
                  You don’t need auction experience. You need a trusted operator. Here’s the 3-step system.
                </p>
              </div>

              <PremiumButton
                variant="outline"
                onClick={() => setContactOpen(true)}
                data-testid="how-cta"
              >
                Start the 3-step flow <ArrowRight className="h-4 w-4 opacity-70" />
              </PremiumButton>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
              {[
                {
                  icon: PhoneCall,
                  title: "1) Send the spec",
                  body: "Text your budget, preferred make/model, and timeline. We’ll clarify the must-haves in minutes.",
                  accent: "from-primary/20",
                },
                {
                  icon: Gavel,
                  title: "2) We source + bid",
                  body: "We pull auction options, compare condition reports, and bid with discipline — not hype.",
                  accent: "from-accent/18",
                },
                {
                  icon: Handshake,
                  title: "3) Clear totals, smooth pickup",
                  body: "You get a transparent breakdown and a clean handoff. Delivery available when it makes sense.",
                  accent: "from-emerald-500/14",
                },
              ].map((step, idx) => (
                <InView key={idx} delayMs={idx * 110} data-testid={`how-step-${idx}`}>
                  <GlowCard>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-11 w-11 rounded-2xl grid place-items-center border border-border/70",
                          "bg-[linear-gradient(180deg,hsl(var(--card)),hsl(225_28%_10%/0.65))]",
                          "shadow-[var(--shadow-2xs)]",
                        )}
                      >
                        <step.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-lg font-semibold" data-testid={`how-step-${idx}-title`}>
                        {step.title}
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed" data-testid={`how-step-${idx}-body`}>
                      {step.body}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Step {idx + 1} of 3
                      </span>
                      <span className="text-xs font-semibold text-primary">Done right.</span>
                    </div>
                  </GlowCard>
                </InView>
              ))}
            </div>
          </Container>
        </Section>

        {/* INVENTORY */}
        <Section id="inventory" subtleTopBorder className="relative overflow-hidden">
          <Container className="py-14 sm:py-18 lg:py-20">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-12 items-start">
              <div>
                <Badge
                  variant="secondary"
                  className="bg-white/5 border-border/70 text-foreground/80"
                  data-testid="inventory-badge"
                >
                  Inventory style
                </Badge>
                <h2 className="mt-4 text-3xl sm:text-4xl" data-testid="inventory-title">
                  Auction-sourced vehicles — curated for real life.
                </h2>
                <p className="mt-3 text-muted-foreground max-w-xl" data-testid="inventory-subtitle">
                  This section is intentionally lightweight: it shows the type of inventory we target and how we price it.
                  Want exact options? Hit “Contact Butta” and tell us your budget.
                </p>

                <div className="mt-7 glass rounded-2xl p-5 grid-noise" data-testid="inventory-note">
                  <div className="flex items-center gap-2 font-semibold">
                    <ShieldCheck className="h-4 w-4 text-accent" />
                    Transparent pricing promise
                  </div>
                  <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                    {[
                      "You see the line items (vehicle, auction fees, transport, our fee).",
                      "We don’t bait with fake low prices and add surprise packages.",
                      "If a car looks risky on reports, we pass — simple.",
                    ].map((t, i) => (
                      <li key={i} className="flex items-start gap-2" data-testid={`inventory-promise-${i}`}>
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <PremiumButton
                    variant="gold"
                    onClick={() => setContactOpen(true)}
                    data-testid="inventory-cta-contact"
                  >
                    Contact Butta <ArrowRight className="h-4 w-4 opacity-80" />
                  </PremiumButton>
                  <PremiumButton
                    variant="outline"
                    onClick={() => scrollToId("why")}
                    data-testid="inventory-cta-why"
                  >
                    Why this works <ArrowRight className="h-4 w-4 opacity-70" />
                  </PremiumButton>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {inventoryCards.map((c, idx) => (
                  <InView key={c.name} delayMs={idx * 100} data-testid={`inventory-card-${idx}`}>
                    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 via-white/5 to-white/0 hover:from-primary/30 transition-all duration-300">
                      <div className="relative rounded-2xl border border-border/70 bg-[linear-gradient(180deg,hsl(var(--card)/0.78),hsl(225_28%_10%/0.45))] p-5 shadow-[var(--shadow-xs)] group-hover:shadow-[var(--shadow-sm)] transition-all duration-300 overflow-hidden">
                        <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", `bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.16),transparent_55%)]`)} />
                        <div className="relative">
                          <div className="flex items-center justify-between gap-3">
                            <div className="h-11 w-11 rounded-2xl grid place-items-center border border-border/70 bg-white/5">
                              <c.icon className="h-5 w-5 text-primary" />
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-white/5 border-border/70 text-foreground/75"
                              data-testid={`inventory-card-${idx}-badge`}
                            >
                              Auction-ready
                            </Badge>
                          </div>

                          <div className="mt-4 text-lg font-semibold" data-testid={`inventory-card-${idx}-title`}>
                            {c.name}
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground" data-testid={`inventory-card-${idx}-price`}>
                            {c.priceNote}
                          </div>

                          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                            {c.points.map((p, i) => (
                              <li key={i} className="flex items-start gap-2" data-testid={`inventory-card-${idx}-point-${i}`}>
                                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-5">
                            <PremiumButton
                              variant="outline"
                              className="w-full"
                              onClick={() => setContactOpen(true)}
                              data-testid={`inventory-card-${idx}-cta`}
                            >
                              Request options <ArrowRight className="h-4 w-4 opacity-70" />
                            </PremiumButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* WHY BUTTA */}
        <Section id="why" subtleTopBorder className="relative">
          <Container className="py-14 sm:py-18 lg:py-20">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <Badge
                  variant="secondary"
                  className="bg-white/5 border-border/70 text-foreground/80"
                  data-testid="why-badge"
                >
                  Why Butta
                </Badge>
                <h2 className="mt-4 text-3xl sm:text-4xl" data-testid="why-title">
                  Trust, value, and a process that respects your time.
                </h2>
                <p className="mt-3 text-muted-foreground max-w-2xl" data-testid="why-subtitle">
                  Dealership-level service with auction-level sourcing — built for people who want the right car without
                  the runaround.
                </p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {[
                {
                  icon: ShieldCheck,
                  title: "Straight numbers",
                  body: "We show totals the way professionals do: line-item breakdown + clear next steps.",
                },
                {
                  icon: Gavel,
                  title: "Auction discipline",
                  body: "We bid with rules. If the car doesn’t meet the standard, we pass and keep it moving.",
                },
                {
                  icon: Clock3,
                  title: "Fast communication",
                  body: "You’ll know what’s happening — sourcing, bidding, and timelines — without chasing updates.",
                },
                {
                  icon: BadgeCheck,
                  title: "Quality-first sourcing",
                  body: "We prioritize clean history and sensible mileage. No “too good to be true” traps.",
                },
                {
                  icon: CircleDollarSign,
                  title: "Value without gimmicks",
                  body: "No fake discounts, no surprise packages — just a fair deal and a premium experience.",
                },
                {
                  icon: Truck,
                  title: "Delivery when it helps",
                  body: "Local pickup is easy. Regional delivery is available if it saves you time.",
                },
              ].map((c, idx) => (
                <InView key={idx} delayMs={idx * 70} data-testid={`why-card-${idx}`}>
                  <GlowCard>
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl grid place-items-center border border-border/70 bg-white/5">
                        <c.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-lg font-semibold" data-testid={`why-card-${idx}-title`}>
                        {c.title}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed" data-testid={`why-card-${idx}-body`}>
                      {c.body}
                    </p>
                  </GlowCard>
                </InView>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA BAND */}
        <Section subtleTopBorder className="relative overflow-hidden">
          <Container className="py-14 sm:py-18 lg:py-20">
            <div className="relative rounded-[2.25rem] p-[1px] bg-[linear-gradient(135deg,hsl(var(--primary)/0.55),hsl(var(--accent)/0.28),transparent)] shadow-[var(--shadow-md)]">
              <div className="relative rounded-[2.25rem] border border-border/70 bg-[linear-gradient(180deg,hsl(var(--card)/0.86),hsl(225_28%_10%/0.72))] p-8 sm:p-10 overflow-hidden grid-noise">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-16 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.32),transparent_60%)] blur-2xl" />
                  <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_40%_40%,hsl(var(--accent)/0.22),transparent_60%)] blur-2xl" />
                </div>

                <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs text-foreground/80">
                      <Car className="h-4 w-4 text-primary" />
                      <span data-testid="cta-kicker">Ready to buy smarter?</span>
                    </div>
                    <h3 className="mt-3 text-3xl sm:text-4xl leading-tight" data-testid="cta-title">
                      Browse the vibe. Then let Butta source the exact match.
                    </h3>
                    <p className="mt-3 text-muted-foreground max-w-2xl" data-testid="cta-subtitle">
                      Tap “Contact Butta” with your budget and must-haves. We’ll handle the auction work and keep you
                      updated with clean, honest communication.
                    </p>

                    <div className="mt-7 flex flex-col sm:flex-row gap-3">
                      <PremiumButton
                        variant="outline"
                        onClick={() => scrollToId("inventory")}
                        data-testid="cta-browse"
                      >
                        Browse cars <ArrowRight className="h-4 w-4 opacity-70" />
                      </PremiumButton>
                      <PremiumButton
                        variant="gold"
                        onClick={() => setContactOpen(true)}
                        data-testid="cta-contact"
                      >
                        Contact Butta <PhoneCall className="h-4 w-4" />
                      </PremiumButton>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {["Transparent totals", "Auction sourcing", "Fast delivery", "Dealer-direct"].map((t, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-white/5 border-border/70 text-foreground/75"
                          data-testid={`cta-tag-${i}`}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="rounded-2xl border border-border/70 bg-white/5 p-6 shadow-[var(--shadow-xs)]">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold" data-testid="cta-mini-title">
                          What to send
                        </div>
                        <Badge className="bg-primary text-primary-foreground">30 seconds</Badge>
                      </div>
                      <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                        {[
                          { icon: CircleDollarSign, text: "Your budget range" },
                          { icon: BadgeCheck, text: "Your must-haves (mileage, year, color, etc.)" },
                          { icon: Clock3, text: "Your timeline (ASAP vs. flexible)" },
                          { icon: Mail, text: "Your best contact method" },
                        ].map((it, i) => (
                          <li key={i} className="flex items-start gap-2" data-testid={`cta-mini-item-${i}`}>
                            <it.icon className="h-4 w-4 text-accent mt-0.5" />
                            <span>{it.text}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <PremiumButton
                          variant="gold"
                          className="w-full"
                          onClick={() => setContactOpen(true)}
                          data-testid="cta-mini-button"
                        >
                          Open contact form <ArrowRight className="h-4 w-4 opacity-80" />
                        </PremiumButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* FOOTER */}
        <Section subtleTopBorder className="relative">
          <Container className="py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(42_98%_62%))] grid place-items-center">
                    <Gavel className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold" data-testid="footer-brand">
                      Butta the Auctioner
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Auction sourcing with dealership-grade service.
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground" data-testid="footer-copy">
                  © {new Date().getFullYear()} Butta the Auctioner. All rights reserved.
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: "Privacy", action: () => window.alert("Placeholder: Privacy policy") },
                  { label: "Terms", action: () => window.alert("Placeholder: Terms") },
                  { label: "FAQ", action: () => scrollToId("how") },
                  { label: "Contact", action: () => setContactOpen(true) },
                ].map((l, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={l.action}
                    className={cn(
                      "px-3 py-2 rounded-xl text-sm text-foreground/75",
                      "hover:text-foreground hover:bg-white/5 transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20",
                    )}
                    data-testid={`footer-link-${i}`}
                  >
                    {l.label}
                  </button>
                ))}
                <PremiumButton
                  variant="outline"
                  onClick={() => setLeadsOpen(true)}
                  data-testid="footer-open-leads"
                >
                  Leads
                </PremiumButton>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <ContactButtaDialog open={contactOpen} onOpenChange={setContactOpen} />
      <LeadsDrawer open={leadsOpen} onOpenChange={setLeadsOpen} />
    </div>
  );
}
