import { useId } from 'react';
import PixelIcon from './PixelIcon';
import face from './face.module.css';
import styles from './CardBack.module.css';

// The face-down last card in the hand: a teaser for the next project.
// It's a picture with a label (role="img"), not a link: there's nothing to open yet.
export default function CardBack() {
  // An SVG <pattern> is referenced by id. useId gives every CardBack its own
  // unique id, so two backs on one page could never point at each other's pattern.
  const patternId = useId();

  return (
    <div className={`${face.face} ${styles.back}`} role="img" aria-label="Next project, coming soon">
      <div className={styles.frame}>
        {/* The tiled brass pixels. The 8x8 tile holds two 2x2 "pixels" on a
            diagonal, which repeats into a fine diamond lattice. */}
        <svg className={styles.pattern} fill="currentColor" aria-hidden="true" focusable="false">
          <defs>
            <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse">
              <rect x="1" y="1" width="2" height="2" />
              <rect x="5" y="5" width="2" height="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>

        <span className={styles.emblem}>
          <PixelIcon name="question" size={56} />
        </span>
      </div>
    </div>
  );
}
