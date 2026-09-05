import { HeroSection } from "@/components/hero/hero-section";
import { ParticleBackground } from "@/components/hero/particle-background";
import { LeadGenSpotlight } from "@/components/sections/leadgen-spotlight";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { SkillsSection } from "@/components/sections/skills-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <main>
      <section className="relative">
        <ParticleBackground />
        <HeroSection />
      </section>
      <LeadGenSpotlight />
      <FeaturedProjects />
      <SkillsSection />
      <StatsSection />
      <CtaSection />
    </main>
  );
}
