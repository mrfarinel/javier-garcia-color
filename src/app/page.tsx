import Link from "next/link";
import { FullscreenHighlightHome } from "@/components/FullscreenHighlightHome";
import { getPortfolioProjects } from "@/lib/projects";
import { getHomeSelectedProjects } from "@/lib/selected-work";

export default async function Home() {
  const projects = await getPortfolioProjects();
  const selectedProjects = getHomeSelectedProjects(projects);

  return (
    <main>
      <FullscreenHighlightHome projects={selectedProjects} />
      <section className="mx-auto flex w-full max-w-[1680px] justify-center px-5 pb-2 pt-10 sm:px-8 lg:px-12">
        <Link className="quiet-link text-[0.72rem] uppercase tracking-[0.26em] text-main" href="/work">
          View Full Work Archive →
        </Link>
      </section>
    </main>
  );
}
