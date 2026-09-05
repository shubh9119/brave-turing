import Link from "next/link";
import { Calendar, Clock, User, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    createdAt: string;
    readTime: number;
    views?: number;
    tags: string[];
    author: string;
  };
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <div className="h-full flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 shadow-sm hover:shadow-xl dark:group-hover:shadow-[0_12px_30px_-12px_rgba(99,102,241,0.25)] hover:border-indigo-300 dark:group-hover:border-indigo-500/40">
        <div className="h-48 w-full bg-gradient-to-br from-indigo-50 dark:from-indigo-950/40 to-slate-100 dark:to-slate-950 relative overflow-hidden flex-shrink-0 border-b border-slate-200 dark:border-slate-800/80">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#6366f1_1px,transparent_0)] [background-size:20px_20px]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 dark:from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap pr-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-white/95 dark:bg-slate-950/80 rounded-md backdrop-blur-md border border-indigo-200 dark:border-indigo-500/20 shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readTime} min read
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-slate-900">
            <div className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
              <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <User className="h-3 w-3" />
              </div>
              {post.author}
            </div>
            {typeof post.views === "number" && (
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Eye className="h-3 w-3" /> {post.views.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
