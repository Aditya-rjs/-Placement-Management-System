/**
 * Footer.jsx
 * Enterprise SaaS Vercel-Style Footer
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { APP_CONFIG } from '../config/app.config';
import LNJPITLogo from './LNJPITLogo';
import '../styles/Footer.css';

const QUICK_LINKS = [
  { label: 'System Overview',      to: '/' },
  { label: 'Admin Portal',         to: '/login/admin' },
  { label: 'TPO Portal',           to: '/login/tpo' },
  { label: 'Student Portal',       to: '/login/student' },
  { label: 'Candidate Register',   to: '/register/student' },
];

const RESOURCE_LINKS = [
  { label: 'System Architecture',  href: '#architecture' },
  { label: 'Problem Statement',    href: '#problem-statement' },
  { label: 'Recruitment Workflow', href: '#workflow' },
  { label: 'Key Features',         href: '#features' },
  { label: 'Developer Profile',    href: '#about-developer' },
];

export default function Footer() {
  return (
    <footer id="footer" className="footer" role="contentinfo" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">

          {/* Column 1: About */}
          <div className="footer-brand">
            <LNJPITLogo size={36} />

            <p className="footer-brand-desc">
              Next-generation campus recruitment automation software engineered for Loknayak Jai Prakash Institute of Technology. Streamlining student candidate verification, recruiter management, and placement statistics.
            </p>

            <div className="footer-social-bar">
              {APP_CONFIG.developer.github && (
                <a href={APP_CONFIG.developer.github} target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="GitHub Repository">
                  <GithubIcon size={16} />
                </a>
              )}
              {APP_CONFIG.developer.linkedin && (
                <a href={APP_CONFIG.developer.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-btn" title="LinkedIn Profile">
                  <LinkedinIcon size={16} />
                </a>
              )}
              <a href={`mailto:${APP_CONFIG.developer.email}`} className="footer-social-btn" title="Email Developer">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Authentication Portals</h4>
            <ul className="footer-links" role="list">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h4 className="footer-col-title">System Resources</h4>
            <ul className="footer-links" role="list">
              {RESOURCE_LINKS.map(link => (
                <li key={link.label}>
                  <a href={link.href} onClick={e => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Training &amp; Placement Cell</h4>
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
            Designed &amp; Developed by <strong>Aditya Raj Singh</strong> • &copy; 2026 • Built with React • Vite • Tailwind CSS • Vercel
          </p>
          <div className="footer-security-tag">
            <ShieldCheck size={14} /> Official LNJPIT Capstone Application
          </div>
        </div>
      </div>
    </footer>
  );
}
