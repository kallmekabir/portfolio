import { lazy, type ComponentType } from 'react';

// The single list of every project on the site. The homepage cards and the
// /projects/:slug routes are both generated from this array, so adding a
// project = new folder in src/projects/ + one entry here.
export type Project = {
  slug: string; // used in the URL: /projects/<slug>
  title: string;
  category: string;
  summary: string;
  // lazy(() => import(...)) tells Vite to split this project into its own
  // JS file. Visitors only download it when they actually open the project.
  Component: ComponentType;
};

export const projects: Project[] = [
  {
    slug: 'demo',
    title: 'Demo Project',
    category: 'Experiments',
    summary: 'A placeholder that proves lazy-loaded projects work.',
    Component: lazy(() => import('./demo')),
  },
];

export function findProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug);
}
