import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Eye, BookOpen } from "lucide-react";
import { getDbBlogPostBySlug, getDbBlogPosts } from "@/lib/db-service";
import { formatDate } from "@/lib/utils";
import { TechBanner } from "@/components/ui/tech-banner";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getDbBlogPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Engineering Deep-Dive`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getDbBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getDbBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2);

  // Parse paragraphs and headings for real content rendering
  const paragraphs = post.content.split("\n\n");
  
  // Extract headings for dynamic Table of Contents
  const headings = paragraphs
    .filter((p) => p.startsWith("### "))
    .map((h) => h.replace("### ", "").trim());

  return (
    <>
      <div className="container mx-auto px-4 py-20 max-w-5xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all articles
        </Link>

        <header className="mb-12">
          <div className="flex gap-2 mb-6 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-full border border-indigo-200 dark:border-indigo-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-600/30 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
                BT
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </header>

        {/* Robust Engineering Tech Banner */}
        <div className="mb-16">
          <TechBanner
            title={post.title}
            tags={post.tags}
            src={post.coverImage}
            className="h-64 md:h-96"
          />
        </div>

        {/* Article Content & Table of Contents */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Article Body */}
          <div className="lg:w-3/4 space-y-6">
            <p className="lead text-xl text-indigo-950 dark:text-indigo-200 font-medium leading-relaxed bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 shadow-xs">
              {post.excerpt}
            </p>

            <div className="prose prose-lg max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
              {paragraphs.map((para, idx) => {
                if (para.startsWith("### ")) {
                  const title = para.replace("### ", "");
                  const anchor = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                  return (
                    <h2
                      key={idx}
                      id={anchor}
                      className="text-2xl font-bold text-slate-900 dark:text-slate-100 pt-6 scroll-mt-24 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2"
                    >
                      <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400 inline" />
                      {title}
                    </h2>
                  );
                }

                if (para.startsWith("```")) {
                  const lines = para.split("\n");
                  const code = lines.slice(1, -1).join("\n");
                  return (
                    <pre
                      key={idx}
                      className="p-5 rounded-xl bg-slate-900 text-slate-100 dark:bg-slate-950 dark:text-slate-200 border border-slate-800 font-mono text-sm overflow-x-auto my-6 shadow-sm"
                    >
                      <code>{code}</code>
                    </pre>
                  );
                }

                return (
                  <p key={idx} className="text-slate-700 dark:text-slate-300 text-base md:text-lg leading-relaxed font-normal">
                    {para}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              {headings.length > 0 && (
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-bold text-slate-900 dark:text-slate-200 mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
                    <span>Table of Contents</span>
                  </h4>
                  <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                    {headings.map((heading) => {
                      const anchor = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      return (
                        <li key={heading}>
                          <a
                            href={`#${anchor}`}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors block text-xs leading-snug"
                          >
                            • {heading}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-bold text-slate-900 dark:text-slate-200 mb-4 uppercase tracking-wider text-xs">
                  Share Article
                </h4>
                <div className="flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
                    title="Share on Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <button
                    onClick={undefined}
                    className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                    title="Share Link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Related Technical Deep-Dives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span>{related.readTime} min read</span>
                    <span>{formatDate(related.createdAt)}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-200 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-lg">
                    {related.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
