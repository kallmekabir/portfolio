import { Link } from 'react-router';
import type { Project } from '../../projects/registry';

// STUB (replaced by the "hand" work): the props interface below is final,
// so Home.tsx can already render <ProjectHand projects={projects} />.
export default function ProjectHand({ projects }: { projects: Project[] }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.slug}>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </li>
      ))}
    </ul>
  );
}
