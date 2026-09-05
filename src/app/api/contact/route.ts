import { NextResponse } from "next/server";
import { z } from "zod";
import { saveContactMessageToDb } from "@/lib/db-service";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// In-memory rate limiter: max 5 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 5;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const now = Date.now();
    
    const rateLimit = rateLimitMap.get(ip);
    if (rateLimit) {
      if (now < rateLimit.resetAt) {
        if (rateLimit.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Too many messages sent. Please wait a minute before trying again." },
            { status: 429 }
          );
        }
        rateLimit.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    }

    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    // 1. Persist the message to the real Prisma SQLite database
    const savedMessage = await saveContactMessageToDb(validatedData);
    console.log(`💾 Saved message to database [ID: ${savedMessage.id}] from ${savedMessage.email}`);

    // 2. If RESEND_API_KEY is present, dispatch live email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Brave Turing Portfolio <onboarding@resend.dev>",
          to: "hello@braveturing.dev",
          subject: `New Portfolio Message: ${validatedData.subject}`,
          html: `
            <h3>New Contact Submission</h3>
            <p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <hr />
            <p>${validatedData.message.replace(/\n/g, "<br/>")}</p>
          `,
        });
        console.log("📧 Sent email notification via Resend");
      } catch (emailErr) {
        console.error("Resend delivery failed (logged to DB anyway):", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      messageId: savedMessage.id,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data.", details: error.errors.map(e => e.message) },
        { status: 400 }
      );
    }
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error while saving message." }, { status: 500 });
  }
}
