import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "../src/lib/prisma";
import {
  getDbLeads,
  createDbLead,
  updateDbLead,
  getDbProjects,
  getDbFeaturedProjects,
  getDbProjectBySlug,
  getDbBlogPosts,
  getDbBlogPostBySlug,
  saveContactMessageToDb,
} from "../src/lib/db-service";

const BASE_URL = "http://localhost:3000";

// Color helpers for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  bold: "\x1b[1m",
};

let passedCount = 0;
let failedCount = 0;

async function runTest(suite: string, name: string, fn: () => Promise<void>) {
  process.stdout.write(`  • [${suite}] ${name} ... `);
  try {
    await fn();
    passedCount++;
    console.log(`${colors.green}✓ PASSED${colors.reset}`);
  } catch (error) {
    failedCount++;
    console.log(`${colors.red}✗ FAILED${colors.reset}`);
    console.error(`    ${colors.red}${(error as Error).message}${colors.reset}`);
    if ((error as Error).stack) {
      console.error(`    ${(error as Error).stack?.split("\n").slice(1, 3).join("\n    ")}`);
    }
  }
}

async function main() {
  console.log(`\n${colors.bold}${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  CAPRAE CAPITAL PARTNERS — AUTOMATED SYSTEM VERIFICATION SUITE ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}================================================================${colors.reset}\n`);

  // =========================================================================
  // SUITE 1: PRISMA DATA ACCESS LAYER & PERSISTENCE
  // =========================================================================
  console.log(`${colors.bold}1. PRISMA ORM & PERSISTENT DATABASE INTEGRATION${colors.reset}`);

  await runTest("Prisma DB", "Verify database connection and schema tables", async () => {
    const leadCount = await prisma.lead.count();
    const projectCount = await prisma.project.count();
    const blogCount = await prisma.blogPost.count();
    assert.ok(leadCount >= 6, `Expected at least 6 leads, got ${leadCount}`);
    assert.ok(projectCount >= 6, `Expected at least 6 projects, got ${projectCount}`);
    assert.ok(blogCount >= 4, `Expected at least 4 blog posts, got ${blogCount}`);
  });

  await runTest("Prisma DB", "Fetch verified leads through typed Data Access Layer", async () => {
    const leads = await getDbLeads();
    assert.ok(Array.isArray(leads), "Leads should be an array");
    assert.strictEqual(leads.length >= 6, true, "Should have at least 6 leads");

    for (const lead of leads) {
      assert.ok(lead.id, "Lead must have an ID");
      assert.ok(lead.companyName, "Lead must have a companyName");
      assert.ok(lead.domain, "Lead must have a domain");
      assert.ok(lead.industry, "Lead must have an industry");
      assert.ok(lead.estimatedRevenue, "Lead must have an estimatedRevenue");
      assert.ok(lead.email, "Lead must have an email");
      assert.ok(["A+", "A", "B+", "B", "C"].includes(lead.aiScore), `Invalid AI score: ${lead.aiScore}`);
    }
  });

  await runTest("Prisma DB", "Fetch projects and verify slug-based lookup", async () => {
    const projects = await getDbProjects();
    assert.ok(projects.length >= 6, "Expected 6 or more projects");

    const firstSlug = projects[0].slug;
    const project = await getDbProjectBySlug(firstSlug);
    assert.ok(project !== null, `Failed to retrieve project by slug: ${firstSlug}`);
    assert.strictEqual(project?.slug, firstSlug);
    assert.ok(Array.isArray(project?.techStack), "techStack must be an array");
    assert.ok(project?.techStack.length > 0, "techStack should not be empty");
  });

  await runTest("Prisma DB", "Fetch featured projects limit check", async () => {
    const featured = await getDbFeaturedProjects();
    assert.ok(featured.length <= 3, "Featured projects should take max 3");
    for (const p of featured) {
      assert.strictEqual(p.featured, true, "Project must have featured: true");
    }
  });

  await runTest("Prisma DB", "Blog engine view counter auto-increment", async () => {
    const posts = await getDbBlogPosts();
    assert.ok(posts.length >= 4, "Expected at least 4 blog posts");
    const testPost = posts[0];
    const initialViews = testPost.views;

    const fetched = await getDbBlogPostBySlug(testPost.slug);
    assert.ok(fetched !== null, "Should find blog post");
    assert.strictEqual(fetched?.views, initialViews + 1, "View count should increment by 1");
  });

  await runTest("Prisma DB", "Lead record creation, AI update, and cleanup lifecycle", async () => {
    const testDomain = `test-${Date.now()}.ai`;
    const newLead = await createDbLead({
      companyName: "Automated Test Corp",
      domain: testDomain,
      industry: "DevOps & Cloud",
      location: "San Francisco, CA",
      employeeCount: "10-20",
      estimatedRevenue: "$2.5M ARR (30% EBITDA)",
      decisionMaker: "Alex Mercer",
      role: "Founder & CTO",
      email: `alex@${testDomain}`,
      linkedinUrl: `https://linkedin.com/in/alex-${testDomain}`,
      techStack: "Rust, Next.js, Docker",
      aiScore: "A",
      status: "Discovered",
    });

    assert.ok(newLead.id, "Created lead must have an ID");
    assert.strictEqual(newLead.status, "Discovered");

    // Update with AI enrichment
    const updatedLead = await updateDbLead(newLead.id, {
      status: "Enriched",
      aiScore: "A+",
      aiInsights: "Automated test enrichment verification succeeded.",
    });

    assert.strictEqual(updatedLead.status, "Enriched");
    assert.strictEqual(updatedLead.aiScore, "A+");
    assert.strictEqual(updatedLead.aiInsights, "Automated test enrichment verification succeeded.");

    // Clean up
    await prisma.lead.delete({ where: { id: newLead.id } });
  });

  await runTest("Prisma DB", "Contact message dispatch and persistence", async () => {
    const msg = await saveContactMessageToDb({
      name: "Caprae Verification Bot",
      email: "bot@capraecapital.com",
      subject: "Automated Handbook Test",
      message: "Verifying relational message persistence for Caprae evaluation.",
    });

    assert.ok(msg.id, "Saved message must have an ID");
    assert.strictEqual(msg.name, "Caprae Verification Bot");

    // Clean up
    await prisma.contactMessage.delete({ where: { id: msg.id } });
  });

  // =========================================================================
  // SUITE 2: ETA / PE BUSINESS LOGIC & FINANCIAL METRICS
  // =========================================================================
  console.log(`\n${colors.bold}2. ETA / PE BUSINESS LOGIC & FINANCIAL METRICS${colors.reset}`);

  await runTest("Business Logic", "Pipeline EBITDA margins calculation", async () => {
    const leads = await getDbLeads();
    const ebitdaRegex = /(\d+)%\s*EBITDA/i;
    const margins: number[] = [];

    for (const lead of leads) {
      const match = lead.estimatedRevenue.match(ebitdaRegex);
      assert.ok(match !== null, `Lead ${lead.companyName} must specify EBITDA percentage in revenue string`);
      margins.push(parseInt(match![1], 10));
    }

    const averageEbitda = margins.reduce((a, b) => a + b, 0) / margins.length;
    assert.ok(averageEbitda >= 25 && averageEbitda <= 45, `Average EBITDA should be healthy PE range: ${averageEbitda}%`);
  });

  await runTest("Business Logic", "RFC 4180 CSV export formatting & escaping", async () => {
    const leads = await getDbLeads();
    const headers = [
      "Company",
      "Domain",
      "Industry",
      "Location",
      "Employees",
      "Est. Revenue",
      "Decision Maker",
      "Role",
      "Email",
      "LinkedIn",
      "AI Score",
      "Status",
    ];

    const rows = leads.map(l => [
      `"${l.companyName.replace(/"/g, '""')}"`,
      `"${l.domain.replace(/"/g, '""')}"`,
      `"${l.industry.replace(/"/g, '""')}"`,
      `"${l.location.replace(/"/g, '""')}"`,
      `"${l.employeeCount.replace(/"/g, '""')}"`,
      `"${l.estimatedRevenue.replace(/"/g, '""')}"`,
      `"${l.decisionMaker.replace(/"/g, '""')}"`,
      `"${l.role.replace(/"/g, '""')}"`,
      `"${l.email.replace(/"/g, '""')}"`,
      `"${l.linkedinUrl.replace(/"/g, '""')}"`,
      `"${l.aiScore.replace(/"/g, '""')}"`,
      `"${l.status.replace(/"/g, '""')}"`,
    ]);

    const csvData = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const lines = csvData.split("\n");

    assert.strictEqual(lines.length, leads.length + 1, "CSV row count must match leads + 1 header");
    assert.strictEqual(lines[0].split(",").length, headers.length, "Header columns count must match");
  });

  // =========================================================================
  // SUITE 3: LIVE HTTP API ROUTES & AI PIPELINE
  // =========================================================================
  console.log(`\n${colors.bold}3. LIVE HTTP API ROUTES & AI PIPELINE (${BASE_URL})${colors.reset}`);

  await runTest("HTTP API", "GET /api/leadgen returns verified database leads", async () => {
    const res = await fetch(`${BASE_URL}/api/leadgen`);
    assert.strictEqual(res.status, 200, "Should return HTTP 200");
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(Array.isArray(json.data));
    assert.ok(json.count >= 6, `Expected at least 6 leads, got ${json.count}`);
  });

  await runTest("HTTP API", "POST /api/leadgen/enrich evaluates target & drafts cold email", async () => {
    const res = await fetch(`${BASE_URL}/api/leadgen/enrich`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: "Nexus Health AI",
        domain: "nexushealth.ai",
        industry: "Healthcare SaaS",
        decisionMaker: "Dr. Sarah Connor",
        role: "Founder & CEO",
      }),
    });

    assert.strictEqual(res.status, 200, "Enrichment endpoint should return HTTP 200");
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(["A+", "A", "B+", "B", "C"].includes(json.data.aiScore), `Invalid score: ${json.data.aiScore}`);
    assert.ok(json.data.aiInsights.length > 20, "AI insights should be substantial");
    assert.ok(json.data.coldEmail.includes("Nexus Health AI"), "Cold email should reference the company name");
  });

  await runTest("HTTP API", "POST /api/leadgen/enrich rejects invalid requests", async () => {
    const res = await fetch(`${BASE_URL}/api/leadgen/enrich`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 400, "Should return 400 for missing fields");
  });

  await runTest("HTTP API", "GET /api/projects returns full production projects", async () => {
    const res = await fetch(`${BASE_URL}/api/projects`);
    assert.strictEqual(res.status, 200, "Should return HTTP 200");
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.count >= 6);
  });

  await runTest("HTTP API", "GET /api/blog returns published technical deep-dives", async () => {
    const res = await fetch(`${BASE_URL}/api/blog`);
    assert.strictEqual(res.status, 200, "Should return HTTP 200");
    const json = await res.json();
    assert.strictEqual(json.success, true);
    assert.ok(json.count >= 4);
  });

  await runTest("HTTP API", "POST /api/contact validates and stores message", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Caprae Evaluation Lead",
        email: "evaluator@capraecapital.com",
        subject: "Verification Test Inquiry",
        message: "Automated end-to-end test verifying live contact route execution.",
      }),
    });

    assert.strictEqual(res.status, 200, "Should return HTTP 200");
    const json = await res.json();
    assert.strictEqual(json.success, true);
  });

  await runTest("HTTP API", "POST /api/contact validates required email format", async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Missing Email",
        email: "not-an-email",
        subject: "Test",
        message: "Test message",
      }),
    });
    assert.strictEqual(res.status, 400, "Should return HTTP 400 for invalid email");
  });

  await runTest("HTTP API", "POST /api/chat streams assistant response", async () => {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "What is your primary tech stack?" }],
      }),
    });

    assert.strictEqual(res.status, 200, "Chat route should return HTTP 200");
    const text = await res.text();
    assert.ok(text.length > 20, "Chat stream should return substantive text");
    assert.ok(text.includes("Next.js") || text.includes("React") || text.includes("Brave Turing"), "Should contain relevant technical context");
  });

  // =========================================================================
  // SUITE 4: DESIGN & THEME COMPLIANCE
  // =========================================================================
  console.log(`\n${colors.bold}4. DESIGN & TAILWIND V4 THEME COMPLIANCE${colors.reset}`);

  await runTest("Design/UI", "Tailwind CSS v4 dark mode variant configured", async () => {
    const cssPath = path.resolve(__dirname, "../src/app/globals.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    assert.ok(cssContent.includes("@custom-variant dark"), "globals.css must contain @custom-variant dark definition");
  });

  await runTest("Design/UI", "Application showcase screenshots exist and valid", async () => {
    const screenshots = [
      "landing_page.png",
      "leadgen_dashboard.png",
      "projects_page.png",
      "blog_page.png",
      "contact_page.png",
    ];

    for (const file of screenshots) {
      const filePath = path.resolve(__dirname, `../docs/screenshots/${file}`);
      assert.ok(fs.existsSync(filePath), `Screenshot missing: ${file}`);
      const stats = fs.statSync(filePath);
      assert.ok(stats.size > 10000, `Screenshot ${file} is suspiciously small (${stats.size} bytes)`);
    }
  });

  // =========================================================================
  // SUMMARY REPORT
  // =========================================================================
  console.log(`\n${colors.bold}${colors.cyan}================================================================${colors.reset}`);
  console.log(`${colors.bold}TEST SUITE EXECUTION SUMMARY:${colors.reset}`);
  console.log(`  Total Tests Run:  ${passedCount + failedCount}`);
  console.log(`  ${colors.green}Passed:           ${passedCount}${colors.reset}`);
  console.log(`  ${failedCount === 0 ? colors.green : colors.red}Failed:           ${failedCount}${colors.reset}`);
  console.log(`  Success Rate:     ${((passedCount / (passedCount + failedCount)) * 100).toFixed(1)}%`);
  console.log(`${colors.bold}${colors.cyan}================================================================${colors.reset}\n`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Test runner crashed:", err);
  process.exit(1);
});
