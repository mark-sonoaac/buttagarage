import React, { useMemo } from "react";
import { z } from "zod";
import { api } from "@shared/routes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PremiumButton } from "@/components/PremiumButton";
import { useCreateLead } from "@/hooks/use-leads";
import { useToast } from "@/hooks/use-toast";
import { Phone, User2, MessageSquareText, ShieldCheck } from "lucide-react";

type FormValues = z.infer<typeof api.leads.create.input>;

export function ContactButtaDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const createLead = useCreateLead();

  const schema = useMemo(() => api.leads.create.input, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "I’m looking for a clean, reliable vehicle. My budget is $____ and I can move this week.",
    },
    mode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await createLead.mutateAsync(values);
      toast({
        title: "You’re locked in.",
        description: "Butta got your request — expect a fast callback/text.",
      });
      form.reset({
        name: "",
        email: "",
        phone: "",
        message: "I’m looking for a clean, reliable vehicle. My budget is $____ and I can move this week.",
      });
      onOpenChange(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      toast({
        title: "Couldn’t send request",
        description: msg,
        variant: "destructive",
      });
    }
  });

  const fieldError = (name: keyof FormValues) =>
    form.formState.errors?.[name]?.message as string | undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-xl bg-[linear-gradient(180deg,hsl(var(--card)/0.92),hsl(225_28%_10%/0.78))] border-border/80 shadow-[var(--shadow-lg)] backdrop-blur-xl"
        data-testid="contact-dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl" data-testid="contact-title">
            Contact Butta
          </DialogTitle>
          <DialogDescription className="text-muted-foreground" data-testid="contact-subtitle">
            Tell us what you’re trying to buy. We’ll match you with an auction deal — no pressure, no games.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-foreground/80" htmlFor="name">
                Name
              </label>
              <div className="mt-2 relative">
                <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Your name"
                  className="pl-9 bg-background/30 border-border/80 focus-visible:ring-ring/20 focus-visible:border-primary"
                  data-testid="contact-name"
                />
              </div>
              {fieldError("name") ? (
                <p className="mt-1 text-xs text-destructive" data-testid="contact-name-error">
                  {fieldError("name")}
                </p>
              ) : null}
            </div>

            <div>
              <label className="text-sm text-foreground/80" htmlFor="phone">
                Phone
              </label>
              <div className="mt-2 relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  {...form.register("phone")}
                  placeholder="(555) 555-5555"
                  className="pl-9 bg-background/30 border-border/80 focus-visible:ring-ring/20 focus-visible:border-primary"
                  data-testid="contact-phone"
                />
              </div>
              {fieldError("phone") ? (
                <p className="mt-1 text-xs text-destructive" data-testid="contact-phone-error">
                  {fieldError("phone")}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label className="text-sm text-foreground/80" htmlFor="email">
              Email
            </label>
            <div className="mt-2 relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="you@domain.com"
                className="pl-9 bg-background/30 border-border/80 focus-visible:ring-ring/20 focus-visible:border-primary"
                data-testid="contact-email"
              />
            </div>
            {fieldError("email") ? (
              <p className="mt-1 text-xs text-destructive" data-testid="contact-email-error">
                {fieldError("email")}
              </p>
            ) : null}
          </div>

          <div>
            <label className="text-sm text-foreground/80" htmlFor="message">
              What are you looking for?
            </label>
            <div className="mt-2 relative">
              <MessageSquareText className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="message"
                {...form.register("message")}
                placeholder="Budget, make/model, must-haves, timeline…"
                className="min-h-28 pl-9 bg-background/30 border-border/80 focus-visible:ring-ring/20 focus-visible:border-primary"
                data-testid="contact-message"
              />
            </div>
            {fieldError("message") ? (
              <p className="mt-1 text-xs text-destructive" data-testid="contact-message-error">
                {fieldError("message")}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span data-testid="contact-trustline">
              We never sell your info. This is dealer-direct communication.
            </span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-3">
          <PremiumButton
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            data-testid="contact-cancel"
          >
            Not now
          </PremiumButton>
          <PremiumButton
            type="button"
            variant="gold"
            onClick={onSubmit}
            isLoading={createLead.isPending}
            data-testid="contact-submit"
          >
            {createLead.isPending ? "Sending…" : "Send request"}
          </PremiumButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
