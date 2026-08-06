/**
 * AuthWorkspace.jsx
 * Unified Authentication Workspace — Single-page SaaS-style auth experience.
 * Left navigation panel (3 portals) + Right dynamic content panel (AnimatePresence).
 * Student portal internally toggles between Login and Registration sub-views.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, GraduationCap, UserCheck, ArrowLeft, Lock } from 'lucide-react';
import { APP_CONFIG } from '../config/app.config';
import LNJPITLogo from '../components/LNJPITLogo';

// Form Components
import AdminLoginForm from '../components/forms/AdminLoginForm';
import TPOLoginForm from '../components/forms/TPOLoginForm';
import StudentLoginForm from '../components/forms/StudentLoginForm';
import StudentRegisterForm from '../components/forms/StudentRegisterForm';

import '../styles/Auth.css';
import '../styles/AuthWorkspace.css';

// ── Portal Configuration ──────────────────────────────────────────────────
const PORTALS = [
  {
    id: 'admin',
    icon: Shield,
    iconClass: 'admin',
    title: 'Admin Portal',
    desc: 'System Administration & Security',
  },
  {
    id: 'tpo',
    icon: GraduationCap,
    iconClass: 'tpo',
    title: 'TPO Portal',
    desc: 'Training & Placement Officer',
  },
  {
    id: 'student',
    icon: UserCheck,
    iconClass: 'student',
    title: 'Student Portal',
    desc: 'Student Login & Registration',
  },
];

// ── Right Panel Context Titles ────────────────────────────────────────────
const PORTAL_CONTENT = {
  admin: {
    title: 'System Administrator Login',
    subtitle: 'Access the institutional administration console.',
  },
  tpo: {
    title: 'Training & Placement Officer Login',
    subtitle: 'Manage campus recruitment, recruiters, and placement operations.',
  },
  'student-login': {
    title: 'Student Career Portal',
    subtitle: 'Sign in to access placement drives, applications, and career services.',
  },
  'student-register': {
    title: 'Student Registration',
    subtitle: 'Create your placement profile and register for campus recruitment.',
  },
};

// ── Animation Variants ────────────────────────────────────────────────────
const contentVariants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
};

// ── Main Component ────────────────────────────────────────────────────────
export default function AuthWorkspace({ initialPortal: defaultPortal = 'student', initialStudentView: defaultView = 'login', onClose }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Determine initial portal from props, URL or location state
  const initialPortal = useMemo(() => {
    const fromState = location.state?.portal;
    const fromParam = searchParams.get('portal');
    const portal = defaultPortal || fromState || fromParam || 'student';
    return ['admin', 'tpo', 'student'].includes(portal) ? portal : 'student';
  }, [defaultPortal]);

  const initialStudentView = useMemo(() => {
    const fromState = location.state?.view;
    const fromParam = searchParams.get('view');
    return defaultView || (fromState || fromParam) === 'register' ? 'register' : 'login';
  }, [defaultView]);

  const [activePortal, setActivePortal] = useState(initialPortal);
  const [studentView, setStudentView] = useState(initialStudentView);

  useEffect(() => {
    const portal = PORTALS.find(p => p.id === activePortal);
    const title = activePortal === 'student' && studentView === 'register'
      ? 'Student Registration'
      : portal?.title || 'Authentication';
    document.title = `${title} | ${APP_CONFIG.collegeName}`;
  }, [activePortal, studentView]);

  // Switch portal — resets student view back to login
  const handlePortalSwitch = (portalId) => {
    if (portalId === activePortal) return;
    setActivePortal(portalId);
    setStudentView('login');
  };

  // Student sub-view toggles
  const handleSwitchToRegister = () => setStudentView('register');
  const handleSwitchToLogin = () => setStudentView('login');

  // AnimatePresence key: includes studentView for student portal
  const contentKey = activePortal === 'student' ? `student-${studentView}` : activePortal;

  // Derive right-panel content key for PORTAL_CONTENT lookup
  const portalContentKey = activePortal === 'student'
    ? `student-${studentView}`
    : activePortal;
  const { title: pageTitle, subtitle: pageSubtitle } = PORTAL_CONTENT[portalContentKey] || {};

  return (
    <div className="auth-workspace" id="auth-workspace-page">
      {/* ══ LEFT NAVIGATION PANEL ════════════════════════════════════════ */}
      <nav className="auth-workspace-nav" aria-label="Authentication portal selection">
        {/* Header: Brand block — logo → college name → system name */}
        <div className="auth-workspace-nav-header">
          <div className="auth-workspace-nav-brand">
            <LNJPITLogo size={40} />
            <div className="auth-workspace-nav-brand-text">
              <span className="institution-full-name">Loknayak Jai Prakash Institute of Technology, Chapra</span>
              <span className="institution-system-name">Placement Management System</span>
            </div>
          </div>

          <div className="auth-workspace-nav-section-label">Authentication Portals</div>
        </div>

        {/* Portal Cards */}
        <div className="auth-workspace-nav-list" role="tablist" aria-label="Select authentication portal">
          {PORTALS.map((portal) => {
            const Icon = portal.icon;
            const isActive = activePortal === portal.id;

            return (
              <button
                key={portal.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="auth-workspace-content-body"
                className={`auth-workspace-nav-card ${isActive ? 'active' : ''}`}
                onClick={() => handlePortalSwitch(portal.id)}
                id={`auth-tab-${portal.id}`}
              >
                <div className={`auth-workspace-nav-card-icon ${portal.iconClass}`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div className="auth-workspace-nav-card-text">
                  <span className="auth-workspace-nav-card-title">{portal.title}</span>
                  <span className="auth-workspace-nav-card-desc">{portal.desc}</span>
                </div>
                {isActive && <span className="auth-workspace-nav-card-active-dot" />}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="auth-workspace-nav-footer">
          {onClose ? (
            <button
              type="button"
              className="auth-workspace-nav-footer-back"
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', width: 'auto', padding: 0 }}
            >
              <ArrowLeft size={14} />
              <span>Back to Overview</span>
            </button>
          ) : (
            <Link to="/" className="auth-workspace-nav-footer-back">
              <ArrowLeft size={14} />
              <span>Back to Overview</span>
            </Link>
          )}
          <p className="auth-workspace-nav-footer-copy">
            &copy; 2026 {APP_CONFIG.collegeShortName} &bull; {APP_CONFIG.appVersion}
          </p>
        </div>
      </nav>

      {/* ══ RIGHT CONTENT PANEL ══════════════════════════════════════════ */}
      <main className="auth-workspace-content" role="main">
        {/* Dynamic Form Content */}
        <div className="auth-workspace-content-body" id="auth-workspace-content-body" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={contentKey}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}
            >
              {/* ── Context-sensitive page title ── */}
              {pageTitle && (
                <div className="auth-workspace-page-title" aria-live="polite">
                  <h1>{pageTitle}</h1>
                  {pageSubtitle && <p>{pageSubtitle}</p>}
                </div>
              )}

              {/* ── Authentication form card ── */}
              {activePortal === 'admin' && <AdminLoginForm />}
              {activePortal === 'tpo' && <TPOLoginForm />}
              {activePortal === 'student' && studentView === 'login' && (
                <StudentLoginForm onSwitchToRegister={handleSwitchToRegister} />
              )}
              {activePortal === 'student' && studentView === 'register' && (
                <StudentRegisterForm onSwitchToLogin={handleSwitchToLogin} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
