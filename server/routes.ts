import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactInquirySchema } from "@shared/schema";
import { getUncachableResendClient } from "./resend";

const FORWARD_EMAIL = "thelittlejunglefamilychildcare@gmail.com";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(data);

      try {
        console.log("Attempting to send email to:", FORWARD_EMAIL);
        const { client, fromEmail } = await getUncachableResendClient();
        console.log("Resend client created, from email:", fromEmail);
        const emailResult = await client.emails.send({
          from: "The Little Jungle <onboarding@resend.dev>",
          to: FORWARD_EMAIL,
          subject: `New Inquiry from ${data.firstName} ${data.lastName} - The Little Jungle`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Number of Children:</strong> ${data.numberOfChildren}</p>
            <p><strong>Ages:</strong> ${data.ages === "3months-2years" ? "3 months - 2 years" : "2 years - 5 years"}</p>
            <p><strong>Message:</strong> ${data.message || "No message provided"}</p>
            <hr />
            <p style="color: #666; font-size: 12px;">This message was sent from The Little Jungle Family Child Care website contact form.</p>
          `,
        });
        console.log("Email send result:", JSON.stringify(emailResult));
      } catch (emailError: any) {
        console.error("Failed to send email notification:", emailError?.message || emailError);
        console.error("Full error:", JSON.stringify(emailError, null, 2));
      }

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
