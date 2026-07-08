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

There is no test suite configured yet. Verify changes with `pnpm build` + `pnpm lint`, and by hitting the dev server directly.

When installing new dependencies, pnpm may block postinstall scripts for packages it doesn't recognize (`ERR_PNPM_IGNORED_BUILDS`). Approve legitimate ones explicitly in `pnpm-workspace.yaml` (`allowBuilds` + `onlyBuiltDependencies`) rather than disabling the protection globally.

### Deployment

Live on Vercel, project `emil-abdumalikov-s-projects/portfolio`, primary domain `emilabdumalikov.vercel.app`. GitHub repo `emilioaab/portfolio` is connected via Vercel's Git integration (pushes to `main` deploy to production — there is no separate preview branch workflow set up). `NEXT_PUBLIC_SITE_URL` is set in Vercel's production env vars and used as `metadataBase` for absolute OG/canonical URLs; falls back to `http://localhost:3000` locally.

## Architecture

Next.js 16 (App Router) portfolio site, TypeScript strict mode, Tailwind CSS v4, internationalized (English/Hebrew) via `next-intl`.

### Routing is entirely locale-prefixed

Every real route lives under `src/app/[locale]/`. There is **no root `src/app/layout.tsx`** — `src/app/[locale]/layout.tsx` renders the `<html>`/`<body>` tags itself and acts as the root layout. `src/proxy.ts` (Next 16 renamed `middleware.ts` → `proxy.ts`) runs `next-intl`'s `createMiddleware` to redirect `/` → `/en` and resolve the locale prefix for every non-asset request.

**Gotcha**: root-level Next.js metadata file routes (`src/app/icon.tsx`) have no file extension in their URL (`/icon`), so they aren't caught by the proxy matcher's `.*\..*` exclusion and were getting redirected to `/en/icon` → 404. The matcher explicitly excludes `icon` now (`src/proxy.ts`). Any future root-level route without a locale segment needs the same treatment.

The i18n wiring has four cooperating pieces, all under `src/i18n/`:
- `routing.ts` — supported locales (`en`, `he`), default locale, `rtlLocales`. Add a locale here first.
- `request.ts` — `next-intl`'s per-request config, loads `src/messages/{locale}.json`.
- `navigation.ts` — locale-aware `Link`/`usePathname`/`useRouter`/`redirect`. **Always import navigation primitives from here, not `next/link`/`next/navigation`.** Exception: same-page hash anchors (`#section`) — next-intl's `Link` prefixes internal hrefs with the locale, which breaks a bare hash. `Button` and `Nav` render plain `<a>` for anything starting with `#`.
- `next.config.ts` wraps the Next config with `createNextIntlPlugin`.

Translation strings live in `src/messages/en.json` / `he.json`, keyed by section name. Keep both files structurally identical. Convention: terminal-syntax fragments (`$`, `whoami`, nav labels like `~/work`, typed command names in `TerminalPrompt`) stay in English/Latin in **both** locales — they're meant to read as literal shell syntax, not UI copy.

### Theming: fixed CSS-variable palette, no Tailwind color config, no light mode

Design tokens are CSS custom properties in `src/app/globals.css`, exposed to Tailwind via `@theme inline` (Tailwind v4 — there's no `tailwind.config.ts` color palette; edit the CSS variables instead). Tokens: `--background`, `--foreground`, `--muted`, `--border`, `--surface`, `--accent`, `--accent-foreground`.

Single fixed "cyan hacker terminal" palette (near-black bg, cyan accent) — intentionally **no dark/light toggle**. A runtime toggle existed early on and was deliberately removed; don't reintroduce it unless explicitly asked. `--muted` is `#8b8b93`, not an arbitrary gray — it was tuned specifically to pass WCAG AA contrast (6:1) against the background after the original `#52525b` measured 2.6:1 and failed. Don't lighten/darken it without re-checking contrast.

### Fonts switch by writing direction, not by locale directly

`src/app/[locale]/layout.tsx` loads Geist Sans, Geist Mono, and Rubik (`latin`+`hebrew`). `globals.css` picks the active sans font purely via `html[dir="rtl"|"ltr"]` → `--font-sans-selected`. Extend this dir-based switch for new locales/fonts rather than branching in JS/TSX.

### Section architecture

`src/app/[locale]/page.tsx` composes six sections in order: `Hero` → `FlagshipProject` → `OngoingProjects` (id/eyebrow `projects`, heading "What I'm Building" — the component/folder name is legacy, don't rename without reason) → `About` → `TechStack` → `Contact`. Each lives in `src/components/sections/<Name>/`, is a server component using `useTranslations("<Name>")`, wraps content in `<Reveal>` for scroll-triggered fade-up, and pulls structural (non-translated) data from a matching file in `src/content/*.ts`.

**Deliberately avoid the generic "SectionHeading + grid of bordered cards" pattern for every section** — that repetition read as templated/AI-generated in review and was reworked section by section:
- **Hero**: `TerminalPrompt` — a clickable `[1] work → ...` / `[2] contact → ...` command list (not pill buttons) plus a *real*, optional text input that matches typed commands against `content/terminal.ts`'s `COMMAND_TARGETS` (same vocabulary as `Nav`'s links) and navigates via `window.location.hash`. Typing is never required or hinted at — the click list is the obvious path. `Typewriter` types the "Hello. / My name is ___" greeting with a mid-phrase pause; full text is always present via `aria-label` on the `<h1>` (the animated span is `aria-hidden`) so screen readers/no-JS don't get empty content.
- **FlagshipProject**: one `WindowFrame` (see below) titled `cira.sh`, two-column body — info left, `TerminalLines` (mock scan output) right.
- **OngoingProjects**: each project is its own `WindowFrame` titled like a source file (`law-firm.tsx`, `music-sync.tsx`); status badge is per-project (`completed`/`in-progress`), not a hardcoded label.
- **About**: `AboutFileList` — an `ls -la ~/about` accordion (`drwxr-xr-x cybersecurity/`, etc.), not a card grid. No icons.
- **TechStack**: a divided category list (`divide-y`), not cards.
- **Contact**: primary mailto `Button` + icon-only GitHub/LinkedIn `Button`s (hand-rolled SVGs in `src/components/ui/icons.tsx` — this lucide-react version dropped brand/logo icons).

`WindowFrame` (`src/components/ui/WindowFrame.tsx`) — a reusable "real app window" chrome (three dots + optional title bar, `flex flex-col` so its `flex-1 min-h-0` content area sizes correctly regardless of how much content each instance holds — don't go back to `h-full` on a plain-block parent, it breaks height math and content overflows the `overflow-hidden` clip). This replaced a generic `Card` component (deleted — bordered-box-with-hover-glow read as templated too).

### `src/content/*.ts` — typed, non-translated structural data

`projects.ts` (flagship + secondary project metadata: tags, links, file names, status), `techstack.ts` (category → items), `about.ts` (facet id/slug pairs), `social.ts` (contact links), `terminal.ts` (`COMMAND_TARGETS` shared between `Nav` and `TerminalPrompt`). Anything translated (titles, descriptions) stays in `messages/*.json` and is looked up by the id/slug these files define — keep that split rather than duplicating strings into content files.

### Client-state hooks: `useSyncExternalStore`, not `useState`+`useEffect`

The project's ESLint config enforces stricter-than-default React Hooks rules that reject several common patterns:
- `react-hooks/set-state-in-effect` — no synchronous `setState` in an effect body. Fine to call `setState` inside an async callback an effect merely *registers* (an `IntersectionObserver`/event-listener callback) — that's the sanctioned pattern (`useActiveSection`).
- `react-hooks/immutability` — mutating a `useMemo`'d value is rejected, even inside a `useFrame` (react-three-fiber) animation-loop callback that isn't render code. Use `useRef` for buffers that get mutated every frame, not `useMemo`.
- `react-hooks/refs` — reading `ref.current` during render (including just passing it as a JSX prop, e.g. `<bufferAttribute args={[ref.current, ...]}/>`) is rejected. For R3F, attach mutable buffer attributes imperatively in a `useEffect` after mount instead (see `NetworkScene.tsx`).
- `react-hooks/purity` — no impure calls (`Math.random()`) in a component/hook body, even one-time in `useMemo`. `NetworkScene.tsx` uses a deterministic sine-hash pseudo-random generator instead, computed once at module scope.

For reading one-time client-only browser state (feature detection, `matchMedia`, `window.scrollY`), the established pattern is `useSyncExternalStore` with a snapshot function and a `getServerSnapshot` returning the SSR-safe default — see `src/lib/use-scrolled.ts` and `src/components/three/HeroCanvas.tsx`. This avoids both the lint rule and an SSR/client hydration-mismatch warning that a naive `useState`+`useEffect` would cause.

### WebGL hero scene

`src/components/three/HeroCanvas.tsx` dynamically imports `NetworkScene.tsx` (`ssr: false`) and only mounts it once `useSyncExternalStore` confirms: WebGL support, `prefers-reduced-motion` is not set, and viewport ≥768px. Otherwise renders nothing — the static CSS grid (`HeroBackground.tsx`, `.hero-grid`) is the always-present real fallback, not a loading state. Both layers share `.hero-fade-mask` (a vertical linear-gradient CSS mask) so neither has a hard edge at the Hero section's top/bottom.

`NetworkScene` is a **static** point cloud (positions computed once at module load) with a single per-frame cost: a group-rotation lerp toward the cursor. A per-point cursor-repulsion physics simulation (individual point positions reacting to proximity, updated every frame) was built and then removed — it was the heaviest part of the scene and had a real bug (repulsion math compared world-space cursor position against local/unrotated point positions, so it drifted out of sync as the group's tilt rotation accumulated). Don't reintroduce per-point physics without addressing both the performance cost and that coordinate-space issue.
