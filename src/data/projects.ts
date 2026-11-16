/**
 * Projetos em destaque.
 * As "imagens" são ilustrações SVG geradas por código (variant), leves e
 * nítidas em qualquer tela. Para usar um print real, preencha `image` com
 * um caminho em /public (ex.: "/projects/fraude.webp").
 *
 * TODO: substitua os resultados qualitativos por métricas reais
 * (ex.: "-32% em perdas", "120h/mês economizadas").
 */
export type ProjectVariant = "fraud" | "agent" | "automation" | "dashboard" | "pipeline";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  problem: string;
  solution: string;
  result: string;
  variant: ProjectVariant;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "deteccao-de-fraudes",
    title: "Sistema Inteligente para Detecção de Fraudes",
    tagline: "Risk scoring · Saúde Suplementar",
    description:
      "Sistema que analisa padrões suspeitos utilizando indicadores de risco, cruzamento de informações e regras de negócio para identificar possíveis fraudes.",
    stack: ["Python", "BigQuery", "Power BI", "IA"],
    problem:
      "Volumes crescentes de contas e eventos tornavam a análise manual lenta e reativa, deixando passar padrões de fraude recorrentes.",
    solution:
      "Motor de indicadores de risco em BigQuery com cruzamento de bases, regras de negócio parametrizáveis e camada de IA para priorizar casos, consumido em painéis Power BI.",
    result:
      "Triagem orientada por risco, análise proativa e foco do time nos casos de maior impacto financeiro.",
    variant: "fraud",
    featured: true,
  },
  {
    slug: "agente-ia-bigquery",
    title: "Agente IA para Consulta em BigQuery",
    tagline: "Text-to-SQL · IA Generativa",
    description:
      "Agente de Inteligência Artificial capaz de conversar com bases corporativas utilizando linguagem natural. Gera SQL automaticamente e apresenta respostas executivas.",
    stack: ["Vertex AI", "OpenAI", "BigQuery", "Python"],
    problem:
      "Perguntas de negócio dependiam de analistas para escrever consultas, criando filas e atrasando decisões.",
    solution:
      "Agente com contexto do modelo de dados que interpreta a pergunta, gera e valida SQL no BigQuery e devolve a resposta em linguagem executiva.",
    result: "Acesso self-service aos dados e respostas em segundos, sem depender de fila técnica.",
    variant: "agent",
    featured: true,
  },
  {
    slug: "automacao-corporativa",
    title: "Automação de Processos Corporativos",
    tagline: "Power Platform · Python",
    description:
      "Automações responsáveis por eliminar processos manuais repetitivos e reduzir horas operacionais.",
    stack: ["Power Automate", "Python", "SharePoint"],
    problem: "Rotinas repetitivas de coleta, consolidação e envio consumiam horas da equipe toda semana.",
    solution:
      "Fluxos em Power Automate integrados ao SharePoint e scripts Python para tratamento, com alertas e trilha de auditoria.",
    result: "Redução de horas operacionais e menos erros manuais em processos críticos.",
    variant: "automation",
  },
  {
    slug: "dashboard-executivo",
    title: "Dashboard Executivo",
    tagline: "Power BI · KPIs estratégicos",
    description:
      "Dashboard estratégico utilizado para acompanhamento executivo de indicadores de negócio.",
    stack: ["Power BI", "SQL", "DAX"],
    problem: "Indicadores espalhados em planilhas, sem visão única e com números divergentes.",
    solution:
      "Modelo semântico único, KPIs padronizados e narrativa visual pensada para a diretoria.",
    result: "Uma fonte da verdade para o acompanhamento executivo e reuniões mais objetivas.",
    variant: "dashboard",
  },
  {
    slug: "pipeline-etl",
    title: "Pipeline ETL",
    tagline: "Data Engineering · BigQuery",
    description:
      "Pipeline automatizado responsável por ingestão, tratamento e disponibilização de dados para Analytics.",
    stack: ["Python", "BigQuery", "Google Cloud"],
    problem: "Cargas manuais e sem padrão geravam atrasos e baixa confiança nos dados.",
    solution:
      "Pipeline orquestrado com camadas de ingestão, tratamento e consumo, validações de qualidade e reprocessamento.",
    result: "Dados atualizados automaticamente, rastreáveis e prontos para Analytics.",
    variant: "pipeline",
  },
];
