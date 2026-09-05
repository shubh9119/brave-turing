"use client";

import { useState } from "react";
import { Code2, Terminal, Layers, Cpu, Server, Network, Shield, Sparkles } from "lucide-react";

interface TechBannerProps {
  title: string;
  category?: string;
  tags?: string[];
  src?: string;
  className?: string;
}

export function TechBanner({ title, category, tags = [], src, className = "h-64 md:h-80" }: TechBannerProps) {
  const [hasError, setHasError] = useState(false);

  // Select an appropriate icon based on title / tags
  const lower = (title + " " + tags.join(" ")).toLowerCase();
  let Icon = Code2;
  let gradient = "from-indigo-900/60 via-purple-950/40 to-slate-950";
  let accent = "text-indigo-400 border-indigo-500/30 bg-indigo-500/10";

  if (lower.includes("typescript") || lower.includes("react") || lower.includes("front")) {
    Icon = Code2;
    gradient = "from-blue-950/70 via-indigo-950/50 to-slate-950";
    accent = "text-blue-400 border-blue-500/30 bg-blue-500/10";
  } else if (lower.includes("raft") || lower.includes("distributed") || lower.includes("consensus")) {
    Icon = Network;
    gradient = "from-cyan-950/70 via-indigo-950/50 to-slate-950";
    accent = "text-cyan-400 border-cyan-500/30 bg-cyan-500/10";
  } else if (lower.includes("microservice") || lower.includes("grpc") || lower.includes("go")) {
    Icon = Server;
    gradient = "from-emerald-950/70 via-slate-950 to-slate-950";
    accent = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
  } else if (lower.includes("ai") || lower.includes("agent") || lower.includes("prompt")) {
    Icon = Sparkles;
    gradient = "from-purple-950/80 via-indigo-950/50 to-slate-950";
    accent = "text-purple-400 border-purple-500/30 bg-purple-500/10";
  } else if (lower.includes("performance") || lower.includes("ttfb") || lower.includes("latency")) {
    Icon = Cpu;
    gradient = "from-amber-950/60 via-slate-950 to-slate-950";
    accent = "text-amber-400 border-amber-500/30 bg-amber-500/10";
  } else if (lower.includes("security") || lower.includes("iam")) {
    Icon = Shield;
    gradient = "from-rose-950/60 via-slate-950 to-slate-950";
    accent = "text-rose-400 border-rose-500/30 bg-rose-500/10";
  }

  return (
    <div className={`w-full rounded-3xl relative overflow-hidden border border-slate-800/80 bg-gradient-to-br ${gradient} ${className} flex items-center justify-center`}>
      {/* Background Matrix & Radial Glow */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_2px_2px,rgba(99,102,241,0.4)_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
      
      {src && !hasError ? (
        <img
          src={src}
          alt={title}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center absolute inset-0 z-0 opacity-80"
        />
      ) : null}

      {/* Modern Engineering Vector Artwork */}
      <div className="relative z-10 text-center px-6 max-w-2xl flex flex-col items-center">
        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center border ${accent} mb-4 shadow-xl backdrop-blur-md`}>
          <Icon className="h-8 w-8" />
        </div>
        
        {category && (
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${accent} mb-3 backdrop-blur-md`}>
            {category}
          </span>
        )}

        <h3 className="text-xl md:text-2xl font-extrabold text-slate-100 tracking-tight line-clamp-2">
          {title}
        </h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium text-slate-400 bg-slate-900/80 border border-slate-800">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-6 text-[10px] font-mono text-slate-500/60 uppercase tracking-widest hidden sm:block">
        Systems Architecture • Brave Turing
      </div>
    </div>
  );
}
