# Review file for ChatGPT

## Project

Professional portfolio website for Javier García, Madrid-based colorist working internationally.

The full website is in English.

Current local preview:

```txt
http://127.0.0.1:3000/
```

If that does not open, use the Mac launcher:

```txt
start-preview.command
```

The launcher starts the Next.js server, waits until the website responds, then opens the browser.

## Stack

- Next.js 16.2.9
- React 19.2.7
- TypeScript
- Tailwind CSS
- App Router
- Vimeo iframe embeds

Node requirement:

```txt
>=20
```

## Visual direction implemented

The site is designed as a premium, minimalist, dark portfolio for a professional colorist.

Design language:

- Dark washed black background close to `#0B0B0D`.
- White, off-white and grey typography only.
- Thin borders and quiet spacing.
- Small uppercase navigation with letter spacing.
- Cinematic, editorial, museum-like layout.
- Image/video focused.
- No decorative colors or flashy effects.

## Main pages

- Home / selected work
- Work archive
- Individual project page
- About
- Contact

Important files:

```txt
src/app/page.tsx
src/app/work/page.tsx
src/app/work/[id]/page.tsx
src/app/about/page.tsx
src/app/contact/page.tsx
```

## Homepage behavior

The old giant reel-first layout has been replaced.

The homepage now starts with a selected project feature.

Current behavior:

- First featured project should be `DESEO - TRAILER`.
- Main video uses a wide scope-style aspect ratio.
- Project information appears on the left.
- Two arrow buttons below the video switch between selected projects.
- The selected projects after DESEO are shuffled client-side.
- The reel is not used as the main homepage video.

Component:

```txt
src/components/FeaturedReel.tsx
```

Note: the component name is still `FeaturedReel`, but it now behaves as a featured project carousel. A future cleanup could rename it to `FeaturedProject`.

## Vimeo setup

Reusable Vimeo player:

```txt
src/components/VimeoPlayer.tsx
```

The iframe URL is generated from:

```txt
https://player.vimeo.com/video/{vimeoId}
```

Vimeo reel configuration:

```txt
src/data/site.ts
```

Current reel ID:

```txt
908562320
```

The reel should remain separate from the main selected project hero.

Private Vimeo note:

If a Vimeo video is private, embedding must be allowed on the final website domain in Vimeo:

```txt
Settings → Privacy → Embed → Specific domains
```

## Project data

Main generated/cache data:

```txt
src/data/projects.ts
```

Manual Vimeo category overrides:

```txt
src/data/vimeo-categories.ts
```

Manual title/category/order rules:

```txt
src/data/vimeo-projects.ts
```

Server-side loader:

```txt
src/lib/projects.ts
```

Vimeo sync script:

```txt
scripts/import-vimeo.ts
```

Sync command:

```bash
npm run sync-vimeo
```

Environment variable:

```txt
VIMEO_ACCESS_TOKEN
```

Do not expose or commit `.env.local`.

## Categories and filters

Homepage/work filters:

```txt
ALL
COMMERCIALS
FICTION
MUSIC VIDEOS
SERIES
```

Series is hidden unless there are Series projects.

The filter labels should appear uppercase.

Important component:

```txt
src/components/ProjectGrid.tsx
```

## Current category decisions

Based on Javier's Vimeo screenshots:

- `DESEO - TRAILER` is Fiction.
- `RUBIO - VOY CRECIENDO` is Music Video.
- `CLEMONT - FORME CELESTI` is Commercial.
- The reel should not appear in Commercials.
- The reel may appear only in ALL if it is imported as a project.

## Preview workflow

Local terminal:

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

Mac easiest method:

```txt
start-preview.command
```

The script:

- Checks for Node.js.
- Checks for npm.
- Installs dependencies if `node_modules/.bin/next` is missing.
- Uses port 3000 by default.
- Uses port 3001 if 3000 is busy.
- Starts the server in the background.
- Waits until the URL responds.
- Opens the browser only after the server is ready.
- Keeps Terminal open.

## Deployment workflow

Intended public preview workflow:

1. Push project to GitHub.
2. Import GitHub repository into Vercel.
3. Add `VIMEO_ACCESS_TOKEN` to Vercel Environment Variables if runtime Vimeo API access is needed.
4. Each branch/pull request gets a Vercel preview URL.
5. Main branch deploys production.

No `vercel.json` has been added because it is not currently required.

## What ChatGPT should review

Please review the current website for:

1. Premium colorist portfolio feel.
2. Dark minimalist visual consistency.
3. Header alignment across desktop and mobile.
4. Whether the hero/selected project area feels too large or correctly cinematic.
5. Whether DESEO appears first in the selected project section.
6. Whether filters are uppercase.
7. Whether project cards feel close to a Vimeo/cinematography archive.
8. Whether Vimeo videos are playable and controls are visible.
9. Whether project detail pages are clear and professional.
10. Whether About and Contact pages are simple enough.
11. Whether responsive spacing feels balanced on mobile.
12. Whether anything still feels like a generic freelance website.

## Known limitations / notes

- Vimeo sync depends on `VIMEO_ACCESS_TOKEN`.
- Some project metadata may be incomplete until the Vimeo import is run with full API access.
- `src/components/FeaturedReel.tsx` should probably be renamed later because it is now a selected project carousel.
- `npm audit` reported moderate vulnerabilities after install. Do not run `npm audit fix --force` casually because it can introduce breaking dependency changes.
- Local preview should stay open only while the Terminal server is running.

## Files most likely to need visual changes

```txt
src/app/globals.css
src/components/Header.tsx
src/components/FeaturedReel.tsx
src/components/ProjectGrid.tsx
src/components/ProjectCard.tsx
src/components/VimeoPlayer.tsx
src/components/Footer.tsx
```

## Files most likely to need data changes

```txt
src/data/projects.ts
src/data/site.ts
src/data/vimeo-categories.ts
src/data/vimeo-projects.ts
scripts/import-vimeo.ts
```

## Final reviewer instruction

Do not redesign the site from scratch.

Give precise feedback and suggested edits while preserving:

- Dark washed black background.
- Minimal typography.
- White/grey-only hierarchy.
- Thin borders.
- Cinematic image focus.
- Quiet premium portfolio tone.
