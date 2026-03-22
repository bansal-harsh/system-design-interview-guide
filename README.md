# System Design Learning Platform

A production-ready starter for a premium system design learning experience built with Next.js App Router, Tailwind CSS, shadcn/ui-style components, MDX content, JWT auth, per-user progress tracking, and `next-themes`.

## Stack

- Next.js 16 App Router
- Tailwind CSS 4
- TypeScript
- MDX content loaded from `/content/<slug>`
- JWT auth with `httpOnly` cookie sessions
- SQLite-backed per-user progress tracking
- `next-themes` for light and dark mode
- Vercel-friendly static generation for learning modules

## Content model

Each module is independently pluggable:

```text
content/
  scale-from-zero-to-millions/
    metadata.json
    index.mdx
```

To add a new lesson:

1. Create a new folder in `content/`.
2. Add `metadata.json`.
3. Add `index.mdx`.
4. The route becomes available automatically at `/learn/[slug]`.

## Local development

```bash
npm install
npm run dev
```

If you want a production-grade JWT secret locally, add:

```bash
JWT_SECRET=replace-this-with-a-long-random-secret
```

The app uses a local SQLite database stored at `data/platform.db`.

## Authentication

- `POST /api/auth/register` creates a user and sets a JWT session cookie
- `POST /api/auth/login` signs in an existing user
- `POST /api/auth/logout` clears the session
- `POST /api/progress` toggles completion for the authenticated user

## Deployment

This app is ready for Vercel:

- Content pages use static generation via `generateStaticParams`
- The UI is stateless and CDN-friendly
- The content layer is isolated so it can be swapped to a DB-backed source later

## Future extensions

- Replace filesystem content loaders in `lib/content/modules.ts` with a DB or CMS
- Add authentication and user-specific progress
- Add multi-course routing like `/courses/[courseSlug]/learn/[moduleSlug]`
- Add versioned content and localization
