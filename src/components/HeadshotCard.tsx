import { useState } from 'react';
import { Link } from 'react-router';
import { m, useReducedMotion, type Variants } from 'motion/react';
import { profile } from '../content/links';
import PixelIcon from './hand/PixelIcon';
import styles from './HeadshotCard.module.css';

// The small headshot in the hero's top-right corner, styled like a playing card
// (it belongs to the same deck as the project hand). It never grows. On hover or
// keyboard focus, three things play together:
//   1. the card wobbles like it's being picked up (rotate -3° → 2° → 0, lift 6px)
//   2. a salmon frame draws itself around the edge
//   3. a slim name tag slides up from the bottom edge
// The card links to the About page, which also gives it a real reason to be focusable.

const DRAW_EASE = [0.5, 0.6, 0, 1] as const; // same easing as the card deal: quick start, soft landing

export default function HeadshotCard() {
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;
  // With reduced motion, the frame and tag simply appear: no wobble, no travel.
  const instant = reduceMotion ? { duration: 0 } : undefined;

  // Variants are named poses. The parent switches between 'rest' and 'hover' and
  // every child with matching variant names follows automatically, so all three
  // effects stay in sync without separate state.
  const card: Variants = {
    rest: { rotate: 0, y: 0, transition: instant ?? { type: 'spring', stiffness: 320, damping: 22 } },
    hover: reduceMotion
      ? { rotate: 0, y: 0 }
      : {
          rotate: [0, -3, 2, 0], // keyframes: a quick wobble that settles straight
          y: -6,
          transition: {
            rotate: { duration: 0.6, ease: 'easeInOut' },
            y: { type: 'spring', stiffness: 320, damping: 22 },
          },
        },
  };
  // pathLength 0 → 1 "draws" the stroke: Motion turns it into a dash that grows.
  const frame: Variants = {
    rest: { pathLength: 0, opacity: 0, transition: instant ?? { duration: 0.25 } },
    hover: { pathLength: 1, opacity: 1, transition: instant ?? { duration: 0.6, ease: DRAW_EASE } },
  };
  const tag: Variants = {
    rest: { y: '100%', transition: instant ?? { duration: 0.2 } },
    hover: { y: '0%', transition: instant ?? { duration: 0.4, delay: 0.15, ease: DRAW_EASE } },
  };

  return (
    <Link
      to="/about"
      className={styles.link}
      aria-label={`About ${profile.name}, ${profile.role}`}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <m.div className={styles.card} initial={false} animate={active ? 'hover' : 'rest'} variants={card}>
        <div className={styles.photo}>
          {profile.headshot ? (
            // width/height reserve the space before the image loads (no layout jump);
            // fetchPriority tells the browser this image matters for the first view.
            <img src={profile.headshot} alt="" width={300} height={400} loading="eager" fetchPriority="high" decoding="async" />
          ) : (
            <span className={styles.monogram} aria-hidden="true">KK</span>
          )}
        </div>

        {/* Playing-card corner pips: top-left, and the same one upside down bottom-right */}
        <span className={`${styles.pip} ${styles.pipTop}`} aria-hidden="true">
          <PixelIcon name="knight" size={10} />
        </span>
        <span className={`${styles.pip} ${styles.pipBottom}`} aria-hidden="true">
          <PixelIcon name="knight" size={10} />
        </span>

        {/* The frame. The viewBox has the card's own 3:4 shape, so the corners stay round;
            the rect is inset by half the stroke so no part of the line gets clipped. */}
        <svg className={styles.frame} viewBox="0 0 75 100" aria-hidden="true">
          <m.rect x="1.5" y="1.5" width="72" height="97" rx="8" vectorEffect="non-scaling-stroke" variants={frame} />
        </svg>

        {/* The tag lives in a clipping box, so sliding up never makes the card bigger */}
        <div className={styles.tagClip} aria-hidden="true">
          <m.div className={styles.tag} variants={tag}>
            <span className={styles.tagName}>{profile.name}</span>
            <span className={styles.tagRole}>{profile.role}</span>
          </m.div>
        </div>
      </m.div>
    </Link>
  );
}
