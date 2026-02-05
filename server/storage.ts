import { db } from "./db";
import { leads, type CreateLeadRequest, type LeadResponse } from "@shared/schema";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  getLeads(): Promise<LeadResponse[]>;
  createLead(input: CreateLeadRequest): Promise<LeadResponse>;
  deleteLead(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getLeads(): Promise<LeadResponse[]> {
    return await db.select().from(leads).orderBy(desc(leads.id));
  }

  async createLead(input: CreateLeadRequest): Promise<LeadResponse> {
    const [created] = await db.insert(leads).values(input).returning();
    return created;
  }

  async deleteLead(id: number): Promise<void> {
    await db.delete(leads).where(eq(leads.id, id));
  }
}

export const storage = new DatabaseStorage();
