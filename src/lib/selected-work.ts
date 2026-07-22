import type { Project } from "@/data/projects";

const selectedCommercials = [
  ["LA PROHIBIDA"],
  ["PILSEN AHUMADA"],
  ["CERVEZA IMPERIAL"],
  ["RENFE", "POESIA"],
  ["ALHAMBRA", "LA ESPERA"],
  ["MINISTERIO DE INCLUSION"],
  ["JET AM", "MARKET"],
  ["EL CORTE INGLES"],
  ["MAHOU", "ENCUENTROS MADRID"],
  ["MAHOU", "SOMOS FAMILIA"],
  ["CLEMONT"],
  ["DIRIYAH"],
  ["MILAF"],
];

const selectedFiction = [
  ["DESEO"],
  ["GALGOS"],
  ["LA COCINERA DE CASTAMAR", "EP 06"],
  ["NASDROVIA"],
  ["FRAMES FROM ANDALUCIA"],
];

function normalizeValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function matchesProject(project: Project, terms: string[]) {
  const title = normalizeValue(project.title);
  return terms.every((term) => title.includes(normalizeValue(term)));
}

function getOrderedMatches(projects: Project[], groups: string[][]) {
  return groups.flatMap((terms) => {
    return projects.filter((project) => matchesProject(project, terms));
  });
}

function uniqueProjects(projects: Project[]) {
  const seenIds = new Set<string>();

  return projects.filter((project) => {
    if (seenIds.has(project.id)) return false;
    seenIds.add(project.id);
    return true;
  });
}

export function getHomeSelectedProjects(projects: Project[]) {
  const commercials = getOrderedMatches(
    projects.filter((project) => project.category === "Commercial"),
    selectedCommercials,
  );
  const fiction = getOrderedMatches(
    projects.filter((project) => project.category === "Fiction"),
    selectedFiction,
  );
  const musicVideos = projects.filter((project) => project.category === "Music Video");

  return uniqueProjects([...commercials, ...fiction, ...musicVideos]);
}
