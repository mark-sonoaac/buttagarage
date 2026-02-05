import { z } from "zod";
import { insertLeadSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  leads: {
    list: {
      method: "GET" as const,
      path: "/api/leads",
      responses: {
        200: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            email: z.string(),
            phone: z.string(),
            message: z.string(),
          }),
        ),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/leads",
      input: insertLeadSchema
        .extend({
          email: z.string().email("Enter a valid email"),
          phone: z
            .string()
            .min(7, "Enter a valid phone")
            .max(20, "Enter a valid phone"),
          message: z.string().min(5, "Tell us what you need"),
          name: z.string().min(2, "Enter your name"),
        })
        .strict(),
      responses: {
        201: z.object({
          id: z.number(),
          name: z.string(),
          email: z.string(),
          phone: z.string(),
          message: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: "DELETE" as const,
      path: "/api/leads/:id",
      responses: {
        200: z.object({ ok: z.literal(true) }),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>,
): string {
  let url = path;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, String(value));
    }
  }
  return url;
}

export type LeadsListResponse = z.infer<typeof api.leads.list.responses[200]>;
export type CreateLeadInput = z.infer<typeof api.leads.create.input>;
export type LeadResponse = z.infer<typeof api.leads.create.responses[201]>;
export type DeleteLeadResponse = z.infer<typeof api.leads.delete.responses[200]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
export type NotFoundError = z.infer<typeof errorSchemas.notFound>;
export type InternalError = z.infer<typeof errorSchemas.internal>;
