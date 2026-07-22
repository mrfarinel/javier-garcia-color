"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { VimeoPlayer } from "@/components/VimeoPlayer";
import type { Project } from "@/data/projects";
import { getProjectCreditRows } from "@/lib/project-credits";
import { splitProjectTitle } from "@/lib/project-title";

type FullscreenHighlightHomeProps = {
  projects: Project[];
};

function shuffleProjects(projects: Project[]) {
  const shuffled = [...projects];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

export function FullscreenHighlightHome({ projects }: FullscreenHighlightHomeProps) {
  const availableProjects = useMemo(() => projects.filter((project) => project.heroImage), [projects]);
  const [visibleProjects, setVisibleProjects] = useState(availableProjects);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const activeProject = visibleProjects[activeIndex];

  useEffect(() => {
    setVisibleProjects(shuffleProjects(availableProjects));
    setActiveIndex(0);
    setIsVideoOpen(false);
  }, [availableProjects]);

  useEffect(() => {
    if (!isVideoOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVideoOpen]);

  if (!activeProject) return null;

  const activeTitle = splitProjectTitle(activeProject.title);
  const creditRows = getProjectCreditRows(activeProject).filter((row) =>
    ["category", "year", "client", "agency", "director", "dop"].includes(row.key),
  );

  function goToNext() {
    setIsVideoOpen(false);
    setActiveIndex((currentIndex) => (currentIndex + 1) % visibleProjects.length);
  }

  return (
    <section className="relative min-h-[calc(100svh-104px)] overflow-hidden border-t border-line bg-[#0b0b0d] lg:min-h-[calc(100svh-116px)]">
      <button
        type="button"
        aria-label={`Play ${activeProject.title}`}
        onClick={() => setIsVideoOpen(true)}
        className="absolute inset-0 z-0 block w-full cursor-pointer"
      >
        <img
          key={activeProject.id}
          src={activeProject.heroImage}
          alt={`${activeProject.title} thumbnail`}
          className="h-full w-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </button>
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0b0b0d]/88 via-[#0b0b0d]/18 to-[#0b0b0d]/8" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-[1680px] flex-col gap-8 px-5 pb-8 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-10">
        <div className="max-w-[620px]">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-secondary">
            {String(activeIndex + 1).padStart(2, "0")} / {String(visibleProjects.length).padStart(2, "0")}
          </p>
          <Link href={`/work/${activeProject.id}`} className="pointer-events-auto group mt-4 block">
            <h1 className="text-[2rem] font-normal uppercase leading-[0.95] tracking-[0.06em] text-main sm:text-[2.7rem] lg:text-[3.25rem]">
              {activeTitle.name}
            </h1>
            {activeTitle.descriptor ? (
              <p className="mt-4 max-w-[520px] text-[0.76rem] font-medium uppercase leading-6 tracking-[0.16em] text-secondary">
                {activeTitle.descriptor}
              </p>
            ) : null}
          </Link>

          <div className="mt-7 grid max-w-[520px] gap-x-8 gap-y-3 border-t border-white/20 pt-5 sm:grid-cols-2">
            {creditRows.map((row) => (
              <div key={row.key} className="grid grid-cols-[92px_1fr] gap-4 text-sm">
                <span className="text-[0.62rem] uppercase tracking-[0.18em] text-white/45">{row.label}</span>
                <span className="text-white/78">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goToNext}
          className="pointer-events-auto self-start text-[0.68rem] uppercase tracking-[0.24em] text-main transition-colors hover:text-body lg:self-end"
          aria-label="Next highlight"
        >
          Next →
        </button>
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
            <VimeoPlayer
              key={activeProject.id}
              vimeoId={activeProject.vimeoId}
              title={activeProject.title}
              loading="eager"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
