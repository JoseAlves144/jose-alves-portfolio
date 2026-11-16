/**
 * Blog — estrutura de artigos técnicos.
 *
 * Para publicar um artigo novo:
 *  1. Adicione um objeto ao array `posts` (slug único).
 *  2. Escreva o conteúdo em `content` (blocos de parágrafo, título, código ou lista).
 *  3. Mude `draft` para false.
 * O post aparece automaticamente no /blog, na home e no sitemap.
 *
 * Os artigos abaixo são rascunhos-exemplo (draft: true) — aparecem como
 * "em breve" e não geram página até serem publicados.
 */
export const blogCategories = ["Dados", "IA", "Fraudes", "Power BI", "BigQuery", "Python"] as const;
export type BlogCategory = (typeof blogCategories)[number];

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // AAAA-MM-DD
  readingTime: number; // minutos
  draft: boolean;
  content: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "agente-ia-text-to-sql-bigquery",
    title: "Como construir um agente de IA que conversa com o BigQuery",
    excerpt:
      "Arquitetura, contexto de schema e guardrails para transformar perguntas em SQL confiável.",
    category: "IA",
    date: "2026-11-01",
    readingTime: 8,
    draft: false,
    content: [
      {
        type: "p",
        text: "Perguntas de negócio raramente chegam em SQL. Um agente text-to-SQL encurta esse caminho: recebe a pergunta em linguagem natural, entende o modelo de dados e devolve uma resposta executiva. Este artigo mostra a arquitetura que uso como ponto de partida.",
      },
      { type: "h2", text: "1. Contexto é tudo" },
      {
        type: "p",
        text: "O modelo só gera SQL correto se conhecer o schema. Em vez de enviar o banco inteiro, monte um catálogo enxuto com tabelas, colunas, descrições de negócio e exemplos de consultas validadas.",
      },
      {
        type: "code",
        lang: "python",
        code: `from google.cloud import bigquery

client = bigquery.Client()

def schema_context(dataset: str) -> str:
    rows = client.query(f"""
        SELECT table_name, column_name, data_type, description
        FROM \`{dataset}.INFORMATION_SCHEMA.COLUMN_FIELD_PATHS\`
    """).result()
    return "\\n".join(f"{r.table_name}.{r.column_name} ({r.data_type}) - {r.description or ''}" for r in rows)`,
      },
      { type: "h2", text: "2. Guardrails antes de executar" },
      {
        type: "list",
        items: [
          "Permitir apenas SELECT e bloquear DDL/DML.",
          "Fazer dry run para estimar bytes processados e barrar consultas caras.",
          "Aplicar LIMIT padrão e filtros de partição obrigatórios.",
          "Registrar pergunta, SQL gerado e resultado para auditoria.",
        ],
      },
      { type: "h2", text: "3. Resposta executiva" },
      {
        type: "p",
        text: "O resultado bruto volta ao modelo com uma instrução clara: resumir em linguagem de negócio, destacar números relevantes e indicar limitações. É aqui que o agente deixa de ser uma ferramenta técnica e vira um apoio à decisão.",
      },
    ],
  },
  {
    slug: "indicadores-de-risco-fraude-saude",
    title: "Indicadores de risco para fraude em Saúde Suplementar",
    excerpt: "Como estruturar um framework de indicadores que prioriza o que realmente importa.",
    category: "Fraudes",
    date: "2026-12-01",
    readingTime: 7,
    draft: true,
    content: [],
  },
  {
    slug: "modelagem-power-bi-executivo",
    title: "Modelagem semântica para dashboards executivos no Power BI",
    excerpt: "Star schema, medidas DAX e narrativa visual para a diretoria.",
    category: "Power BI",
    date: "2027-01-01",
    readingTime: 6,
    draft: true,
    content: [],
  },
  {
    slug: "custos-bigquery-boas-praticas",
    title: "BigQuery sem sustos na fatura: particionamento e clustering",
    excerpt: "Práticas para reduzir bytes processados sem perder desempenho.",
    category: "BigQuery",
    date: "2027-02-01",
    readingTime: 5,
    draft: true,
    content: [],
  },
];

export const publishedPosts = posts
  .filter((p) => !p.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  return `${d} ${months[m - 1]} ${y}`;
};
