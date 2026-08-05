/**
 * App.jsx
 * Root application component.
 * Handles:
 *  - Theme management (dark/light via useTheme hook)
 *  - React Router v6 route definitions
 *  - Persistent Navbar + Footer layout on home route
 *  - Unified Authentication Workspace (/auth)
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ── Page imports ─────────────────────────────────────────
import Home            from './pages/Home';
import AuthWorkspace   from './pages/AuthWorkspace';
import PlaceholderPage from './pages/PlaceholderPage';

// ─── Layout wrapper: Shows Navbar + Footer only on Home ───
function AppLayout({ isDark, onToggleTheme }) {
  const location = useLocation();
  const isHome   = location.pathname === '/';

  return (
    <>
      {isHome && <Navbar isDark={isDark} onToggleTheme={onToggleTheme} />}
      <Routes>
        <Route path="/"                  element={<Home />} />
        <Route path="/auth"              element={<AuthWorkspace />} />

        {/* Legacy auth routes → redirect to unified workspace */}
        <Route path="/login/admin"       element={<Navigate to="/auth?portal=admin" replace />} />
        <Route path="/login/tpo"         element={<Navigate to="/auth?portal=tpo" replace />} />
        <Route path="/login/student"     element={<Navigate to="/auth?portal=student" replace />} />
        <Route path="/register/student"  element={<Navigate to="/auth?portal=student&view=register" replace />} />

        <Route path="/privacy"           element={<PlaceholderPage />} />
        <Route path="/terms"             element={<PlaceholderPage />} />
        {/* 404 Catch-all */}
        <Route path="*"                  element={<PlaceholderPage />} />
      </Routes>
      {isHome && <Footer />}
    </>
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
