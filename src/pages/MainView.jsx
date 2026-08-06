/**
 * MainView.jsx
 * Root view wrapper: manages Home ↔ AuthWorkspace transition.
 * Both views live on the "/" route — no page navigation.
 * Home slides left → Auth slides in from right.
 * Auth slides right → Home slides back from left.
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import AuthWorkspace from './AuthWorkspace';

// ── Slide Transition Variants ────────────────────────────────────────────
const slideVariants = {
  home: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit:    { x: '-100%', opacity: 0 },
  },
  auth: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit:    { x: '100%', opacity: 0 },
  },
};

const slideTransition = {
  type: 'tween',
  ease: [0.4, 0, 0.2, 1],
  duration: 0.5,
};

export default function MainView({ isDark, onToggleTheme }) {
  const [view, setView]             = useState('home'); // 'home' | 'auth'
  const [initialPortal, setPortal]  = useState('student');
  const [initialView, setInitialView] = useState('login');

  const handleOpenAuth = useCallback((portal = 'student', subView = 'login') => {
    setPortal(portal);
    setInitialView(subView);
    window.scrollTo({ top: 0 });
    setView('auth');
  }, []);

  const handleCloseAuth = useCallback(() => {
    setView('home');
  }, []);

  return (
    <div style={{ overflow: 'hidden', position: 'relative', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home-view"
            variants={slideVariants.home}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={slideTransition}
            style={{ minHeight: '100vh' }}
          >
            <Navbar />
            <Home onOpenAuth={handleOpenAuth} />
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="auth-view"
            variants={slideVariants.auth}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={slideTransition}
            style={{ minHeight: '100vh' }}
          >
            <AuthWorkspace
              initialPortal={initialPortal}
              initialStudentView={initialView}
              onClose={handleCloseAuth}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
