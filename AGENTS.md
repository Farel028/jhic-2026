<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## What this is

Public website for SMK Negeri 2 Surabaya. It is an Indonesian-language Next.js
App Router project with a school profile, majors, news, student content, and a
Marzipano virtual tour.

Stack: Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, and Marzipano.

## Build / run

- Install: `npm.cmd install`
- Develop: `npm.cmd run dev`
- Lint: `npm.cmd run lint`
- Type-check: `npx.cmd tsc --noEmit --pretty false`
- Virtual-tour tests: `npm.cmd run test:virtual-tour`
- Production build: `npm.cmd run build`

Use `npm.cmd` / `npx.cmd` on Windows because PowerShell may block the `.ps1`
wrappers. The only public environment variable is `NEXT_PUBLIC_SITE_URL`; see
`.env.example`.

## Project structure

- `src/app/` — routes, layouts, metadata, sitemap, and robots.
- `src/components/` — reusable UI grouped by page or domain.
- `src/config/` — shared school identity and navigation.
- `src/data/` — typed local content used by pages.
- `src/features/virtual-tour/` — tour engine, scene config, UI, and developer tools.
- `public/` — school images, partner logos, Panda media, and tour panoramas.

Keep pages and layouts as Server Components by default. Add `"use client"` only
to the smallest component that needs state, effects, browser APIs, or events.
Use the `@/` alias for imports from `src/`.

## Content and assets

- Keep public copy in Indonesian unless the task says otherwise.
- Read school facts from `src/config/school.ts`; do not duplicate or invent them.
- Keep page collections in `src/data/` instead of embedding large datasets in JSX.
- Prefer existing or traceable official assets. If no suitable image exists, omit
  it instead of generating a replacement.
- Put static files in `public/` and use `next/image` for normal page imagery.

## Virtual tour

Read `src/features/virtual-tour/PANORAMA-IMPLEMENTATION-GUIDE.md` before changing
tour assets or scenes. Panorama sources must be equirectangular 2:1 images. Keep
scene data in `config/`, engine behavior in `core/` or `engine/`, and run the
focused virtual-tour tests after relevant changes.

## Working rules

- Make small, scoped changes and preserve unrelated worktree edits.
- Do not implement broad sections of the website unless explicitly requested.
- Match existing responsive, accessibility, metadata, and visual conventions.
- For Next.js API or convention changes, read the relevant local guide in
  `node_modules/next/dist/docs/` first.
- Validate proportionally: lint and type-check for normal changes, focused tests
  for the virtual tour, and a production build for routing or release-sensitive work.
- If a check hangs or an external font fetch fails, report it honestly instead of
  claiming validation passed.
