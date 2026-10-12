import { NavLink, Outlet, ScrollRestoration } from 'react-router';
import { profile } from '../content/links';
import styles from './Layout.module.css';

// The frame shared by every page. <Outlet /> is where the current
// route's page renders, a bit like an abstract method subclasses fill in.
export default function Layout() {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <header className={styles.header}>
        <NavLink to="/" className={styles.brand}>
          {profile.name}
        </NavLink>
        <nav aria-label="Main">
          <ul className={styles.nav}>
            <li><NavLink to="/" end>Projects</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/resume">Resume</NavLink></li>
          </ul>
        </nav>
      </header>

      <main id="main" className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
      </footer>
      <ScrollRestoration />
    </div>
  );
}
