import { Suspense } from 'react';
import { Link, useParams } from 'react-router';
import Band from '../components/Band';
import { findProject } from '../projects/registry';
import NotFound from './NotFound';

// M3 turns this into the full-screen "stage" that a card expands into.
// TODO(you): style the content below the band with a CSS Module.
export default function ProjectPage() {
  const { slug } = useParams(); // reads :slug from the URL /projects/:slug
  const project = findProject(slug);

  if (!project) return <NotFound />;

  // Pull Component into a local variable so TypeScript can check it's defined
  // before we render it (it's optional for "coming soon" projects).
  const { Component } = project;

  return (
    <article>
      <Band labelledBy="project-heading">
        <p><Link to="/">← All projects</Link></p>
        <h1 id="project-heading">{project.title}</h1>
        <p>{project.summary}</p>
      </Band>
      <div className="container">
        {Component ? (
          // Suspense shows the fallback while the project's JS downloads
          <Suspense fallback={<p>Loading project…</p>}>
            <Component />
          </Suspense>
        ) : (
          <p>Coming soon. This one is still being built.</p>
        )}
      </div>
    </article>
  );
}
