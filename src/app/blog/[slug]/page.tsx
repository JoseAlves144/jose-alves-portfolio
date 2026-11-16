import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { formatDate, publishedPosts } from "@/data/posts";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";

/** Gera estaticamente todas as páginas de artigos publicados. */
export function generateStaticParams() {
  return publishedPosts.map((p) => ({ slug: p.slug }));
}

const getPost = (slug: string) => publishedPosts.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "pt-BR",
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <article className="relative pt-36 pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="size-4" /> Voltar ao blog
        </Link>
        <header className="mt-10 border-b border-line pb-10">
          <Badge variant="accent">{post.category}</Badge>
          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight text-balance md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 font-mono text-xs text-subtle">
            <span>{siteConfig.name}</span>
            <span className="size-1 rounded-full bg-line-strong" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="size-1 rounded-full bg-line-strong" />
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" /> {post.readingTime} min de leitura
            </span>
          </div>
        </header>

        <div className="mt-10 space-y-6 text-[17px] leading-[1.8] text-muted">
          {post.content.map((b, i) => {
            switch (b.type) {
              case "h2":
                return (
                  <h2 key={i} className="pt-6 text-2xl font-semibold tracking-tight text-fg">
                    {b.text}
                  </h2>
                );
              case "p":
                return <p key={i}>{b.text}</p>;
              case "list":
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                );
              case "code":
                return (
                  <pre key={i} className="overflow-x-auto rounded-2xl border border-line bg-surface p-5 font-mono text-[13px] leading-relaxed text-fg">
                    <code data-lang={b.lang}>{b.code}</code>
                  </pre>
                );
            }
          })}
        </div>
      </div>
    </article>
  );
}
