import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { splitProjectTitle } from "@/lib/project-title";

export function ProjectCard({ project }: { project: Project }) {
  const title = splitProjectTitle(project.title);

  return (
    <Link href={`/work/${project.id}`} className="group block">
      <div className="relative aspect-[16/11] overflow-hidden bg-[#111113]">
        <Image
          src={project.thumbnail}
          alt={`${project.title} still`}
          fill
          className="image-tone object-cover"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-5">
        <div>
          <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-main transition-colors duration-200">
            {title.name}
          </h3>
          {title.descriptor ? (
            <p className="mt-1 text-xs font-medium uppercase leading-5 tracking-[0.08em] text-secondary">
              {title.descriptor}
            </p>
          ) : null}
          <p className="mt-2 text-sm leading-5 text-minimal">{project.category}</p>
        </div>
        <p className="text-sm text-minimal">{project.year}</p>
      </div>
    </Link>
  );
}
