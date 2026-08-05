/**
 * AuthLeftPanel.jsx
 * Split-screen Left Branding Panel (Desktop >= 992px)
 * Displays LNJPIT Logo, Project Title, Description, and Feature Highlights Checklist.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';
import LNJPITLogo from './LNJPITLogo';
import { APP_CONFIG } from '../config/app.config';

const HIGHLIGHTS = [
  'Secure Role-Based Authentication',
  'Student Candidate Registration',
  'Automated Eligibility Engine',
  'Company Drive Management',
  'Real-time Application Tracking',
  'Institutional Placement Analytics',
];

export default function AuthLeftPanel({ portalTitle = 'Candidate Portal' }) {
  return (
    <aside className="auth-left-panel" aria-label="Branding and system overview">
      <div className="auth-left-bg-grid" />
      <div className="auth-left-glow-orb" />

      {/* Top Header: LNJPIT Logo */}
      <div className="auth-left-header">
        <LNJPITLogo size={42} />
      </div>

      {/* Center Body: Title & Checklist */}
      <div className="auth-left-body">
        <div className="auth-left-badge">
          <Sparkles size={14} /> Capstone Engineering Platform
        </div>

        <h1 className="auth-left-title">
          Placement Management System
        </h1>

        <p className="auth-left-subtitle">
          A centralized digital platform designed to automate campus recruitment, streamline student applications, simplify recruiter management, and provide intelligent placement analytics.
        </p>

        {/* Feature Highlights Checklist */}
        <ul className="auth-feature-list" role="list">
          {HIGHLIGHTS.map((item, idx) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="auth-feature-item"
            >
              <div className="auth-feature-icon-box">
                <Check size={14} strokeWidth={3} />
              </div>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Footer info */}
      <div className="auth-left-footer">
        <p>&copy; 2026 {APP_CONFIG.collegeName} • {APP_CONFIG.appVersion}</p>
      </div>
    </aside>
  );
}
