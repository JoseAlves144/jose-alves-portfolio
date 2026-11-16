import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { About } from "@/components/sections/about";
import { Expertise } from "@/components/sections/expertise";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { Differentials } from "@/components/sections/differentials";
import { Certifications } from "@/components/sections/certifications";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";

/**
 * Cada seção fica em um <Suspense>: o React hidrata em blocos menores
 * (hidratação seletiva) e libera a thread principal entre eles, reduzindo o TBT.
 * O HTML continua 100% pré-renderizado (SEO intacto).
 */
const sections = [Hero, TechMarquee, About, Expertise, Projects, Skills, Timeline, Differentials, Certifications, BlogPreview, Contact];

export default function HomePage() {
  return (
    <>
      {sections.map((Section, i) => (
        <Suspense key={i}>
          <Section />
        </Suspense>
      ))}
    </>
  );
}
