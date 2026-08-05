/**
 * Footer.jsx
 * Site-wide footer with quick links, contact info, and legal pages.
 * Uses APP_CONFIG for dynamic college/contact info.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, SITE_TITLE } from '../config/app.config';
import '../styles/Footer.css';

const QUICK_LINKS = [
  { label: 'Home',             to: '/' },
  { label: 'Admin Login',      to: '/login/admin' },
  { label: 'TPO Login',        to: '/login/tpo' },
  { label: 'Student Login',    to: '/login/student' },
  { label: 'Student Register', to: '/register/student' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',   to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer id="footer" className="footer" role="contentinfo" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">

          {/* ── Brand Column ── */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon" aria-hidden="true">
                {APP_CONFIG.collegeShortName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="footer-logo-text">{APP_CONFIG.collegeName}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  {APP_CONFIG.appName}
                </div>
              </div>
            </div>

            <p className="footer-brand-desc">
              A comprehensive placement management platform designed to streamline
              campus recruitment, connecting students with top recruiters through
              the Training &amp; Placement Office.
            </p>

            <div className="footer-social" aria-label="Social media links">
              <a href={APP_CONFIG.developer.github} target="_blank" rel="noopener noreferrer"
                className="footer-social-link" title="GitHub" aria-label="GitHub">
                🐙
              </a>
              <a href={APP_CONFIG.developer.linkedin} target="_blank" rel="noopener noreferrer"
                className="footer-social-link" title="LinkedIn" aria-label="LinkedIn">
                💼
              </a>
              <a href={`mailto:${APP_CONFIG.contactEmail}`}
                className="footer-social-link" title="Email" aria-label="Email">
                ✉️
              </a>
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="footer-col">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links" role="list">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.to}>→ {link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ── */}
          <div className="footer-col">
            <h3 className="footer-col-title">Legal</h3>
            <ul className="footer-links" role="list">
              {LEGAL_LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.to}>→ {link.label}</Link>
                </li>
              ))}
              <li>
                <a href="#about-system" onClick={e => {
                  e.preventDefault();
                  document.querySelector('#about-system')?.scrollIntoView({ behavior: 'smooth' });
                }}>→ About PMS</a>
              </li>
              <li>
                <a href="#about-developer" onClick={e => {
                  e.preventDefault();
                  document.querySelector('#about-developer')?.scrollIntoView({ behavior: 'smooth' });
                }}>→ About Developer</a>
              </li>
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="footer-col">
            <h3 className="footer-col-title">Contact</h3>
            <div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">🏛️</span>
                <span>
                  {APP_CONFIG.collegeName}<br />
                  {APP_CONFIG.collegeLocation}
                </span>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">✉️</span>
                <a href={`mailto:${APP_CONFIG.contactEmail}`}
                  style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary-light)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                >
                  {APP_CONFIG.contactEmail}
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-icon">📞</span>
                <a href={`tel:${APP_CONFIG.contactPhone}`}
                  style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-primary-light)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                >
                  {APP_CONFIG.contactPhone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} <span>{SITE_TITLE}</span>. All rights reserved.
          </p>
          <nav className="footer-legal" aria-label="Legal links">
            {LEGAL_LINKS.map(link => (
              <Link key={link.label} to={link.to}>{link.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
