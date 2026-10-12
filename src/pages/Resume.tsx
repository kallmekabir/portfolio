import Band from '../components/Band';
import { profile } from '../content/links';
import styles from './Resume.module.css';

// M2 adds the embedded PDF and an HTML summary of experience.
export default function Resume() {
  return (
    <article>
      <Band labelledBy="resume-heading">
        <h1 id="resume-heading">Resume</h1>
      </Band>
      <div className="container">
        <div className={styles.actions}>
          {/* condition ? a : b works like Java's ternary, but can choose between
              two pieces of UI: the real button, or a note until the PDF exists. */}
          {profile.resumePdf ? (
            <a className={styles.primary} href={profile.resumePdf} download>
              Download PDF
            </a>
          ) : (
            <p className={styles.note}>PDF coming soon</p>
          )}
          {profile.linkedin && (
            <a className={styles.secondary} href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
