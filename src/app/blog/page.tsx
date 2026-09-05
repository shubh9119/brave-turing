import { getDbBlogPosts } from "@/lib/db-service";
import { BlogGallery } from "@/components/blog/blog-gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Deep-Dives",
  description: "In-depth explorations of distributed systems, React 19 Server Components, TypeScript patterns, and cloud infrastructure by Brave Turing.",
};

export default async function BlogPage() {
  const posts = await getDbBlogPosts();

  return (
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="mb-16 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 mb-2">
          <span>Technical Journal</span>
          <span>•</span>
          <span>{posts.length} In-Depth Articles</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
          Engineering Articles & Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
          Detailed technical analyses, architecture trade-offs, and practical lessons from building software at scale.
        </p>
      </div>

      <BlogGallery initialPosts={posts} />
    </div>
  );
}
