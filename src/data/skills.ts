/**
 * Skills e tecnologias.
 * TODO: ajuste os níveis (0–100) conforme sua autoavaliação.
 */

export const technologies = [
  "Power BI", "Python", "SQL", "BigQuery", "Google Cloud", "Power Automate",
  "Power Apps", "Excel", "Fabric", "Azure", "Git", "GitHub", "Docker",
  "Looker Studio", "Pandas", "NumPy", "Scikit-Learn", "OpenAI", "Claude",
  "LangChain", "Vertex AI", "REST APIs", "HTML", "CSS", "JavaScript",
  "TypeScript", "React", "Next.js", "TailwindCSS",
] as const;

export type SkillGroup = {
  title: string;
  skills: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Dados & BI",
    skills: [
      { name: "SQL", level: 95 },
      { name: "Power BI", level: 95 },
      { name: "BigQuery", level: 90 },
      { name: "Excel", level: 92 },
      { name: "Looker Studio", level: 80 },
    ],
  },
  {
    title: "Engenharia & Cloud",
    skills: [
      { name: "Python · Pandas · NumPy", level: 88 },
      { name: "Google Cloud", level: 85 },
      { name: "ETL / Pipelines", level: 87 },
      { name: "Azure · Fabric", level: 72 },
      { name: "Docker · Git", level: 74 },
    ],
  },
  {
    title: "IA & Automação",
    skills: [
      { name: "IA Generativa (OpenAI · Claude)", level: 88 },
      { name: "Vertex AI · LangChain", level: 80 },
      { name: "Power Automate · Power Apps", level: 90 },
      { name: "Scikit-Learn", level: 75 },
      { name: "Prompt Engineering", level: 90 },
    ],
  },
];

/** Eixos do gráfico radar */
export const radarAxes = [
  { label: "BI", value: 95 },
  { label: "Fraudes", value: 94 },
  { label: "Eng. Dados", value: 86 },
  { label: "IA", value: 87 },
  { label: "Cloud", value: 82 },
  { label: "Automação", value: 90 },
] as const;

/** Indicadores em anel */
export const indicators = [
  { label: "Visão de negócio", value: 96 },
  { label: "Qualidade de dados", value: 92 },
  { label: "Comunicação executiva", value: 90 },
  { label: "Arquitetura", value: 85 },
] as const;
