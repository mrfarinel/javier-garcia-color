import type { Project, ProjectCategory } from "@/data/projects";

type CreditKey = "category" | "year" | "client" | "agency" | "director" | "dop";

export type ProjectCreditRow = {
  key: CreditKey;
  label: string;
  value: string;
};

const emptyValue = "-";

const creditOverrides: Record<string, Partial<Record<Exclude<CreditKey, "category" | "year">, string>>> = {
  "1068804932": {
    agency: "Sra. Rushmore",
  },
};

const creditAliases: Record<Exclude<CreditKey, "category" | "year">, string[]> = {
  client: ["client", "cliente", "brand", "marca", "advertiser", "product", "producto"],
  agency: ["agency", "agencia", "creative agency", "advertising agency", "ad agency"],
  director: ["director", "dir", "directed by", "dirigido por", "realizador", "realizacion", "realización"],
  dop: [
    "dop",
    "dp",
    "d.o.p",
    "d.o.p.",
    "cinematographer",
    "cinematography",
    "cinematography by",
    "director of photography",
    "director de fotografia",
    "director de fotografía",
    "direccion de fotografia",
    "dirección de fotografía",
    "fotografia",
    "fotografía",
  ],
};

function formatCategory(category: ProjectCategory) {
  return category === "Music Video" ? "Music Videos" : category;
}

function normalizeLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanCreditValue(value: string) {
  return value
    .replace(/^\s*(by|por)\s+/i, "")
    .replace(/\s*[|•]\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getDescriptionLines(description: string | undefined) {
  if (!description) return undefined;

  return description
    .split(/\n+/)
    .map(normalizeLine)
    .filter(Boolean);
}

function extractDescriptionField(description: string | undefined, key: Exclude<CreditKey, "category" | "year">) {
  const lines = getDescriptionLines(description);
  if (!lines) return undefined;

  const aliases = creditAliases[key];

  for (const line of lines) {
    const normalizedLine = normalizeSearchValue(line);

    for (const alias of aliases) {
      const normalizedAlias = normalizeSearchValue(alias);
      const directMatch = normalizedLine.match(
        new RegExp(`^${escapeRegExp(normalizedAlias)}\\s*(?::|-|–|—|=)\\s*(.+)$`, "i"),
      );

      if (directMatch?.[1]) return cleanCreditValue(line.slice(line.length - directMatch[1].length));

      const byMatch = normalizedLine.match(new RegExp(`^${escapeRegExp(normalizedAlias)}\\s+(?:by|por)\\s+(.+)$`, "i"));
      if (byMatch?.[1]) return cleanCreditValue(line.slice(line.length - byMatch[1].length));
    }
  }

  return undefined;
}

function extractPersonAfterRole(description: string | undefined, key: "director" | "dop") {
  const lines = getDescriptionLines(description);
  if (!lines) return undefined;

  for (const line of lines) {
    const normalizedLine = normalizeSearchValue(line);

    for (const alias of creditAliases[key]) {
      const normalizedAlias = normalizeSearchValue(alias);
      const byRoleMatch = normalizedLine.match(new RegExp(`^(.+?)\\s+(?:as\\s+)?${escapeRegExp(normalizedAlias)}$`, "i"));
      if (byRoleMatch?.[1]) return cleanCreditValue(line.slice(0, byRoleMatch[1].length));
    }
  }

  return undefined;
}

export function getProjectCreditRows(project: Project): ProjectCreditRow[] {
  const overrides = creditOverrides[project.vimeoId] ?? {};
  const client = overrides.client ?? project.client ?? extractDescriptionField(project.description, "client");
  const agency = overrides.agency ?? project.agency ?? extractDescriptionField(project.description, "agency");
  const director =
    overrides.director ??
    project.director ??
    extractDescriptionField(project.description, "director") ??
    extractPersonAfterRole(project.description, "director");
  const dop =
    overrides.dop ?? project.dop ?? extractDescriptionField(project.description, "dop") ?? extractPersonAfterRole(project.description, "dop");

  const baseRows: ProjectCreditRow[] = [
    { key: "category", label: "Category", value: formatCategory(project.category) },
    { key: "year", label: "Year", value: project.year || emptyValue },
  ];

  const creativeRows: ProjectCreditRow[] = [
    { key: "director", label: "Director", value: director || emptyValue },
    { key: "dop", label: "DOP", value: dop || emptyValue },
  ];

  if (project.category === "Fiction" || project.category === "Music Video") {
    return [...baseRows, ...creativeRows];
  }

  return [
    ...baseRows,
    { key: "client", label: "Client", value: client || emptyValue },
    { key: "agency", label: "Agency", value: agency || emptyValue },
    ...creativeRows,
  ];
}
