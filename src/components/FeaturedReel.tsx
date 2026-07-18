"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { VimeoPlayer } from "@/components/VimeoPlayer";
import type { Project } from "@/data/projects";
import { getProjectCreditRows } from "@/lib/project-credits";
import { splitProjectTitle } from "@/lib/project-title";

type FeaturedReelProps = {
  projects: Project[];
  reelVimeoId: string;
};

function normalizeTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function shuffleProjects(projects: Project[]) {
  const shuffled = [...projects];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function getVisibleNavigationIndexes(activeIndex: number, totalProjects: number) {
  if (totalProjects <= 5) return Array.from({ length: totalProjects }, (_, index) => index);

  return Array.from({ length: 5 }, (_, offset) => (activeIndex + offset) % totalProjects);
}

export function FeaturedReel({ projects, reelVimeoId }: FeaturedReelProps) {
  const initialProjects = useMemo(() => {
    const portfolioProjects = projects.filter((project) => project.vimeoId !== reelVimeoId);
    const deseo = portfolioProjects.find((project) => normalizeTitle(project.title).includes("deseo - trailer"));
    const rest = portfolioProjects.filter((project) => project.id !== deseo?.id);
    return deseo ? [deseo, ...rest] : portfolioProjects;
  }, [projects, reelVimeoId]);

  const [featuredProjects, setFeaturedProjects] = useState(initialProjects);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const [firstProject, ...remainingProjects] = initialProjects;
    setFeaturedProjects(firstProject ? [firstProject, ...shuffleProjects(remainingProjects)] : []);
    setActiveIndex(0);
    setIsVideoOpen(false);
  }, [initialProjects]);

  const activeProject = featuredProjects[activeIndex] ?? initialProjects[0];
  const activeTitle = activeProject ? splitProjectTitle(activeProject.title) : undefined;
  const visibleNavigationIndexes = getVisibleNavigationIndexes(activeIndex, featuredProjects.length);

  if (!activeProject || !activeTitle) return null;

  const goToPrevious = () => {
    setIsVideoOpen(false);
    setActiveIndex((currentIndex) => (currentIndex - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const goToNext = () => {
    setIsVideoOpen(false);
    setActiveIndex((currentIndex) => (currentIndex + 1) % featuredProjects.length);
  };

  return (
    <section className="mx-auto grid w-full max-w-[1680px] gap-10 border-t border-line px-5 pt-8 sm:px-8 lg:grid-cols-[0.28fr_0.64fr_0.08fr] lg:gap-12 lg:px-12 lg:pt-9">
      <div className="flex flex-col justify-center">
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-minimal">
          {String(activeIndex + 1).padStart(2, "0")}
        </p>
        <h1 className="mt-5 text-[2rem] font-normal uppercase leading-[0.95] tracking-[0.06em] text-main sm:text-[2.65rem] lg:text-[3rem]">
          {activeTitle.name}
        </h1>
        {activeTitle.descriptor ? (
          <p className="mt-4 max-w-[380px] text-[0.82rem] font-medium uppercase leading-6 tracking-[0.14em] text-secondary">
            {activeTitle.descriptor}
          </p>
        ) : null}
        <div className="mt-8 space-y-4">
          {getProjectCreditRows(activeProject).map((row) => (
            <div key={row.key} className="grid grid-cols-[92px_1fr] gap-4 text-sm">
              <span className="text-[0.66rem] uppercase tracking-[0.18em] text-minimal">{row.label}</span>
              <span className="text-body">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="self-center">
        <button
          type="button"
          aria-label={`Watch ${activeProject.title}`}
          onClick={() => setIsVideoOpen(true)}
          className="group relative block aspect-[2.39/1] w-full overflow-hidden border border-line bg-[#0f0f11]"
        >
          <Image
            src={activeProject.heroImage}
            alt={`${activeProject.title} thumbnail`}
            fill
            priority
            className="image-tone object-cover"
            sizes="(min-width: 1024px) 64vw, 100vw"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-[#0b0b0d]/12 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span className="border border-line bg-[#0b0b0d]/80 px-5 py-3 text-[0.68rem] uppercase tracking-[0.24em] text-main">
              Play
            </span>
          </span>
        </button>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous selected project"
            onClick={goToPrevious}
            className="quiet-link flex h-9 w-12 items-center justify-center border border-line text-lg text-main"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next selected project"
            onClick={goToNext}
            className="quiet-link flex h-9 w-12 items-center justify-center border border-line text-lg text-main"
          >
            →
          </button>
          <Link
            href={`/work/${activeProject.id}`}
            className="quiet-link ml-0 text-[0.7rem] uppercase tracking-[0.24em] text-main sm:ml-4"
          >
            Watch Project →
          </Link>
        </div>
      </div>

      <div className="hidden flex-col items-center justify-center gap-6 text-[0.68rem] uppercase tracking-[0.2em] text-minimal lg:flex">
        {visibleNavigationIndexes.map((projectIndex) => (
          <button
            key={featuredProjects[projectIndex].id}
            type="button"
            onClick={() => {
              setIsVideoOpen(false);
              setActiveIndex(projectIndex);
            }}
            className={activeIndex === projectIndex ? "text-main" : "quiet-link"}
          >
            {String(projectIndex + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      {isVideoOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b0d]/92 px-5 py-8"
          role="dialog"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-6">
              <h2 className="eyebrow text-main">{activeProject.title}</h2>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="quiet-link text-[0.66rem] uppercase tracking-[0.22em] text-secondary"
              >
                Close
              </button>
            </div>
            <VimeoPlayer vimeoId={activeProject.vimeoId} title={activeProject.title} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
