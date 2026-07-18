import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditsTable } from "@/components/CreditsTable";
import { VimeoPlayer } from "@/components/VimeoPlayer";
import { getAdjacentWorkProjects, getWorkProject } from "@/lib/projects";
import { splitProjectTitle } from "@/lib/project-title";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.filter((project) => project.vimeoId !== site.reelVimeoId).map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getWorkProject(id);

  return {
    title: project ? project.title : "Project",
    description: project?.description ?? "Color grading project by Javier García.",
    openGraph: {
      title: project ? `${project.title} | Javier García` : "Project | Javier García",
      description: project?.description ?? "Color grading project by Javier García.",
      images: project?.heroImage ? [{ url: project.heroImage }] : [],
      type: "video.other",
    },
    twitter: {
      card: "summary_large_image",
      title: project ? `${project.title} | Javier García` : "Project | Javier García",
      description: project?.description ?? "Color grading project by Javier García.",
      images: project?.heroImage ? [project.heroImage] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getWorkProject(id);

  if (!project) {
    notFound();
  }

  const { previous, next } = await getAdjacentWorkProjects(project.id);
  const title = splitProjectTitle(project.title);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: project.description ?? `${project.title} color grading by Javier García.`,
    thumbnailUrl: project.heroImage,
    uploadDate: project.year,
    embedUrl: `https://player.vimeo.com/video/${project.vimeoId}`,
    url: project.vimeoUrl,
    creator: {
      "@type": "Person",
      name: "Javier García",
      jobTitle: "Colorist",
    },
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 pt-10 sm:px-8 lg:px-12 lg:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <VimeoPlayer vimeoId={project.vimeoId} title={project.title} />

      <section className="mt-10 grid gap-10 border-t border-line pt-7 lg:grid-cols-[0.58fr_0.42fr] lg:gap-16">
        <div>
          <h1 className="text-3xl font-normal uppercase leading-tight tracking-[0.06em] text-main sm:text-4xl">
            {title.name}
          </h1>
          {title.descriptor ? (
            <p className="mt-4 text-sm font-medium uppercase leading-6 tracking-[0.14em] text-secondary">
              {title.descriptor}
            </p>
          ) : null}
          {project.description ? (
            <p className="mt-8 max-w-[720px] whitespace-pre-line text-base leading-8 text-body">{project.description}</p>
          ) : null}
        </div>
        <aside>
          <CreditsTable project={project} />
        </aside>
      </section>

      {project.stills.length ? (
        <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {project.stills.map((still, index) => (
            <div key={still} className="frame relative aspect-[16/10] overflow-hidden">
              <Image
                src={still}
                alt={`${project.title} still ${index + 1}`}
                fill
                className="image-tone object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </section>
      ) : null}

      <nav className="mt-16 grid gap-4 border-y border-line py-6 text-[0.68rem] uppercase tracking-[0.22em] text-secondary sm:grid-cols-2 lg:mt-24">
        {previous ? (
          <Link href={`/work/${previous.id}`} className="quiet-link">
            ← Previous / {previous.title}
          </Link>
        ) : null}
        {next ? (
          <Link href={`/work/${next.id}`} className="quiet-link text-left sm:text-right">
            Next / {next.title} →
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
