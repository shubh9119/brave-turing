import { NextResponse } from "next/server";
import { getDbLeads, createDbLead } from "@/lib/db-service";
import { z } from "zod";

const leadCreateSchema = z.object({
  companyName: z.string().min(2),
  domain: z.string().min(3),
  industry: z.string().default("B2B SaaS"),
  location: z.string().default("United States"),
  employeeCount: z.string().default("10-50"),
  estimatedRevenue: z.string().default("$2M - $5M ARR"),
  decisionMaker: z.string().min(2),
  role: z.string().default("Founder & CEO"),
  email: z.string().email(),
  linkedinUrl: z.string().default("https://linkedin.com"),
  techStack: z.string().default("React, Node.js, PostgreSQL"),
  aiScore: z.string().default("A"),
  aiInsights: z.string().optional(),
  status: z.string().default("Discovered"),
});

export async function GET() {
  try {
    const leads = await getDbLeads();
    return NextResponse.json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads from database." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = leadCreateSchema.parse(body);
    const created = await createDbLead(validated);

    return NextResponse.json({
      success: true,
      data: created,
      message: "Lead successfully captured in database.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid lead payload.", details: error.errors }, { status: 400 });
    }
    console.error("Lead creation error:", error);
    return NextResponse.json({ error: "Failed to create lead." }, { status: 500 });
  }
}
