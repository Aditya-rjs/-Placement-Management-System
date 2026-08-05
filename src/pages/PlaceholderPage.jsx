/**
 * PlaceholderPage.jsx
 * Technical Under Construction / Module Coming Soon Page.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import { APP_CONFIG } from '../config/app.config';

export default function PlaceholderPage() {
  const location = useLocation();
  const pageName = location.pathname.replace('/', '').replace(/-/g, ' ')
    .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Module Page';

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
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--color-primary-subtle)',
          border: '1px solid var(--color-border-active)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary-light)',
          marginBottom: '0.5rem',
        }}
      >
        <Construction size={32} />
      </div>

      <span className="mono-badge">{APP_CONFIG.appShortName} • Module In Progress</span>

      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-text)' }}>
        {pageName}
      </h1>

      <p style={{ color: 'var(--color-text-secondary)', maxWidth: 460, fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
        This module is scheduled for implementation in upcoming project iterations.
        The initial Landing Dashboard and Portal Access (Module 1) are active.
      </p>

      <Link
        to="/"
        id="placeholder-go-home-btn"
        className="btn btn-primary btn-sm"
        style={{ marginTop: '1rem' }}
      >
        <ArrowLeft size={16} /> Return to System Overview
      </Link>
    </div>
  );
}
