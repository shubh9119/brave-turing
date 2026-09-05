import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDbProjects, getDbBlogPosts } from "@/lib/db-service";

const SYSTEM_PROMPT = `You are the personal AI Assistant for Brave Turing, a Staff-level Full-Stack Engineer and Systems Architect.
Your role is to represent Brave Turing to recruiters, engineering managers, and fellow developers.
Tone: Highly professional, articulate, technically deep, and welcoming.

Core Knowledge Base:
- Name: Brave Turing
- Role: Senior Full-Stack Engineer & Distributed Systems Specialist
- Key Tech Stack: Next.js 15, React 19, TypeScript, Rust, Go, Python, ClickHouse, Kafka, PostgreSQL, Docker, AWS, WebGL.
- Projects:
  1. Nexus: Distributed real-time analytics engine (Rust + ClickHouse + Kafka + WebGL).
  2. Aether AI: Autonomous agentic coding platform with ReAct loops and AST refactoring.
  3. Hyperion: Redis-compatible distributed in-memory KV store implementing Raft consensus in Go.
  4. Prism: Enterprise-grade accessible design system (WCAG 2.1 AAA).
  5. QuantumFlow: Multiplayer collaborative canvas with CRDTs and WebSockets.
  6. Vortex: Cloud-native CI pipeline runner with compiler artifact caching.
- Contact: hello@braveturing.dev or through the /contact form.

Always keep responses concise, impressive, and factually grounded in the portfolio.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages array." }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. If Gemini API key is configured, use real Google Gemini 2.0 Flash
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction: SYSTEM_PROMPT,
        });

        const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const chat = model.startChat({ history });
        const resultStream = await chat.sendMessageStream(lastUserMessage);

        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of resultStream.stream) {
                const chunkText = chunk.text();
                controller.enqueue(encoder.encode(chunkText));
              }
            } catch (err) {
              console.error("Gemini stream error:", err);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(readableStream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
          },
        });
      } catch (geminiError) {
        console.error("Gemini API invocation error:", geminiError);
        // Fall through to database-grounded smart local responder
      }
    }

    // 2. Production Local Knowledge-Base Streaming Engine
    // Dynamically query real DB context to give accurate, detailed answers even without an external API key!
    const [projects, posts] = await Promise.all([getDbProjects(), getDbBlogPosts()]);
    const lower = lastUserMessage.toLowerCase();

    let responseText = "";

    if (lower.includes("skill") || lower.includes("tech") || lower.includes("stack")) {
      responseText = `Brave Turing specializes in high-performance full-stack architectures and distributed systems:\n\n` +
        `• **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, WebGL.\n` +
        `• **Backend & Systems**: Rust, Go, Node.js, Python, gRPC, REST APIs.\n` +
        `• **Data & Infrastructure**: PostgreSQL (Neon), ClickHouse, Kafka, Redis, Docker, AWS.\n` +
        `• **Architecture**: Microservices, Raft distributed consensus, CRDTs, and agentic AI systems.`;
    } else if (lower.includes("project") || lower.includes("work") || lower.includes("built")) {
      const topProjects = projects.slice(0, 4).map(p => `• **${p.title}**: ${p.description}`).join("\n");
      responseText = `Here are some of Brave Turing's flagship production systems:\n\n${topProjects}\n\nYou can explore deep architectural breakdowns of all projects on the [/projects](/projects) page!`;
    } else if (lower.includes("blog") || lower.includes("article") || lower.includes("write") || lower.includes("post")) {
      const topPosts = posts.slice(0, 3).map(b => `• **${b.title}** (${b.readTime} min read)`).join("\n");
      responseText = `Brave Turing regularly publishes deep-dive engineering analyses:\n\n${topPosts}\n\nRead the full technical case studies on the [/blog](/blog) page!`;
    } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("reach")) {
      responseText = `You can get in touch with Brave Turing directly via:\n\n` +
        `• **Email**: hello@braveturing.dev\n` +
        `• **Contact Form**: Navigate to the [/contact](/contact) page to send a priority message.\n` +
        `• **GitHub**: [github.com/braveturing](https://github.com/braveturing)\n\nBrave Turing is open to principal engineering opportunities, technical advisory, and high-impact software consulting.`;
    } else {
      responseText = `Hello! I'm the AI engineering assistant for Brave Turing's portfolio platform.\n\n` +
        `I can answer questions about:\n` +
        `1. **Flagship Systems**: Such as Nexus (Distributed Analytics), Hyperion (Raft KV Store), and Aether (Agentic AI Engine).\n` +
        `2. **Engineering Deep Dives**: React Server Components, TypeScript architecture, and Raft consensus.\n` +
        `3. **Collaboration**: How to get in touch with Brave Turing for consulting or technical roles.\n\n` +
        `What would you like to know more about?`;
    }

    // Stream the response with natural token cadence
    const encoder = new TextEncoder();
    const words = responseText.split(" ");
    const readableStream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          controller.enqueue(encoder.encode(words[i] + (i < words.length - 1 ? " " : "")));
          await new Promise((r) => setTimeout(r, 25));
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
