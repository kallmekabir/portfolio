import { profile } from '../content/links';

// M2 adds the embedded PDF and an HTML summary of experience.
export default function Resume() {
  return (
    <article>
      <h1>Resume</h1>
      <p>
        <a href={profile.resumePdf} download>Download PDF</a> ·{' '}
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </p>
    </article>
  );
}
