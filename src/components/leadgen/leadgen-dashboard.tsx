"use client";

import { useState } from "react";
import { LeadDTO } from "@/lib/db-service";
import { 
  Search, Download, Plus, Sparkles, Mail, Linkedin, ExternalLink, 
  TrendingUp, Building2, CheckCircle2, Copy, Check, Loader2, Layers 
} from "lucide-react";
import { toast } from "sonner";

interface LeadGenDashboardProps {
  initialLeads: LeadDTO[];
}

export function LeadGenDashboard({ initialLeads }: LeadGenDashboardProps) {
  const [leads, setLeads] = useState<LeadDTO[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [enrichingId, setEnrichingId] = useState<string | null>(null);
  const [activeModalLead, setActiveModalLead] = useState<{ lead: LeadDTO; email: string } | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  
  // New Lead Form State
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    companyName: "",
    domain: "",
    industry: "B2B SaaS",
    decisionMaker: "",
    role: "Founder & CEO",
    email: "",
    estimatedRevenue: "$5M - $10M ARR (35% EBITDA)",
    techStack: "Next.js, Python, PostgreSQL, AWS",
  });

  const industries = ["All", ...Array.from(new Set(leads.map((l) => l.industry.split("/")[0].trim())))];

  const filteredLeads = leads.filter((lead) => {
    const matchesInd = selectedIndustry === "All" || lead.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    const matchesSearch = 
      lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.decisionMaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesInd && matchesSearch;
  });

  // Export to CSV matching SaaSQuatch Leads functionality
  const exportToCSV = () => {
    const headers = ["Company", "Domain", "Industry", "Location", "Revenue", "Decision Maker", "Role", "Email", "LinkedIn", "AI Score", "Status"];
    const rows = filteredLeads.map(l => [
      `"${l.companyName}"`,
      `"${l.domain}"`,
      `"${l.industry}"`,
      `"${l.location}"`,
      `"${l.estimatedRevenue}"`,
      `"${l.decisionMaker}"`,
      `"${l.role}"`,
      `"${l.email}"`,
      `"${l.linkedinUrl}"`,
      `"${l.aiScore}"`,
      `"${l.status}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SaaSQuatch_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Exported verified leads to CSV!");
  };

  // Trigger Gemini AI Lead Enrichment
  const handleEnrichWithGemini = async (lead: LeadDTO) => {
    setEnrichingId(lead.id);
    try {
      const res = await fetch("/api/leadgen/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          companyName: lead.companyName,
          domain: lead.domain,
          industry: lead.industry,
          decisionMaker: lead.decisionMaker,
          role: lead.role,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.map(l => l.id === lead.id ? { 
          ...l, 
          status: "Enriched", 
          aiScore: data.data.aiScore, 
          aiInsights: data.data.aiInsights 
        } : l));
        
        setActiveModalLead({
          lead: { ...lead, aiScore: data.data.aiScore, aiInsights: data.data.aiInsights },
          email: data.data.coldEmail,
        });
        toast.success(`Gemini AI analysis complete for ${lead.companyName}!`);
      }
    } catch (e) {
      toast.error("Failed to run Gemini enrichment.");
    } finally {
      setEnrichingId(null);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.companyName || !newLeadForm.domain || !newLeadForm.email) {
      toast.error("Please fill in required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leadgen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadForm),
      });
      const data = await res.json();
      if (data.success) {
        const created: LeadDTO = {
          ...data.data,
          techStack: newLeadForm.techStack.split(",").map(s => s.trim()),
          createdAt: new Date().toISOString(),
        };
        setLeads([created, ...leads]);
        setIsAddingLead(false);
        setNewLeadForm({
          companyName: "",
          domain: "",
          industry: "B2B SaaS",
          decisionMaker: "",
          role: "Founder & CEO",
          email: "",
          estimatedRevenue: "$5M - $10M ARR (35% EBITDA)",
          techStack: "Next.js, Python, PostgreSQL, AWS",
        });
        toast.success("New company captured in database!");
        handleEnrichWithGemini(created);
      }
    } catch (e) {
      toast.error("Failed to save lead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyOutreachEmail = () => {
    if (activeModalLead?.email) {
      navigator.clipboard.writeText(activeModalLead.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success("Copied personalized cold email to clipboard!");
    }
  };

  return (
    <div className="space-y-10">
      {/* Top Value Summary Metrics (Caprae PE / ETA Focus) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Target Pipeline</span>
            <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{leads.length} Companies</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified search fund &amp; acquisition targets</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">High Conviction</span>
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {leads.filter(l => l.aiScore.startsWith("A")).length} Top-Tier
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">A &amp; A+ rated by Gemini 2.0 evaluation</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg EBITDA Margin</span>
            <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">35.8%</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cash-flow generative target profile</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Enrichment Status</span>
            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
            {leads.filter(l => l.status === "Enriched").length} / {leads.length}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Full AI operational leverage mapped</p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mr-2">Sector:</span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedIndustry === ind
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-900"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search companies, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm"
            />
          </div>

          <button
            onClick={() => setIsAddingLead(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/25 shrink-0"
          >
            <Plus className="h-3.5 w-3.5" /> Scrape Target
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all shrink-0 shadow-sm"
            title="Export to CSV matching SaaSQuatch Leads workflow"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-lg dark:hover:border-slate-700 transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />

            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {lead.companyName}
                  </h3>
                  <a
                    href={`https://${lead.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors mt-0.5"
                  >
                    {lead.domain} <ExternalLink className="h-3 w-3 inline" />
                  </a>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold tracking-wide ${
                    lead.aiScore.startsWith("A") 
                      ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20" 
                      : "bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20"
                  }`}>
                    PE Score: {lead.aiScore}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{lead.status}</span>
                </div>
              </div>

              {/* Company Metrics */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 mb-4 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Estimated Revenue:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-200">{lead.estimatedRevenue}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Location / Team:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{lead.location} ({lead.employeeCount})</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Industry:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">{lead.industry}</span>
                </div>
              </div>

              {/* Decision Maker Contact */}
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 mb-4 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-200">{lead.decisionMaker}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{lead.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${lead.email}`}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-transparent transition-colors shadow-sm"
                    title={`Email ${lead.email}`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                  {lead.linkedinUrl && (
                    <a
                      href={lead.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#0A66C2] hover:text-white text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-transparent transition-colors shadow-sm"
                      title="View LinkedIn Profile"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Gemini AI Strategic Insights */}
              {lead.aiInsights && (
                <div className="p-3.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 mb-4 text-xs text-indigo-950 dark:text-indigo-200/90 leading-relaxed">
                  <div className="flex items-center gap-1 font-bold text-indigo-700 dark:text-indigo-300 mb-1 text-[11px]">
                    <Sparkles className="h-3 w-3" /> Gemini M&amp;A Analysis:
                  </div>
                  {lead.aiInsights}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-5">
                {lead.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-700 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2">
              <button
                onClick={() => handleEnrichWithGemini(lead)}
                disabled={enrichingId === lead.id}
                className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                {enrichingId === lead.id ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" /> AI Outreach &amp; Score
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Outreach Modal */}
      {activeModalLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative text-slate-900 dark:text-slate-100">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                    PE Score: {activeModalLead.lead.aiScore}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Caprae Capital Acquisition Pipeline</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  Personalized AI Outreach for {activeModalLead.lead.companyName}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalLead(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Recipient Contact:
                </label>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {activeModalLead.lead.decisionMaker} ({activeModalLead.lead.role}) &bull; {activeModalLead.lead.email}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Generated Cold Pitch (Google Gemini 2.0 Flash):
                </label>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-300 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
                  {activeModalLead.email}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Grounded in company tech stack &amp; revenue
              </span>

              <div className="flex gap-3">
                <button
                  onClick={copyOutreachEmail}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {isCopied ? "Copied to Clipboard!" : "Copy Email"}
                </button>
                <button
                  onClick={() => setActiveModalLead(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Target Scrape Modal */}
      {isAddingLead && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Capture New Target Company</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Discovers and enriches contact intelligence for lead generation</p>
              </div>
              <button onClick={() => setIsAddingLead(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Acme Analytics"
                  value={newLeadForm.companyName}
                  onChange={e => setNewLeadForm({ ...newLeadForm, companyName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Domain *</label>
                <input
                  type="text"
                  required
                  placeholder="acmeanalytics.com"
                  value={newLeadForm.domain}
                  onChange={e => setNewLeadForm({ ...newLeadForm, domain: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Executive Name</label>
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    value={newLeadForm.decisionMaker}
                    onChange={e => setNewLeadForm({ ...newLeadForm, decisionMaker: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Executive Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@acmeanalytics.com"
                    value={newLeadForm.email}
                    onChange={e => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Industry</label>
                  <select
                    value={newLeadForm.industry}
                    onChange={e => setNewLeadForm({ ...newLeadForm, industry: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="B2B SaaS">B2B SaaS</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Healthcare SaaS">Healthcare SaaS</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Estimated Revenue</label>
                  <input
                    type="text"
                    placeholder="$3.5M ARR (30% EBITDA)"
                    value={newLeadForm.estimatedRevenue}
                    onChange={e => setNewLeadForm({ ...newLeadForm, estimatedRevenue: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingLead(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold rounded-xl shadow-md transition-all"
                >
                  {isSubmitting ? "Capturing..." : "Capture & AI Enrich"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
