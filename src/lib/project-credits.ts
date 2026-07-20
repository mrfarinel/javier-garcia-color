import type { Project, ProjectCategory } from "@/data/projects";

type CreditKey = "category" | "year" | "client" | "agency" | "director" | "dop";

export type ProjectCreditRow = {
  key: CreditKey;
  label: string;
  value: string;
};

const emptyValue = "-";

const creditOverrides: Record<string, Partial<Record<Exclude<CreditKey, "category" | "year">, string>>> = {
  "1195890962": {
    agency: "Garnier BBDO",
  },
  "1090527138": {
    agency: "&Rosàs",
  },
  "1068999565": {
    agency: "Garnier BBDO",
  },
  "1068804932": {
    agency: "Sra. Rushmore",
  },
};

const creditAliases: Record<Exclude<CreditKey, "category" | "year">, string[]> = {
  client: ["client", "clients", "cliente", "brand", "marca", "advertiser", "anunciante", "product", "producto"],
  agency: ["agency", "agencyt", "agencia", "creative agency", "advertising agency", "ad agency"],
  director: [
    "director",
    "directors",
    "dir",
    "directed by",
    "dirigido por",
    "direccion",
    "dirección",
    "realizador",
    "realizador / director",
    "realizacion",
    "realización",
    "dirección / productor ejecutivo",
  ],
  dop: [
    "dop",
    "dp",
    "d.o.p",
    "d.o.p.",
    "cinematographer",
    "cinematographers",
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
  return value
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\u00a0/g, " ")
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
    .replace(/\s*\([^)]*(?:editor|producer|productor ejecutivo|aec)[^)]*\)\s*/gi, (match) =>
      /aec/i.test(match) ? match : " ",
    )
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

      const compoundRoleMatch = normalizedLine.match(
        new RegExp(`^${escapeRegExp(normalizedAlias)}\\s*(?:/|&|\\+|and|y)\\s*[^:=\\-–—]+\\s*(?::|-|–|—|=)\\s*(.+)$`, "i"),
      );
      if (compoundRoleMatch?.[1]) return cleanCreditValue(line.slice(line.length - compoundRoleMatch[1].length));

      const prefixMatch = normalizedLine.match(new RegExp(`^${escapeRegExp(normalizedAlias)}\\s+(.+)$`, "i"));
      if (prefixMatch?.[1] && /\b(?:by|por)$/.test(normalizedAlias)) {
        return cleanCreditValue(line.slice(line.length - prefixMatch[1].length));
      }
    }
  }

  return undefined;
}

function extractCombinedDirectorAndDop(description: string | undefined, key: "director" | "dop") {
  const lines = getDescriptionLines(description);
  if (!lines) return undefined;

  for (const line of lines) {
    const normalizedLine = normalizeSearchValue(line);
    const combinedMatch = normalizedLine.match(
      /^(?:dir|director|directors|realizador)\s*(?:&|\/|\+|and|y)\s*(?:dop|dp|director of photography|fotografia|fotografía)\s*(?::|-|–|—|=)\s*(.+)$/i,
    );

    if (combinedMatch?.[1]) return cleanCreditValue(line.slice(line.length - combinedMatch[1].length));
  }

  return undefined;
}

function extractCommercialClientFromTitle(project: Project) {
  if (project.category !== "Commercial") return undefined;
  const [client] = project.title.split(/\s+-\s+/);
  return client?.trim() || undefined;
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
  const client =
    overrides.client ?? project.client ?? extractDescriptionField(project.description, "client") ?? extractCommercialClientFromTitle(project);
  const agency = overrides.agency ?? project.agency ?? extractDescriptionField(project.description, "agency");
  const director =
    overrides.director ??
    project.director ??
    extractDescriptionField(project.description, "director") ??
    extractCombinedDirectorAndDop(project.description, "director") ??
    extractPersonAfterRole(project.description, "director");
  const dop =
    overrides.dop ??
    project.dop ??
    extractDescriptionField(project.description, "dop") ??
    extractCombinedDirectorAndDop(project.description, "dop") ??
    extractPersonAfterRole(project.description, "dop");

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
