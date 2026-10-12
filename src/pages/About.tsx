import Band from '../components/Band';

// M2 fills this from src/content/about.ts; M5 adds the signature animation.
// TODO(you): style the sections below the band (spacing, headings) with a CSS Module.
export default function About() {
  return (
    <article>
      <Band labelledBy="about-heading">
        <h1 id="about-heading">About me</h1>
      </Band>
      <div className="container">
        <section aria-labelledby="interests">
          <h2 id="interests">Interests</h2>
          <p>Coming soon.</p>
        </section>
        <section aria-labelledby="hobbies">
          <h2 id="hobbies">Hobbies</h2>
          <p>Coming soon.</p>
        </section>
        <section aria-labelledby="travel">
          <h2 id="travel">Places I've been</h2>
          <p>Coming soon.</p>
        </section>
      </div>
    </article>
  );
}
