# Javier García Portfolio

Professional portfolio website for Javier García, a Madrid-based colorist working internationally.

## PREVIEW THE WEBSITE

### METHOD 1 — EASIEST ON MAC

Double-click:

```txt
start-preview.command
```

The script opens Terminal, installs dependencies if needed, starts the website, and opens the preview in your browser.

Default preview URL:

```txt
http://localhost:3000
```

If port `3000` is already busy, the script starts on:

```txt
http://localhost:3001
```

Keep the Terminal window open while reviewing the website.

### METHOD 2 — TERMINAL

Open Terminal in the project folder and run:

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

### METHOD 3 — PUBLIC PREVIEW

Push the latest changes to GitHub.

Import the GitHub repository into Vercel. After that, Vercel will automatically create a public preview URL for every branch or pull request.

The main branch deploys the production website.

## NODE VERSION

Use Node.js 20 or newer.

If you use `nvm`, run:

```bash
nvm use
```

The project includes:

```txt
.nvmrc
```

## COMMON COMMANDS

Start local development:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Run the project check:

```bash
npm run check
```

Sync Vimeo projects:

```bash
npm run sync-vimeo
```

## VIMEO VIDEOS

Projects come from Javier's Vimeo profile:

```txt
https://vimeo.com/mrfarinel
```

The homepage reel is configured in:

```txt
src/data/site.ts
```

Paste only the numeric Vimeo ID:

```ts
reelVimeoId: "908562320"
```

For full Vimeo syncing, create `.env.local` in the project root:

```bash
VIMEO_ACCESS_TOKEN=your_token_here
```

Never commit `.env.local`.

By default, the deployed site checks Vimeo again every 5 minutes when `VIMEO_ACCESS_TOKEN` is available. To change that interval, add:

```bash
VIMEO_REVALIDATE_SECONDS=300
```

In local development, refresh the browser after changing Vimeo descriptions, titles or thumbnails.

On Vercel, add the same variable in:

```txt
Project Settings → Environment Variables
```

If a Vimeo video is private, allow embedding on the final website domain inside Vimeo:

```txt
Settings → Privacy → Embed → Specific domains
```

## CONTACT FORM

The contact form sends email from the website through Resend.

Add these environment variables in Vercel:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=mrfarinel@gmail.com
CONTACT_FROM_EMAIL=Javier García Portfolio <contact@javiergarciacolor.com>
```

For the most professional setup, verify `javiergarciacolor.com` inside Resend first, then use an address from that domain in `CONTACT_FROM_EMAIL`.

The visitor's email is added as the reply-to address, so replies go directly to the person who sent the message.

## TROUBLESHOOTING

### `command not found: npm`

Install the current Node.js LTS version from:

```txt
https://nodejs.org/
```

Then close Terminal, open it again, and run:

```bash
npm install
npm run dev
```

### `command not found: node`

Install the current Node.js LTS version from:

```txt
https://nodejs.org/
```

Node.js includes npm.

### Port 3000 already in use

If you double-click `start-preview.command`, it will automatically try port `3001`.

If you use Terminal manually, run:

```bash
npm run dev -- --port 3001
```

Then open:

```txt
http://localhost:3001
```

### Missing dependencies

Run:

```bash
npm install
```

Then run:

```bash
npm run dev
```

### Vimeo token missing

The site can still use the local cached project data.

To sync the full Vimeo portfolio, add this to `.env.local`:

```bash
VIMEO_ACCESS_TOKEN=your_token_here
```

Then run:

```bash
npm run sync-vimeo
```

### Vimeo changes are not appearing

There are two ways the site can read Vimeo:

1. Live Vimeo mode: if `VIMEO_ACCESS_TOKEN` exists, the site reads the latest Vimeo data directly. In local development, refresh the browser. In Vercel, the site refreshes Vimeo data every 5 minutes by default.
2. Cached file mode: if there is no token, the site uses `src/data/projects.ts`. Run `npm run sync-vimeo` after changing Vimeo, then redeploy.

To make updates appear faster in production, set a lower value:

```bash
VIMEO_REVALIDATE_SECONDS=60
```

### Vercel build failed

First check the build locally:

```bash
npm install
npm run build
```

If Vimeo API data is required during deployment, add `VIMEO_ACCESS_TOKEN` in Vercel environment variables.

Make sure `.env.local` is not committed.

## GITHUB AND VERCEL SETUP

1. Create a GitHub repository.
2. Push this project to GitHub.
3. Go to Vercel and import the GitHub repository.
4. Add `VIMEO_ACCESS_TOKEN` in Vercel only if Vimeo syncing/runtime API access is needed.
5. Vercel will generate preview URLs for branches and pull requests.
6. The main branch will become the production deployment.
