/**
 * useTheme.js
 * Custom hook for Dark / Light mode management.
 * Persists preference to localStorage and applies
 * data-theme attribute to <html> element.
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pms-theme';
const DEFAULT_THEME = 'dark';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // localStorage unavailable (private browsing, etc.)
    }
    // Respect OS preference as fallback
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
    return DEFAULT_THEME;
  });

  // Apply theme to <html> whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Silently fail
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const isDark = theme === 'dark';

  return { theme, isDark, toggleTheme };
}
