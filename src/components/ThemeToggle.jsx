/**
 * ThemeToggle.jsx
 * Animated Sun / Moon toggle button for light/dark mode.
 */

import React from 'react';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      id="theme-toggle-btn"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1.1rem',
        transition: 'all var(--transition-base)',
        color: 'var(--color-text-secondary)',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(99,102,241,0.15)';
        e.currentTarget.style.borderColor = 'var(--color-primary)';
        e.currentTarget.style.color = 'var(--color-primary-light)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--color-surface)';
        e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
        e.currentTarget.style.color = 'var(--color-text-secondary)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transition: 'transform 0.4s ease, opacity 0.3s ease',
          transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
