import { site } from "@/data/site";
import { ReelThumbnail } from "@/components/ReelThumbnail";
import { ScreenCredits } from "@/components/ScreenCredits";
import { getPortfolioProjects } from "@/lib/projects";

export const metadata = {
  title: "About",
};

const socialLinks = [
  { label: "IMDb", href: site.imdb, icon: "/social/imdb.png", className: "h-4 w-auto" },
  { label: "Vimeo", href: site.vimeoProfile, icon: "/social/vimeo.png", className: "h-5 w-auto" },
  { label: "Instagram", href: site.instagram, icon: "/social/instagram.png", className: "h-5 w-auto" },
  { label: "LinkedIn", href: site.linkedin, icon: "/social/linkedin.png", className: "h-5 w-auto" },
];

export default async function AboutPage() {
  const projects = await getPortfolioProjects();
  const reelProject = projects.find((project) => project.vimeoId === site.reelVimeoId);

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12 lg:pt-12">
      <section className="grid gap-8 border-t border-line pt-6 lg:grid-cols-[0.24fr_0.76fr]">
        <h1 className="eyebrow text-main">About</h1>
        <div>
          <p className="max-w-[760px] text-sm leading-7 text-body sm:text-[0.95rem] sm:leading-8">
            Javier García is a Madrid-based colorist working internationally across commercials, films, series and
            music videos. Collaborating closely with directors and cinematographers, he shapes images through light,
            texture and color, creating cinematic worlds where every frame serves the story. His work combines
            technical precision with a refined visual sensibility, resulting in images that are timeless, emotionally
            resonant and unmistakably crafted.
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-8 border-t border-line pt-6 lg:grid-cols-[0.24fr_0.76fr]">
        <h2 className="eyebrow text-main">Screen Credits</h2>
        <ScreenCredits />
      </section>

      <section className="mt-12 grid gap-8 border-t border-line pt-6 lg:grid-cols-[0.24fr_0.76fr]">
        <h2 className="eyebrow text-main">Reel</h2>
        <ReelThumbnail
          image={reelProject?.heroImage ?? ""}
          vimeoId={site.reelVimeoId}
          title={reelProject?.title ?? "Javier García Reel"}
        />
      </section>

      <section className="mt-12 grid gap-8 border-t border-line pt-6 lg:grid-cols-[0.24fr_0.76fr]">
        <h2 className="eyebrow text-main">Social</h2>
        <nav className="flex flex-wrap items-center gap-7" aria-label="Social profiles">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
              className="group flex h-8 items-center justify-center"
            >
              <img
                src={link.icon}
                alt=""
                className={`block object-contain opacity-55 transition-opacity group-hover:opacity-100 ${link.className}`}
              />
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
