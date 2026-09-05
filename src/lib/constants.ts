export const SITE_CONFIG = {
  name: "Brave Turing",
  title: "Brave Turing | Full-Stack Developer & Creative Engineer",
  description:
    "A premium portfolio showcasing innovative projects, technical expertise, and creative engineering solutions. Built with cutting-edge technology.",
  url: "https://brave-turing.vercel.app",
  ogImage: "/og.png",
  creator: "Brave Turing",
  keywords: [
    "full-stack developer",
    "software engineer",
    "web development",
    "portfolio",
    "react",
    "next.js",
    "typescript",
  ],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/leadgen", label: "LeadGen AI" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com", icon: "Github" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { name: "Twitter", href: "https://twitter.com", icon: "Twitter" },
  { name: "Email", href: "mailto:hello@braveturing.dev", icon: "Mail" },
] as const;

export const SKILLS = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Prisma", category: "Database" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Docker", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "Git", category: "Tools" },
  { name: "GraphQL", category: "API" },
] as const;
