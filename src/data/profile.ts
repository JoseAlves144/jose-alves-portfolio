/**
 * Conteúdo de perfil: hero, sobre, especializações e diferenciais.
 *
 * Observação: o LinkedIn bloqueia leitura automática. Os textos abaixo
 * foram montados a partir do briefing. Revise e enriqueça com dados do
 * seu perfil onde houver "TODO".
 */
import type { LucideIcon } from "lucide-react";
import { technologies } from "./skills";
import {
  BarChart3,
  Bot,
  BrainCircuit,
  Briefcase,
  Cloud,
  Database,
  GitBranch,
  HeartPulse,
  LineChart,
  MessagesSquare,
  Network,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Workflow,
  Gauge,
  Target,
  Layers,
} from "lucide-react";

export const heroRoles = [
  "Prevenção a Fraudes",
  "Saúde Suplementar",
  "Business Intelligence",
  "Data Engineering",
  "Inteligência Artificial",
  "Automação Corporativa",
] as const;

export const heroStats = [
  { value: 10, suffix: "+", label: "anos com dados" },
  { value: technologies.length, suffix: "", label: "tecnologias no stack" },
  { value: 9, suffix: "", label: "áreas de especialização" },
  // TODO: acrescente métricas reais (ex.: horas economizadas, dashboards entregues)
] as const;

export const aboutParagraphs = [
  "Há mais de uma década uso dados para apoiar decisões estratégicas. Comecei estruturando bases e relatórios e, ao longo do caminho, passei a desenhar o ecossistema completo: da ingestão ao dashboard executivo, da regra de negócio ao modelo de IA.",
  "Na Prevenção a Fraudes em Saúde Suplementar aprendi que dado bom é dado que vira ação. Indicadores de risco, cruzamentos de informação e frameworks de detecção só fazem sentido quando reduzem perdas e dão segurança a quem decide.",
  "Hoje combino Engenharia de Dados, Cloud e IA Generativa para construir agentes, automações e produtos analíticos que eliminam trabalho manual e encurtam o caminho entre a pergunta e a resposta.",
  // TODO: inclua aqui uma conquista marcante do seu LinkedIn
];

/** Evolução profissional mostrada como um "pipeline" na seção Sobre */
export const evolution: { label: string; icon: LucideIcon; caption: string }[] = [
  { label: "Dados", icon: Database, caption: "Fundamentos, SQL e qualidade" },
  { label: "BI", icon: BarChart3, caption: "Indicadores e dashboards" },
  { label: "Fraudes", icon: ShieldAlert, caption: "Risco e detecção de padrões" },
  { label: "Cloud", icon: Cloud, caption: "BigQuery, GCP e Azure" },
  { label: "IA", icon: BrainCircuit, caption: "ML, LLMs e agentes" },
  { label: "Automação", icon: Workflow, caption: "Power Platform e Python" },
  { label: "Eng. de Dados", icon: GitBranch, caption: "Pipelines e arquitetura" },
];

export const expertiseAreas: {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  featured?: boolean;
}[] = [
  {
    title: "Fraud Analytics",
    description:
      "Detecção de padrões suspeitos com indicadores de risco, cruzamento de bases e regras de negócio.",
    icon: ShieldCheck,
    tags: ["Fraud Detection", "Risk Management", "Frameworks de Risco"],
    featured: true,
  },
  {
    title: "Business Intelligence",
    description: "Dashboards executivos e KPIs que contam a história certa para quem decide.",
    icon: LineChart,
    tags: ["Dashboards Executivos", "KPIs", "Power BI"],
  },
  {
    title: "Engenharia de Dados",
    description: "ETL, pipelines e modelagem em BigQuery para dados confiáveis e escaláveis.",
    icon: Network,
    tags: ["ETL", "Data Pipelines", "BigQuery"],
  },
  {
    title: "Automação",
    description: "Processos manuais viram fluxos automáticos com Power Automate, Apps e Python.",
    icon: Workflow,
    tags: ["Power Automate", "Power Apps", "RPA"],
  },
  {
    title: "Inteligência Artificial",
    description:
      "IA Generativa, agentes, prompt engineering e machine learning aplicados a problemas reais.",
    icon: Bot,
    tags: ["AI Agents", "Prompt Engineering", "Machine Learning"],
    featured: true,
  },
  {
    title: "Cloud Computing",
    description: "Arquiteturas em Google Cloud e Azure, do armazenamento ao serviço de IA.",
    icon: Cloud,
    tags: ["Google Cloud", "Azure", "Fabric"],
  },
  {
    title: "Saúde Suplementar",
    description: "Contexto profundo de operadoras, sinistralidade, auditoria e regulação.",
    icon: HeartPulse,
    tags: ["Health Insurance Analytics", "Sinistros"],
    featured: true,
  },
  {
    title: "Decision Intelligence",
    description: "Analytics orientado a decisão: do dado bruto à recomendação acionável.",
    icon: Target,
    tags: ["Analytics", "Decision Intelligence"],
    featured: true,
  },
];

export const differentials: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Visão de negócio",
    description:
      "Começo pela decisão que precisa ser tomada, não pela ferramenta. Cada entrega responde a uma pergunta de negócio.",
    icon: Briefcase,
  },
  {
    title: "IA aplicada",
    description:
      "IA Generativa com propósito: agentes que consultam bases, geram SQL e entregam respostas executivas.",
    icon: Sparkles,
  },
  {
    title: "Arquitetura de Dados",
    description: "Pipelines e modelos pensados para escalar, com governança e qualidade desde a origem.",
    icon: Layers,
  },
  {
    title: "Automação",
    description: "Elimino tarefas repetitivas e devolvo horas para trabalho analítico de valor.",
    icon: Workflow,
  },
  {
    title: "Frameworks de Risco",
    description: "Estruturação de indicadores e regras para identificar, priorizar e tratar riscos.",
    icon: Gauge,
  },
  {
    title: "Saúde Suplementar",
    description: "Domínio do setor: linguagem, regulação e dores reais de operadoras de saúde.",
    icon: HeartPulse,
  },
  {
    title: "Comunicação Executiva",
    description: "Traduzo complexidade técnica em narrativas claras para diretoria e stakeholders.",
    icon: MessagesSquare,
  },
];
