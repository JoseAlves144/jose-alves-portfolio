import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate, type Post } from "@/data/posts";
import { Badge } from "@/components/ui/badge";

/** Card de artigo. Rascunhos aparecem como "em breve" e não são clicáveis. */
export function PostCard({ post }: { post: Post }) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <Badge variant={post.draft ? "default" : "accent"} size="sm">
          {post.category}
        </Badge>
        {post.draft ? (
          <span className="font-mono text-[11px] text-subtle uppercase">em breve</span>
        ) : (
          <ArrowUpRight className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        )}
      </div>
      <h3 className="mt-6 text-lg leading-snug font-semibold tracking-tight text-balance">{post.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <div className="mt-6 flex items-center gap-3 font-mono text-[11px] text-subtle">
        <span>{formatDate(post.date)}</span>
        <span className="size-1 rounded-full bg-line-strong" />
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" /> {post.readingTime} min
        </span>
      </div>
    </>
  );

  const cls = "group flex h-full flex-col rounded-3xl border p-6 transition-all duration-300";
  return post.draft ? (
    <div className={`${cls} border-dashed border-line-strong opacity-70`}>{inner}</div>
  ) : (
    <Link href={`/blog/${post.slug}`} className={`${cls} glass hover:-translate-y-1 hover:border-accent/40`} data-cursor="hover">
      {inner}
    </Link>
  );
}
