import { Link } from 'react-router';
import Band from '../components/Band';
import styles from './NotFound.module.css';

// Shown for any unknown URL, and by ProjectPage for an unknown project slug.
export default function NotFound() {
  return (
    <article>
      <Band labelledBy="not-found-heading">
        <h1 id="not-found-heading">Page not found</h1>
      </Band>
      <div className="container">
        <p className={styles.message}>
          That square is empty. The page you were looking for doesn't exist, or it has moved.
        </p>
        {/* <Link> swaps the page inside the app without a full reload */}
        <Link className={styles.button} to="/">
          Back to the homepage
        </Link>
      </div>
    </article>
  );
}
