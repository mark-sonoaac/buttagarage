import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type {
  CreateLeadInput,
  DeleteLeadResponse,
  LeadResponse,
  LeadsListResponse,
} from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useLeads() {
  return useQuery<LeadsListResponse>({
    queryKey: [api.leads.list.path],
    queryFn: async () => {
      const res = await fetch(api.leads.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch leads");
      const json = await res.json();
      return parseWithLogging(api.leads.list.responses[200], json, "leads.list 200");
    },
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation<LeadResponse, Error, CreateLeadInput>({
    mutationFn: async (data) => {
      const validated = api.leads.create.input.parse(data);
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errJson = await res.json().catch(() => ({}));
          const parsed = parseWithLogging(
            api.leads.create.responses[400],
            errJson,
            "leads.create 400",
          );
          throw new Error(parsed.message);
        }
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to submit lead");
      }

      const json = await res.json();
      return parseWithLogging(api.leads.create.responses[201], json, "leads.create 201");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation<DeleteLeadResponse, Error, number>({
    mutationFn: async (id) => {
      const url = buildUrl(api.leads.delete.path, { id });
      const res = await fetch(url, { method: api.leads.delete.method, credentials: "include" });

      if (!res.ok) {
        if (res.status === 404) {
          const errJson = await res.json().catch(() => ({}));
          const parsed = parseWithLogging(api.leads.delete.responses[404], errJson, "leads.delete 404");
          throw new Error(parsed.message);
        }
        const text = await res.text().catch(() => "");
        throw new Error(text || "Failed to delete lead");
      }

      const json = await res.json();
      return parseWithLogging(api.leads.delete.responses[200], json, "leads.delete 200");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.leads.list.path] });
    },
  });
}
