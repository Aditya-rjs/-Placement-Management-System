/**
 * app.config.js
 * ─────────────────────────────────────────────────────────────
 * Central configuration for the Placement Management System.
 * All institution branding, system metrics, recruiter list,
 * and developer information are configured here.
 * ─────────────────────────────────────────────────────────────
 */

export const APP_CONFIG = {
  // ── College Info ──────────────────────────────────────────
  collegeName: 'XYZ Institute of Technology',
  collegeShortName: 'XYZ-IT',
  collegeLocation: 'Mumbai, Maharashtra, India',

  // ── App Meta ──────────────────────────────────────────────
  appName: 'Placement Management System',
  appShortName: 'PMS Portal',
  appVersion: 'v2.4.0 (Enterprise Build)',
  appTagline: 'Centralized Automation Engine for Campus Recruitment, Student Verification & Corporate Partnerships',
  contactEmail: 'tpo@xyztech.edu.in',
  contactPhone: '+91 (022) 2876-5432 / +91 98765 43210',

  // ── Key Placement Metrics ──────────────────────────────────
  stats: [
    { value: '94.8%', label: 'Placement Rate (2023-24)', highlight: '+3.2% vs last year' },
    { value: '44.5 LPA', label: 'Highest Package', highlight: 'International Offer' },
    { value: '8.2 LPA', label: 'Average Package', highlight: 'Engineering Streams' },
    { value: '180+', label: 'Recruiting Partners', highlight: 'Fortune 500 & Tech Giants' },
  ],

  // ── Top Recruiters Showcase ────────────────────────────────
  recruiters: [
    { name: 'Google', category: 'Product' },
    { name: 'Microsoft', category: 'Product' },
    { name: 'Amazon', category: 'Product' },
    { name: 'TCS Digital', category: 'Services & Consulting' },
    { name: 'Infosys Power Programmer', category: 'IT Services' },
    { name: 'Wipro Turbo', category: 'IT Services' },
    { name: 'Accenture Velocity', category: 'Consulting' },
    { name: 'Deloitte USI', category: 'Financial & Advisory' },
    { name: 'Capgemini Excellence', category: 'Consulting' },
  ],

  // ── Developer Profile ──────────────────────────────────────
  developer: {
    name: 'Aditya R.',
    title: 'B.Tech Final Year Student (Computer Science & Engineering)',
    college: 'XYZ Institute of Technology',
    branch: 'Computer Science & Engineering',
    batch: '2021 – 2025',
    regNo: '2021CSE084',
    bio: `Final-year Computer Science undergraduate specializing in full-stack software development and cloud-native web architectures. Built this Placement Management System as a capstone engineering project to automate campus hiring drives, eliminate manual eligibility errors, and provide TPO officers with real-time candidate analytics.`,
    skills: [
      'React 18', 'Node.js', 'Express.js', 'REST APIs',
      'JavaScript (ES6+)', 'PostgreSQL / MongoDB', 'Vite', 'Git & CI/CD',
      'Data Structures & Algorithms', 'System Design Basics'
    ],
    github: 'https://github.com/Aditya-rjs/-Placement-Management-System',
    linkedin: 'https://linkedin.com/in/adityarjs',
    email: 'aditya.dev@xyztech.edu.in',
    photoUrl: null, // Renders high-end code avatar fallback if null
  },
};

export const SITE_TITLE = `${APP_CONFIG.collegeName} | ${APP_CONFIG.appName}`;
