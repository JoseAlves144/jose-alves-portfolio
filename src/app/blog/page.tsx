import type { Metadata } from "next";
import { BlogList } from "@/components/blog/blog-list";
import { Accent } from "@/components/ui/section-heading";
import { Aurora } from "@/components/effects/aurora";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos técnicos sobre Dados, IA, Prevenção a Fraudes, Power BI, BigQuery e Python.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28">
      <Aurora className="opacity-50" />
      <div className="grid-bg mask-fade-y absolute inset-0 h-[60vh]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
          <span className="text-accent">/</span>blog
        </span>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl">
          Notas de campo sobre <Accent>dados e IA.</Accent>
        </h1>
        <p className="mt-6 mb-14 max-w-xl text-lg text-muted">
          Arquiteturas, aprendizados e boas práticas do dia a dia com dados, fraudes e inteligência artificial.
        </p>
        <BlogList />
      </div>
    </section>
  );
}
