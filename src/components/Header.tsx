import Link from "next/link";

const navItems = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-[1680px] flex-col gap-6 px-5 py-6 text-main sm:px-8 md:flex-row md:items-start md:justify-between lg:px-12 lg:py-9">
      <Link href="/" className="block" aria-label="Javier García home">
        <span className="block text-[0.72rem] font-medium uppercase leading-none tracking-[0.34em]">
          Javier García
        </span>
        <span className="mt-2 block text-[0.62rem] uppercase tracking-[0.32em] text-secondary">Colorist</span>
      </Link>
      <nav className="flex flex-wrap gap-x-5 gap-y-3 pt-0.5 text-[0.66rem] font-medium uppercase tracking-[0.24em] text-secondary sm:gap-x-8 md:justify-end">
        {navItems.map((item) => (
          <Link key={item.href} className="quiet-link" href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
