"use client";

import { useRef, type PointerEvent } from "react";
import { screenCredits } from "@/data/screen-credits";
import { site } from "@/data/site";

export function ScreenCredits() {
  const drag = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null);
  const didDrag = useRef(false);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    didDrag.current = false;
    drag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const distance = event.clientX - start.x;
    if (!didDrag.current && Math.abs(distance) < 5) return;

    const carousel = event.currentTarget;
    if (!didDrag.current) {
      didDrag.current = true;
      carousel.setPointerCapture(event.pointerId);
      carousel.style.scrollSnapType = "none";
      carousel.style.cursor = "grabbing";
    }
    event.preventDefault();
    carousel.scrollLeft = start.scrollLeft - distance;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    const carousel = event.currentTarget;
    carousel.style.removeProperty("scroll-snap-type");
    carousel.style.removeProperty("cursor");
    if (carousel.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div className="overflow-hidden">
      <div
        className="flex cursor-grab select-none snap-x gap-4 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onPointerLeave={(event) => {
          if (!didDrag.current) endDrag(event);
        }}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (didDrag.current && event.detail !== 0) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
      >
        {screenCredits.map((credit) => (
          <article key={`${credit.title}-${credit.year}`} className="w-[138px] shrink-0 snap-start sm:w-[156px] lg:w-[172px]">
            {credit.imdbUrl ? (
              <a
                href={credit.imdbUrl}
                draggable={false}
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
        draggable={false}
        alt={`${title} poster`}
        className="h-full w-full object-cover opacity-85 transition duration-300 group-hover:opacity-100"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#0b0b0d]/24 transition duration-300 group-hover:bg-[#0b0b0d]/4" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0b0d]/72 via-transparent to-transparent" />
    </>
  );
}
