/**
 * Home.jsx
 * Landing page — the entry point of the PMS application.
 *
 * Sections:
 *  1. Hero (headline + 3 login cards + stats)
 *  2. About System (4-card grid)
 *  3. About Developer (profile card)
 *  4. Footer (via component)
 */

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_CONFIG, SITE_TITLE } from '../config/app.config';
import '../styles/Home.css';

// ─── Data ──────────────────────────────────────────────────────────────────

const LOGIN_CARDS = [
  {
    id: 'admin',
    icon: '🛡️',
    title: 'Admin Login',
    desc: 'Manage the entire system, users, and placement data.',
    btnLabel: 'Login as Admin',
    route: '/login/admin',
    variant: 'admin',
  },
  {
    id: 'tpo',
    icon: '🎓',
    title: 'TPO Login',
    desc: 'Coordinate placements, companies, and student drives.',
    btnLabel: 'Login as TPO',
    route: '/login/tpo',
    variant: 'tpo',
  },
  {
    id: 'student',
    icon: '📚',
    title: 'Student Login',
    desc: 'View drives, apply for placements, and track status.',
    btnLabel: 'Login as Student',
    route: '/login/student',
    variant: 'student',
    hasRegister: true,
    registerRoute: '/register/student',
  },
];

const ABOUT_CARDS = [
  {
    icon: '🏫',
    title: 'What is PMS?',
    text: `The ${APP_CONFIG.appName} is a centralised digital platform that streamlines 
           all campus placement activities — from student registration and company 
           onboarding to offer letter management.`,
  },
  {
    icon: '⚙️',
    title: 'What Does It Do?',
    text: `PMS automates the end-to-end placement workflow: managing job drives, 
           eligibility checks, scheduling interviews, tracking application statuses, 
           and generating placement reports for the institution.`,
  },
  {
    icon: '🎯',
    title: 'How It Helps Students',
    text: `Students get a single portal to discover job drives, check eligibility, 
           submit applications, and receive real-time updates on their placement 
           status — eliminating paperwork and confusion.`,
  },
  {
    icon: '🏢',
    title: 'How It Helps TPO',
    text: `The Training & Placement Office gains powerful tools to manage recruiters, 
           schedule campus events, filter eligible students, and produce insightful 
           placement analytics with just a few clicks.`,
  },
];

const STATS = [
  { value: '500+', label: 'Students Placed' },
  { value: '80+',  label: 'Companies Visited' },
  { value: '95%',  label: 'Placement Rate' },
  { value: '24/7', label: 'System Available' },
];

// ─── LoginCard sub-component ────────────────────────────────────────────────

function LoginCard({ card, onLogin, onRegister }) {
  return (
    <div
      className={`login-card ${card.variant}`}
      id={`login-card-${card.id}`}
      role="article"
      aria-label={card.title}
    >
      <div className={`login-card-icon`} aria-hidden="true">
        {card.icon}
      </div>
      <h3 className="login-card-title">{card.title}</h3>
      <p className="login-card-desc">{card.desc}</p>
      <button
        id={`${card.id}-login-btn`}
        className={`btn login-card-btn`}
        onClick={() => onLogin(card.route)}
        aria-label={card.btnLabel}
      >
        {card.btnLabel}
      </button>
      {card.hasRegister && (
        <button
          id="student-register-btn"
          style={{
            marginTop: '0.75rem',
            width: '100%',
            background: 'transparent',
            border: '1.5px solid rgba(16,185,129,0.4)',
            color: 'var(--color-success)',
            borderRadius: 'var(--radius-full)',
            padding: '0.6rem',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition-base)',
            fontFamily: 'var(--font-primary)',
          }}
          onClick={() => onRegister(card.registerRoute)}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(16,185,129,0.12)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
          }}
          aria-label="Register as Student"
        >
          ✨ New Student? Register
        </button>
      )}
    </div>
  );
}

// ─── DeveloperCard sub-component ────────────────────────────────────────────

function DeveloperCard() {
  const dev = APP_CONFIG.developer;

  return (
    <div className="developer-card" role="article" aria-label="About the Developer">
      {/* Photo Column */}
      <div className="developer-photo-col">
        {dev.photoUrl ? (
          <img
            src={dev.photoUrl}
            alt={`${dev.name} — Developer`}
            className="developer-avatar"
          />
        ) : (
          <div className="developer-avatar-placeholder" aria-hidden="true">
            👨‍💻
          </div>
        )}
        <div className="developer-social-links" aria-label="Developer social links">
          <a
            href={dev.github}
            target="_blank"
            rel="noopener noreferrer"
            className="developer-social-btn"
            title="GitHub Profile"
            aria-label="GitHub"
          >🐙</a>
          <a
            href={dev.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="developer-social-btn"
            title="LinkedIn Profile"
            aria-label="LinkedIn"
          >💼</a>
          <a
            href={`mailto:${dev.email}`}
            className="developer-social-btn"
            title="Send Email"
            aria-label="Email"
          >✉️</a>
        </div>
      </div>

      {/* Info Column */}
      <div className="developer-info-col">
        <h3 className="developer-name">{dev.name}</h3>
        <p className="developer-title">{dev.title}</p>

        <div className="developer-meta">
          <span className="developer-meta-item">🏛️ {dev.college}</span>
          <span className="developer-meta-item">🎓 {dev.branch}</span>
          <span className="developer-meta-item">📅 Batch {dev.batch}</span>
        </div>

        <blockquote className="developer-bio">
          "{dev.bio.trim()}"
        </blockquote>

        <p className="developer-skills-label">Tech Stack &amp; Skills</p>
        <div className="developer-skills" role="list" aria-label="Developer skills">
          {dev.skills.map(skill => (
            <span key={skill} className="skill-tag" role="listitem">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Home Component ─────────────────────────────────────────────────────

export default function Home() {
  const navigate = useNavigate();
  const heroRef  = useRef(null);

  // Intersection Observer for staggered entrance animations
  useEffect(() => {
    const sections = document.querySelectorAll('.animate-on-scroll');
    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLogin   = (route) => navigate(route);
  const handleRegister = (route) => navigate(route);

  return (
    <main id="main-content" role="main">

      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <section id="hero" className="hero" ref={heroRef} aria-label="Hero section">
        <div className="container hero-content">

          <div className="hero-badge" role="status">
            <span className="hero-badge-dot" aria-hidden="true" />
            System Online &amp; Active
          </div>

          <h1 className="hero-heading">
            <span className="hero-heading-gradient">{APP_CONFIG.collegeName}</span>
            <br />
            {APP_CONFIG.appName}
          </h1>

          <p className="hero-subheading">
            {APP_CONFIG.appTagline}
          </p>

          {/* Login Cards */}
          <div
            className="hero-login-grid"
            role="region"
            aria-label="Login options"
          >
            {LOGIN_CARDS.map(card => (
              <LoginCard
                key={card.id}
                card={card}
                onLogin={handleLogin}
                onRegister={handleRegister}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="hero-stats" role="region" aria-label="Placement statistics">
            {STATS.map(stat => (
              <div key={stat.label} className="hero-stat">
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT SYSTEM ════════════════════════════════════════════════════ */}
      <section
        id="about-system"
        className="about-system section"
        aria-label="About the Placement Management System"
      >
        <div className="container">
          <h2 className="section-title animate-on-scroll">About the System</h2>
          <p className="section-subtitle animate-on-scroll">
            Everything you need to know about the {APP_CONFIG.appName} — 
            built to simplify and modernise campus placements.
          </p>

          <div className="about-grid">
            {ABOUT_CARDS.map((card, i) => (
              <div
                key={card.title}
                className="about-card animate-on-scroll"
                id={`about-card-${i + 1}`}
                role="article"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="about-card-icon" aria-hidden="true">{card.icon}</div>
                <h3 className="about-card-title">{card.title}</h3>
                <p className="about-card-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT DEVELOPER ══════════════════════════════════════════════════ */}
      <section
        id="about-developer"
        className="about-developer section"
        aria-label="About the Developer"
      >
        <div className="container">
          <h2 className="section-title animate-on-scroll">About the Developer</h2>
          <p className="section-subtitle animate-on-scroll">
            The mind behind the {APP_CONFIG.appShortName} — passionate about technology 
            and building products that matter.
          </p>
          <div className="animate-on-scroll">
            <DeveloperCard />
          </div>
        </div>
      </section>

    </main>
  );
}
