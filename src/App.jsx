/**
 * App.jsx
 * Root application component.
 * Handles:
 *  - Theme management (dark/light via useTheme hook)
 *  - React Router v6 route definitions
 *  - Persistent Navbar + Footer layout on home route
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ── Page imports ─────────────────────────────────────────
import Home            from './pages/Home';
import AdminLogin      from './pages/AdminLogin';
import TPOLogin        from './pages/TPOLogin';
import StudentLogin    from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
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
        <Route path="/login/admin"       element={<AdminLogin />} />
        <Route path="/login/tpo"         element={<TPOLogin />} />
        <Route path="/login/student"     element={<StudentLogin />} />
        <Route path="/register/student"  element={<StudentRegister />} />
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
