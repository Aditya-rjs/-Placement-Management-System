/**
 * Home.jsx
 * Landing page for the Placement Management System.
 * Styled as an authentic University Enterprise Application built by a Final-Year CS Student.
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  GraduationCap,
  UserCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Code2,
  Terminal,
  Mail,
  FileCheck2,
  BarChart3,
  Cpu,
  Database
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { APP_CONFIG, SITE_TITLE } from '../config/app.config';
import '../styles/Home.css';

// ─── Data Configurations ───────────────────────────────────────────────────

const LOGIN_PORTALS = [
  {
    id: 'admin',
    icon: Shield,
    title: 'Admin Control Center',
    subtitle: 'System Administrators',
    desc: 'Complete control over system parameters, user roles, security audits, and database maintenance.',
    features: ['User Role Management', 'Global System Config', 'Audit Logs & Backup'],
    btnLabel: 'Access Admin Portal',
    route: '/login/admin',
    variant: 'admin',
  },
  {
    id: 'tpo',
    icon: GraduationCap,
    title: 'TPO Representative Portal',
    subtitle: 'Training & Placement Office',
    desc: 'Manage corporate partners, post job drives, run eligibility filters, and track placement statistics.',
    features: ['Drive Scheduling', 'Automated Shortlisting', 'Placement Analytics'],
    btnLabel: 'Access TPO Portal',
    route: '/login/tpo',
    variant: 'tpo',
  },
  {
    id: 'student',
    icon: UserCheck,
    title: 'Student Career Portal',
    subtitle: 'Enrolled Undergraduates',
    desc: 'Browse eligible campus drives, apply with one click, upload resumes, and monitor application status.',
    features: ['Active Drive Application', 'Resume & Profile Vault', 'Real-time Status Feed'],
    btnLabel: 'Access Student Portal',
    route: '/login/student',
    variant: 'student',
    hasRegister: true,
    registerRoute: '/register/student',
  },
];

const SYSTEM_HIGHLIGHTS = [
  {
    icon: Cpu,
    title: 'Automated Eligibility Engine',
    desc: 'Instantly filters eligible candidates based on CPI thresholds, active backlog constraints, branch criteria, and graduation batch.',
  },
  {
    icon: FileCheck2,
    title: 'Real-time Application Tracker',
    desc: 'Live tracking of recruitment stages: Written Tests, Technical Interviews, HR rounds, and Final Offer Letter distribution.',
  },
  {
    icon: Database,
    title: 'Centralized Candidate Vault',
    desc: 'Secure repository for student academic transcripts, verified resumes, certifications, and identity documentation.',
  },
  {
    icon: BarChart3,
    title: 'TPO Analytics & Reporting',
    desc: 'Exportable placement reports, branch-wise placement percentages, salary distribution charts, and company visit history.',
  },
];

// ─── Sub-Components ────────────────────────────────────────────────────────

function PortalCard({ portal, onLogin, onRegister }) {
  const IconComponent = portal.icon;

  return (
    <div className={`portal-card ${portal.variant}`} id={`portal-card-${portal.id}`}>
      <div className="portal-card-header">
        <div className="portal-card-icon-wrapper">
          <IconComponent size={24} strokeWidth={2} />
        </div>
        <div>
          <span className="portal-card-subtitle">{portal.subtitle}</span>
          <h3 className="portal-card-title">{portal.title}</h3>
        </div>
      </div>

      <p className="portal-card-desc">{portal.desc}</p>

      <ul className="portal-card-features">
        {portal.features.map(feat => (
          <li key={feat}>
            <CheckCircle2 size={15} className="feature-check-icon" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <div className="portal-card-actions">
        <button
          id={`${portal.id}-login-btn`}
          className="btn btn-primary portal-btn"
          onClick={() => onLogin(portal.route)}
        >
          <span>{portal.btnLabel}</span>
          <ArrowRight size={16} />
        </button>

        {portal.hasRegister && (
          <button
            id="student-register-btn"
            className="btn btn-outline portal-btn-secondary"
            onClick={() => onRegister(portal.registerRoute)}
          >
            <span>New Student? Register Account</span>
          </button>
        )}
      </div>
    </div>
  );
}

function DeveloperCard() {
  const dev = APP_CONFIG.developer;

  return (
    <div className="developer-card" id="developer-card">
      <div className="developer-header">
        <div className="developer-avatar-wrapper">
          {dev.photoUrl ? (
            <img src={dev.photoUrl} alt={dev.name} className="developer-avatar" />
          ) : (
            <div className="developer-avatar-fallback">
              <Terminal size={36} strokeWidth={1.8} />
            </div>
          )}
          <span className="developer-status-dot" title="Available for engineering opportunities" />
        </div>

        <div className="developer-title-group">
          <div className="developer-badge">
            <Code2 size={14} /> Capstone Engineering Project
          </div>
          <h3 className="developer-name">{dev.name}</h3>
          <p className="developer-role">{dev.title}</p>
          <p className="developer-institution">
            {dev.college} • <span className="mono-badge">Reg: {dev.regNo}</span>
          </p>
        </div>

        <div className="developer-links">
          {dev.github && (
            <a href={dev.github} target="_blank" rel="noopener noreferrer" className="dev-social-link" title="GitHub Repository">
              <GithubIcon size={18} />
            </a>
          )}
          {dev.linkedin && (
            <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="dev-social-link" title="LinkedIn Profile">
              <LinkedinIcon size={18} />
            </a>
          )}
          {dev.email && (
            <a href={`mailto:${dev.email}`} className="dev-social-link" title="Contact Email">
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>

      <div className="developer-body">
        <p className="developer-bio">{dev.bio}</p>

        <div className="developer-skills-section">
          <span className="developer-skills-title">Technical Skills &amp; Stack</span>
          <div className="developer-skills-grid">
            {dev.skills.map(skill => (
              <span key={skill} className="skill-chip">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = SITE_TITLE;
  }, []);

  const handleLogin = (route) => navigate(route);
  const handleRegister = (route) => navigate(route);

  return (
    <main id="main-content" className="home-page" role="main">

      {/* ══ HERO SECTION ════════════════════════════════════════════════════ */}
      <section id="hero" className="hero-section">
        <div className="container">
          <div className="hero-content">

            {/* Official Badge */}
            <div className="hero-official-badge">
              <span className="badge-pulse" />
              <span>OFFICIAL PORTAL • ACADEMIC SESSION 2024-25</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-institution-name">{APP_CONFIG.collegeName}</span>
              <br />
              Placement Management System
            </h1>

            <p className="hero-description">
              {APP_CONFIG.appTagline}
            </p>

            {/* Key Metrics Strip */}
            <div className="hero-metrics-strip">
              {APP_CONFIG.stats.map(stat => (
                <div key={stat.label} className="metric-box">
                  <span className="metric-value">{stat.value}</span>
                  <span className="metric-label">{stat.label}</span>
                  <span className="metric-highlight">{stat.highlight}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ PORTALS SELECTION SECTION ═══════════════════════════════════════ */}
      <section id="login-portals" className="section portals-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Role-Based Access</span>
            <h2 className="section-title">Select Authentication Portal</h2>
            <p className="section-subtitle">
              Choose your authorized user category to log into the Placement Management System.
            </p>
          </div>

          <div className="portals-grid">
            {LOGIN_PORTALS.map(portal => (
              <PortalCard
                key={portal.id}
                portal={portal}
                onLogin={handleLogin}
                onRegister={handleRegister}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ TOP RECRUITERS SHOWCASE ═════════════════════════════════════════ */}
      <section id="recruiters" className="section recruiters-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Corporate Connections</span>
            <h2 className="section-title">Top Recruiting Partners</h2>
            <p className="section-subtitle">
              Leading multinational corporations and technology innovators hiring from our campus.
            </p>
          </div>

          <div className="recruiters-grid">
            {APP_CONFIG.recruiters.map(recruiter => (
              <div key={recruiter.name} className="recruiter-card">
                <div className="recruiter-icon">
                  <Building2 size={20} />
                </div>
                <div className="recruiter-info">
                  <h4 className="recruiter-name">{recruiter.name}</h4>
                  <span className="recruiter-cat">{recruiter.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SYSTEM ARCHITECTURE & WORKFLOW ══════════════════════════════════ */}
      <section id="about-system" className="section system-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">System Capabilities</span>
            <h2 className="section-title">Engineering Highlights &amp; Workflow</h2>
            <p className="section-subtitle">
              Built to eliminate manual paperwork, enforce eligibility compliance, and streamline hiring drives.
            </p>
          </div>

          <div className="highlights-grid">
            {SYSTEM_HIGHLIGHTS.map(item => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="highlight-card">
                  <div className="highlight-icon">
                    <IconComp size={24} strokeWidth={2} />
                  </div>
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ ABOUT DEVELOPER ══════════════════════════════════════════════════ */}
      <section id="about-developer" className="section developer-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Capstone Engineering Project</span>
            <h2 className="section-title">About the Developer</h2>
            <p className="section-subtitle">
              Designed and engineered as a final-year B.Tech Computer Science capstone application.
            </p>
          </div>

          <DeveloperCard />
        </div>
      </section>

    </main>
  );
}
