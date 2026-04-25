# AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build   # Production build
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

## UI Components

- Tailwind v4 uses `@theme inline` for custom values
- Dark mode design with Aurora background effects
- Use `h-screen w-screen flex` for full-viewport layouts
- Avoid CSS variables in Tailwind classes—use hardcoded hex colors or style props