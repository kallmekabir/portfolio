import Band from '../components/Band';
import styles from './About.module.css';

// M2 fills this from src/content/about.ts; M5 adds the signature animation.
export default function About() {
  return (
    <article>
      <Band labelledBy="about-heading">
        <h1 id="about-heading">About me</h1>
      </Band>
      <div className="container">
        <section className={styles.section} aria-labelledby="interests">
          <h2 id="interests" className={styles.heading}>Interests</h2>
          <div className={styles.body}>
            <p className={styles.placeholder}>Coming soon.</p>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="hobbies">
          <h2 id="hobbies" className={styles.heading}>Hobbies</h2>
          <div className={styles.body}>
            <p className={styles.placeholder}>Coming soon.</p>
          </div>
        </section>
        <section className={styles.section} aria-labelledby="travel">
          <h2 id="travel" className={styles.heading}>Places I've been</h2>
          <div className={styles.body}>
            <p className={styles.placeholder}>Coming soon.</p>
          </div>
        </section>
      </div>
    </article>
  );
}
