import { Link } from 'react-router';
import type { Project } from '../../projects/registry';
import PixelIcon from './PixelIcon';
import face from './face.module.css';
import styles from './PlayingCard.module.css';

// The title + icon pair in a card's corner. A real playing card shows its
// corner twice: top-left, and again upside down at the bottom-right.
function Corner({ project, mirrored = false }: { project: Project; mirrored?: boolean }) {
  return (
    <div
      className={mirrored ? `${styles.corner} ${styles.mirrored}` : styles.corner}
      // The bottom copy is pure decoration: hide it from screen readers so they
      // don't read the title twice. It also uses a <span>, not a second <h3>.
      aria-hidden={mirrored || undefined}
    >
      {mirrored ? (
        <span className={styles.title}>{project.title}</span>
      ) : (
        <h3 className={styles.title}>{project.title}</h3>
      )}
      <PixelIcon name={project.icon} size={20} className={styles.icon} />
    </div>
  );
}

// The face of one project's card. The whole card is a single link, so it's one
// big click target and one Tab stop.
export default function PlayingCard({ project }: { project: Project }) {
  const isLive = project.status === 'live';

  return (
    // Two classes: the shared card shape + this front's look.
    // data-category sets --cat (global.css), which colors the card.
    <Link
      to={`/projects/${project.slug}`}
      className={`${face.face} ${styles.card}`}
      data-category={project.category.toLowerCase()}
    >
      <Corner project={project} />

      <div className={styles.middle}>
        {project.tech && <p className={styles.tech}>{project.tech}</p>}
        <p className={styles.summary}>{project.summary}</p>
        <span className={isLive ? styles.chip : styles.chipSoon}>
          {isLive ? (project.cta ?? 'Open') : 'Coming soon'}
        </span>
      </div>

      <Corner project={project} mirrored />
    </Link>
  );
}
