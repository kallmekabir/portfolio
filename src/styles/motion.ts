import type { SpringOptions } from 'motion/react';

// Spring presets shared by every JS animation, so the whole site moves with
// one "feel". (CSS-only animations use the --duration-* and --ease-* tokens.)
//
// A spring has no fixed duration. Instead:
// - stiffness: how strongly it pulls toward the target (higher = snappier)
// - damping:   how quickly the bouncing dies out (lower = more wobble)
// - mass:      how heavy the thing feels (higher = slower to start and stop)

// Project cards following the scroll position: smooth, with no wobble.
export const dealSpring: SpringOptions = { stiffness: 140, damping: 24, mass: 0.6 };
