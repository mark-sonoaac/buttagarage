import { Link } from "wouter";
import { PremiumButton } from "@/components/PremiumButton";
import { Container, Section } from "@/components/Section";
import { AlertTriangle, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-bg">
      <Section className="pt-16">
        <Container className="py-10">
          <div className="max-w-2xl mx-auto text-center glass rounded-3xl p-8 sm:p-10 grid-noise">
            <div className="mx-auto h-12 w-12 rounded-2xl grid place-items-center bg-white/5 border border-border/70">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <h1 className="mt-5 text-3xl sm:text-4xl">Page not found</h1>
            <p className="mt-2 text-muted-foreground">
              That route doesn’t exist. Head back to the showroom.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/" className="w-full sm:w-auto" data-testid="notfound-home-link">
                <PremiumButton className="w-full" variant="gold">
                  <Home className="h-4 w-4" />
                  Go home
                  <ArrowRight className="h-4 w-4 opacity-80" />
                </PremiumButton>
              </Link>

              <PremiumButton
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => window.history.back()}
                data-testid="notfound-back"
              >
                Go back
              </PremiumButton>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
