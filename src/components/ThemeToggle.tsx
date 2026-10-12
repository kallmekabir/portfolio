import { useEffect, useState } from 'react';
import { applyTheme, nextTheme, readSavedTheme, type Theme } from '../lib/theme';
import styles from './ThemeToggle.module.css';

const LABELS: Record<Theme, string> = { system: 'System', light: 'Light', dark: 'Dark' };

// The nav button that cycles the color theme.
export default function ThemeToggle() {
  // Passing a function (not a value) to useState means it only runs on the first
  // render, so we read localStorage once instead of on every re-render.
  const [theme, setTheme] = useState<Theme>(readSavedTheme);

  // useEffect runs after React updates the screen. Whenever `theme` changes,
  // push it out to the "outside world": the <html> attribute and localStorage.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const next = nextTheme(theme);

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setTheme(next)}
      // Screen readers hear the current state and what a click will do.
      aria-label={`Theme: ${LABELS[theme]}. Switch to ${LABELS[next]}`}
    >
      <ThemeIcon theme={theme} />
      <span>{LABELS[theme]}</span>
    </button>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === 'light') {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (theme === 'dark') {
    return (
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
    );
  }
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
    </svg>
  );
}
