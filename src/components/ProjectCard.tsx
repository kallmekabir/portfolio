import { useRef } from 'react';
import { Link } from 'react-router';
import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import type { Project } from '../projects/registry';
import { dealSpring } from '../styles/motion';
import styles from './ProjectCard.module.css';

type ProjectCardProps = {
  project: Project;
  index: number; // position on the page: even cards tilt one way, odd cards the other
};

// Scroll progress for one card: 0 = its top just appeared at the bottom of the
// screen, 1 = its bottom just left the top. Between 0.38 and 0.62 nothing
// changes, so the card is flat while you're actually reading it.
const STOPS = [0, 0.38, 0.62, 1];

// A game-box card that gets "dealt onto the table" as you scroll.
// Two animations, kept on separate elements so they never fight over `transform`:
// - the scroll "deal" (JS, Motion) moves the outer .deal wrapper
// - the hover "lid lift" (plain CSS, see the .module.css) moves the inner .box
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // useScroll reports how far this card has traveled through the viewport.
  // We measure the outer slot, which never moves, not the card we rotate:
  // measuring a moving element would feed its own motion back into the math.
  const { scrollYProgress } = useScroll({ target: slotRef, offset: ['start end', 'end start'] });

  const side = index % 2 === 0 ? -1 : 1; // alternate left / right
  const angle = index % 2 === 0 ? 6 : 5; // slightly uneven angles look hand-dealt, not mechanical

  // useTransform maps one range onto another, like a lookup table with blending:
  // progress 0 → tilted, 0.38..0.62 → straight, 1 → tilted a little the other way.
  // useSpring then chases that value with some physics, instead of copying it every frame.
  const rotate = useSpring(useTransform(scrollYProgress, STOPS, [side * angle, 0, 0, -side * angle * 0.5]), dealSpring);
  const x = useSpring(useTransform(scrollYProgress, STOPS, [side * 18, 0, 0, -side * 8]), dealSpring);
  const y = useSpring(useTransform(scrollYProgress, STOPS, [36, 0, 0, -14]), dealSpring);

  const isLive = project.status === 'live';

  return (
    <div ref={slotRef} className={styles.slot} data-category={project.category.toLowerCase()}>
      {/* m.div is a <div> that takes motion values in `style` and updates the DOM
          directly, without re-rendering React on every scroll frame. */}
      <m.div className={styles.deal} style={reduceMotion ? undefined : { rotate, x, y }}>
        <Link to={`/projects/${project.slug}`} className={styles.card}>
          <div className={styles.box}>
            <div className={styles.lid}>
              <span>{project.meta}</span>
              <span>{project.tech}</span>
            </div>
            <div className={styles.body}>
              <h4 className={styles.title}>{project.title}</h4>
              <p className={styles.summary}>{project.summary}</p>
              <span className={isLive ? styles.chip : styles.chipSoon}>
                {isLive ? (project.cta ?? 'Open') : 'Coming soon'}
              </span>
            </div>
          </div>
        </Link>
      </m.div>
    </div>
  );
}
