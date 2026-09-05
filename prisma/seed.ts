import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding real database records...");

  // Clean existing records
  await prisma.contactMessage.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  // Create primary developer / author user
  const user = await prisma.user.create({
    data: {
      email: "hello@braveturing.dev",
      name: "Brave Turing",
      role: "admin",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
  });

  console.log(`👤 Created user: ${user.name} (${user.id})`);

  // Seed Projects
  const projectsData = [
    {
      title: "Nexus - Distributed Analytics Platform",
      slug: "nexus-analytics",
      description: "A high-performance real-time analytics engine processing millions of events per second with sub-millisecond query latency.",
      content: `Nexus is a state-of-the-art distributed telemetry and event analytics platform engineered for planetary scale. Built with a high-throughput Rust ingestion engine and a Next.js App Router visualization layer, it processes unstructured event streams into actionable operational intelligence instantaneously.

### Architecture & Data Pipeline
The ingestion backbone leverages Apache Kafka for decoupled queueing and partitioned consumers, streaming incoming batches directly into a ClickHouse columnar database cluster. Query federation is managed through an Apollo GraphQL microservice that consolidates time-series telemetry with relational customer metadata.

### Front-End Engineering
The front-end user experience is built on React Server Components, eliminating over 180KB of client-side JavaScript overhead compared to traditional SPA architectures. High-density dashboards are rendered using custom WebGL shaders and HTML5 2D Canvas buffers, sustaining smooth 60fps pans and zooms across charts visualizing over 2,000,000 concurrent data points without memory leakage.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      techStack: "Next.js,Rust,ClickHouse,Kafka,GraphQL,WebGL,TypeScript,Tailwind CSS",
      liveUrl: "https://nexus-analytics.demo",
      githubUrl: "https://github.com/braveturing/nexus-analytics",
      featured: true,
      category: "web",
    },
    {
      title: "Aether - Autonomous Agentic Coding Engine",
      slug: "aether-ai",
      description: "An advanced LLM agent orchestration platform that automates multi-file refactoring, static analysis, and autonomous test synthesis.",
      content: `Aether bridges frontier Large Language Models with production developer environments to orchestrate complex code changes across distributed polyglot codebases.

### Autonomous Planning & Tool Calling
Unlike simple autocomplete wrappers, Aether runs an iterative ReAct (Reason + Act) loop using AST (Abstract Syntax Tree) manipulation tools, ripgrep semantic indexing, and LSP (Language Server Protocol) interfaces. It evaluates compiler feedback, diagnoses runtime exceptions in sandboxed Docker containers, and recursively patches logic until all unit tests pass with zero regression.

### Performance & Latency Optimization
To achieve sub-second perceived response latency, token generation is streamed via server-sent events using Groq LPU acceleration and Google Gemini 2.0 Flash reasoning pipelines with context caching.`,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      techStack: "TypeScript,Python,Gemini AI,LangGraph,Docker,WebSockets,Tailwind CSS",
      liveUrl: "https://aether-agent.demo",
      githubUrl: "https://github.com/braveturing/aether-ai",
      featured: true,
      category: "ai",
    },
    {
      title: "Hyperion - Distributed In-Memory Key-Value Store",
      slug: "hyperion-db",
      description: "A fault-tolerant, Redis-wire-compatible in-memory store featuring distributed Raft consensus and zero-allocation networking.",
      content: `Hyperion is a resilient in-memory database built from first principles in Go to investigate zero-allocation networking and consensus algorithms under high concurrency.

### Raft Consensus Protocol
Hyperion implements a clean Raft state machine supporting dynamic cluster membership changes, log compaction, snapshot streaming, and leader leases. It guarantees linearizable reads and atomic writes even across split-brain network partitions.

### Memory & Network Efficiency
By replacing standard net.Conn allocations with epoll-based event loops (via netpoll) and memory-mapped append-only persistence logs, Hyperion delivers over 350,000 requests per second per core with p99 latency remaining below 0.8ms.`,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
      techStack: "Go,Raft,gRPC,Redis Protocol,Kubernetes,Prometheus",
      liveUrl: "https://hyperion.demo",
      githubUrl: "https://github.com/braveturing/hyperion-db",
      featured: true,
      category: "devops",
    },
    {
      title: "Prism - Enterprise Design System & Component Studio",
      slug: "prism-design-system",
      description: "An accessible, themeable design system and interactive component studio adopted across multiple production applications.",
      content: `Prism standardizes user interface engineering across web applications through rigorous accessibility compliance (WCAG 2.1 AAA) and atomic design tokens.

### Architecture
Prism pairs Radix UI primitives with Tailwind CSS v4 styling, offering composable, keyboard-accessible components that adapt cleanly between light, dark, and high-contrast accessibility modes. The component studio includes live token visualizers, interactive props playgrounds, and automated visual regression testing using Playwright.`,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
      techStack: "React 19,TypeScript,Tailwind CSS,Radix UI,Storybook,Playwright",
      liveUrl: "https://prism-ui.demo",
      githubUrl: "https://github.com/braveturing/prism-design-system",
      featured: false,
      category: "web",
    },
    {
      title: "QuantumFlow - Real-Time Collaborative Canvas",
      slug: "quantum-flow",
      description: "A multiplayer infinite whiteboard platform powered by Conflict-free Replicated Data Types (CRDTs) and WebSockets.",
      content: `QuantumFlow enables frictionless real-time collaboration with instant peer synchronization and conflict-free spatial editing.

### CRDT Multiplayer Engine
Under the hood, drawing paths, sticky notes, and spatial diagrams are modeled as Yjs CRDT structures synchronized over high-throughput WebSocket connections. Updates merge deterministically regardless of network jitter, message reordering, or offline edits.`,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
      techStack: "Next.js,TypeScript,Yjs,WebSockets,Canvas 2D,Zustand",
      liveUrl: "https://quantumflow.demo",
      githubUrl: "https://github.com/braveturing/quantum-flow",
      featured: false,
      category: "web",
    },
    {
      title: "Vortex - Distributed Cloud Build & Test Runner",
      slug: "vortex-ci",
      description: "A fast, cost-effective CI pipeline runner utilizing ephemeral containers and distributed compiler artifact caching.",
      content: `Vortex reduces CI test durations by up to 80% through smart dependency graph slicing and multi-region CAS (Content-Addressable Storage) artifact caching.

### Pipeline Orchestration
Build pipelines are defined via declarative YAML and parsed into Directed Acyclic Graphs (DAGs). Independent tasks execute in parallel on warm microVMs, while build cache hits eliminate redundant compilation for unchanged dependencies.`,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      techStack: "Node.js,Docker,AWS Fargate,WebAssembly,PostgreSQL,Redis",
      liveUrl: "https://vortex-ci.demo",
      githubUrl: "https://github.com/braveturing/vortex-ci",
      featured: false,
      category: "devops",
    },
  ];

  for (const proj of projectsData) {
    const created = await prisma.project.create({ data: proj });
    console.log(`🚀 Seeded Project: ${created.title}`);
  }

  // Seed Blog Posts
  const blogPostsData = [
    {
      title: "Mastering React Server Components in Next.js 15",
      slug: "mastering-react-server-components",
      excerpt: "A deep dive into the architecture of React Server Components, streaming SSR, and practical patterns for building high-performance web applications.",
      content: `React Server Components (RSC) represent a fundamental paradigm shift in how we conceive, construct, and scale modern web applications. Unlike traditional client-rendered single page apps or legacy SSR that shipped bloated bundles to the browser for full client hydration, RSC allows components to execute strictly on the server.

### The Problem With Client-Centric Hydration
Historically, when rendering a dashboard with rich data charts, markdown parsers, and date formatting utilities, the browser had to download the JavaScript code for each of those libraries before the page became interactive. With RSC, libraries like date-fns, marked, or database clients remain exclusively on the server. Only the computed UI virtual DOM stream is transmitted over the wire.

### Practical Boundary Design
The golden rule of building scalable Next.js 15 applications is to push 'use client' directives as far leaves down the component hierarchy as possible. Server Components should be the default container; Client Components should only be introduced for interactive event handlers, browser state hooks, and client animations.

### Streaming and Suspense Boundaries
By wrapping slow database queries in React Suspense boundaries, Next.js can instantly stream initial page scaffolding and loading skeletons to the visitor while heavy backend queries resolve in parallel. This eliminates render-blocking cascades and guarantees sub-second First Contentful Paint.`,
      coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop&q=80",
      tags: "React,Next.js,Performance,Architecture",
      published: true,
      views: 14250,
      readTime: 8,
      authorId: user.id,
    },
    {
      title: "Advanced TypeScript Patterns for Enterprise Architecture",
      slug: "advanced-typescript-patterns",
      excerpt: "Move beyond basic interfaces. Learn how to leverage conditional types, template literals, and branded primitives to build self-documenting code.",
      content: `TypeScript's real value emerges when the type system is utilized as an active design language rather than a simple linting layer. In large engineering organizations, expressive types prevent runtime bugs before code ever merges to main.

### Branded (Nominal) Types
In standard TypeScript, type compatibility is structural. If a UserId is an alias for string and an OrderId is also a string, you can accidentally pass an OrderId into a lookupUser() function without compiler complaints.

By applying compile-time branding:
\`\`\`typescript
declare const __brand: unique symbol;
type Brand<K, T> = K & { readonly [__brand]: T };

export type UserId = Brand<string, "UserId">;
export type OrderId = Brand<string, "OrderId">;
\`\`\`
The compiler guarantees that IDs cannot be conflated, with zero runtime performance cost.

### Conditional Types and Distributed Union Inference
Using the \`infer\` keyword within conditional types allows you to unpack return signatures, unwrapping Promise types, and validate API routes automatically. Pairing this with Zod schemas enables end-to-end type safety between your database models and client fetch calls.`,
      coverImage: "https://images.unsplash.com/photo-1516116211227-bbc7909b8d23?w=1200&auto=format&fit=crop&q=80",
      tags: "TypeScript,Architecture,Software Design,Best Practices",
      published: true,
      views: 9810,
      readTime: 6,
      authorId: user.id,
    },
    {
      title: "Building Scalable Microservices with Go and gRPC",
      slug: "scalable-microservices-go-grpc",
      excerpt: "How to engineer resilient, low-latency microservices using Go, Protocol Buffers, and gRPC with distributed tracing.",
      content: `When inter-service communication becomes the throughput bottleneck in distributed web platforms, standard REST over HTTP/1.1 fails to sustain high transaction volumes. Migrating service-to-service communication to gRPC and Protocol Buffers unlocks order-of-magnitude performance gains.

### Binary Protocol vs. JSON Payloads
Protocol Buffers encode messages into compact binary streams, eliminating the serialization and parsing overhead inherent to textual JSON. Combined with HTTP/2 multiplexing, hundreds of concurrent RPC invocations can travel across a single persistent TCP connection.

### Deadlines and Circuit Breaking
In microservice architectures, cascading failure is the primary enemy. By propagating context deadlines and configuring circuit breakers with exponential backoff, Go services can gracefully degrade rather than crashing dependent clusters when an upstream dependency stutters.`,
      coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
      tags: "Go,Microservices,gRPC,Backend,Cloud",
      published: true,
      views: 7420,
      readTime: 7,
      authorId: user.id,
    },
    {
      title: "From Prompt Engineering to Agentic Workflows: The 2026 AI Paradigm",
      slug: "future-of-ai-engineering",
      excerpt: "Why simple prompts are obsolete. Explore autonomous ReAct loops, context caching, and tool-calling architectures that build real software.",
      content: `The artificial intelligence landscape has transitioned rapidly from static single-turn prompt generation to autonomous agentic architectures. In 2026, engineering with frontier LLMs means building state machines that reason, use tools, inspect outputs, and self-correct.

### The ReAct Execution Loop
Rather than expecting a language model to produce a flawless complex solution in one pass, agentic systems structure the problem into discrete phases: Thought, Action, Observation, and Reflection. By providing the model with deterministic tools (like file system readers, linters, and compiler runners), the agent verifies its work at each step.

### Context Caching and Token Economics
Frontier models like Google Gemini 2.0 Flash support context caching, enabling developers to preload massive codebases or technical documentation sets at a fraction of the cost. Agents can reference tens of thousands of tokens of repository context while maintaining sub-second inference speeds.`,
      coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80",
      tags: "AI,LLM,Agents,Machine Learning,Future Tech",
      published: true,
      views: 18900,
      readTime: 10,
      authorId: user.id,
    },
    {
      title: "Achieving Sub-50ms TTFB and Zero-CLS in High-Traffic Web Apps",
      slug: "optimizing-web-performance-at-scale",
      excerpt: "Practical performance engineering techniques: Edge caching, resource hints, font optimization, and layout stabilization.",
      content: `Web performance is not merely an aesthetic quality; it directly impacts user engagement, search indexing rankings, and conversion rates. Engineering for 100/100 Google Lighthouse scores requires holistic optimization across the network and render pipelines.

### Edge Middleware & Stale-While-Revalidate
By offloading routing logic and authorization checks to edge workers positioned geographically close to the user, you can serve pre-computed static HTML shell pages in under 30 milliseconds. Dynamic components hydrate progressively as streaming data arrives.

### Eliminating Cumulative Layout Shift (CLS)
Cumulative Layout Shift occurs when images, advertisements, or dynamic fonts load without reserved spatial dimensions. Using Next.js Image components with explicit aspect ratios and modern font definitions with fallback metrics guarantees zero visual jank during page load.`,
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      tags: "Performance,Web,SEO,Core Web Vitals",
      published: true,
      views: 6150,
      readTime: 5,
      authorId: user.id,
    },
    {
      title: "Demystifying Distributed Consensus: Implementing Raft from Scratch",
      slug: "distributed-consensus-raft-explained",
      excerpt: "A step-by-step exploration of leader election, log replication, and safety guarantees in distributed state machines.",
      content: `How do distributed databases like etcd, CockroachDB, and Kafka manage to agree on system state across clusters of unreliable nodes? The answer lies in consensus protocols, with Raft standing out as the gold standard for comprehensibility and correctness.

### The Three Subproblems of Raft
Raft decomposes the consensus challenge into three discrete mechanisms:
1. **Leader Election**: When a cluster initializes or a leader heartbeat times out, nodes transition to Candidate state and initiate a randomized election timer.
2. **Log Replication**: The elected leader accepts client write requests, appends them to its local log, and replicates them to follower nodes via AppendEntries RPCs.
3. **Safety Invariants**: An entry is considered committed once it is replicated across a strict majority of nodes. Once committed, no future leader can overwrite or remove that entry.

### Handling Network Partitions
Raft guarantees that if a network partition splits a 5-node cluster into partitions of 2 and 3 nodes, only the 3-node partition can elect a leader and commit transactions. The minority partition pauses writes, preserving complete data integrity without corruption.`,
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      tags: "Distributed Systems,Raft,Computer Science,Algorithms",
      published: true,
      views: 11200,
      readTime: 9,
      authorId: user.id,
    },
  ];

  for (const post of blogPostsData) {
    const created = await prisma.blogPost.create({ data: post });
    console.log(`📝 Seeded Blog Post: ${created.title}`);
  }

  // Seed initial B2B Acquisition Target Leads for SaaSQuatch LeadGen
  await prisma.lead.deleteMany();
  const leadsData = [
    {
      companyName: "CloudScale Telemetry",
      domain: "cloudscale.io",
      industry: "B2B SaaS / Infrastructure",
      location: "Austin, TX",
      employeeCount: "45-60",
      estimatedRevenue: "$8.4M ARR (42% EBITDA)",
      decisionMaker: "David Sterling",
      role: "Founder & CEO",
      email: "david@cloudscale.io",
      linkedinUrl: "https://linkedin.com/in/david-sterling-cloud",
      techStack: "Go, Kubernetes, React, AWS, ClickHouse",
      aiScore: "A+",
      aiInsights: "Ideal PE / ETA platform acquisition target. Sticky enterprise retention (118% NDR), founder seeking succession / exit liquidity, strong EBITDA margin with immediate operational leverage through AI automated customer support.",
      status: "Enriched",
    },
    {
      companyName: "LogiSync Freight Ops",
      domain: "logisync.com",
      industry: "Logistics & Supply Chain",
      location: "Chicago, IL",
      employeeCount: "80-100",
      estimatedRevenue: "$12.5M ARR (34% EBITDA)",
      decisionMaker: "Elena Rostova",
      role: "Managing Director & Co-Founder",
      email: "elena.r@logisync.com",
      linkedinUrl: "https://linkedin.com/in/elena-rostova-logi",
      techStack: "Python, Django, PostgreSQL, Docker, Azure",
      aiScore: "A",
      aiInsights: "High volume dispatcher workflows. Ripe for AI document parsing (BOLs/Invoices) post-acquisition to expand EBITDA margins by 600 bps.",
      status: "Enriched",
    },
    {
      companyName: "ApexMed EHR Solutions",
      domain: "apexmed.health",
      industry: "Healthcare SaaS",
      location: "Nashville, TN",
      employeeCount: "35-50",
      estimatedRevenue: "$6.2M ARR (38% EBITDA)",
      decisionMaker: "Dr. Marcus Vance",
      role: "Founder & Chief Executive",
      email: "m.vance@apexmed.health",
      linkedinUrl: "https://linkedin.com/in/marcus-vance-md",
      techStack: "Node.js, React, HIPAA Cloud, PostgreSQL",
      aiScore: "A+",
      aiInsights: "Extremely low churn (under 3% annually). High switching costs in regional outpatient clinics. Perfect Search Fund / PE rollup candidate.",
      status: "Discovered",
    },
    {
      companyName: "FinGuard Compliance",
      domain: "finguard.co",
      industry: "FinTech / RegTech",
      location: "New York, NY",
      employeeCount: "65-85",
      estimatedRevenue: "$15.0M ARR (45% EBITDA)",
      decisionMaker: "Rachel Chen",
      role: "Chief Operating Officer",
      email: "rachel@finguard.co",
      linkedinUrl: "https://linkedin.com/in/rachel-chen-finguard",
      techStack: "Java, Spring Boot, React, AWS GovCloud",
      aiScore: "A",
      aiInsights: "Mission-critical AML/KYC workflows for regional credit unions. Excellent cash flow stability with potential to cross-sell AI regulatory tracking.",
      status: "Enriched",
    },
    {
      companyName: "CyberShield IAM",
      domain: "cybershield.security",
      industry: "Cybersecurity",
      location: "Boston, MA",
      employeeCount: "50-70",
      estimatedRevenue: "$9.8M ARR (29% EBITDA)",
      decisionMaker: "Thomas Wright",
      role: "President & Founder",
      email: "thomas@cybershield.security",
      linkedinUrl: "https://linkedin.com/in/thomas-wright-sec",
      techStack: "Rust, TypeScript, Next.js, GCP",
      aiScore: "B+",
      aiInsights: "Strong proprietary zero-trust protocol. Moderate sales velocity; could benefit from Caprae's specialized B2B sales playbook post-acquisition.",
      status: "Discovered",
    },
    {
      companyName: "DataPulse Attribution",
      domain: "datapulse.ai",
      industry: "B2B SaaS / DevTools",
      location: "San Francisco, CA",
      employeeCount: "25-35",
      estimatedRevenue: "$4.5M ARR (26% EBITDA)",
      decisionMaker: "Kunal Sharma",
      role: "Co-Founder & CTO",
      email: "kunal@datapulse.ai",
      linkedinUrl: "https://linkedin.com/in/kunal-sharma-datapulse",
      techStack: "Next.js, Python, ClickHouse, Snowflake",
      aiScore: "B",
      aiInsights: "High technical pedigree and great developer adoption. Needs scaling of direct enterprise sales motions.",
      status: "Discovered",
    },
  ];

  for (const lead of leadsData) {
    await prisma.lead.create({ data: lead });
  }
  console.log(`🎯 Seeded ${leadsData.length} B2B Leads for SaaSQuatch LeadGen!`);

  console.log("✅ Database successfully seeded with production-grade engineering content!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
