/**
 * Timeline profissional (fonte: LinkedIn). Ordem: do mais recente para o mais antigo.
 */
export type TimelineItem = {
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  current?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    period: "2025 — Atual",
    role: "Especialista em Dados · Prevenção a Fraudes",
    company: "Care Plus (Bupa)",
    description:
      "Dados aplicados à Prevenção a Fraudes em Saúde Suplementar: detecção de padrões anômalos, regras de negócio complexas e IA aplicada.",
    highlights: ["Fraud Analytics", "BigQuery", "IA Generativa", "Automação"],
    current: true,
  },
  {
    period: "2024 — 2025",
    role: "Analista de Informações Gerenciais Sênior",
    company: "Care Plus (Bupa)",
    description:
      "Indicadores estratégicos, relatórios executivos e suporte à diretoria na tomada de decisão.",
    highlights: ["Power BI", "SQL", "KPIs", "Dashboards Executivos"],
  },
  {
    period: "2018 — 2024",
    role: "Analista de Operações I e II",
    company: "Qualicorp",
    description:
      "Análise de grandes volumes de dados de beneficiários, dashboards de sinistralidade e desempenho operacional, ETL e automação de processos.",
    highlights: ["SQL", "Python", "ETL", "Sinistralidade"],
  },
  {
    period: "2014 — 2018",
    role: "Assistente de Operações",
    company: "Qualicorp",
    description:
      "Controle de qualidade, desenvolvimento de relatórios e ferramentas para melhoria de fluxos operacionais.",
    highlights: ["Excel", "VBA", "Relatórios"],
  },
];
