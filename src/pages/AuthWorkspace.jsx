/**
 * AuthWorkspace.jsx
 * Unified Authentication Workspace — Single-page SaaS-style auth experience.
 * Left navigation panel (3 portals) + Right dynamic content panel (AnimatePresence).
 * Student portal internally toggles between Login and Registration sub-views.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, GraduationCap, UserCheck, ArrowLeft } from 'lucide-react';
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
    headerTitle: 'Admin Authentication',
    headerSub: 'System Administration & Security Console',
  },
  {
    id: 'tpo',
    icon: GraduationCap,
    iconClass: 'tpo',
    title: 'TPO Portal',
    desc: 'Training & Placement Officer',
    headerTitle: 'TPO Officer Authentication',
    headerSub: 'Training & Placement Office Management Console',
  },
  {
    id: 'student',
    icon: UserCheck,
    iconClass: 'student',
    title: 'Student Portal',
    desc: 'Student Login & Registration',
    headerTitle: 'Student Career Portal',
    headerSub: 'Sign in to access placement drives & applications',
  },
];

// Student sub-view header overrides
const STUDENT_REGISTER_HEADER = {
  headerTitle: 'Student Registration',
  headerSub: 'Create your candidate profile for campus recruitment',
};

// ── Animation Variants ────────────────────────────────────────────────────
const contentVariants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
};

// ── Main Component ────────────────────────────────────────────────────────
export default function AuthWorkspace() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Determine initial portal from URL or location state
  const initialPortal = useMemo(() => {
    const fromState = location.state?.portal;
    const fromParam = searchParams.get('portal');
    const portal = fromState || fromParam || 'student';
    return ['admin', 'tpo', 'student'].includes(portal) ? portal : 'student';
  }, []);

  const initialStudentView = useMemo(() => {
    const fromState = location.state?.view;
    const fromParam = searchParams.get('view');
    return (fromState || fromParam) === 'register' ? 'register' : 'login';
  }, []);

  const [activePortal, setActivePortal] = useState(initialPortal);
  const [studentView, setStudentView] = useState(initialStudentView);

  useEffect(() => {
    const portal = PORTALS.find(p => p.id === activePortal);
    const isRegister = activePortal === 'student' && studentView === 'register';
    const title = isRegister
      ? STUDENT_REGISTER_HEADER.headerTitle
      : portal?.headerTitle || 'Authentication';
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

  // Determine current header text
  const currentPortal = PORTALS.find(p => p.id === activePortal);
  const isStudentRegister = activePortal === 'student' && studentView === 'register';
  const headerTitle = isStudentRegister ? STUDENT_REGISTER_HEADER.headerTitle : currentPortal.headerTitle;
  const headerSub = isStudentRegister ? STUDENT_REGISTER_HEADER.headerSub : currentPortal.headerSub;

  // AnimatePresence key: includes studentView for student portal
  const contentKey = activePortal === 'student' ? `student-${studentView}` : activePortal;

  return (
    <div className="auth-workspace" id="auth-workspace-page">
      {/* ══ LEFT NAVIGATION PANEL ════════════════════════════════════════ */}
      <nav className="auth-workspace-nav" aria-label="Authentication portal selection">
        {/* Header: Logo + Institution */}
        <div className="auth-workspace-nav-header">
          <div className="auth-workspace-nav-header-logo">
            <LNJPITLogo size={34} />
            <div className="auth-workspace-nav-header-logo-text">
              <span className="institution-name">{APP_CONFIG.collegeShortName}</span>
              <span className="system-name">Placement Management System</span>
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
          <Link to="/" className="auth-workspace-nav-footer-back">
            <ArrowLeft size={14} />
            <span>Back to Overview</span>
          </Link>
          <p className="auth-workspace-nav-footer-copy">
            &copy; 2026 {APP_CONFIG.collegeShortName} &bull; {APP_CONFIG.appVersion}
          </p>
        </div>
      </nav>

      {/* ══ RIGHT CONTENT PANEL ══════════════════════════════════════════ */}
      <main className="auth-workspace-content" role="main">
        {/* Dynamic Header */}
        <div className="auth-workspace-content-header">
          <AnimatePresence mode="wait">
            <motion.div
              key={contentKey + '-header'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="auth-workspace-content-header-title">{headerTitle}</h1>
              <p className="auth-workspace-content-header-sub">{headerSub}</p>
            </motion.div>
          </AnimatePresence>
        </div>

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
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
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
