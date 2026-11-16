import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-svh place-items-center px-6 text-center">
      <div className="grid-bg mask-fade-y absolute inset-0" />
      <div className="relative">
        <p className="font-mono text-sm text-accent">ERROR 404 · 0 rows returned</p>
        <h1 className="mt-4 text-6xl font-semibold tracking-tight md:text-8xl">Outlier.</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          Esta página não existe na base. Nem o melhor modelo encontraria ela por aqui.
        </p>
        <Link href="/" className={`${buttonVariants({ variant: "gradient" })} mt-8`}>
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
