import { getDbProjects } from "@/lib/db-service";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Projects & Systems",
  description: "Explore production platforms, distributed systems, and open source infrastructure built by Brave Turing.",
};

export default async function ProjectsPage() {
  const projects = await getDbProjects();

  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 mb-2">
          <span>Production Portfolio</span>
          <span>•</span>
          <span>{projects.length} Flagship Systems</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          Systems & Engineering Projects
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          High-throughput distributed systems, autonomous AI agents, and developer tooling built with modern cloud architectures.
        </p>
      </div>

      <ProjectsGallery initialProjects={projects} />
    </div>
  );
}
