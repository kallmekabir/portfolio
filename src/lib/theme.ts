// Light/dark theme logic, kept separate from the button's UI so it's easy to test.
//
// 'system' means "no choice saved, follow the OS setting". In the DOM that's an
// <html> element with no data-theme attribute; tokens.css handles the rest.

export type Theme = 'system' | 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme'; // must match the inline script in index.html

// The theme a click switches to: 'system' → 'light' → 'dark' → 'system' → ...
// Reads like a Java switch over an enum, with one bonus: TypeScript checks that
// every member of the Theme union has a case (see `default` below).
export function nextTheme(current: Theme): Theme {
  switch (current) {
    case 'system':
      return 'light';
    case 'light':
      return 'dark';
    case 'dark':
      return 'system';
    default: {
      // Every case above returns, so TypeScript narrows `current` to `never` here:
      // no value can reach this line. If a new theme is added to the Theme type
      // without a case, `current` is no longer `never` and this line stops compiling.
      const exhaustiveCheck: never = current;
      return exhaustiveCheck;
    }
  }
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
