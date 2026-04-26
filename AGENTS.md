# AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build   # Production build (only when ready to verify)
npm run lint    # ESLint check
npx tsc --noEmit # TypeScript check
```

## Tech Stack

- **Next.js** 16 with App Router
- **Tailwind CSS** v4
- **better-auth** for authentication
- **Prisma** with PostgreSQL adapter
- **Framer Motion** for animations

## Database

Requires `DATABASE_URL` in `.env`. Schema is at `prisma/schema.prisma`.

```bash
npx prisma migrate dev  # Run migrations
npx prisma generate   # Generate client
```

## Auth Setup

Required env vars:
- `BETTER_AUTH_SECRET` - Generate with `openssl rand -base64 32`
- `BETTER_AUTH_URL` - e.g., `http://localhost:3000`

Auth is mounted at `/api/auth/[...all]` using `toNextJsHandler`.

## Fonts

Uses `next/font/google`:
- **Outfit** (display) via `--font-outfit`
- **Plus Jakarta Sans** (body) via `--font-jakarta`

Set via CSS variables in Tailwind `@theme`.

## Design System (in-nova inspired)

Colors stored in CSS variables:

```css
:root {
  --color-primary: #a089df;     /* Lavender */
  --color-secondary: #807be4;    /* Purple */
  --color-accent: #faa178;      /* Coral/Peach */
  --color-dark-bg: #181136;       /* Dark purple bg */
  --color-dark-bg-2: #1a1a4e;  /* Secondary dark bg */
  --color-text-light: #c5b5f0; /* Light text */
}
```

Use these colors in components:
```tsx
const COLORS = {
  primary: '#a089df',
  secondary: '#807be4',
  accent: '#faa178',
  darkBg: '#181136',
  textLight: '#c5b5f0',
};
```

## Firecrawl (Research & Design Extraction)

Install firecrawl CLI for scraping websites:
```bash
npm install -g firecrawl
firecrawl --setup  # Follow prompts to add your API key
```

### Extract design from a URL (full page screenshot):
```bash
# Full page screenshot via API (requires FIRECRAWL_API_KEY)
curl -s -X POST "https://api.firecrawl.dev/v1/scrape" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -d '{"url":"https://example.com/","formats":["screenshot@fullPage"]}'
```

### Scrape markdown:
```bash
firecrawl scrape "https://example.com/" -o .firecrawl/output
```

### Extract colors from HTML:
```bash
grep -oE "#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}" .firecrawl/*.html | sort -u
```

## Page Structure

### Landing Page (`/`)
- Hero section with animated gradient blobs
- Features grid
- How it works steps
- CTA section
- Footer

### Auth Page (`/auth`)
- Clean, centered form (no hero!)
- Logo + form only
- No scroll, fits on one screen
- Use smaller padding: `max-w-sm`, `p-6`

## Skills Available

Use these skills for proper workflow:
- **brainstorming** - Before any creative work
- **firecrawl-scrape** - Extract content from URLs
- **firecrawl-search** - Web search with content
- **context7-mcp** - Fetch library docs

## UI Components

- Tailwind v4 uses `@theme inline` for custom values
- Dark mode design with Aurora background effects
- Use `h-screen w-screen flex` for full-viewport layouts
- Avoid CSS variables in Tailwind classes—use hardcoded hex colors or style props