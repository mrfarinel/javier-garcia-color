# Javier García Portfolio Review Notes

This package is for reviewing the portfolio website without opening the local preview.

## What Was Built

- A premium minimalist dark portfolio website for Javier García, a Madrid-based colorist working internationally.
- Entire site content is in English.
- Stack: Next.js, TypeScript, Tailwind CSS, App Router.
- Pages included:
  - Home / portfolio
  - Work archive
  - Individual project page
  - About
  - Contact

## Visual Direction Implemented

- Washed black background close to `#0B0B0D`.
- Inter typography as fallback for Suisse Int'l.
- Small uppercase navigation with wide letter spacing.
- Neutral-only palette: white, off-white, grey and fine dark borders.
- Restrained hover states.
- Image-focused cinematic layout with generous spacing.

## Main Files To Inspect

- `src/data/projects.ts`: all project data, Vimeo IDs, image paths and credits.
- `src/app/page.tsx`: homepage hero and selected work.
- `src/app/work/page.tsx`: work archive.
- `src/app/work/[id]/page.tsx`: individual project page.
- `src/app/about/page.tsx`: about page.
- `src/app/contact/page.tsx`: contact page.
- `src/components/VimeoPlayer.tsx`: reusable Vimeo iframe component.
- `src/components/ProjectGrid.tsx`: filterable work grid.
- `src/app/globals.css`: global visual system.

## Screenshots Included

- `screenshots/01-home-desktop.png`
- `screenshots/02-work-archive-desktop.png`
- `screenshots/03-project-detail-desktop.png`
- `screenshots/04-about-desktop.png`
- `screenshots/05-contact-desktop.png`
- `screenshots/06-home-mobile.png`

## Verification Already Done

- Production build completed successfully with `pnpm build`.
- Homepage, archive, detail, about and contact pages returned successfully.
- Vimeo iframe URL format is `https://player.vimeo.com/video/{vimeoId}`.
- Background color checked as `rgb(11, 11, 13)`, matching `#0B0B0D`.
- No horizontal overflow found in checked pages.

## How To Add Real Content

Add projects in `src/data/projects.ts`. Each project has:

```ts
{
  id: "project-url-slug",
  title: "Project Title",
  category: "Commercial",
  year: "2026",
  thumbnail: "/images/example-thumb.jpg",
  heroImage: "/images/example-hero.jpg",
  vimeoId: "123456789",
  colorist: "Javier García",
  stills: ["/images/example-still-1.jpg"]
}
```

Put replacement images in `public/images` and reference them with `/images/file-name.jpg`.

For Vimeo, use only the numeric video ID from a Vimeo URL. Example: `https://vimeo.com/123456789` becomes `vimeoId: "123456789"`.
