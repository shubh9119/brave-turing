export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  views: number;
  readTime: number;
  author: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj_1",
    title: "Nexus - Distributed Analytics Platform",
    slug: "nexus-analytics",
    description: "A high-performance real-time analytics engine processing millions of events per second with sub-millisecond latency.",
    content: "Nexus is a state-of-the-art distributed analytics platform designed for immense scale. Built with a Rust core and a Next.js front-end, it processes unstructured event streams into actionable insights almost instantaneously.\n\nThe architecture relies on Kafka for message queuing, ClickHouse for high-speed columnar data storage, and a GraphQL federation layer to tie multiple microservices together seamlessly. We implemented custom sharding strategies that allowed linear scaling without significant performance degradation.\n\nOn the front end, the dashboard is heavily optimized using React Server Components to reduce the initial JavaScript payload. Canvas and WebGL power the visualization layer, allowing users to interact with millions of data points smoothly at 60 frames per second without browser lockup.",
    image: "/images/nexus-project.jpg",
    techStack: ["Next.js", "Rust", "ClickHouse", "Kafka", "GraphQL", "WebGL"],
    liveUrl: "https://nexus-analytics.demo",
    githubUrl: "https://github.com/braveturing/nexus",
    featured: true,
    category: "web",
    createdAt: "2025-11-10T00:00:00Z"
  },
  {
    id: "proj_2",
    title: "Aether - AI Pair Programmer",
    slug: "aether-ai",
    description: "An advanced LLM-powered IDE extension that understands repository context and suggests complex multi-file refactors.",
    content: "Aether revolutionizes the development workflow by integrating deeply into the developer's environment. Unlike generic autocomplete tools, Aether builds a local vector database of your entire repository to provide context-aware suggestions and refactoring capabilities.\n\nThe backend utilizes a custom fine-tuned LLaMA model hosted on AWS Inferentia instances for cost-effective, low-latency inferences. The client-side extension is written in TypeScript and integrates seamlessly with VS Code's Language Server Protocol (LSP).\n\nSecurity and privacy were paramount during development. We implemented a hybrid architecture where sensitive, proprietary code is anonymized and processed locally using WebAssembly, ensuring that no raw intellectual property ever leaves the user's machine.",
    image: "/images/aether-project.jpg",
    techStack: ["TypeScript", "Python", "PyTorch", "AWS", "WebAssembly", "Vector DB"],
    liveUrl: "https://aether-ai.demo",
    githubUrl: "https://github.com/braveturing/aether",
    featured: true,
    category: "ai",
    createdAt: "2026-02-15T00:00:00Z"
  },
  {
    id: "proj_3",
    title: "OmniChain - DeFi Aggregator",
    slug: "omnichain-defi",
    description: "A decentralized finance protocol aggregator that optimizes yield farming strategies across multiple EVM-compatible networks.",
    content: "OmniChain abstracts the complexity of cross-chain DeFi operations. It provides a unified interface for users to allocate liquidity, automatically routing funds through the most profitable and secure protocols across Ethereum, Arbitrum, Optimism, and Polygon.\n\nThe smart contracts are written in Solidity and underwent rigorous auditing. We utilized zero-knowledge proofs (zk-SNARKs) to batch transactions and significantly reduce gas fees for end-users while maintaining cryptographic security.\n\nThe web interface is built with React and ethers.js, featuring a custom transaction simulation engine that previews potential outcomes and risks before a user signs a transaction. This proactive security measure reduced failed transactions by over 80%.",
    image: "/images/omnichain-project.jpg",
    techStack: ["Solidity", "React", "ethers.js", "Node.js", "PostgreSQL"],
    liveUrl: "https://omnichain.demo",
    githubUrl: "https://github.com/braveturing/omnichain",
    featured: false,
    category: "web",
    createdAt: "2025-08-22T00:00:00Z"
  },
  {
    id: "proj_4",
    title: "Vortex - Kubernetes Operator",
    slug: "vortex-k8s",
    description: "A custom Kubernetes Operator for automated deployment, scaling, and self-healing of stateful distributed databases.",
    content: "Managing stateful applications in Kubernetes is notoriously difficult. Vortex automates the operational knowledge required to run complex databases like Cassandra and MongoDB in cloud-native environments.\n\nDeveloped in Go using the Kubebuilder framework, Vortex continuously monitors cluster health, automatically handles pod evictions, orchestrates zero-downtime upgrades, and manages automated backup/restore procedures to AWS S3.\n\nBy codifying these operational runbooks into a reconciliation loop, we reduced mean time to recovery (MTTR) for database incidents from hours to minutes. The operator is now open-source and adopted by several mid-sized enterprise teams.",
    image: "/images/vortex-project.jpg",
    techStack: ["Go", "Kubernetes", "Docker", "AWS S3", "Prometheus"],
    liveUrl: "https://vortex.demo",
    githubUrl: "https://github.com/braveturing/vortex",
    featured: true,
    category: "devops",
    createdAt: "2024-11-05T00:00:00Z"
  },
  {
    id: "proj_5",
    title: "Lumina - React Native Design System",
    slug: "lumina-design",
    description: "A comprehensive, highly accessible mobile UI component library for React Native with dynamic theming support.",
    content: "Lumina bridges the gap between design and engineering for mobile teams. It provides over 50 meticulously crafted React Native components that perfectly match our Figma design system, ensuring consistency across all our mobile products.\n\nAccessibility was a primary focus. Every component strictly adheres to WCAG guidelines, featuring full support for VoiceOver/TalkBack, dynamic type scaling, and high-contrast modes. We built a custom styling engine that evaluates theme tokens at runtime, allowing seamless hot-swapping between light, dark, and brand-specific themes.\n\nThe library is thoroughly tested with Detox for end-to-end testing and Jest for unit tests, achieving 95% code coverage. It is published as an internal NPM package with detailed Storybook documentation.",
    image: "/images/lumina-project.jpg",
    techStack: ["React Native", "TypeScript", "Jest", "Detox", "Storybook"],
    liveUrl: "https://lumina.demo",
    githubUrl: "https://github.com/braveturing/lumina",
    featured: false,
    category: "mobile",
    createdAt: "2025-05-18T00:00:00Z"
  },
  {
    id: "proj_6",
    title: "Sentinel - Edge Security WAF",
    slug: "sentinel-waf",
    description: "A lightweight, highly performant Web Application Firewall deployed at the edge using Cloudflare Workers.",
    content: "Sentinel provides immediate protection against common web vulnerabilities (OWASP Top 10) without the latency overhead of traditional centralized WAFs. Deployed directly to the edge via Cloudflare Workers, it analyzes and filters malicious traffic geographically close to the user.\n\nThe core detection engine uses a combination of regex-based rule matching and a lightweight machine learning model trained on historical attack patterns, allowing it to detect anomalous traffic that evades strict signature-based detection.\n\nWe built a real-time alerting system that aggregates blocked requests and pushes notifications to Slack and PagerDuty via webhooks. The configuration dashboard, built with Next.js and Tailwind CSS, allows administrators to visualize attack vectors and fine-tune security rules on the fly.",
    image: "/images/sentinel-project.jpg",
    techStack: ["TypeScript", "Cloudflare Workers", "Next.js", "Redis", "Tailwind CSS"],
    liveUrl: "https://sentinel.demo",
    githubUrl: "https://github.com/braveturing/sentinel",
    featured: false,
    category: "web",
    createdAt: "2026-01-30T00:00:00Z"
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog_1",
    title: "Mastering React Server Components in Next.js 15",
    slug: "mastering-react-server-components",
    excerpt: "A deep dive into the architecture of React Server Components, how they differ from SSR, and practical patterns for building highly performant applications.",
    content: "React Server Components (RSC) represent a fundamental paradigm shift in how we build React applications. Unlike traditional Server-Side Rendering (SSR) which merely sends a pre-rendered HTML string to the client that still requires full hydration, RSCs allow components to execute entirely on the server, sending only the resulting UI instructions to the browser.\n\nThis architectural change drastically reduces the client-side JavaScript bundle size. Components that only fetch data or format text no longer need to ship their underlying library code to the user. In our recent migration of a legacy dashboard to Next.js 15, adopting a server-first mindset reduced our initial load time by 65%.\n\nHowever, this introduces new complexities around state management and client-server boundaries. The key to mastering RSC is understanding where to place the 'use client' directive. It should be pushed as far down the component tree as possible, only wrapping the specific interactive elements rather than entire pages. By treating Server Components as the default and Client Components as the exception, you can build applications that are incredibly fast while maintaining the rich interactivity React is known for.",
    coverImage: "/images/blog-rsc.jpg",
    tags: ["React", "Next.js", "Performance", "Architecture"],
    published: true,
    views: 12540,
    readTime: 8,
    author: "Brave Turing",
    createdAt: "2026-03-10T00:00:00Z"
  },
  {
    id: "blog_2",
    title: "Advanced TypeScript Patterns for Enterprise Architecture",
    slug: "advanced-typescript-patterns",
    excerpt: "Move beyond basic interfaces. Learn how to leverage conditional types, mapped types, and generics to create robust, self-documenting APIs.",
    content: "TypeScript's true power lies not just in preventing runtime errors, but in its ability to express complex domain logic directly within the type system. In large-scale enterprise applications, well-designed types act as executable documentation that guides developers toward correct usage.\n\nOne incredibly powerful but underutilized feature is Conditional Types. By combining `infer` with conditional statements, you can extract types from complex nested structures automatically, reducing boilerplate and ensuring that your types stay in sync with your runtime data.\n\nAnother essential pattern is the use of Opaque Types (or Branded Types). When a User ID and a Product ID are both just strings, standard TypeScript won't prevent you from accidentally passing a Product ID to a function expecting a User ID. By 'branding' these strings at compile time, you can enforce domain boundaries rigorously without adding any runtime overhead.",
    coverImage: "/images/blog-ts.jpg",
    tags: ["TypeScript", "Software Design", "Best Practices"],
    published: true,
    views: 8320,
    readTime: 6,
    author: "Brave Turing",
    createdAt: "2026-02-22T00:00:00Z"
  },
  {
    id: "blog_3",
    title: "Building Scalable Microservices with Go and gRPC",
    slug: "scalable-microservices-go-grpc",
    excerpt: "Why we migrated our core billing service from a Node.js REST API to a Go-based gRPC architecture, and the lessons learned along the way.",
    content: "When our user base grew 10x over a single quarter, our Node.js-based monolithic billing service began showing severe signs of strain. Garbage collection pauses were causing unacceptable latency spikes, and REST serialization overhead was consuming significant CPU resources. We made the decision to rewrite the core service in Go, utilizing gRPC for internal communication.\n\nGo's concurrency model (goroutines) combined with its statically compiled nature provided an immediate and dramatic improvement in performance and resource utilization. We were able to handle 5x the traffic using half the compute resources. \n\nHowever, the real game-changer was adopting gRPC and Protocol Buffers. Unlike JSON REST APIs, Protobuf provides a strict, language-agnostic contract for service communication. The binary serialization is significantly faster and smaller over the wire. More importantly, it eliminated an entire category of bugs related to mismatched API expectations between services, as client stubs could be automatically generated directly from the `.proto` definitions.",
    coverImage: "/images/blog-go.jpg",
    tags: ["Go", "Microservices", "gRPC", "Backend", "Scaling"],
    published: true,
    views: 15400,
    readTime: 10,
    author: "Brave Turing",
    createdAt: "2025-11-05T00:00:00Z"
  },
  {
    id: "blog_4",
    title: "Integrating LLMs into Traditional Web Applications",
    slug: "integrating-llms-web-apps",
    excerpt: "Practical strategies for adding AI capabilities to existing products without compromising user experience or breaking the bank.",
    content: "The rapid advancement of Large Language Models has created immense pressure on product teams to 'add AI' to their applications. However, naively strapping a chatbot interface onto an existing product rarely provides genuine value. Meaningful integration requires a nuanced approach to context management, prompt engineering, and UI design.\n\nIn this post, we explore several effective patterns. 'Semantic Search and Retrieval-Augmented Generation (RAG)' is a highly effective way to leverage your proprietary data. By converting your database records into vector embeddings, you can allow the LLM to answer complex queries based on specific, up-to-date domain knowledge rather than its generic training data.\n\nCrucially, handling latency and failure modes is essential. LLM APIs are inherently slow and prone to timeouts. Implementing robust streaming interfaces (like Next.js AI SDK), optimistic UI updates, and graceful fallbacks when the model returns unexpected formats will make the difference between a frustrating gimmick and a magical user experience.",
    coverImage: "/images/blog-ai.jpg",
    tags: ["AI", "LLM", "Next.js", "UX", "Web Development"],
    published: true,
    views: 19800,
    readTime: 7,
    author: "Brave Turing",
    createdAt: "2026-01-12T00:00:00Z"
  }
];

export const MOCK_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "msg_1",
    name: "Sarah Jenkins",
    email: "sarah.j@techcorp.io",
    subject: "Freelance Opportunity: Next.js Dashboard",
    message: "Hi there! I loved your portfolio. We are currently looking for a senior developer to help us revamp our internal analytics dashboard using Next.js and Tailwind. We have the designs ready in Figma. Let me know if you are available for a quick chat next week.",
    read: false,
    createdAt: "2026-09-04T14:30:00Z"
  },
  {
    id: "msg_2",
    name: "David Chen",
    email: "dchen88@gmail.com",
    subject: "Question regarding your RSC article",
    message: "Great article on React Server Components! I had a quick question regarding how you handle global state (like user authentication) when the majority of your component tree is rendered on the server. Do you still rely on Providers at the root level? Thanks!",
    read: true,
    createdAt: "2026-09-02T09:15:00Z"
  },
  {
    id: "msg_3",
    name: "Elena Rodriguez",
    email: "erodriguez@innovate.vc",
    subject: "Connecting on potential collaboration",
    message: "Hello! I'm a partner at Innovate VC. We're putting together a founding team for an ambitious new AI-driven fintech product and your background in both distributed systems and modern web frontend caught our eye. Would love to discuss this further if you're open to new ventures.",
    read: true,
    createdAt: "2026-08-28T16:45:00Z"
  }
];
