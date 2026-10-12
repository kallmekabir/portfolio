import type { SpringOptions } from 'motion/react';

// Spring presets shared by every JS animation, so the whole site moves with
// one "feel". (CSS-only animations use the --duration-* and --ease-* tokens.)
//
// A spring has no fixed duration. Instead:
// - stiffness: how strongly it pulls toward the target (higher = snappier)
// - damping:   how quickly the bouncing dies out (lower = more wobble)
// - mass:      how heavy the thing feels (higher = slower to start and stop)

// A card pulled up out of the hand (hover / focus) and dropped back in: quick,
// with a small lively overshoot (about 8%) that settles at once. Not bouncy.
export const liftSpring: SpringOptions = { stiffness: 320, damping: 20, mass: 0.8 };
