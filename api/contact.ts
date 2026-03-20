import { Resend } from "resend";
import { z } from "zod";
import { randomUUID } from "crypto";

const contactInquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  numberOfChildren: z.string().min(1),
  ages: z.string().min(1),
  message: z.string().optional(),
});

const FORWARD_EMAIL = "thelittlejunglefamilychildcare@gmail.com";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = contactInquirySchema.parse(req.body);

    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const resend = new Resend(apiKey);
        await resend.emails.send({
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
      }
    } catch (emailError: any) {
      console.error("Failed to send email:", emailError?.message || emailError);
    }

    const inquiry = { ...data, id: randomUUID(), createdAt: new Date() };
    res.json({ success: true, inquiry });
  } catch (error: any) {
    console.error("Contact form error:", error);
    if (error?.name === "ZodError") {
      res.status(400).json({ error: "Invalid form data" });
    } else {
      res.status(500).json({ error: "Failed to process inquiry" });
    }
  }
}
