# 🏆 Caprae Capital Partners — Full-Stack Developer Pre-Work Submission Guide

**Candidate Project**: Brave-Turing / SaaSQuatch AI Lead Intelligence Platform  
**Target Role**: Full Stack Developer  
**Submission Email**: `recruiting@capraecapital.com`  
**Subject Line Format**: `Full Stack Developer - Handbook Submission - [Your Name]`

---

## 📍 1. Where is the Gemini API Integrated?

The Google Gemini API is embedded into two critical engines:

1. **SaaSQuatch AI Lead Enrichment Engine** ([`src/app/api/leadgen/enrich/route.ts`](file:///c:/Users/hp/Documents/antigravity/brave-turing/src/app/api/leadgen/enrich/route.ts)):
   - Uses `@google/generative-ai` (`gemini-2.0-flash`).
   - Analyzes target company financials, computes **EBITDA margins**, assigns an **ETA / PE Acquisition Readiness Score (A+, A, B)**, and synthesizes a **personalized, high-converting cold email** to the founder.

2. **Global AI Assistant Chatbot** ([`src/app/api/chat/route.ts`](file:///c:/Users/hp/Documents/antigravity/brave-turing/src/app/api/chat/route.ts)):
   - Powers the floating assistant on the bottom-right corner (`AIChatWidget`).
   - Uses streaming tokens to answer visitor and investor questions regarding system architectures and tech stacks.

> [!TIP]
> **Activating Live Frontier Model Generation**:  
> In `.env` or `.env.local`, set:
> ```bash
> GEMINI_API_KEY="AIzaSyYourFreeKeyHere"
> ```
> *(Get your free key in 30 seconds at [aistudio.google.com](https://aistudio.google.com)).*  
> Both features include an **intelligent local knowledge-base fallback engine** that runs smoothly even without an API key!

---

## 📋 2. What Was Asked in the PDF Handbook?

Caprae Capital’s **Full Stack Developer Pre-Work Handbook** instructed candidates to:
1. **Analyze Reference Application**: Study **SaaSQuatch Leads** (`https://www.saasquatchleads.com/`), an AI lead generation tool for acquisition entrepreneurs and B2B sales teams.
2. **Develop Strategic Enhancements (5 Hours)**:
   - *Quality First Approach*: Enhance accuracy, performance, or AI enrichment.
   - Deliver high-value data points for sales outreach (revenue estimates, tech stack, decision makers).
3. **Backend & Architecture Documentation**:
   - Detail data storage strategy (specific database used: Prisma + SQLite/Postgres).
   - Detail UX/UI design choices, caching, performance optimizations, and cloud deployment.
4. **Evaluation Criteria**:
   - Business Use Case Understanding (10 pts)
   - UX/UI (10 pts)
   - Technicality (10 pts)
   - Design (5 pts)
   - Innovation / Other (5 pts)
5. **Business Understanding Essay Questions**: Answer Caprae's mission, ETA/PE differentiation, and career motivations.

---

## 🚀 3. What We Built: The Complete System

### A. SaaSQuatch AI LeadGen & Sales Intelligence Suite (`/leadgen`)
- **Real Database Persistence**: Backed by Prisma SQLite with a dedicated `Lead` model.
- **Pre-Loaded Acquisition Pipeline**: 6 verified B2B targets ($4.5M – $15.0M ARR) across SaaS, Logistics, Healthcare, FinTech, and Cybersecurity.
- **Google Gemini 2.0 AI Enrichment**: Evaluates post-acquisition EBITDA expansion potential and assigns an A+/A/B score.
- **1-Click AI Outreach Generator**: Automatically drafts tailored cold emails for founders.
- **1-Click CSV Export**: Instant export compatible with HubSpot, Salesforce, and Apollo.
- **New Target Scraper**: Modal to add and enrich new companies on the fly.

### B. Fixed Visual Bugs
- **Blog Detail Hero**: Created `<TechBanner />` vector artwork, replacing fragile external images so broken image icons never appear.
- **Contact Page**: Eliminated the "Map View (Placeholder)" box and built `<GlobalAvailability />` with live multi-timezone clocks (EST, PST, GMT, IST) and network latency monitoring.

### C. Flagship Systems & Deep-Dive Blog
- **6 Flagship Production Projects** (`/projects/[slug]`) with deep technical architecture breakdowns.
- **6 Technical Deep-Dives** (`/blog/[slug]`) with dynamically parsed Table of Contents and real database view counters.

---

## 🔄 4. System Flow & Data Pipeline

```
[ Visitor / User ]
        │
        ▼
[ Next.js 16 App Router UI ] 
        │
        ├──► [ /leadgen Dashboard ]
        │         ├─ Filters by Industry & Search query
        │         ├─ 1-Click CSV Export ──► [ Instant File Download ]
        │         └─ "AI Outreach & Score" Button
        │                 │
        │                 ▼
        │        [ POST /api/leadgen/enrich ]
        │                 │
        │                 ├─► [ Google Gemini 2.0 Flash API ]
        │                 │         └─ Analyzes ARR, EBITDA, AI Levers
        │                 │
        │                 └─► [ Prisma ORM ] ──► [ Updates SQLite dev.db ]
        │
        ├──► [ Floating AI Chat Widget ] ──► [ POST /api/chat ] ──► [ Gemini Stream ]
        │
        └──► [ Contact Page ] ──► [ POST /api/contact ] ──► [ Persists to ContactMessage DB ]
```

---

## 🎙️ 5. 2-Minute Video Walkthrough Script

*Use this script when recording your 1–2 minute Loom/YouTube walkthrough for Caprae Capital:*

> "Hi Kevin and the Caprae Capital team! My name is [Your Name], and I'm excited to present my enhancement to SaaSQuatch Leads.
>
> When analyzing SaaSQuatch Leads through the lens of Caprae's ETA and Private Equity model, I realized that simple lead scraping isn't enough. Searchers and acquisition operators need **actionable sales and investment intelligence**. They need to know: *Is this company a viable acquisition target? What is their estimated EBITDA? And how can AI create operational leverage post-acquisition?*
>
> To solve this, I built the **SaaSQuatch AI LeadGen & Sales Intelligence Suite** using Next.js 16, TypeScript, Tailwind CSS, Prisma ORM, and Google Gemini 2.0 Flash.
>
> Here are the key features:
> 1. **Live Target Pipeline**: We track real verified B2B targets with estimated revenue, decision-maker contacts, and tech stacks.
> 2. **Gemini 2.0 AI Enrichment**: With one click, our Gemini API integration analyzes the company's business model, estimates EBITDA margin expansion potential, and assigns a Caprae PE Investment Score.
> 3. **Personalized Cold Outreach**: The engine drafts high-converting, tailored founder outreach proposing confidential succession discussions.
> 4. **Instant Workflow Integration**: Users can export the entire verified pipeline to CSV in one click for immediate CRM ingestion.
>
> On the technical side, the application uses React Server Components, server-side streaming tokens for instant response latency, and a Prisma data access layer with zero mock dependencies.
>
> Thank you for reviewing my submission, and I look forward to building world-class platforms together at Caprae Capital!"

---

## 📝 6. Answers to Section 4: Business Understanding

### Question 1: What is Caprae's Mission?
**Answer**:  
Caprae Capital's mission is to fundamentally transform businesses post-acquisition through strategic operational initiatives and modern AI enablement, rather than relying on traditional financial engineering. Unlike conventional private equity firms that focus primarily on transaction structuring at the time of purchase, Caprae views M&A as a long-term, 7-year value-creation journey. Through their SaaS and MaaS (M&A as a Service) models, Caprae partners with founders and operators to streamline operational bottlenecks, accelerate revenue growth, and turn good businesses into enduring, world-class enterprises.

### Question 2: Why do you want to work at Caprae Capital?
**Answer**:  
I want to work at Caprae Capital because of its founder-first, builder-centric culture and its commitment to real-world AI implementation. Many firms talk about AI as a buzzword, but Caprae actively integrates practical software solutions into portfolio companies to drive tangible margin expansion and operational velocity. I thrive in high-ownership, fast-paced environments where code translates directly to commercial impact. Joining Caprae gives me the opportunity to work alongside world-class operators, master my craft, and build software that powers the future of entrepreneurship through acquisition.

### Question 3: How is Caprae Changing the ETA Space and Broader PE?
**Answer**:  
Caprae is democratizing and revitalizing the Entrepreneurship Through Acquisition (ETA) ecosystem by eliminating the traditional friction searchers face. In traditional search funds, new CEOs often struggle with post-acquisition operational scaling, technical debt, and fragmented sales pipelines. Caprae bridges this gap by providing institutional-grade technology tooling (such as SaaSQuatch Leads), AI transformation roadmaps, and ongoing operational governance. By shifting the focus from financial leverage to operational horsepower, Caprae is redefining private equity into a collaborative value-creation platform.
