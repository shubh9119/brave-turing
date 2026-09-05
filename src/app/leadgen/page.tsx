import { getDbLeads } from "@/lib/db-service";
import { LeadGenDashboard } from "@/components/leadgen/leadgen-dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaSQuatch AI LeadGen & Sales Intelligence Suite",
  description: "AI-powered B2B lead discovery, automated web scraping, PE EBITDA revenue scoring, and Gemini-driven cold outreach generator.",
};

export default async function LeadGenPage() {
  const leads = await getDbLeads();

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 mb-2">
          <span>Caprae Capital Partner Challenge</span>
          <span>•</span>
          <span>SaaSQuatch AI Lead Engine</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          SaaSQuatch AI LeadGen &amp; Sales Intelligence
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-normal">
          Engineered for Entrepreneurship Through Acquisition (ETA) searchers and B2B sales teams. Discover verified accounts, evaluate EBITDA multiples, and synthesize personalized founder outreach with Google Gemini AI.
        </p>
      </div>

      <LeadGenDashboard initialLeads={leads} />
    </div>
  );
}
