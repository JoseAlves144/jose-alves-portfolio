# José Alves — Portfólio (Data · Analytics · IA)

Site de portfólio premium construído com **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion**.

## Rodar localmente

```bash
npm install        # só na primeira vez
npm run dev        # desenvolvimento → http://localhost:3000
```

Produção local:

```bash
npm run build && npm start
```

## Deploy (Vercel)

Em produção: **https://jose-alves.vercel.app**

O projeto está conectado à Vercel via GitHub: todo `push` na `main` gera deploy de produção automático, e cada PR ganha uma URL de preview. Se migrar para domínio próprio, atualize `url` em `src/config/site.ts` (afeta SEO, sitemap e Open Graph).

## ✏️ O que preencher (procure por `TODO` no código)

| Arquivo | O quê |
| --- | --- |
| `src/data/projects.ts` | Métricas reais de resultado de cada projeto |
| `src/data/skills.ts` | Níveis das skills (0–100) |
| `src/data/certifications.ts` | Certificados (`status: "earned"`, data e link de verificação) |
| `src/data/profile.ts` | Textos do Sobre, métricas do hero |
| `src/data/posts.ts` | Artigos do blog (mude `draft` para `false` para publicar) |

## Arquitetura

```
src/
├─ app/                  # Rotas (App Router)
│  ├─ layout.tsx         # Metadata/SEO, JSON-LD, fontes, tema, efeitos globais
│  ├─ page.tsx           # Home (composição das seções)
│  ├─ blog/              # /blog e /blog/[slug] (estáticos)
│  ├─ opengraph-image.tsx, twitter-image.tsx   # Imagem social gerada no build
│  ├─ robots.ts, sitemap.ts, manifest.ts, icon.svg, not-found.tsx
│  └─ globals.css        # Design system: tokens dark/light, utilitários, animações
├─ config/site.ts        # Dados pessoais, links, navegação
├─ data/                 # Todo o conteúdo (editar aqui, não nos componentes)
├─ lib/                  # cn(), tema (View Transitions), helpers de SEO
└─ components/
   ├─ ui/                # Primitivos reutilizáveis (Button, Badge, TiltCard, Reveal...)
   ├─ layout/            # Navbar inteligente, Footer, Logo, ThemeToggle
   ├─ effects/           # Loader, cursor, partículas, aurora, easter eggs
   ├─ sections/          # Seções da home
   └─ blog/              # Card e lista de artigos
```

### Design system

- Tokens em `globals.css` (`--bg`, `--surface`, `--fg`, `--muted`, `--primary #2563EB`, `--accent #06B6D4`...) expostos ao Tailwind como `bg-bg`, `text-muted`, `text-accent` etc.
- Componentes no padrão **shadcn/ui** (`cva` + `cn`), sem dependência de runtime.
- Tipografia: Geist (texto), Geist Mono (detalhes técnicos), Instrument Serif itálico (destaques).

### Efeitos

Loading screen (CSS puro, só na 1ª visita da sessão) · Navbar que esconde/reaparece com scroll spy · Troca de tema com transição circular (View Transitions API) · Rede de partículas que reage ao mouse · Aurora animada · Glassmorphism · Cards com tilt 3D, spotlight e borda em gradiente · Botões magnéticos · Cursor personalizado · Scroll reveal · Contadores animados · Barras, radar e anéis animados · Parallax no hero · Console de IA gerando SQL ao vivo.

Tudo respeita `prefers-reduced-motion`.

### Performance

- Páginas 100% pré-renderizadas (estáticas).
- Animações de entrada do hero, loader e contadores em CSS (não dependem de JS → LCP ~1s).
- Scroll reveal e tilt com CSS + um único IntersectionObserver (sem JS por elemento).
- `content-visibility: auto` nas seções abaixo da dobra.
- Code splitting: modal de projetos, cursor e easter eggs carregados sob demanda.
- Canvas de partículas inicia em `requestIdleCallback` e pausa fora da tela.
- Ilustrações dos projetos em SVG gerado por código (zero imagens pesadas).

Lighthouse medido localmente (`next start`): **Desktop 97 · Mobile 90–97** em performance; **100** em Acessibilidade, Boas Práticas e SEO.

### SEO

Metadata completa, Open Graph e Twitter Cards com imagem gerada, `robots.txt`, `sitemap.xml`, manifest, canonical, JSON-LD (`Person`, `WebSite`, `BlogPosting`), `lang="pt-BR"`, HTML semântico.

## 🥚 Easter eggs

- Abra o console do navegador.
- Código Konami: ↑ ↑ ↓ ↓ ← → ← → B A
- Digite `select` em qualquer lugar da página.
- Clique 5 vezes rápido no logo.
- Acesse uma página que não existe.

## Observações

- **Lottie / GSAP:** não foram necessários. Framer Motion + CSS cobrem todos os efeitos com menos JavaScript, o que ajuda no Lighthouse. Se quiser uma animação Lottie específica, instale `lottie-react` e carregue com `next/dynamic`.
- O console do hero e os números exibidos nele são **ilustrativos**.
