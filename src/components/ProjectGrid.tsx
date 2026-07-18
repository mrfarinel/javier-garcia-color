"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { site } from "@/data/site";

type CategoryFilter = "All" | "Commercials" | "Fiction" | "Music Videos" | "Series";

const categoryMap = {
  All: "All",
  Commercials: "Commercial",
  Fiction: "Fiction",
  "Music Videos": "Music Video",
  Series: "Series",
} as const;

type ProjectGridProps = {
  projects: Project[];
  categories: readonly CategoryFilter[];
  title?: string;
  showArchiveLink?: boolean;
  archiveLinkPlacement?: "top" | "bottom";
  preserveOrder?: boolean;
};

function getProjectTimestamp(project: Project) {
  const date = project.uploadedAt ?? project.year;
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function ProjectGrid({
  projects,
  categories,
  title = "Selected Work",
  showArchiveLink = true,
  archiveLinkPlacement = "top",
  preserveOrder = false,
}: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");

  const filteredProjects = useMemo(() => {
    const mappedCategory = categoryMap[activeCategory];
    const indexById = new Map(projects.map((project, index) => [project.id, index]));
    const visibleProjects =
      mappedCategory === "All"
        ? projects
        : projects.filter((project) => project.category === mappedCategory && project.vimeoId !== site.reelVimeoId);

    if (preserveOrder) return visibleProjects;

    return [...visibleProjects].sort((a, b) => {
      const dateDelta = getProjectTimestamp(b) - getProjectTimestamp(a);
      return dateDelta === 0 ? (indexById.get(a.id) ?? 0) - (indexById.get(b.id) ?? 0) : dateDelta;
    });
  }, [activeCategory, projects]);

  const visibleCategories = useMemo(() => {
    return categories.filter((category) => {
      if (category !== "Series") return true;
      return projects.some((project) => project.category === "Series");
    });
  }, [categories, projects]);

  return (
    <section className="mx-auto mt-8 w-full max-w-[1680px] px-5 sm:px-8 lg:mt-8 lg:px-12">
      <div className="flex flex-col gap-6 border-t border-line pt-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16">
          <h2 className="eyebrow text-main">{title}</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[0.66rem] uppercase tracking-[0.22em] text-minimal">
            {visibleCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`border-b pb-1 transition-colors duration-200 ${
                  activeCategory === category
                    ? "border-main text-main"
                    : "border-transparent hover:border-line hover:text-secondary"
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        {showArchiveLink && archiveLinkPlacement === "top" ? (
          <Link className="quiet-link text-[0.7rem] uppercase tracking-[0.24em] text-main" href="/work">
            View Full Archive →
          </Link>
        ) : null}
      </div>
      <div className="mt-8 grid gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {showArchiveLink && archiveLinkPlacement === "bottom" ? (
        <div className="mt-12 flex justify-center">
          <Link className="quiet-link text-[0.72rem] uppercase tracking-[0.26em] text-main" href="/work">
            View Full Archive →
          </Link>
        </div>
      ) : null}
    </section>
  );
}
