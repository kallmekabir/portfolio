import { Link } from 'react-router';
import Band from '../components/Band';
import HeadshotCard from '../components/HeadshotCard';
import ProjectHand from '../components/hand/ProjectHand';
import { profile } from '../content/links';
import { projects } from '../projects/registry';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <Band size="tall" labelledBy="hero-name">
        <div className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 id="hero-name" className={styles.name}>{profile.name}</h1>
            <p className={styles.role}>{profile.tagline}</p>
            <p className={styles.bio}>{profile.bio}</p>
            <div className={styles.ctas}>
              <a className={styles.primary} href="#projects">View projects</a>
              <Link className={styles.secondary} to="/resume">Resume</Link>
              {/* links.ts uses '' for "not added yet". An empty string is falsy, so
                  `&&` stops there and React renders nothing instead of a dead link. */}
              {profile.linkedin && (
                <a className={styles.quiet} href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              )}
            </div>
            {/* "Now building": one quiet line with the tiny chess board */}
            <p className={styles.now}>
              <span className={styles.miniBoard} aria-hidden="true" />
              <span>
                <strong>Now building:</strong> {profile.nowBuilding}
              </span>
            </p>
          </div>
          {/* Top-right on wide screens, above the name on phones (see Home.module.css) */}
          <div className={styles.headshot}>
            <HeadshotCard />
          </div>
        </div>
      </Band>

      {/* data-tone: where each background color begins as you scroll (components/ScrollTone) */}
      <section
        id="projects"
        className={`container ${styles.projects}`}
        aria-labelledby="projects-heading"
        data-tone="ice"
      >
        <h2 id="projects-heading" className={styles.projectsHeading}>Projects</h2>
        <p className={styles.projectsIntro}>
          Pick a card, any card. Each one opens a project you can play or try out in your browser.
        </p>
        {/* The wrapper only centers the hand and gives it room; the hand sizes itself. */}
        <div className={styles.handArea}>
          <ProjectHand projects={projects} />
        </div>
      </section>

      <section className={`container ${styles.aboutStrip}`} aria-labelledby="about-strip-heading" data-tone="peach">
        <h2 id="about-strip-heading" className={styles.aboutHeading}>Off the keyboard</h2>
        <p className={styles.aboutText}>
          Hobbies, travel and the things that keep me curious live on the About page.
        </p>
        <Link className={styles.aboutLink} to="/about">More about me</Link>
      </section>
    </>
  );
}
