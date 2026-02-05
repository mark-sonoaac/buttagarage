import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get(api.leads.list.path, async (_req, res) => {
    const leads = await storage.getLeads();
    return res.json(leads);
  });

  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const created = await storage.createLead(input);
      return res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0]?.message ?? "Invalid request",
          field: err.errors[0]?.path?.join("."),
        });
      }
      throw err;
    }
  });

  app.delete(api.leads.delete.path, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const leads = await storage.getLeads();
    const exists = leads.some((l) => l.id === id);
    if (!exists) {
      return res.status(404).json({ message: "Lead not found" });
    }

    await storage.deleteLead(id);
    return res.status(200).json({ ok: true });
  });

  return httpServer;
}
