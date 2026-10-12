// Light/dark theme logic, kept separate from the button's UI so it's easy to test.
//
// 'system' means "no choice saved, follow the OS setting". In the DOM that's an
// <html> element with no data-theme attribute; tokens.css handles the rest.

export type Theme = 'system' | 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme'; // must match the inline script in index.html

// TODO(you): return the theme that comes after `current`, cycling
//   'system' → 'light' → 'dark' → 'system' → ...
// Any approach works: a switch statement (like Java's), a ternary chain, or an
// array plus the % operator. Right now it returns `current`, so the theme
// button does nothing yet. Replace the line below with your version.
export function nextTheme(current: Theme): Theme {
  return current;
}

export function readSavedTheme(): Theme {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : 'system';
  } catch {
    return 'system'; // storage blocked (e.g. private mode)
  }
}

// Updates <html data-theme> (which switches the CSS tokens) and remembers the choice.
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'system') delete root.dataset.theme;
  else root.dataset.theme = theme;

  try {
    if (theme === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked: the theme still changes, it just won't be remembered.
  }
}
