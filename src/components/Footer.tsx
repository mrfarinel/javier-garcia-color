import { siteLinks } from "@/lib/site-links";

export function Footer() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-[1440px] border-t border-line px-5 py-7 sm:px-8 lg:mt-28 lg:px-12">
      <div className="flex flex-col gap-5 text-[0.62rem] uppercase tracking-[0.24em] text-minimal sm:flex-row sm:items-center sm:justify-between">
        <span>© Javier García</span>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {siteLinks.map((link) => (
            <a key={link.label} className="quiet-link" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
