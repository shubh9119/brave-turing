"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Folder } from "lucide-react";

interface ProjectCardProps {
  project: {
    slug: string;
    title: string;
    description: string;
    category: string;
    techStack: string[];
    liveUrl?: string;
    liveDemoUrl?: string;
    githubUrl?: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const liveLink = project.liveUrl || project.liveDemoUrl;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/40 p-1 hover:bg-gradient-to-br hover:from-indigo-500/15 hover:to-purple-500/15 dark:hover:from-indigo-500/20 dark:hover:to-purple-500/20 transition-all duration-300 flex flex-col h-full shadow-sm"
      style={{ perspective: 1000 }}
    >
      <div className="h-full w-full rounded-xl bg-white dark:bg-slate-950 p-6 flex flex-col transition-all duration-300 group-hover:[transform:rotateX(2deg)_rotateY(-2deg)] border border-slate-200/80 dark:border-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            <Folder size={22} />
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="View GitHub Repository"
              >
                <Github size={18} />
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Open Live Application"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <Link href={`/projects/${project.slug}`} className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug">{project.title}</h3>
        </Link>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-slate-100 dark:border-slate-900">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
