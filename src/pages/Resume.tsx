import Band from '../components/Band';
import { profile } from '../content/links';

// M2 adds the embedded PDF and an HTML summary of experience.
// TODO(you): style the content below the band with a CSS Module.
export default function Resume() {
  return (
    <article>
      <Band labelledBy="resume-heading">
        <h1 id="resume-heading">Resume</h1>
      </Band>
      <div className="container">
        <p>
          <a href={profile.resumePdf} download>Download PDF</a> ·{' '}
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </article>
  );
}
