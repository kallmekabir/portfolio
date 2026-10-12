import { Link } from 'react-router';
import { profile } from '../content/links';
import { projects } from '../projects/registry';

// M3 replaces this plain list with category cards that expand into a
// full-screen stage. For now it just proves the registry drives the page.
export default function Home() {
  return (
    <>
      <section>
        <h1>Hi, I'm {profile.name.split(' ')[0]}.</h1>
        <p>{profile.tagline}</p>
      </section>

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              <Link to={`/projects/${p.slug}`}>{p.title}</Link>: {p.summary}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
