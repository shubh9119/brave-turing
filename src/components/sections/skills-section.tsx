"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";
import { useState } from "react";

const SKILLS = [
  { name: "React", category: "Frontend", icon: "⚛️" },
  { name: "Next.js", category: "Frontend", icon: "▲" },
  { name: "TypeScript", category: "Language", icon: "📘" },
  { name: "Tailwind CSS", category: "Frontend", icon: "🌊" },
  { name: "Node.js", category: "Backend", icon: "🟢" },
  { name: "PostgreSQL", category: "Database", icon: "🐘" },
  { name: "Prisma", category: "Database", icon: "◭" },
  { name: "GraphQL", category: "API", icon: "🕸️" },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Language", "Database", "API"];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = SKILLS.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section className="py-24 bg-muted/30" id="skills">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
                Skills & Technologies
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit I use to build digital solutions.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-background border border-input hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <StaggerItem key={skill.name}>
              <div className="group p-6 rounded-2xl bg-background border border-border hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 transform hover:scale-[1.02] flex flex-col items-center justify-center text-center gap-4">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <div>
                  <h3 className="font-semibold">{skill.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{skill.category}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
