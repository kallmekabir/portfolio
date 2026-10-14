import { NavLink, Outlet, ScrollRestoration } from 'react-router';
import { LazyMotion, useReducedMotion } from 'motion/react';
import type { LenisOptions } from 'lenis';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { profile } from '../content/links';
import ScrollTone from './ScrollTone';
import ThemeToggle from './ThemeToggle';
import styles from './Layout.module.css';

// Motion's lightweight `m.div` components only know how to update the screen
// once these features have loaded. `strict` makes Motion throw an error if anyone
// uses the heavier `motion.div` by mistake, which would undo the savings.
const loadMotionFeatures = () => import('../lib/motionFeatures').then((mod) => mod.default);

// Lenis = smooth scrolling. Normally each mouse-wheel tick moves the page in one
// jump. Lenis catches those ticks and eases the page toward the new position over
// a few frames instead, so scrolling feels like a glide. It still moves the page's
// real scrollbar, so keyboard scrolling, Find, and react-router's
// <ScrollRestoration /> keep working as usual.
// Declared once out here (like a Java `static final`) so it isn't rebuilt on every render.
const lenisOptions: LenisOptions = {
  lerp: 0.1, // each frame, cover 10% of the distance that's left: lower = floatier, higher = snappier
  anchors: true, // in-page links like "View projects" (href="#projects") glide to their target too
  autoRaf: true, // Lenis runs its own requestAnimationFrame loop (one update per screen refresh)
  // Clicking a link to another page cancels any glide still in progress. Without this,
  // the leftover glide could drag the new page away from the top that
  // <ScrollRestoration /> just scrolled it to.
  stopInertiaOnNavigate: true,
};

// Computed once when the site loads, so the footer never shows a stale year.
const year = new Date().getFullYear();

// The frame shared by every page. <Outlet /> is where the current
// route's page renders, a bit like an abstract method subclasses fill in.
export default function Layout() {
  // true when the visitor has asked their OS for less motion
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.shell}>
      {/* Smooth scrolling is motion too, so people who ask for less motion get the
          browser's normal scrolling instead. `root` attaches Lenis to the whole window
          (rather than to one scrollable box), and it renders nothing visible. */}
      {!reduceMotion && <ReactLenis root options={lenisOptions} />}

      <a className={styles.skip} href="#main">
        Skip to content
      </a>

      {/* Full-width header in band teal. The inner .container keeps its
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

      {/* data-tone: the page background blends to sea glass as the footer arrives (ScrollTone) */}
      <footer className={styles.footer} data-tone="sea">
        <div className={`container ${styles.footerInner}`}>
          <p className={styles.copyright}>© {year} {profile.name}</p>
          {/* An empty string in links.ts means "not available", and '' is falsy,
              so `value && <li>…</li>` simply renders nothing for it. */}
          <ul className={styles.footerLinks}>
            {profile.linkedin && (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </li>
            )}
            {profile.github && (
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
              </li>
            )}
            {profile.email && (
              <li>
                <a href={`mailto:${profile.email}`}>Email</a>
              </li>
            )}
          </ul>
        </div>
      </footer>
      <ScrollRestoration />
      <ScrollTone />
    </div>
  );
}
