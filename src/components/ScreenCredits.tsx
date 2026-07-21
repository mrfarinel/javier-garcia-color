import { screenCredits } from "@/data/screen-credits";
import { site } from "@/data/site";

export function ScreenCredits() {
  return (
    <div className="overflow-hidden">
      <div className="flex snap-x gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {screenCredits.map((credit) => (
          <article key={`${credit.title}-${credit.year}`} className="w-[138px] shrink-0 snap-start sm:w-[156px] lg:w-[172px]">
            {credit.imdbUrl ? (
              <a
                href={credit.imdbUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${credit.title} on IMDb`}
                className="group relative block aspect-[2/3] overflow-hidden border border-line bg-[#0e0e10]"
              >
                <CreditPoster title={credit.title} poster={credit.poster} />
              </a>
            ) : (
              <div className="group relative block aspect-[2/3] overflow-hidden border border-line bg-[#0e0e10]">
                <CreditPoster title={credit.title} poster={credit.poster} />
              </div>
            )}

            <div className="mt-4 min-h-[126px]">
              <p className="text-[0.62rem] uppercase leading-4 tracking-[0.18em] text-minimal">{credit.year}</p>
              <div className="mt-3 border-t border-line pt-3">
                <h3 className="line-clamp-3 text-[0.72rem] uppercase leading-5 tracking-[0.14em] text-main">
                  {credit.title}
                </h3>
                <p className="mt-2 text-[0.62rem] uppercase leading-4 tracking-[0.18em] text-secondary">
                  {credit.type}
                  {credit.platform ? ` / ${credit.platform}` : ""}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <a
          href={site.imdb}
          target="_blank"
          rel="noreferrer"
          className="quiet-link text-[0.68rem] uppercase tracking-[0.24em] text-main"
        >
          Full IMDb Credits →
        </a>
      </div>
    </div>
  );
}

function CreditPoster({ title, poster }: { title: string; poster: string }) {
  return (
    <>
      <img
        src={poster}
        alt={`${title} poster`}
        className="h-full w-full object-cover opacity-85 transition duration-300 group-hover:opacity-100"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0b0b0d]/24 transition duration-300 group-hover:bg-[#0b0b0d]/4" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0d]/72 via-transparent to-transparent" />
    </>
  );
}
