import { lazy, type ComponentType } from 'react';

// The single list of every project on the site. The homepage cards and the
// /projects/:slug routes are both generated from this array, so adding a
// project = new folder in src/projects/ + one entry here.
export type Project = {
  slug: string; // used in the URL: /projects/<slug>
  title: string;
  category: string; // homepage group. 'Games', 'Algorithms' and 'Experiments' have colors (global.css)
  summary: string;
  status: 'live' | 'soon'; // 'soon' shows a "Coming soon" card that can't be played yet
  meta?: string; // left side of the card's colored lid, e.g. "1 player vs. engine"
  tech?: string; // right side of the lid, e.g. "Java, WebAssembly"
  cta?: string; // the card's button text; defaults to "Open"
  // lazy(() => import(...)) tells Vite to split this project into its own
  // JS file. Visitors only download it when they actually open the project.
  // The `?` makes it optional: a "soon" project has nothing to load yet.
  Component?: ComponentType;
};

export const projects: Project[] = [
  {
    slug: 'chess',
    title: 'Chess',
    category: 'Games',
    summary: "A full game against a chess engine I'm writing in Java, compiled to WebAssembly so it runs in your browser.",
    status: 'soon',
    meta: '1 player vs. engine',
    tech: 'Java, WebAssembly',
  },
  {
    slug: 'demo',
    title: 'Demo Project',
    category: 'Experiments',
    summary: 'A placeholder that proves lazy-loaded projects work.',
    status: 'live',
    meta: 'Tech demo',
    tech: 'React',
    Component: lazy(() => import('./demo')),
  },
];

export function findProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug);
}

// TODO(you): group the projects by their `category`, keeping the order in which
// each category first appears. Example: [Chess (Games), Demo (Experiments), Snake (Games)]
// becomes Map { 'Games' → [Chess, Snake], 'Experiments' → [Demo] }.
// A Map works like Java's HashMap, except it remembers insertion order (like a
// LinkedHashMap). Useful methods: map.get(key), map.set(key, value), map.has(key).
// For now it returns a single group, so the homepage still renders.
export function groupByCategory(list: Project[]): Map<string, Project[]> {
  return new Map([['All projects', list]]);
}
