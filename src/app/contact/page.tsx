import { ContactForm } from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact",
};

const contactSections = [
  {
    title: "Mail",
    items: [
      { label: "Personal", value: site.email, href: `mailto:${site.email}` },
      { label: "Spain Rep", labelDetail: "POSTALENT", value: "hola@postalent.com", href: "mailto:hola@postalent.com" },
    ],
  },
  {
    title: "Phone",
    items: [{ value: "+34 666 73 38 25", href: "tel:+34666733825" }],
  },
];

const socialLinks = [
  { label: "Instagram", href: site.instagram, icon: "/social/instagram.png", className: "h-5 w-auto" },
  { label: "LinkedIn", href: site.linkedin, icon: "/social/linkedin.png", className: "h-5 w-auto" },
  { label: "IMDb", href: site.imdb, icon: "/social/imdb.png", className: "h-4 w-auto" },
  { label: "Vimeo", href: site.vimeoProfile, icon: "/social/vimeo.png", className: "h-5 w-auto" },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12 lg:pt-12">
      <section className="grid gap-12 border-t border-line pt-6 lg:grid-cols-[0.32fr_0.68fr]">
        <h1 className="eyebrow text-main">Contact</h1>
        <div>
          <div className="max-w-[720px]">
            <div>
              <ContactForm email={site.email} />
            </div>
          </div>

          <div className="mt-14 border-t border-line">
            {contactSections.map((section) => (
              <section
                key={section.title}
                className="grid gap-4 border-b border-line py-5 sm:grid-cols-[160px_1fr]"
              >
                <h2 className="eyebrow">{section.title}</h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <a
                      key={`${section.title}-${item.value}`}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="grid gap-2 text-sm transition-colors duration-200 hover:text-main sm:grid-cols-[260px_1fr]"
                    >
                      <span className="flex flex-wrap gap-x-5 gap-y-1 text-[0.68rem] uppercase tracking-[0.2em] text-minimal">
                        {"label" in item ? <span>{item.label}</span> : null}
                        {"labelDetail" in item ? <span>{item.labelDetail}</span> : null}
                      </span>
                      <span className="text-body">{item.value}</span>
                    </a>
                  ))}
                </div>
              </section>
            ))}

            <section className="grid gap-4 border-b border-line py-5 sm:grid-cols-[160px_1fr]">
              <h2 className="eyebrow">Social</h2>
              <nav className="flex flex-wrap items-center gap-7" aria-label="Social profiles">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="group flex h-8 items-center justify-center"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      className={`block object-contain opacity-55 transition-opacity group-hover:opacity-100 ${item.className}`}
                    />
                  </a>
                ))}
              </nav>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
