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
- Accessibility: semantic HTML, visible focus, alt text, keyboard support (Esc closes overlays).

## Commands
- `npm run dev`: local dev server
- `npm run build`: type-check + production build (must pass before committing)
- `npm run lint`: oxlint
- `npm run preview`: serve the production build locally

## Design
Warm & personal feel. Motion: calm overall, plus one signature moment (project card → full-screen stage) and expressive animation on the About page. Use the `frontend-design` and `ui-ux-pro-max` skills for design work.

## Roadmap
M0 scaffold ✅ → M1 design system → M2 content → M3 project cards + full-screen stage → M4 first real project (Java→Wasm) → M5 About animation → M6 polish/deploy domain.

## Prompt template (Kabir is practicing this)
Goal / Context / Constraints / Done when / Teach me
