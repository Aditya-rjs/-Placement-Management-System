/**
 * Navbar.jsx
 * Fixed top navigation bar with:
 * - College name from config
 * - Smooth scroll nav links
 * - Scroll-shadow effect
 * - Dark/light toggle
 * - Mobile hamburger menu
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, SITE_TITLE } from '../config/app.config';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

const NAV_LINKS = [
  { label: 'Home',      href: '#hero' },
  { label: 'About PMS', href: '#about-system' },
  { label: 'Developer', href: '#about-developer' },
  { label: 'Contact',   href: '#footer' },
];

export default function Navbar({ isDark, onToggleTheme }) {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);

  // Add shadow when page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize
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

  const shortName = APP_CONFIG.collegeShortName;

  return (
    <>
      <nav
        id="main-navbar"
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label={SITE_TITLE}>
            <div className="navbar-logo-icon" aria-hidden="true">
              {shortName.slice(0, 2).toUpperCase()}
            </div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-title">{APP_CONFIG.collegeName}</span>
              <span className="navbar-logo-subtitle">{APP_CONFIG.appName}</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
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

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <Link to="/login/student" className="btn btn-primary btn-sm" id="nav-student-login-btn">
              Student Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="navbar-hamburger-btn"
            className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
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
