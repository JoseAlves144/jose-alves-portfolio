/**
 * Configuração central do site.
 * Tudo o que é "dado pessoal" ou URL fica aqui para facilitar manutenção.
 *
 * `url` é usado em SEO, sitemap e Open Graph: atualize se migrar para domínio próprio.
 */
export const siteConfig = {
  name: "José Alves",
  role: "Especialista em Dados",
  title: "José Alves — Especialista em Dados, Analytics & Inteligência Artificial",
  shortDescription:
    "Transformo grandes volumes de dados em decisões: Prevenção a Fraudes, BI, Engenharia de Dados e IA aplicada à Saúde Suplementar.",
  description:
    "Especialista em Dados com mais de 10 anos de experiência em Prevenção a Fraudes, Saúde Suplementar, Business Intelligence, Data Engineering e Inteligência Artificial. Dashboards executivos, pipelines, automações e agentes de IA.",
  url: "https://jose-alves.vercel.app",
  locale: "pt_BR",
  location: "São Paulo, Brasil",
  copyrightYear: 2026,
  keywords: [
    "Especialista em Dados",
    "Prevenção a Fraudes",
    "Fraud Analytics",
    "Saúde Suplementar",
    "Business Intelligence",
    "Power BI",
    "BigQuery",
    "Engenharia de Dados",
    "Inteligência Artificial",
    "IA Generativa",
    "Agentes de IA",
    "Analytics",
    "Python",
    "SQL",
    "Gestão de Riscos",
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/jos%C3%A9-alves-825735168/",
    github: "https://github.com/JoseAlves144",
    email: "jose.alves.santos13@gmail.com",
  },
} as const;

export const navItems = [
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "skills", label: "Skills" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "diferenciais", label: "Diferenciais" },
  { id: "blog", label: "Blog" },
  { id: "contato", label: "Contato" },
] as const;
