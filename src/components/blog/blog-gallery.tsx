"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPostDTO } from "@/lib/db-service";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface BlogGalleryProps {
  initialPosts: BlogPostDTO[];
}

export function BlogGallery({ initialPosts }: BlogGalleryProps) {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allTags = Array.from(new Set(initialPosts.flatMap((p) => p.tags)));

  const filteredPosts = initialPosts.filter((post) => {
    const matchesTag = activeTag === "All" || post.tags.includes(activeTag);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Featured Post Banner */}
      {featuredPost && activeTag === "All" && searchQuery === "" && (
        <div className="mb-16">
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto bg-gradient-to-br from-indigo-50 dark:from-indigo-950/60 to-slate-100 dark:to-slate-950 relative overflow-hidden">
                {featuredPost.coverImage ? (
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,#6366f1_1px,transparent_0)] [background-size:24px_24px]" />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-white/95 dark:bg-indigo-950/90 rounded-full border border-indigo-200 dark:border-indigo-500/30 backdrop-blur-md shadow-xs">
                    Featured Deep-Dive
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-base leading-relaxed line-clamp-3 font-normal">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="font-medium text-slate-800 dark:text-slate-300">{featuredPost.author}</div>
                  <div>
                    {formatDate(featuredPost.createdAt)} • {featuredPost.readTime} min read • {featuredPost.views.toLocaleString()} views
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mr-2">Filter:</span>
          <button
            onClick={() => setActiveTag("All")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTag === "All"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            All Topics
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTag === tag
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search articles and topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTag === "All" && searchQuery === "" ? remainingPosts : filteredPosts).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-slate-600 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 bg-slate-50/50 dark:bg-transparent">
          <p className="text-base font-medium text-slate-900 dark:text-slate-300">No engineering articles found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveTag("All");
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}
    </>
  );
}
