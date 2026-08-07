/**
 * App.jsx
 * Root application component.
 * Handles:
 *  - Theme management (dark/light via useTheme hook)
 *  - React Router v6 route definitions
 *  - MainView manages Home ↔ Auth slide transitions at "/"
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

// ── Page imports ─────────────────────────────────────────
import MainView        from './pages/MainView';
import PlaceholderPage from './pages/PlaceholderPage';

import AdminDashboardLayout from './pages/admin/AdminDashboardLayout';

// ─── Layout wrapper ──────────────────────────────────────
function AppLayout({ isDark, onToggleTheme }) {
  return (
    <Routes>
      <Route path="/" element={<MainView isDark={isDark} onToggleTheme={onToggleTheme} />} />

      {/* Admin Dashboard Routes */}
      <Route path="/admin"             element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/*"           element={<AdminDashboardLayout />} />

      {/* Legacy auth routes → redirect to home (auth is now inside MainView) */}
      <Route path="/auth"              element={<Navigate to="/" replace />} />
      <Route path="/login/admin"       element={<Navigate to="/" replace />} />
      <Route path="/login/tpo"         element={<Navigate to="/" replace />} />
      <Route path="/login/student"     element={<Navigate to="/" replace />} />
      <Route path="/register/student"  element={<Navigate to="/" replace />} />

      <Route path="/privacy"           element={<PlaceholderPage />} />
      <Route path="/terms"             element={<PlaceholderPage />} />
      {/* 404 Catch-all */}
      <Route path="*"                  element={<PlaceholderPage />} />
    </Routes>
  );
}

// ─── Loading Fallback ─────────────────────────────────────
function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        color: 'var(--color-text-muted)',
        fontSize: '1rem',
        fontFamily: 'var(--font-primary)',
      }}
    >
      Loading...
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────
export default function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <AppLayout isDark={isDark} onToggleTheme={toggleTheme} />
      </Suspense>
    </BrowserRouter>
  );
}
