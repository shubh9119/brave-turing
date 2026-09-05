"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectDTO } from "@/lib/db-service";

interface ProjectsGalleryProps {
  initialProjects: ProjectDTO[];
}

const CATEGORIES = ["All", "web", "ai", "devops"];

export function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = initialProjects.filter((project) => {
    const matchesCategory = activeFilter === "All" || project.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeFilter === cat 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" 
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {cat === "All" ? "All Systems" : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search by title, description, or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-slate-600 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 bg-slate-50/50 dark:bg-transparent">
          <p className="text-lg font-medium text-slate-900 dark:text-slate-200">No projects found matching your criteria.</p>
          <p className="text-sm mt-1 text-slate-500 dark:text-slate-400">Try resetting the filter or searching for another keyword like &ldquo;Rust&rdquo;, &ldquo;AI&rdquo;, or &ldquo;Next.js&rdquo;.</p>
          <button
            onClick={() => {
              setActiveFilter("All");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
}
