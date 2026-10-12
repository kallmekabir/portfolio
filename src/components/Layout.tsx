import { NavLink, Outlet, ScrollRestoration } from 'react-router';
import { LazyMotion } from 'motion/react';
import { profile } from '../content/links';
import ThemeToggle from './ThemeToggle';
import styles from './Layout.module.css';

// Motion's lightweight `m.div` components only know how to update the screen
// once these features have loaded. `strict` makes Motion throw an error if anyone
// uses the heavier `motion.div` by mistake, which would undo the savings.
const loadMotionFeatures = () => import('../lib/motionFeatures').then((mod) => mod.default);

// The frame shared by every page. <Outlet /> is where the current
// route's page renders, a bit like an abstract method subclasses fill in.
export default function Layout() {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>

      {/* Full-width header in band green. The inner .container keeps its
          content lined up with the page content below. */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <NavLink to="/" className={styles.brand}>
            <span className={styles.mark} aria-hidden="true" />
            {profile.name}
          </NavLink>
          <div className={styles.actions}>
            <nav aria-label="Main">
              <ul className={styles.nav}>
                <li><NavLink to="/" end>Projects</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/resume">Resume</NavLink></li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* No width limit here: each page starts with a full-width <Band>,
          then uses .container for its own content. */}
      <main id="main" className={styles.main}>
        <LazyMotion features={loadMotionFeatures} strict>
          <Outlet />
        </LazyMotion>
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
        </div>
      </footer>
      <ScrollRestoration />
    </div>
  );
}
