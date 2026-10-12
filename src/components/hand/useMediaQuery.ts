import { useEffect, useState } from 'react';

// True while a CSS media query matches, e.g. useMediaQuery('(min-width: 640px)').
// It works like a listener in Java Swing: subscribe when the component appears,
// unsubscribe when it goes away.
export default function useMediaQuery(query: string): boolean {
  // Passing a function to useState makes React call it only on the first
  // render. So the very first render already knows the real answer, and the
  // page never flashes the wrong layout.
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update(); // in case `query` changed since the first render
    list.addEventListener('change', update);
    // Cleanup: React runs this on unmount (or before re-subscribing), so no listener leaks.
    return () => list.removeEventListener('change', update);
  }, [query]);

  return matches;
}
