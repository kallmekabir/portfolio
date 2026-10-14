import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { transform, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';

// Blends the page background between section colors as you scroll.
//
// Every page starts on ice. Any element with data-tone="ice" | "peach" | "sea"
// marks where a new color begins: as its top edge rises from 90% to 50% down the
// screen, the page background crossfades from the previous color into its own.
// Scrolling back up plays it in reverse, because the color is computed from the
// scroll position, not triggered once.
//
// Only the background changes. Every tone is light (or every tone is dark, in
// dark mode), so the ink text on top stays readable through the whole blend.
// The result lands in the CSS variable --page-bg, which body paints (global.css).
// Renders nothing itself.

type Ranges = { input: number[]; output: string[] };

const BLEND_START = 0.9; // the boundary is 90% down the screen when the blend begins...
const BLEND_END = 0.5; // ...and halfway up when it's complete

export default function ScrollTone() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll(); // the window's scroll position, as a motion value
  // Like a Java field: survives re-renders without causing one when it changes.
  const ranges = useRef<Ranges | null>(null);

  // Writes the color for one scroll position. transform() is the same mapping
  // useTransform uses: [scroll positions] → [colors], blending in between.
  const paint = (y: number) => {
    const r = ranges.current;
    if (!r) return;
    const color = r.output.length === 1 ? r.output[0] : transform(y, r.input, r.output);
    document.documentElement.style.setProperty('--page-bg', color);
  };

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (!reduceMotion) paint(y);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (reduceMotion) {
      // No blending: each section paints its own tone instead (global.css).
      root.style.removeProperty('--page-bg');
      ranges.current = null;
      return;
    }

    // Works out where each blend starts and ends, in scroll pixels.
    const measure = () => {
      const styles = getComputedStyle(root);
      const vh = window.innerHeight;
      const maxScroll = Math.max(0, root.scrollHeight - vh);
      const sections = [...document.querySelectorAll<HTMLElement>('[data-tone]')];

      // Start on ice (where the band's fade lands); each toned section then adds one
      // blend: hold the previous color, then crossfade into its own.
      const input: number[] = [0];
      const output: string[] = [styles.getPropertyValue('--tone-ice').trim()];
      for (const el of sections) {
        const color = styles.getPropertyValue(`--tone-${el.dataset.tone}`).trim();
        if (!color || color === output[output.length - 1]) continue; // same color: nothing to blend
        const top = el.getBoundingClientRect().top + window.scrollY; // position on the page
        // Clamp so a section near the bottom (like the footer) still reaches its full
        // color at the very end of the page, and keep the list strictly increasing.
        const last = input[input.length - 1];
        const end = Math.max(last + 2, Math.min(top - vh * BLEND_END, maxScroll));
        const start = Math.max(last + 1, Math.min(top - vh * BLEND_START, end - 1));
        input.push(start, end);
        output.push(output[output.length - 1], color);
      }

      ranges.current = output[0] ? { input, output } : null;
      paint(window.scrollY);
    };

    measure();
    // Re-measure whenever something could move the sections or change the colors:
    // the page resizing (fonts, images, window), and the theme switching.
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    const theme = new MutationObserver(measure);
    theme.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', measure);

    return () => {
      resize.disconnect();
      theme.disconnect();
      scheme.removeEventListener('change', measure);
    };
    // pathname: a new page has different sections, so measure again.
    // (paint only reads the ref, so it doesn't need to be a dependency.)
  }, [pathname, reduceMotion]);

  return null;
}
