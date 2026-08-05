/**
 * Home.jsx
 * Enterprise SaaS Landing Dashboard for Placement Management System
 * University: Loknayak Jai Prakash Institute of Technology (LNJPIT)
 * Developer: Aditya Raj Singh (Final Year B.Tech CSE Student)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  GraduationCap,
  UserCheck,
  Building2,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Code2,
  Terminal,
  ExternalLink,
  Mail,
  FileCheck2,
  BarChart3,
  Cpu,
  Database,
  Layers,
  Server,
  Cloud,
  FileText,
  AlertTriangle,
  Zap,
  Check,
  Send,
  Lock,
  Workflow,
  Globe,
  HardDrive,
  Atom,
  Palette,
  GitBranch
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { APP_CONFIG, SITE_TITLE } from '../config/app.config';
import HeroBackground from '../components/HeroBackground';
import CountUp from '../components/CountUp';
import '../styles/Home.css';

// ─── Data Configurations ───────────────────────────────────────────────────

const LOGIN_PORTALS = [
  {
    id: 'admin',
    badge: 'Administrator',
    icon: Shield,
    title: 'Admin Control Portal',
    subtitle: 'System Administrators & Directors',
    desc: 'Complete control over institutional parameters, global user roles, enterprise security policies, and database backups.',
    features: ['Role-Based Permission Matrix', 'Audit Trail & Compliance Logs', 'System-wide Database Backups'],
    btnLabel: 'Launch Admin Portal',
    portal: 'admin',
    route: '/auth',
    variant: 'admin',
  },
  {
    id: 'tpo',
    badge: 'Placement Cell',
    icon: GraduationCap,
    title: 'TPO Representative Portal',
    subtitle: 'Training & Placement Office',
    desc: 'Manage recruiter relationships, schedule corporate drives, execute automated eligibility filters, and track hiring KPIs.',
    features: ['Campus Drive Scheduling', 'Automated Candidate Shortlisting', 'Real-time Placement Analytics'],
    btnLabel: 'Launch TPO Portal',
    portal: 'tpo',
    route: '/auth',
    variant: 'tpo',
  },
  {
    id: 'student',
    badge: 'Student',
    icon: UserCheck,
    title: 'Student Candidate Portal',
    subtitle: 'Enrolled Undergraduates',
    desc: 'Discover active hiring opportunities, submit applications with verified credentials, and monitor interview schedules live.',
    features: ['One-Click Drive Application', 'Verified Resume Vault', 'Real-Time Application Status'],
    btnLabel: 'Launch Student Portal',
    portal: 'student',
    route: '/auth',
    variant: 'student',
    hasRegister: true,
    registerPortal: 'student',
  },
];

const PROBLEM_POINTS = [
  {
    title: 'Manual Paperwork & Friction',
    desc: 'Legacy paper applications cause immense administrative delays, misaligned candidate records, and lost document copies during hiring season.',
  },
  {
    title: 'Spreadsheet Dependency & Silos',
    desc: 'Managing thousands of student profiles across fragmented Excel sheets leads to version errors, corrupted data, and zero real-time visibility.',
  },
  {
    title: 'Error-Prone Eligibility Checks',
    desc: 'Manually verifying CPI cutoffs, active backlogs, and branch criteria across hundreds of applicants results in human error and invalid shortlists.',
  },
  {
    title: 'Opaque Application Status',
    desc: 'Students remain in the dark about their test results, interview slots, and offer status due to lack of an automated candidate feedback loop.',
  },
  {
    title: 'Uncoordinated Recruiter Operations',
    desc: 'Coordinating venue schedules, candidate lists, and interview slots via phone calls and emails creates chaos for visiting corporate HR teams.',
  },
  {
    title: 'Lack of Placement Analytics',
    desc: 'Training & Placement Officers struggle to generate branch-wise placement percentages, salary metrics, and historical trend reports for accreditation.',
  },
];

const WORKFLOW_STEPS = [
  { step: '01', title: 'Student Registration', desc: 'Candidates register with academic records, transcripts & resume.' },
  { step: '02', title: 'Eligibility Verification', desc: 'System automatically checks CPI, branch, and backlog criteria.' },
  { step: '03', title: 'Application Submission', desc: 'Students apply to matching corporate drives with one click.' },
  { step: '04', title: 'Recruiter Review', desc: 'Corporate HRs receive verified candidate shortlists & resumes.' },
  { step: '05', title: 'Interview Process', desc: 'Live scheduling of written tests, technical & HR interview rounds.' },
  { step: '06', title: 'Offer Letter', desc: 'Digital offer letter issuance & acceptance status tracking.' },
  { step: '07', title: 'Placement Analytics', desc: 'TPO dashboards generate real-time placement & salary reports.' },
];

const WHY_PROJECT_FEATURES = [
  { icon: Cpu, title: 'Automated Eligibility', desc: 'Instant candidate evaluation against company CPI, backlog, and branch criteria.' },
  { icon: UserCheck, title: 'Student Candidate Portal', desc: 'Centralized portal for drive discovery, application submission, and status feeds.' },
  { icon: GraduationCap, title: 'Recruiter Management', desc: 'Streamlined company onboarding, drive scheduling, and shortlist generation.' },
  { icon: FileCheck2, title: 'Verified Resume Vault', desc: 'Secure storage for candidate transcripts, verified resumes, and certificates.' },
  { icon: BarChart3, title: 'Placement Analytics', desc: 'Exportable reports, branch placement rates, and salary distribution graphs.' },
  { icon: Lock, title: 'Role-Based Auth', desc: 'Granular access controls for Administrators, TPO Officers, and Students.' },
  { icon: Layers, title: 'High-Performance APIs', desc: 'RESTful API architecture built for fast responses and low latent throughput.' },
  { icon: Globe, title: 'Responsive Design', desc: 'Flawless UI experience across mobile, tablet, desktop, and large displays.' },
  { icon: Cloud, title: 'Cloud Deployment', desc: 'Configured for high availability deployment on Vercel infrastructure.' },
];

const ARCHITECTURE_DIAGRAM = [
  { step: '1', title: 'Students', icon: Users, desc: 'Candidate Input' },
  { step: '2', title: 'React / Vite Frontend', icon: Atom, desc: 'Client Layer' },
  { step: '3', title: 'REST API Engine', icon: Layers, desc: 'API Protocol' },
  { step: '4', title: 'Node / Express Backend', icon: Server, desc: 'Business Logic' },
  { step: '5', title: 'Database Storage', icon: Database, desc: 'Data Vault' },
  { step: '6', title: 'Admin & TPO Dashboard', icon: Shield, desc: 'Control Layer' },
  { step: '7', title: 'Analytics Engine', icon: BarChart3, desc: 'Insights' },
];

// ─── Sub-Components ────────────────────────────────────────────────────────

// (PortalCard removed — replaced by single AuthPortalCard below)

function ContactFormSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Contact Training &amp; Placement Office</h2>
          <p className="section-subtitle">
            Have questions regarding upcoming campus drives, corporate recruitment partnerships, or candidate verification? Reach out to us directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-info-card">
            <h3 className="contact-info-title">Placement Office Directory</h3>
            <p className="contact-info-desc">
              Loknayak Jai Prakash Institute of Technology<br />
              Training &amp; Placement Cell, Main Academic Block
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <Building2 size={18} className="contact-detail-icon" />
                <div>
                  <span className="detail-label">Campus Address</span>
                  <span className="detail-val">{APP_CONFIG.collegeLocation}</span>
                </div>
              </div>

              <div className="contact-detail-item">
                <Mail size={18} className="contact-detail-icon" />
                <div>
                  <span className="detail-label">Official Email</span>
                  <a href={`mailto:${APP_CONFIG.contactEmail}`} className="detail-val link">{APP_CONFIG.contactEmail}</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <Zap size={18} className="contact-detail-icon" />
                <div>
                  <span className="detail-label">Helpdesk Helpline</span>
                  <span className="detail-val">{APP_CONFIG.contactPhone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="contact-success-toast"
              >
                <CheckCircle2 size={36} color="var(--color-success)" />
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for reaching out. The Training &amp; Placement Cell will respond to your query shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="contact-form">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className={`form-input${errors.name ? ' error' : ''}`}
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={`form-input${errors.email ? ' error' : ''}`}
                      placeholder="vikram@lnjpit.ac.in"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">Subject / Inquiry Type *</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className={`form-input${errors.subject ? ' error' : ''}`}
                    placeholder="e.g. Corporate Recruitment Drive Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && <span className="form-error">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    className={`form-input${errors.message ? ' error' : ''}`}
                    placeholder="Please describe your query in detail..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <Send size={16} /> Send Inquiry Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function Home({ onOpenAuth }) {

  useEffect(() => {
    document.title = SITE_TITLE;
  }, []);

  return (
    <main id="main-content" className="home-page" role="main">

      {/* ══ HERO SECTION ════════════════════════════════════════════════════ */}
      <section id="hero" className="hero-section">
        <HeroBackground />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-content">

            {/* Official Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-official-badge"
            >
              <span className="badge-pulse" />
              <span>Final Year B.Tech Capstone Project</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-title"
            >
              Next-Generation Placement Management Platform
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hero-description"
            >
              {APP_CONFIG.appTagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}
            >
              <button
                className="btn btn-primary btn-lg"
                onClick={() => onOpenAuth && onOpenAuth('student')}
              >
                <span>Open Authentication Portal</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="btn btn-outline btn-lg"
                onClick={() => {
                  document.querySelector('#workflow')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>View System Workflow</span>
              </button>
            </motion.div>

            {/* Animated Statistics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-metrics-strip"
            >
              {APP_CONFIG.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="metric-box"
                >
                  <span className="metric-value">
                    <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} suffix={stat.suffix} />
                  </span>
                  <span className="metric-label">{stat.label}</span>
                  <span className="metric-highlight">{stat.highlight}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ AUTHENTICATION PORTAL SECTION ════════════════════════════════ */}
      <section id="login-portals" className="section portals-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Secure Access</span>
            <h2 className="section-title">Authentication Portal</h2>
            <p className="section-subtitle">
              Access role-based login for Administrators, TPO Officers, and Students.
            </p>
          </div>

          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="auth-portal-launch-card"
            id="auth-portal-launch-card"
            onClick={() => onOpenAuth && onOpenAuth('student')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenAuth && onOpenAuth('student')}
          >
            {/* Top glow accent */}
            <div className="auth-launch-glow" />

            <div className="auth-launch-header">
              <div className="auth-launch-icon">
                <Lock size={28} strokeWidth={2} />
              </div>
              <div>
                <h3 className="auth-launch-title">Authentication Workspace</h3>
                <p className="auth-launch-sub">Unified login portal for all user roles</p>
              </div>
            </div>

            <p className="auth-launch-desc">
              Securely sign in to your authorized portal — Admin, TPO Officer, or Student.
              Role-based access controls ensure only verified users can access their respective dashboards.
            </p>

            {/* Portal badges */}
            <div className="auth-launch-badges">
              <span className="auth-launch-badge admin">
                <Shield size={14} /> Administrator
              </span>
              <span className="auth-launch-badge tpo">
                <GraduationCap size={14} /> TPO Officer
              </span>
              <span className="auth-launch-badge student">
                <UserCheck size={14} /> Student
              </span>
            </div>

            {/* CTA */}
            <div className="auth-launch-cta">
              <span>Open Authentication Workspace</span>
              <ArrowRight size={18} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PROBLEM STATEMENT SECTION ═══════════════════════════════════════ */}
      <section id="problem-statement" className="section problem-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Problem Statement</span>
            <h2 className="section-title">Why Legacy Placement Systems Fail</h2>
            <p className="section-subtitle">
              Traditional paper-and-spreadsheet recruitment processes create bottlenecks for students, Training Officers, and visiting recruiters.
            </p>
          </div>

          <div className="problem-grid">
            {PROBLEM_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="problem-card"
              >
                <div className="problem-icon">
                  <AlertTriangle size={20} color="#ef4444" />
                </div>
                <h3 className="problem-title">{point.title}</h3>
                <p className="problem-desc">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WORKFLOW TIMELINE SECTION ═══════════════════════════════════════ */}
      <section id="workflow" className="section workflow-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">System Workflow</span>
            <h2 className="section-title">End-to-End Recruitment Lifecycle</h2>
            <p className="section-subtitle">
              An automated, multi-stage pipeline connecting students, TPO officers, and corporate recruiters seamlessly.
            </p>
          </div>

          <div className="workflow-timeline">
            {WORKFLOW_STEPS.map((wf, idx) => (
              <motion.div
                key={wf.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="workflow-step-card"
              >
                <div className="workflow-step-num">{wf.step}</div>
                <h4 className="workflow-step-title">{wf.title}</h4>
                <p className="workflow-step-desc">{wf.desc}</p>
                {idx < WORKFLOW_STEPS.length - 1 && <div className="workflow-line-connector" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RECRUITING PARTNERS SECTION ═════════════════════════════════════ */}
      <section id="recruiters" className="section recruiters-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Corporate Connections</span>
            <h2 className="section-title">Top Recruiting Partners</h2>
            <p className="section-subtitle">
              Leading multinational corporations and technology innovators hiring from LNJPIT campus.
            </p>
          </div>

          <div className="recruiters-grid">
            {APP_CONFIG.recruiters.map(recruiter => (
              <motion.div
                key={recruiter.name}
                whileHover={{ y: -4, scale: 1.02 }}
                className="recruiter-card"
              >
                <div className="recruiter-icon">
                  <Building2 size={20} />
                </div>
                <div className="recruiter-info">
                  <h4 className="recruiter-name">{recruiter.name}</h4>
                  <span className="recruiter-cat">{recruiter.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY THIS PROJECT (FEATURE CARDS) SECTION ═════════════════════════ */}
      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Key Features</span>
            <h2 className="section-title">Why This Project Stands Out</h2>
            <p className="section-subtitle">
              Engineered with modern full-stack architectures, high availability, and institutional compliance standards.
            </p>
          </div>

          <div className="features-grid">
            {WHY_PROJECT_FEATURES.map((feat, i) => {
              const IconComp = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="feature-card-premium"
                >
                  <div className="feature-icon-premium">
                    <IconComp size={22} strokeWidth={2} />
                  </div>
                  <h3 className="feature-title-premium">✔ {feat.title}</h3>
                  <p className="feature-desc-premium">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SYSTEM ARCHITECTURE SECTION ═════════════════════════════════════ */}
      <section id="architecture" className="section architecture-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">System Architecture</span>
            <h2 className="section-title">High-Performance Full Stack Design</h2>
            <p className="section-subtitle">
              Modular micro-architecture ensuring data integrity, low latent responses, and scale readiness.
            </p>
          </div>

          <div className="architecture-diagram-flow">
            {ARCHITECTURE_DIAGRAM.map((arch, idx) => {
              const IconComp = arch.icon;
              return (
                <React.Fragment key={arch.step}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="arch-node-card"
                  >
                    <div className="arch-node-icon">
                      <IconComp size={22} />
                    </div>
                    <span className="arch-node-title">{arch.title}</span>
                    <span className="arch-node-desc">{arch.desc}</span>
                  </motion.div>

                  {idx < ARCHITECTURE_DIAGRAM.length - 1 && (
                    <div className="arch-arrow-connector">
                      <ArrowRight size={18} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ DEVELOPER SECTION ═══════════════════════════════════════════════ */}
      <section id="about-developer" className="section developer-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Project Architect &amp; Lead</span>
            <h2 className="section-title">About the Developer</h2>
            <p className="section-subtitle">
              Architected and built by a Final Year Computer Science &amp; Engineering Student at LNJPIT.
            </p>
          </div>

          <div className="developer-card-premium">
            <div className="developer-card-header">
              <div className="dev-avatar-box">
                <Terminal size={38} strokeWidth={1.8} />
              </div>

              <div>
                <div className="dev-tag-pill">
                  <Code2 size={13} /> B.Tech CSE Final Year
                </div>
                <h3 className="dev-name-heading">{APP_CONFIG.developer.name}</h3>
                <p className="dev-tagline-text">{APP_CONFIG.developer.tagline}</p>
                <span className="dev-reg-number">
                  {APP_CONFIG.developer.college}
                </span>
              </div>
            </div>

            <p className="dev-bio-paragraph">{APP_CONFIG.developer.bio}</p>

            {/* Social Buttons */}
            <div className="dev-social-buttons">
              {APP_CONFIG.developer.github && (
                <a href={APP_CONFIG.developer.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <GithubIcon size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
              {APP_CONFIG.developer.linkedin && (
                <a href={APP_CONFIG.developer.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <LinkedinIcon size={16} />
                  <span>LinkedIn Profile</span>
                </a>
              )}
              {APP_CONFIG.developer.email && (
                <a href={`mailto:${APP_CONFIG.developer.email}`} className="btn btn-outline btn-sm">
                  <Mail size={16} />
                  <span>Email Developer</span>
                </a>
              )}
            </div>

            {/* Tech Stack Chips */}
            <div style={{ marginTop: '2rem' }}>
              <span className="dev-tech-label">Technologies &amp; Architecture Stack</span>
              <div className="tech-chips-grid">
                {APP_CONFIG.techStack.map(tech => (
                  <span key={tech.name} className="tech-chip-item">
                    <span className="tech-chip-dot" />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT SECTION ═════════════════════════════════════════════════ */}
      <ContactFormSection />

    </main>
  );
}
