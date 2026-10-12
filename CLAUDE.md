# Kabir's Portfolio

Personal portfolio whose centerpiece is **interactive, playable projects**, plus resume, LinkedIn, and an About page (hobbies, interests, travel). Long-term project built over months.

## Working with Kabir (most important)
- Kabir is **learning**: strong in Java (through DSA), knows HTML/CSS/JS basics, new to React/TS.
- Explain the *why* of new concepts briefly, and relate them to Java when it helps.
- Ask at the start of a task which mode Kabir wants: **Explain-first**, **You drive** (hints + review), or **Pair** (leave `TODO(you)` sections).
- Keep it simple: no new dependencies or features without asking.
- After each milestone, offer a short quiz and remind Kabir to update `LEARNING.md`.

## Stack
React 19 + TypeScript + Vite · React Router (`react-router`) · Motion (`motion/react`) · plain CSS + CSS Modules · Vercel hosting.
Java projects → WebAssembly via TeaVM (CheerpJ for unmodified Swing apps), in `java/`.

## Conventions
- All colors, sizes, and timings come from `src/styles/tokens.css` (`var(--…)`). Never hard-code them in components.
- Personal content lives in `src/content/` as data, not inside page components.
- Projects: one folder per project in `src/projects/<slug>/` (default-export component) plus one entry in `src/projects/registry.ts`. Always lazy-load: `Component: lazy(() => import(...))`.
- Animate only `transform` and `opacity`; respect `prefers-reduced-motion`.
- Page structure: every page starts with a full-width `<Band>` (green header area) holding its `<h1>`, then its content inside `<div className="container">`.
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
Theme **"Evergreen" (Game Night, professional first)**: felt green + brass, light and dark. A portfolio first, so the layout is clean and recruiter-friendly; the game feel comes through color, game-box project cards and motion.
- Every page opens on a deep green band with slow drifting "lamp" light that fades into the page background.
- Fonts (self-hosted in `public/fonts/`): Big Shoulders Display for the name, section titles and card titles only; Figtree for everything else.
- Project cards are game boxes with a colored lid in the category's color. As you scroll they're "dealt onto the table" (alternating ±5–6° tilt, flat in the middle of the screen, reverses when scrolling up). On hover/focus the lid lifts with a spring overshoot.
- Theme toggle in the nav cycles system → light → dark and remembers the choice. An inline script in `index.html` prevents a flash of the wrong theme.
- Kabir wants the light theme to feel more flowing. Revisit the palette later (other schemes were prototyped: Harbor, Aubergine, Walnut).
Use the `frontend-design` and `ui-ux-pro-max` skills for design work.

## Roadmap
M0 scaffold ✅ → M1 design system + animated project cards (in progress) → M2 content → M3 card → full-screen stage → M4 first real project (Java→Wasm) → M5 About animation → M6 polish/deploy domain.

## Prompt template (Kabir is practicing this)
Goal / Context / Constraints / Done when / Teach me
