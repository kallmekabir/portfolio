# Kabir's Portfolio

Personal portfolio whose centerpiece is **interactive, playable projects**, plus resume, LinkedIn, and an About page (hobbies, interests, travel). Long-term project built over months.

## Working with Kabir (most important)
- Kabir is **learning**: strong in Java (through DSA), knows HTML/CSS/JS basics, new to React/TS.
- Explain the *why* of new concepts briefly, and relate them to Java when it helps.
- Ask at the start of a task which mode Kabir wants: **Explain-first**, **You drive** (hints + review), or **Pair** (leave `TODO(you)` sections).
- **Current mode (M1 fast track): Claude drives.** Kabir wants a working prototype deployed quickly, so write everything (no `TODO(you)` hand-offs), but keep annotating key lines so the code stays readable for learning.
- Keep it simple: no new dependencies or features without asking.
- After each milestone, offer a short quiz and remind Kabir to update `LEARNING.md`.

## Stack
React 19 + TypeScript + Vite · React Router (`react-router`) · Motion (`motion/react`) · Lenis · plain CSS + CSS Modules · Vercel hosting.
- **TypeScript-first.** Choose whatever best serves performance and the design, not Java because it's familiar. Projects are written in TypeScript by default.
- Java → WebAssembly (TeaVM, or CheerpJ for unmodified Swing apps, in `java/`) is an *option* per project, used only when it genuinely fits (e.g. reusing an existing Java engine).

## Conventions
- All colors, sizes, and timings come from `src/styles/tokens.css` (`var(--…)`). Never hard-code them in components.
- Personal content lives in `src/content/` as data, not inside page components.
- Projects: one folder per project in `src/projects/<slug>/` (default-export component) plus one entry in `src/projects/registry.ts`. Always lazy-load: `Component: lazy(() => import(...))`.
- Animate only `transform` and `opacity`; respect `prefers-reduced-motion`.
- Page structure: every page starts with a full-width `<Band>` (green header area) holding its `<h1>`, then its content inside `<div className="container">`. Sections that start a new background color get `data-tone="ice|peach|sea"` (see Design).
- Motion: use `m.div` (never `motion.div`; `<LazyMotion strict>` in Layout enforces it). Two-state effects like hover belong in CSS transitions; continuous, scroll-linked values use Motion hooks. Springs live in `src/styles/motion.ts`.
- Light/dark: components use only semantic tokens (`--color-*`, `--band-*`), so both themes work automatically. Theme logic is in `src/lib/theme.ts`.
- Accessibility: semantic HTML, visible focus, alt text, keyboard support (Esc closes overlays).

## Commands
- `npm run dev`: local dev server
- `npm run build`: type-check + production build (must pass before committing)
- `npm run lint`: oxlint
- `npm run preview`: serve the production build locally

## Workflow (git → Vercel)
- Never commit straight to `main`. One branch per task: `m1-design-system`, `feat/<thing>`, `fix/<thing>`.
- Before pushing: `npm run build && npm run lint` must pass.
- Open a PR with `gh pr create`. Vercel comments a preview URL on it (open it while logged in to Vercel).
- Merging to `main` deploys to production: https://portfolio-three-puce-6z3d451k5e.vercel.app
- Vercel project: `portfolio` (`prj_sE2lPiop6nOu0PBrU8CsrRHXXkH4`). The custom domain (`kabirkhan.app`, not yet registered) is planned for M6.

## Design
Theme **"Coastal"**: the Game Night concepts (teal band, lamp light, playing-card hand, chess details) in Kabir's palette, professional first, comforting and aesthetic.
- **Palette:** #006D77 deep teal · #83C5BE sea glass · #EDF6F9 ice · #FFDDD2 peach · #E29578 salmon, plus ink #0B2A2E for text. Salmon and sea glass are **fills/accents only, never text** (salmon on ice is 2.2:1). Text on salmon or sea glass is ink. Dark mode uses deep teal-ink backgrounds with ice text and a sea-glass accent. Check every new color pair with a contrast script.
- **Color flow:** `src/components/ScrollTone.tsx` blends the page background (`--page-bg`) from ice → peach → sea glass as sections tagged `data-tone` scroll in, and reverses on scroll up. Only the background blends: every tone is light (or every tone is dark), so ink text stays readable mid-blend. Reduced motion: each section paints its own tone.
- Every page opens on a deep teal band with slow peach/salmon "lamp" light that fades into the page background.
- **Headshot:** `HeadshotCard` is a small playing card (9.5rem, 3:4) at the top right of the hero, linking to About. On hover/focus it wobbles, a salmon frame draws in, and a name/role tag slides up. It **never enlarges**. The photo path is `profile.headshot` in `src/content/links.ts`; while it's empty, a "KK" monogram shows.
- Fonts (self-hosted in `public/fonts/`): Big Shoulders Display for the name, section titles and card titles only; Figtree for everything else.
- Projects are a **hand of playing cards** (`src/components/hand/`), modeled on Eduard Bodak's "Service Cards" (eduardbodak.com, Dribbble shot 25366538). Cards are in category colors (Games teal, Experiments salmon, Algorithms sea glass), with the title and a pixel icon at the top, mirrored at the bottom. A stacked deck fans out when the section scrolls into view (about 950 ms, `cubic-bezier(.5,.6,0,1)`); hover/focus pulls a card up; phones get a column; a face-down "Next project" card comes last. Spin, flip and sprite effects from the reference were deliberately skipped.
- Smooth scrolling via Lenis (off when reduced motion is on). Theme toggle cycles system → light → dark; an inline script in `index.html` prevents a flash of the wrong theme.
- **Proposed transitions** (not built yet; ask before adding): View Transitions route crossfade (React Router `viewTransition`), a one-time name reveal on load, card → full-screen stage (M3), a salmon nav underline that draws on hover, parallax pips in the peach strip.
- Design research notes live in Claude's memory (`researched.md`).
Use the `frontend-design` and `ui-ux-pro-max` skills for design work.

## Roadmap
M0 scaffold ✅ → M1 design system + animated project cards ✅ → Coastal palette + scroll color flow + headshot (in progress) → M2 content → M3 card → full-screen stage → M4 first real project (chess) → M5 About animation → M6 polish/deploy domain.

## Prompt template (Kabir is practicing this)
Goal / Context / Constraints / Done when / Teach me
