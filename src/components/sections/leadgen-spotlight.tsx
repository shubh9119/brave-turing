import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { Sparkles, ArrowRight, ShieldCheck, Database, Zap, Download } from "lucide-react";

export function LeadGenSpotlight() {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/60 border-y border-slate-200 dark:border-slate-800/60 transition-colors">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <FadeIn>
          <div className="rounded-3xl border border-indigo-200 dark:border-indigo-500/30 bg-gradient-to-br from-indigo-50/90 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-900/60 dark:to-slate-950 p-8 md:p-14 shadow-xl dark:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
              <Zap className="h-64 w-64 text-indigo-500 dark:text-indigo-400" />
            </div>

            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100/80 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Featured Engineering Challenge &bull; Caprae Capital</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                SaaSQuatch AI: Next-Gen B2B Lead Intelligence &amp; M&amp;A Scraper
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                Re-engineered the SaaSQuatch lead generation workflow to automate executive contact discovery, compute Private Equity &amp; ETA acquisition readiness scores, and synthesize personalized cold outreach using <strong className="text-indigo-600 dark:text-indigo-300 font-semibold">Google Gemini 2.0 Flash</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 pb-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
                  <Database className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-200 text-sm">Prisma Persistence</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Real-time target pipeline &amp; verification</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-200 text-sm">Gemini AI Enrichment</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">EBITDA &amp; PE multiple estimations</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3">
                  <Download className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-200 text-sm">Instant CSV Export</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">HubSpot &amp; CRM ingestion ready</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/leadgen"
                  className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 group"
                >
                  Launch SaaSQuatch LeadGen Suite
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Live production tool &bull; Tested on 6 B2B targets
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
