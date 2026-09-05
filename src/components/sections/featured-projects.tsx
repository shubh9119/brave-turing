import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";
import { getDbFeaturedProjects } from "@/lib/db-service";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export async function FeaturedProjects() {
  const featuredProjects = await getDbFeaturedProjects();

  return (
    <section className="py-24" id="projects">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
                  Featured Systems & Projects
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Production-grade platforms and open-source infrastructure engineered for scale.
              </p>
            </div>
            <Link 
              href="/projects"
              className="hidden md:inline-flex items-center text-indigo-500 hover:text-indigo-400 font-medium transition-colors group"
            >
              View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.id}>
              <div className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
                <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden h-48 bg-gradient-to-br from-indigo-950/40 to-slate-900 border-b border-border/50">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-900/20 text-indigo-400 font-semibold text-lg">
                      {project.title}
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-background/90 backdrop-blur-md text-indigo-600 dark:text-indigo-400 border border-border/50">
                    {project.category}
                  </span>
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/projects/${project.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40 text-sm">
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
                    >
                      Case Study <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="View Repository"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-8 text-center md:hidden">
          <Link 
            href="/projects"
            className="inline-flex items-center text-indigo-500 font-medium"
          >
            View All Projects <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
