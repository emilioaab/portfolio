# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (via corepack, pinned to `packageManager` behavior through `pnpm-workspace.yaml`). Do not use npm/yarn.

```bash
pnpm dev          # start dev server (Turbopack) at localhost:3000
pnpm build        # production build (also runs the TypeScript check)
pnpm lint         # ESLint (flat config: eslint-config-next + prettier)
pnpm exec tsc --noEmit   # type-check only, no lint
```

There is no test suite configured yet. There is no `pnpm start`-only smoke check beyond the above — verify changes by running `pnpm build` (catches type errors) and `pnpm lint`, and by hitting the dev server directly (see locale note below).

When installing new dependencies, pnpm may block postinstall scripts for packages it doesn't recognize (`ERR_PNPM_IGNORED_BUILDS`). Approve legitimate ones explicitly in `pnpm-workspace.yaml` (`allowBuilds` + `onlyBuiltDependencies`) rather than disabling the protection globally.

## Architecture

This is a Next.js 16 (App Router) portfolio site, TypeScript strict mode, Tailwind CSS v4, internationalized (English/Hebrew) via `next-intl`, deployed to Vercel.

### Routing is entirely locale-prefixed

Every real route lives under `src/app/[locale]/`. There is **no root `src/app/layout.tsx`** — `src/app/[locale]/layout.tsx` renders the `<html>`/`<body>` tags itself and acts as the root layout. `src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`; keep using that filename, not the deprecated one) runs `next-intl`'s `createMiddleware` to redirect `/` → `/en` and resolve the locale prefix for every non-asset request.

The i18n wiring has four cooperating pieces, all under `src/i18n/`:
- `routing.ts` — the single source of truth for supported locales (`en`, `he`), the default locale, and `rtlLocales` (currently just `he`). Add a locale here first.
- `request.ts` — `next-intl`'s per-request config, loads `src/messages/{locale}.json`.
- `navigation.ts` — locale-aware `Link`/`usePathname`/`useRouter`/`redirect` from `createNavigation(routing)`. **Always import navigation primitives from here, not from `next/link` or `next/navigation`**, so locale prefixes and RTL are handled automatically (see `LocaleSwitcher.tsx` for the pattern: it re-links the current `pathname` with a different `locale` to preserve the route when switching languages).
- `next.config.ts` wraps the Next config with `createNextIntlPlugin("./src/i18n/request.ts")`.

`src/app/[locale]/layout.tsx` reads `params.locale`, 404s via `notFound()` if it's not in `routing.locales`, and derives `dir="rtl"|"ltr"` from `rtlLocales` — this is what makes Tailwind's logical properties (`ps-`, `me-`, etc.) and the CSS font-switching below work correctly. Any new layout-level locale logic belongs here.

Translation strings live in `src/messages/en.json` / `he.json`, keyed by section name (`Hero`, `FlagshipProject`, `OngoingProjects`, `About`, `TechStack`, `Contact` — mirrors the planned page sections). Keep both files structurally identical.

### Theming: fixed CSS-variable palette, no Tailwind color config, no light mode

Design tokens are defined as CSS custom properties in `src/app/globals.css` and exposed to Tailwind via a `@theme inline` block (Tailwind v4 style — there is no `tailwind.config.ts` color palette to edit; edit the CSS variables instead). Current tokens: `--background`, `--foreground`, `--muted`, `--border`, `--surface`, `--accent`, `--accent-foreground`, mapped to `bg-background`, `text-muted`, `border-border`, etc.

The palette is a single fixed "cyan hacker terminal" theme (near-black background, cyan accent) — there is intentionally **no dark/light toggle and no `data-theme` attribute**. An earlier iteration had a runtime toggle (`ThemeToggle.tsx`, `theme-store.ts`, `theme-script.ts`); it was deliberately removed in favor of one fixed palette, so don't reintroduce that pattern unless explicitly asked to bring back theme switching. If external-state syncing (DOM attributes, `localStorage`, etc.) is needed again for something else, use `useSyncExternalStore` rather than `useState`+`useEffect` — the project's ESLint config enforces `react-hooks/set-state-in-effect`.

### Fonts switch by writing direction, not by locale directly

`src/app/[locale]/layout.tsx` loads three `next/font/google` fonts: Geist Sans (Latin UI text), Geist Mono (tags/labels, code-like accents), and Rubik (`latin` + `hebrew` subsets). All three are exposed as CSS variables on `<html>`. `globals.css` then picks the active sans font purely in CSS based on the `dir` attribute (`html[dir="rtl"]` → Rubik, `html[dir="ltr"]` → Geist Sans) via an intermediate `--font-sans-selected` variable. When adding new locales/fonts, extend this dir-based switch rather than branching in JS/TSX.

### Planned structure not yet built out

`src/components/sections/{Hero,FlagshipProject,OngoingProjects,About,TechStack,Contact}/`, `src/components/ui/`, `src/components/three/`, `src/content/`, and `src/lib/` (beyond the theme files) currently only contain `.gitkeep` placeholders — the page (`src/app/[locale]/page.tsx`) just loops over the section keys and renders raw translation strings as a scaffolding check. Real section components, the `@react-three/fiber` hero scene, and typed content data files (`src/content/*.ts`) are still to be built; `framer-motion`, `lucide-react`, `clsx`/`tailwind-merge`, `three`/`@react-three/fiber`/`@react-three/drei` are already installed for that work.