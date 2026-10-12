import { useRef, useState, type ReactNode } from 'react';
import { m, useInView, useReducedMotion, type Transition } from 'motion/react';
import type { Project } from '../../projects/registry';
import { liftSpring } from '../../styles/motion';
import CardBack from './CardBack';
import PlayingCard from './PlayingCard';
import useMediaQuery from './useMediaQuery';
import styles from './ProjectHand.module.css';

// The deal, timed like the reference (Eduard Bodak's "Service Cards").
const DEAL_DURATION = 0.95; // seconds per card
const DEAL_STAGGER = 0.06; // each card starts this much later than the one before
const DEAL_EASE = [0.5, 0.6, 0, 1] as const; // cubic-bezier: quick start, long soft landing

// Fan geometry, per step away from the middle card. x and y are percentages of
// the card's own size: Motion writes them as translateX(55%), and a percentage
// inside translate() means "of this element's width/height". So the fan scales
// with the card and needs no measuring.
const FAN_ROTATE = 12; // degrees
const FAN_X = 55; // % of the card width
const FAN_Y = 6; // % of the card height: outer cards sit a little lower, along the arc
const DECK_ROTATE = 1.5; // degrees: a stacked deck is never perfectly square
const LIFT_Y = -8; // % of the card height (about 28px): how far a pulled card rises
const LIFT_SCALE = 1.03;
const COLUMN_TILT = 2.5; // degrees: phones alternate -2.5 / +2.5

// One pose = where a card is drawn. Every pose sets the same values, so Motion
// always has a matching "from" and "to" for each.
type Pose = { x: string; y: string; rotate: number };

const dealTransition = (index: number): Transition => ({
  type: 'tween',
  duration: DEAL_DURATION,
  ease: DEAL_EASE,
  delay: index * DEAL_STAGGER,
});
// Gathering back into a deck happens off screen, so it's quick and unstaggered.
const gatherTransition: Transition = { type: 'tween', duration: 0.4, ease: DEAL_EASE };
const springTransition: Transition = { type: 'spring', ...liftSpring };
const instant: Transition = { duration: 0 };

// The homepage's hand of playing cards: one card per project, plus a face-down
// "Next project" card at the end. It starts as a stacked deck and deals out
// when it scrolls into view: a fanned hand on wider screens, a column on phones.
//
// Each card moves on two layers, so the two motions never fight:
// - the <li> "slot" holds the card's place in the deck / fan / column (the deal)
// - the <div> inside it pulls the card up out of the hand (hover / focus)
// The slot never moves on hover, so it stays a steady hover area: a card that
// rises out from under the mouse doesn't count as "left", and can't flicker.
export default function ProjectHand({ projects }: { projects: Project[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  // Not `once`: the hand gathers back into a deck after it leaves the screen,
  // and deals again when it comes back.
  const inView = useInView(listRef, { amount: 0.35 });
  const isWide = useMediaQuery('(min-width: 640px)');
  // Just above the phone layout (640-720px), a full fan would touch the screen edges.
  const isRoomy = useMediaQuery('(min-width: 720px)');
  const reduceMotion = useReducedMotion() ?? false; // null until known: treat as "no preference"

  // Which card is pulled out of the hand (null = none).
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // Only let go of a card if it's still the active one. This way, moving the
  // mouse straight from card A to card B can't clear B by accident.
  const release = (index: number) => setActiveIndex((current) => (current === index ? null : current));

  // The cards, in order. The last one isn't from the registry: it's the teaser.
  const cards: { key: string; face: ReactNode }[] = [
    ...projects.map((project) => ({ key: project.slug, face: <PlayingCard project={project} /> })),
    { key: 'next-project', face: <CardBack /> },
  ];
  const count = cards.length;
  const middle = (count - 1) / 2; // 3 cards: 1, so the offsets are -1, 0, +1
  // How far the fan opens (1 = full). Past 3 cards, each step shrinks so the
  // whole hand stays as wide as a 3-card one; on narrow screens it opens less.
  const spread = Math.min(1, 2 / Math.max(count - 1, 1)) * (isRoomy ? 1 : 0.8);

  // Pulling cards is a desktop thing, and only once the hand is on screen.
  const canPull = isWide && inView;

  return (
    <m.ul
      ref={listRef}
      className={`${styles.hand} ${isWide ? styles.fan : styles.column}`}
      // `list-style: none` makes Safari drop the list semantics; this puts them back.
      role="list"
    >
      {cards.map((card, index) => {
        const offset = index - middle; // negative = left of center
        const isActive = canPull && activeIndex === index;

        const deck: Pose = isWide
          ? // Desktop: all in one spot, each card a hair higher than the one below it.
            { x: '0%', y: `${-index}%`, rotate: offset * DECK_ROTATE }
          : // Phones: every card moves up by its own row height (-100% of a row, see
            // the CSS) onto the first card, plus 1% so the edges peek out.
            { x: '0%', y: `${-index * 101}%`, rotate: offset * DECK_ROTATE };

        const rest: Pose = isWide
          ? {
              x: `${offset * FAN_X * spread}%`,
              y: `${Math.abs(offset) * FAN_Y * spread}%`,
              rotate: offset * FAN_ROTATE * spread,
            }
          : { x: '0%', y: '0%', rotate: index % 2 === 0 ? -COLUMN_TILT : COLUMN_TILT };

        // Each layer gets its own explicit target. (A child with its own
        // `animate` no longer follows the parent's variants, so nothing is
        // inherited here: we compute every pose ourselves.)
        let slotTarget: Pose;
        let slotTransition: Transition;
        if (reduceMotion) {
          slotTarget = rest; // final layout right away, no intro
          slotTransition = instant;
        } else if (inView) {
          slotTarget = rest;
          slotTransition = dealTransition(index);
        } else {
          slotTarget = deck;
          slotTransition = gatherTransition;
        }

        // Pulled: rise, grow slightly, and stand up straight. The inner layer
        // turns around the same pivot as the slot, so rotating it back by the
        // fan angle exactly cancels the tilt (net rotation 0), while the fan's
        // x is kept. With reduced motion the card never moves: only the shadow
        // changes.
        const pulled = isActive && !reduceMotion;
        const liftTarget = pulled
          ? { y: `${LIFT_Y}%`, rotate: -rest.rotate, scale: LIFT_SCALE }
          : { y: '0%', rotate: 0, scale: 1 };

        return (
          <m.li
            key={card.key}
            className={styles.slot}
            data-active={isActive} // CSS fades in the deeper shadow (face.module.css)
            // Later cards paint on top; the pulled card goes above them all.
            style={{ zIndex: isActive ? count : index }}
            // false = start at the first `animate` pose instead of animating into it
            initial={false}
            animate={slotTarget}
            transition={slotTransition}
            onPointerEnter={() => setActiveIndex(index)}
            onPointerLeave={() => release(index)}
            // React's onFocus/onBlur bubble up from the link inside the card, so
            // keyboard users pull cards with Tab just like mouse users do.
            onFocus={() => setActiveIndex(index)}
            onBlur={() => release(index)}
          >
            <m.div className={styles.lift} initial={false} animate={liftTarget} transition={springTransition}>
              {card.face}
            </m.div>
          </m.li>
        );
      })}
    </m.ul>
  );
}
