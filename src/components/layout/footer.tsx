import Link from "next/link"
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export function Footer() {
  const year = new Date().getFullYear()
  
  const iconMap: Record<string, React.ReactNode> = {
    Github: <Github className="h-4 w-4" />,
    Twitter: <Twitter className="h-4 w-4" />,
    Linkedin: <Linkedin className="h-4 w-4" />,
    Mail: <Mail className="h-4 w-4" />,
  }

  return (
    <footer className="border-t border-border/40 bg-background pt-10">
      <div className="container mx-auto px-4 sm:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col space-y-4">
            <span className="text-xl font-bold tracking-tighter gradient-text">
              {SITE_CONFIG?.name || "Brave-Turing"}
            </span>
            <p className="text-sm text-muted-foreground max-w-xs">
              {SITE_CONFIG?.description || "Building digital experiences."}
            </p>
          </div>
          
          <div className="flex flex-col space-y-4 md:items-center">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground md:items-center">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/leadgen" className="hover:text-foreground transition-colors">LeadGen AI</Link>
              <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 md:items-end">
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex space-x-4">
              {SOCIAL_LINKS?.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors"
                  )}
                >
                  <span className="sr-only">{link.name}</span>
                  {iconMap[link.name] || <span className="h-4 w-4" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-10 border-t border-border/40 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {year} {SITE_CONFIG?.name || "Brave-Turing"}. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with Next.js, TypeScript & ❤️</p>
        </div>
      </div>
    </footer>
  )
}
