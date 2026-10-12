import type { ReactNode } from 'react';
import styles from './Band.module.css';

type BandProps = {
  children: ReactNode;
  size?: 'tall' | 'short'; // tall = the homepage hero, short = other pages' titles
  labelledBy?: string; // id of the heading inside, so screen readers can name the section
};

// The deep green "game table" at the top of every page: lamp light drifting
// slowly behind the content, then a soft fade into the page background.
// The header above it uses the same green, so the two read as one surface.
export default function Band({ children, size = 'short', labelledBy }: BandProps) {
  return (
    <section className={`${styles.band} ${styles[size]}`} aria-labelledby={labelledBy}>
      <div className={styles.light} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>{children}</div>
    </section>
  );
}
