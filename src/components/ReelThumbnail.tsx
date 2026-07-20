"use client";

import { useEffect, useState } from "react";
import { VimeoPlayer } from "@/components/VimeoPlayer";

type ReelThumbnailProps = {
  image: string;
  vimeoId: string;
  title: string;
};

export function ReelThumbnail({ image, vimeoId, title }: ReelThumbnailProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={`Play ${title}`}
        onClick={() => setIsOpen(true)}
        className="group relative block aspect-[16/7] w-full overflow-hidden border border-line bg-[#0f0f11]"
      >
        <img
          src={image}
          alt={`${title} thumbnail`}
          className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          loading="lazy"
          decoding="async"
        />
      </button>

      {isOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b0d]/92 px-5 py-8"
          role="dialog"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-6">
              <h2 className="eyebrow text-main">{title}</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="quiet-link text-[0.66rem] uppercase tracking-[0.22em] text-secondary"
              >
                Close
              </button>
            </div>
            <VimeoPlayer vimeoId={vimeoId} title={title} />
          </div>
        </div>
      ) : null}
    </>
  );
}
