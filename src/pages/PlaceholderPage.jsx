/**
 * PlaceholderPage.jsx
 * Generic placeholder for pages not yet built (Privacy, Terms, etc.)
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '').replace(/-/g, ' ')
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Page';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--gradient-hero)',
        padding: '2rem',
        textAlign: 'center',
        gap: '1rem',
      }}
      id="placeholder-page"
    >
      <div style={{ fontSize: '3.5rem' }}>🚧</div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-text)' }}>
        {pageName}
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: 400, lineHeight: 1.7 }}>
        This page is currently under construction and will be available in a future module.
        Thank you for your patience!
      </p>
      <Link
        to="/"
        id="placeholder-go-home-btn"
        style={{
          marginTop: '1rem',
          padding: '0.75rem 2rem',
          background: 'var(--gradient-primary)',
          color: '#fff',
          borderRadius: 'var(--radius-full)',
          fontWeight: 600,
          fontSize: '0.875rem',
          boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
          transition: 'all 0.25s ease',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}
