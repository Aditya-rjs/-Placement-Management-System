/**
 * Footer.jsx
 * Technical Footer Component.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { APP_CONFIG } from '../config/app.config';
import '../styles/Footer.css';

const QUICK_LINKS = [
  { label: 'System Overview',     to: '/' },
  { label: 'Admin Login',         to: '/login/admin' },
  { label: 'TPO Portal',          to: '/login/tpo' },
  { label: 'Student Login',       to: '/login/student' },
  { label: 'Student Registration',to: '/register/student' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',      to: '/privacy' },
  { label: 'Terms of Service',    to: '/terms' },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer id="footer" className="footer" role="contentinfo" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <GraduationCap size={22} strokeWidth={2.2} />
              </div>
              <div>
                <div className="footer-logo-title">{APP_CONFIG.collegeName}</div>
                <div className="footer-logo-sub">{APP_CONFIG.appName}</div>
              </div>
            </div>

            <p className="footer-brand-desc">
              An enterprise campus placement software system designed for automated job drive execution,
              student eligibility filtering, and placement statistics analytics.
            </p>

            <div className="footer-social-bar">
              {APP_CONFIG.developer.github && (
                <a href={APP_CONFIG.developer.github} target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="GitHub">
                  <GithubIcon size={16} />
                </a>
              )}
              {APP_CONFIG.developer.linkedin && (
                <a href={APP_CONFIG.developer.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="LinkedIn">
                  <LinkedinIcon size={16} />
                </a>
              )}
              <a href={`mailto:${APP_CONFIG.contactEmail}`} className="footer-social-btn" title="Email Contact">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Portals &amp; Links</h4>
            <ul className="footer-links" role="list">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / Policy */}
          <div className="footer-col">
            <h4 className="footer-col-title">Compliance &amp; Policy</h4>
            <ul className="footer-links" role="list">
              {LEGAL_LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
              <li>
                <a href="#about-system" onClick={e => {
                  e.preventDefault();
                  document.querySelector('#about-system')?.scrollIntoView({ behavior: 'smooth' });
                }}>System Highlights</a>
              </li>
              <li>
                <a href="#about-developer" onClick={e => {
                  e.preventDefault();
                  document.querySelector('#about-developer')?.scrollIntoView({ behavior: 'smooth' });
                }}>Engineering Team</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-col-title">Placement Cell Contact</h4>
            <div className="footer-contact-block">
              <div className="footer-contact-line">
                <MapPin size={16} className="contact-icon" />
                <span>{APP_CONFIG.collegeLocation}</span>
              </div>
              <div className="footer-contact-line">
                <Mail size={16} className="contact-icon" />
                <a href={`mailto:${APP_CONFIG.contactEmail}`}>{APP_CONFIG.contactEmail}</a>
              </div>
              <div className="footer-contact-line">
                <Phone size={16} className="contact-icon" />
                <a href={`tel:${APP_CONFIG.contactPhone}`}>{APP_CONFIG.contactPhone}</a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} {APP_CONFIG.collegeName}. All rights reserved. • <span className="mono-badge">{APP_CONFIG.appVersion}</span>
          </p>
          <div className="footer-security-tag">
            <ShieldCheck size={14} /> Encrypted Enterprise Campus Portal
          </div>
        </div>
      </div>
    </footer>
  );
}
