import { Link } from 'react-router';
import Band from '../components/Band';
import ProjectCard from '../components/ProjectCard';
import { profile } from '../content/links';
import { groupByCategory, projects } from '../projects/registry';
import styles from './Home.module.css';

export default function Home() {
  // [...map] turns a Map into an array of [key, value] pairs we can .map() over in JSX
  const groups = [...groupByCategory(projects)];
  let cardIndex = 0; // counts cards across all groups, so tilt directions keep alternating

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
              <a className={styles.quiet} href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <aside className={styles.now} aria-labelledby="now-heading">
            <div className={styles.miniBoard} aria-hidden="true" />
            <div>
              <h2 id="now-heading" className={styles.nowHeading}>Now building</h2>
              <p className={styles.nowText}>{profile.nowBuilding}</p>
            </div>
          </aside>
        </div>
      </Band>

      <section id="projects" className={`container ${styles.projects}`} aria-labelledby="projects-heading">
        <h2 id="projects-heading" className={styles.projectsHeading}>Projects</h2>
        {groups.map(([category, items]) => (
          <div key={category} className={styles.group} data-category={category.toLowerCase()}>
            <h3 className={styles.groupHeading}>{category}</h3>
            <div className={styles.grid}>
              {items.map((project) => (
                <ProjectCard key={project.slug} project={project} index={cardIndex++} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
