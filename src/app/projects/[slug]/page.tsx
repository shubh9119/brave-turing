import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Folder, Layers, Terminal } from "lucide-react";
import { getDbProjectBySlug, getDbProjects } from "@/lib/db-service";
import { TechBanner } from "@/components/ui/tech-banner";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getDbProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Engineering Case Study`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getDbProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getDbProjects();
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.slug !== slug)
    .slice(0, 3);

  // Parse sections and paragraphs from the markdown content
  const contentParagraphs = project.content.split("\n\n");

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Projects
      </Link>

      <div className="mb-10">
        <TechBanner
          title={project.title}
          category={project.category}
          tags={project.techStack}
          src={project.image}
          className="h-64 md:h-96"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl font-normal">
            {project.description}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
            >
              <Github className="h-4 w-4" /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium text-white transition-colors shadow-lg shadow-indigo-500/25"
            >
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Real Architecture & Engineering Case Study */}
      <div className="space-y-8 mb-16">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Technical Architecture & Deep Dive
        </h2>

        <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
          {contentParagraphs.map((para, idx) => {
            if (para.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="text-xl font-bold text-indigo-700 dark:text-indigo-300 pt-4 border-t border-slate-200 dark:border-slate-800"
                >
                  {para.replace("### ", "")}
                </h3>
              );
            }
            return (
              <p key={idx} className="text-base md:text-lg text-slate-700 dark:text-slate-300 font-normal">
                {para}
              </p>
            );
          })}
        </div>
      </div>

      {/* Technologies Used */}
      <div className="mb-16 p-8 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Production Tech Stack & Tools
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold tracking-wide"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Other {project.category.toUpperCase()} Systems
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="block p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-200 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
