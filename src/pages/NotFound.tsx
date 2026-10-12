import { Link } from 'react-router';
import Band from '../components/Band';

// TODO(you): style this page with a CSS Module.
export default function NotFound() {
  return (
    <article>
      <Band labelledBy="not-found-heading">
        <h1 id="not-found-heading">Page not found</h1>
      </Band>
      <div className="container">
        <p><Link to="/">Back to the homepage</Link></p>
      </div>
    </article>
  );
}
