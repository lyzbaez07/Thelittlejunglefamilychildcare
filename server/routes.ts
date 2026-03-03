import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactInquirySchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(data);
      res.json({ success: true, inquiry });
    } catch (error) {
      if (error instanceof Error && error.name === "ZodError") {
        res.status(400).json({ error: "Invalid form data" });
      } else {
        res.status(500).json({ error: "Failed to process inquiry" });
      }
    }
  });

  return httpServer;
}
