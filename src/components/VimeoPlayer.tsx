type VimeoPlayerProps = {
  vimeoId: string;
  title: string;
  aspectClassName?: string;
  fit?: "contain" | "cover";
};

export function VimeoPlayer({ vimeoId, title, aspectClassName = "aspect-video", fit = "contain" }: VimeoPlayerProps) {
  const params = new URLSearchParams({
    byline: "0",
    controls: "1",
    dnt: "1",
    portrait: "0",
    title: "0",
  });

  return (
    <div className={`${aspectClassName} relative overflow-hidden border border-line bg-[#0f0f11]`}>
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?${params.toString()}`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        className={
          fit === "cover"
            ? "absolute left-1/2 top-1/2 h-[135%] w-full -translate-x-1/2 -translate-y-1/2"
            : "h-full w-full"
        }
        loading="lazy"
      />
    </div>
  );
}
