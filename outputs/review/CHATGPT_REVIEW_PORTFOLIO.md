# Review Brief For ChatGPT

Please review this portfolio website for Javier García, a Madrid-based colorist.

The goal is not to redesign it. The goal is to check whether the current implementation matches the approved direction and whether anything important is missing or broken.

## Project Context

- Website: professional portfolio for Javier García.
- Role: Colorist.
- Location: Madrid / Worldwide.
- Visual direction: dark, minimalist, cinematic, premium, museum-like.
- Language: English.
- Stack: Next.js, TypeScript, Tailwind CSS, App Router.
- Local preview, if running: `http://127.0.0.1:3006` or the port shown by Terminal.

Note: a local preview URL only works if the Next.js server is actively running on the same machine.

## What To Review

Please check:

1. Whether the site feels like a high-end colorist/cinematographer portfolio rather than a generic freelance site.
2. Whether the dark minimalist design is preserved.
3. Whether the typography, spacing, borders and image hierarchy feel restrained and premium.
4. Whether the Vimeo reel is correctly used as the main hero video and WATCH REEL modal.
5. Whether imported Vimeo projects are presented clearly.
6. Whether filters behave logically.
7. Whether the thumbnail treatment preserves the color grading work.
8. Whether the site appears responsive and avoids cramped layouts.

## Design Constraints

The design should keep:

- Background near `#0B0B0D`.
- White, off-white and grey typography only.
- No color accents.
- Thin borders.
- Small uppercase navigation.
- Elegant letter spacing for Javier García's name.
- No flashy animation.
- No oversized typography.
- Image/video-first portfolio presentation.

## Current Vimeo Setup

Main Vimeo profile:

```txt
https://vimeo.com/mrfarinel
```

Homepage reel:

```txt
https://vimeo.com/908562320
```

The reel ID is configured in:

```txt
src/data/site.ts
```

Current value:

```ts
reelVimeoId: "908562320"
```

The reusable player is:

```txt
src/components/VimeoPlayer.tsx
```

The player uses:

```txt
https://player.vimeo.com/video/{vimeoId}
```

It also requests a clean Vimeo player with:

```txt
byline=0
controls=0
dnt=1
portrait=0
title=0
```

Important: Vimeo may still show some UI depending on Vimeo account/video settings.

## Imported Projects

Projects are generated in:

```txt
src/data/projects.ts
```

Current import summary:

```txt
Total projects: 20
Commercial: 16
Fiction: 2
Music Video: 2
Series: 0
```

The first imported projects are:

```txt
PILSEN AHUMADA - SMOKE GURÚ — Commercial — Vimeo ID 1195890962
DESEO - TRAILER — Fiction — Vimeo ID 1195889439
RUBIO - VOY CRECIENDO — Music Video — Vimeo ID 1195888334
```

## Vimeo Sync

The sync script is:

```txt
scripts/import-vimeo.ts
```

Command:

```bash
npm run sync-vimeo
```

The script:

- Uses `VIMEO_ACCESS_TOKEN` as the primary method if available.
- Fetches Vimeo API pages using `paging.next`.
- Reads Vimeo showcases/albums when available.
- Deduplicates by Vimeo ID.
- Falls back to the public Vimeo feed if no token is present.
- Logs total profile videos, showcase videos, unique imported videos, category totals and fallback category usage.

Manual category overrides live in:

```txt
src/data/vimeo-categories.ts
```

Editorial hide/feature controls live in:

```txt
src/data/vimeo-projects.ts
```

## Filters

Expected filters:

```txt
ALL
COMMERCIALS
FICTION
MUSIC VIDEOS
SERIES
```

Series should stay hidden while there are no Series projects.

Expected behavior:

- All: every imported project.
- Commercials: only `Commercial`.
- Fiction: only `Fiction`.
- Music Videos: only `Music Video`.
- Series: only `Series`.

## Image Treatment

Current requirement:

- Default thumbnails should show original color.
- No desaturation.
- No dark/washed filter by default.
- Hover should darken slightly, not brighten.

Relevant CSS:

```txt
src/app/globals.css
```

Class:

```css
.image-tone
```

## Responsive Review

Please check at these widths if possible:

```txt
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px
```

Expected behavior:

- No horizontal overflow.
- Mobile header should not squeeze logo and nav into one cramped line.
- Mobile grid should be 1 column.
- Tablet grid should be 2 columns.
- Desktop grid should be 3 columns.
- Large desktop may use 4 columns if it remains elegant.
- Hero should stack cleanly on mobile and remain balanced on desktop.

## Key Files To Inspect

```txt
src/app/page.tsx
src/app/work/page.tsx
src/app/work/[id]/page.tsx
src/app/about/page.tsx
src/app/contact/page.tsx
src/app/globals.css
src/components/Header.tsx
src/components/ProjectGrid.tsx
src/components/ProjectCard.tsx
src/components/ReelModal.tsx
src/components/VimeoPlayer.tsx
src/data/projects.ts
src/data/site.ts
src/data/vimeo-categories.ts
src/data/vimeo-projects.ts
scripts/import-vimeo.ts
README.md
```

## Specific Things To Flag

Please flag:

- Any category that appears wrong.
- Any project that appears missing from the Vimeo profile.
- Any thumbnail that looks too muted/desaturated.
- Any hover behavior that brightens instead of darkens.
- Any mobile layout issue or horizontal overflow.
- Any text that feels too large, too salesy, or not premium/minimal.
- Any implementation issue with Vimeo importing or iframe embedding.

## Do Not Suggest

Please do not suggest:

- A full redesign.
- Bright color accents.
- Big hero typography.
- Decorative gradients or flashy effects.
- Replacing the minimalist portfolio direction with a marketing landing page.
