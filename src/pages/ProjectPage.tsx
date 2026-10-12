import { Suspense } from 'react';
import { Link, useParams } from 'react-router';
import Band from '../components/Band';
import { findProject } from '../projects/registry';
import NotFound from './NotFound';
import styles from './ProjectPage.module.css';

// M3 turns this into the full-screen "stage" that a card expands into.
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
        <div className={styles.intro}>
          <Link className={styles.back} to="/">
            <span className={styles.arrow} aria-hidden="true">←</span>
            All projects
          </Link>
          <h1 id="project-heading">{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
        </div>
      </Band>
      <div className="container">
        {Component ? (
          // The "stage": a framed area the project plays in
          <div className={styles.stage}>
            {/* Suspense shows the fallback while the project's JS downloads */}
            <Suspense fallback={<p className={styles.loading}>Loading project…</p>}>
              <Component />
            </Suspense>
          </div>
        ) : (
          <div className={`${styles.stage} ${styles.empty}`}>
            <span className={styles.board} aria-hidden="true" />
            <p className={styles.soonTitle}>Coming soon.</p>
            <p className={styles.soonText}>This one is still being built.</p>
          </div>
        )}
      </div>
    </article>
  );
}
