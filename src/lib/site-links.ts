import { site } from "@/data/site";

function isRealValue(value: string) {
  return Boolean(value && !value.startsWith("PASTE_"));
}

export const siteLinks = [
  isRealValue(site.email) ? { label: "Email", value: site.email, href: `mailto:${site.email}` } : null,
  { label: "Vimeo", value: site.vimeoProfile.replace("https://", ""), href: site.vimeoProfile },
  isRealValue(site.instagram)
    ? { label: "Instagram", value: site.instagram.replace("https://", ""), href: site.instagram }
    : null,
  isRealValue(site.linkedin)
    ? { label: "LinkedIn", value: site.linkedin.replace("https://", ""), href: site.linkedin }
    : null,
  isRealValue(site.imdb) ? { label: "IMDb", value: site.imdb.replace("https://", ""), href: site.imdb } : null,
].filter((link) => link !== null);
