import { prisma } from "@/lib/prisma";

export interface ProjectDTO {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  createdAt: string;
}

export interface BlogPostDTO {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  published: boolean;
  views: number;
  readTime: number;
  author: string;
  createdAt: string;
}

export async function getDbProjects(): Promise<ProjectDTO[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    return projects.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content,
      image: p.image,
      techStack: p.techStack ? p.techStack.split(",").map((s) => s.trim()) : [],
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      featured: p.featured,
      category: p.category,
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch projects from DB:", error);
    return [];
  }
}

export async function getDbFeaturedProjects(): Promise<ProjectDTO[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    return projects.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content,
      image: p.image,
      techStack: p.techStack ? p.techStack.split(",").map((s) => s.trim()) : [],
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      featured: p.featured,
      category: p.category,
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch featured projects from DB:", error);
    return [];
  }
}

export async function getDbProjectBySlug(slug: string): Promise<ProjectDTO | null> {
  try {
    const p = await prisma.project.findUnique({
      where: { slug },
    });

    if (!p) return null;

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      content: p.content,
      image: p.image,
      techStack: p.techStack ? p.techStack.split(",").map((s) => s.trim()) : [],
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl,
      featured: p.featured,
      category: p.category,
      createdAt: p.createdAt.toISOString(),
    };
  } catch (error) {
    console.error(`Failed to fetch project ${slug} from DB:`, error);
    return null;
  }
}

export async function getDbBlogPosts(): Promise<BlogPostDTO[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });

    return posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      tags: p.tags ? p.tags.split(",").map((t) => t.trim()) : [],
      published: p.published,
      views: p.views,
      readTime: p.readTime,
      author: p.author?.name || "Brave Turing",
      createdAt: p.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch blog posts from DB:", error);
    return [];
  }
}

export async function getDbBlogPostBySlug(slug: string): Promise<BlogPostDTO | null> {
  try {
    const p = await prisma.blogPost.findUnique({
      where: { slug },
      include: { author: true },
    });

    if (!p) return null;

    // Increment view count in real database asynchronously
    try {
      await prisma.blogPost.update({
        where: { slug },
        data: { views: { increment: 1 } },
      });
    } catch (e) {
      console.warn("View increment skipped:", e);
    }

    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      tags: p.tags ? p.tags.split(",").map((t) => t.trim()) : [],
      published: p.published,
      views: p.views + 1,
      readTime: p.readTime,
      author: p.author?.name || "Brave Turing",
      createdAt: p.createdAt.toISOString(),
    };
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug} from DB:`, error);
    return null;
  }
}

export async function saveContactMessageToDb(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return await prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    },
  });
}

export interface LeadDTO {
  id: string;
  companyName: string;
  domain: string;
  industry: string;
  location: string;
  employeeCount: string;
  estimatedRevenue: string;
  decisionMaker: string;
  role: string;
  email: string;
  linkedinUrl: string;
  techStack: string[];
  aiScore: string;
  aiInsights: string | null;
  status: string;
  createdAt: string;
}

export async function getDbLeads(): Promise<LeadDTO[]> {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return leads.map((l) => ({
      id: l.id,
      companyName: l.companyName,
      domain: l.domain,
      industry: l.industry,
      location: l.location,
      employeeCount: l.employeeCount,
      estimatedRevenue: l.estimatedRevenue,
      decisionMaker: l.decisionMaker,
      role: l.role,
      email: l.email,
      linkedinUrl: l.linkedinUrl,
      techStack: l.techStack ? l.techStack.split(",").map((s) => s.trim()) : [],
      aiScore: l.aiScore,
      aiInsights: l.aiInsights,
      status: l.status,
      createdAt: l.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch leads from DB:", error);
    return [];
  }
}

export async function createDbLead(data: {
  companyName: string;
  domain: string;
  industry: string;
  location: string;
  employeeCount: string;
  estimatedRevenue: string;
  decisionMaker: string;
  role: string;
  email: string;
  linkedinUrl: string;
  techStack: string;
  aiScore?: string;
  aiInsights?: string;
  status?: string;
}) {
  return await prisma.lead.create({
    data: {
      ...data,
      aiScore: data.aiScore || "A",
      status: data.status || "Discovered",
    },
  });
}

export async function updateDbLead(id: string, data: Partial<{
  status: string;
  aiScore: string;
  aiInsights: string;
}>) {
  return await prisma.lead.update({
    where: { id },
    data,
  });
}
