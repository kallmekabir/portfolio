import { Suspense } from 'react';
import { Link, useParams } from 'react-router';
import { findProject } from '../projects/registry';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug } = useParams(); // reads :slug from the URL /projects/:slug
  const project = findProject(slug);

  if (!project) return <NotFound />;

  return (
    <article>
      <p><Link to="/">← All projects</Link></p>
      <h1>{project.title}</h1>
      <p>{project.summary}</p>
      {/* Suspense shows the fallback while the project's JS downloads */}
      <Suspense fallback={<p>Loading project…</p>}>
        <project.Component />
      </Suspense>
    </article>
  );
}
