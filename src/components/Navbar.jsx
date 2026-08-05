/**
 * Navbar.jsx
 * Professional Header Navigation with:
 * - Enterprise institution branding
 * - Lucide vector icons
 * - Portal portal indicator
 * - Smooth anchor navigation
 * - Responsive mobile drawer
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X, Shield, ChevronRight } from 'lucide-react';
import { APP_CONFIG, SITE_TITLE } from '../config/app.config';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

const NAV_LINKS = [
  { label: 'Overview',   href: '#hero' },
  { label: 'Portals',    href: '#login-portals' },
  { label: 'Workflow',   href: '#about-system' },
  { label: 'Recruiters', href: '#recruiters' },
  { label: 'Developer',  href: '#about-developer' },
];

export default function Navbar({ isDark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = useCallback((href) => {
    setMenuOpen(false);
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
          {/* Institution Logo & Title */}
          <Link to="/" className="navbar-logo" aria-label={SITE_TITLE}>
            <div className="navbar-logo-icon">
              <GraduationCap size={22} strokeWidth={2.2} />
            </div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-title">{APP_CONFIG.collegeName}</span>
              <span className="navbar-logo-subtitle">
                Training &amp; Placement Cell • <span className="version-tag">{APP_CONFIG.appShortName}</span>
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Header Actions */}
          <div className="navbar-actions">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <Link to="/login/student" className="btn btn-primary btn-sm" id="nav-student-login-btn">
              Student Portal <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            id="navbar-hamburger-btn"
            className="navbar-hamburger"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        id="navbar-mobile-menu"
        className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="navbar-mobile-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={e => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-mobile-actions">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <Link
            to="/login/student"
            className="btn btn-primary btn-sm"
            style={{ width: '100%' }}
            onClick={() => setMenuOpen(false)}
            id="mobile-student-login-btn"
          >
            Student Login
          </Link>
        </div>
      </div>
    </>
  );
}
