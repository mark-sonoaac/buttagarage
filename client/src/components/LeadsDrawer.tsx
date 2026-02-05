import React, { useMemo, useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { PremiumButton } from "@/components/PremiumButton";
import { useDeleteLead, useLeads } from "@/hooks/use-leads";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AlertTriangle, Inbox, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function formatPhone(raw: string) {
  const s = raw.trim();
  return s;
}

export function LeadsDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const { data, isLoading, error } = useLeads();
  const del = useDeleteLead();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const leads = data ?? [];
    const query = q.trim().toLowerCase();
    if (!query) return leads;
    return leads.filter((l) => {
      const hay = `${l.name} ${l.email} ${l.phone} ${l.message}`.toLowerCase();
      return hay.includes(query);
    });
  }, [data, q]);

  const onDelete = async (id: number) => {
    const ok = window.confirm("Delete this lead? This cannot be undone.");
    if (!ok) return;
    try {
      await del.mutateAsync(id);
      toast({ title: "Lead deleted", description: "Removed from your inbox." });
    } catch (e) {
      toast({
        title: "Could not delete",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent
        className="bg-[linear-gradient(180deg,hsl(var(--card)/0.92),hsl(225_28%_10%/0.86))] border-border/80 shadow-[var(--shadow-lg)]"
        data-testid="leads-drawer"
      >
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-6">
          <DrawerHeader className="px-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <DrawerTitle className="text-2xl">Leads Inbox</DrawerTitle>
                <DrawerDescription className="text-muted-foreground">
                  Contact requests from the landing page (GET /api/leads).
                </DrawerDescription>
              </div>
              <Badge
                variant="secondary"
                className="bg-white/5 border-border/70 text-foreground/80"
                data-testid="leads-count"
              >
                {filtered.length} shown
              </Badge>
            </div>

            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search name, email, phone, message…"
                className="pl-9 bg-background/30 border-border/80 focus-visible:ring-ring/20 focus-visible:border-primary"
                data-testid="leads-search"
              />
            </div>
          </DrawerHeader>

          <div className="mt-3">
            {isLoading ? (
              <div className="grid gap-3" data-testid="leads-loading">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border/70 bg-white/5 p-4 animate-pulse"
                  >
                    <div className="h-4 w-40 bg-white/10 rounded" />
                    <div className="mt-2 h-3 w-64 bg-white/10 rounded" />
                    <div className="mt-3 h-3 w-full bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div
                className="rounded-2xl border border-destructive/40 bg-destructive/10 p-5 text-sm"
                data-testid="leads-error"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Failed to load leads
                </div>
                <div className="mt-1 text-muted-foreground">
                  {error instanceof Error ? error.message : "Unknown error"}
                </div>
                <div className="mt-4">
                  <PremiumButton
                    variant="outline"
                    onClick={() => window.location.reload()}
                    data-testid="leads-retry"
                  >
                    Refresh
                  </PremiumButton>
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="rounded-2xl border border-border/70 bg-white/5 p-8 text-center"
                data-testid="leads-empty"
              >
                <Inbox className="h-10 w-10 mx-auto text-muted-foreground" />
                <div className="mt-3 text-lg font-semibold">No leads found</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  When customers submit the contact form, requests will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-3" data-testid="leads-list">
                {filtered
                  .slice()
                  .reverse()
                  .map((l) => (
                    <div
                      key={l.id}
                      className={cn(
                        "rounded-2xl border border-border/70 bg-[linear-gradient(180deg,hsl(var(--card)/0.78),hsl(225_28%_10%/0.48))]",
                        "p-5 shadow-[var(--shadow-xs)]",
                        "hover:border-border hover:shadow-[var(--shadow-sm)] transition-all duration-300",
                      )}
                      data-testid={`lead-${l.id}`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-lg font-semibold truncate" data-testid={`lead-${l.id}-name`}>
                              {l.name}
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-white/5 border-border/70 text-foreground/75"
                              data-testid={`lead-${l.id}-id`}
                            >
                              #{l.id}
                            </Badge>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground break-words">
                            <span data-testid={`lead-${l.id}-email`}>{l.email}</span>
                            <span className="mx-2 text-white/20">•</span>
                            <span data-testid={`lead-${l.id}-phone`}>{formatPhone(l.phone)}</span>
                          </div>
                          <div className="mt-3 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                            <span className="text-muted-foreground">Message: </span>
                            <span data-testid={`lead-${l.id}-message`}>{l.message}</span>
                          </div>
                        </div>

                        <div className="flex sm:flex-col gap-2 sm:items-end shrink-0">
                          <PremiumButton
                            variant="danger"
                            className="px-4 py-2 rounded-xl"
                            onClick={() => onDelete(l.id)}
                            isLoading={del.isPending}
                            data-testid={`lead-${l.id}-delete`}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </PremiumButton>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <DrawerFooter className="px-0">
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="text-xs text-muted-foreground">
                Tip: This is a lightweight admin view for demos.
              </div>
              <PremiumButton
                variant="ghost"
                onClick={() => onOpenChange(false)}
                data-testid="leads-close"
              >
                Close
              </PremiumButton>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
