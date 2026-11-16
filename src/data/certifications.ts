/**
 * Certificações.
 * Para adicionar: inclua um objeto com status "earned", data e URL de verificação.
 * Itens "planned" aparecem como "em preparação".
 *
 * TODO: substitua pelos certificados reais do seu LinkedIn.
 */
export type Certification = {
  name: string;
  issuer: string;
  status: "earned" | "planned";
  date?: string; // ex.: "2026-03"
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  { name: "Power BI Data Analyst (PL-300)", issuer: "Microsoft", status: "planned" },
  { name: "Professional Data Engineer", issuer: "Google Cloud", status: "planned" },
  { name: "Fabric Analytics Engineer (DP-600)", issuer: "Microsoft", status: "planned" },
  { name: "Generative AI Leader", issuer: "Google Cloud", status: "planned" },
];
