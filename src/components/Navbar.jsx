/**
 * Navbar.jsx
 * Enterprise Vercel/Linear-inspired Header Navigation
 * - Active section tracking with smooth animated underline indicator
 * - Single Primary CTA: "Open Authentication Portal →"
 * - Compact LNJPIT Branding
 * - Glassmorphism blur & subtle 1px border
 * - Mobile slide drawer
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { APP_CONFIG, SITE_TITLE } from '../config/app.config';
import LNJPITLogo from './LNJPITLogo';
import '../styles/Navbar.css';

const NAV_LINKS = [
  { id: 'hero',              label: 'Overview',     href: '#hero' },
  { id: 'problem-statement', label: 'Why PMS',      href: '#problem-statement' },
  { id: 'workflow',          label: 'Workflow',     href: '#workflow' },
  { id: 'features',          label: 'Features',     href: '#features' },
  { id: 'architecture',      label: 'Architecture', href: '#architecture' },
  { id: 'recruiters',        label: 'Recruiters',   href: '#recruiters' },
  { id: 'about-developer',   label: 'Developer',    href: '#about-developer' },
];

export default function Navbar({ onOpenAuth }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Handle Navbar Shadow & Active Section Tracking on Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHome) return;

      const sectionEls = NAV_LINKS.map(link => document.querySelector(link.href)).filter(Boolean);
      const scrollPos = window.scrollY + 200;

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const sec = sectionEls[i];
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const handleNavClick = useCallback((href, id) => {
    setMenuOpen(false);
    setActiveSection(id);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        id="main-navbar"
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container navbar-inner">

          {/* LNJPIT Brand & Logo */}
          <Link to="/" className="navbar-logo" aria-label={SITE_TITLE}>
            <LNJPITLogo size={34} />
          </Link>

          {/* Desktop Links with Animated Active Indicator */}
          {isHome && (
            <ul className="navbar-links" role="list">
              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.id} className="navbar-item">
                    <a
                      href={link.href}
                      className={`navbar-link ${isActive ? 'active' : ''}`}
                      onClick={e => { e.preventDefault(); handleNavClick(link.href, link.id); }}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="navbar-active-bar"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Header Right Actions */}
          <div className="navbar-actions">
            <button
              type="button"
              className="navbar-auth-btn"
              id="nav-open-auth-btn"
              onClick={() => onOpenAuth && onOpenAuth('student', 'login')}
            >
              <span>Open Authentication Portal</span>
              <ArrowRight size={15} className="cta-arrow" />
            </button>

            {/* Mobile Drawer Hamburger Button */}
            <button
              id="navbar-hamburger-btn"
              className="navbar-hamburger"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer (Framer Motion) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="navbar-mobile-menu"
            className="navbar-mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="navbar-mobile-links" role="list">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={e => { e.preventDefault(); handleNavClick(link.href, link.id); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="navbar-mobile-actions">
              <button
                type="button"
                className="navbar-auth-btn full-width"
                onClick={() => {
                  setMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('student', 'login');
                }}
                id="mobile-open-auth-btn"
              >
                <span>Open Authentication Portal</span>
                <ArrowRight size={15} className="cta-arrow" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
