"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/posts";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { RevealItem, Stagger } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";

export function BlogPreview() {
  const latest = [...posts].sort((a, b) => Number(a.draft) - Number(b.draft) || b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section id="blog" className="relative scroll-mt-20 py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            index="08"
            eyebrow="Blog"
            className="mb-0 md:mb-0"
            title={
              <>
                Ideias sobre <Accent>dados e IA.</Accent>
              </>
            }
            description="Artigos técnicos sobre Dados, IA, Fraudes, Power BI, BigQuery e Python."
          />
          <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
            Ver todos <ArrowRight />
          </Link>
        </div>
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {latest.map((p) => (
            <RevealItem key={p.slug}>
              <PostCard post={p} />
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
