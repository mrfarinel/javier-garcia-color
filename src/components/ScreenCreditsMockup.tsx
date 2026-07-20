import type { Project } from "@/data/projects";

type ScreenCredit = {
  title: string;
  detail: string;
  role: string;
  year: string;
  matchTerms: string[];
};

const screenCredits: ScreenCredit[] = [
  {
    title: "Deseo",
    detail: "Netflix",
    role: "Colorist",
    year: "2026",
    matchTerms: ["DESEO"],
  },
  {
    title: "Galgos",
    detail: "Season 01",
    role: "Colorist",
    year: "2024",
    matchTerms: ["GALGOS"],
  },
  {
    title: "La Cocinera de Castamar",
    detail: "Series",
    role: "Colorist",
    year: "2023",
    matchTerms: ["LA COCINERA DE CASTAMAR", "EP 06"],
  },
  {
    title: "Nasdrovia",
    detail: "Season 2",
    role: "Colorist",
    year: "2022",
    matchTerms: ["NASDROVIA"],
  },
  {
    title: "Frames from Andalucia",
    detail: "Documentary",
    role: "Colorist",
    year: "2024",
    matchTerms: ["FRAMES FROM ANDALUCIA"],
  },
  {
    title: "El Nuevo Barrio",
    detail: "Short Film",
    role: "Colorist",
    year: "2024",
    matchTerms: ["EL NUEVO BARRIO"],
  },
];

function normalizeValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function findProject(projects: Project[], terms: string[]) {
  return projects.find((project) => {
    const title = normalizeValue(project.title);
    return terms.every((term) => title.includes(normalizeValue(term)));
  });
}

export function ScreenCreditsMockup({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-hidden">
      <div className="flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {screenCredits.map((credit, index) => {
          const project = findProject(projects, credit.matchTerms);
          const image = project?.heroImage;

          return (
            <a
              key={credit.title}
              href={project ? `/work/${project.id}` : undefined}
              className="group w-[138px] shrink-0 snap-start sm:w-[156px] lg:w-[172px]"
            >
              <div className="relative aspect-[2/3] overflow-hidden border border-line bg-[#0e0e10]">
                {image ? (
                  <img
                    src={image}
                    alt={`${credit.title} poster mockup`}
                    className="h-full w-full object-cover opacity-78 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-5 text-center text-[0.62rem] uppercase tracking-[0.22em] text-minimal">
                    {credit.title}
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0d]/78 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 text-[0.58rem] uppercase tracking-[0.18em] text-white/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-[0.72rem] uppercase leading-5 tracking-[0.14em] text-main">{credit.title}</h3>
                <p className="mt-1 text-[0.62rem] uppercase leading-4 tracking-[0.18em] text-secondary">
                  {credit.detail}
                </p>
                <div className="mt-3 border-t border-line pt-3">
                  <p className="text-[0.62rem] uppercase leading-4 tracking-[0.18em] text-minimal">{credit.role}</p>
                  <p className="mt-1 text-[0.62rem] uppercase leading-4 tracking-[0.18em] text-minimal">{credit.year}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
