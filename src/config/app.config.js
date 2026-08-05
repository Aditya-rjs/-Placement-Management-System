/**
 * app.config.js
 * ─────────────────────────────────────────────────────────────
 * Central configuration for the Placement Management System.
 * University: Loknayak Jai Prakash Institute of Technology (LNJPIT)
 * Developer: Aditya Raj Singh (Final Year B.Tech CSE Student)
 * ─────────────────────────────────────────────────────────────
 */

export const APP_CONFIG = {
  // ── Institution Info ──────────────────────────────────────
  collegeName: 'Loknayak Jai Prakash Institute of Technology',
  collegeShortName: 'LNJPIT Chapra',
  collegeLocation: 'Chapra, Saran, Bihar - 841302',
  establishedYear: '2012',
  affiliatedTo: 'Department of Science, Technology & Technical Education, Govt. of Bihar',

  // ── App Metadata ──────────────────────────────────────────
  appName: 'Placement Management System',
  appShortName: 'LNJPIT PMS',
  appVersion: 'v2.5.0 (Production Enterprise Release)',
  appTagline: 'A centralized digital platform designed to automate campus recruitment, streamline student applications, simplify recruiter management, and provide intelligent placement analytics.',
  contactEmail: 'tpo@lnjpit.ac.in',
  contactPhone: '+91 (06152) 280001 / +91 94700 12345',

  // ── Hero Statistics ───────────────────────────────────────
  stats: [
    { value: 94.8, suffix: '%', label: 'Placement Rate', highlight: '2023–24 Session' },
    { value: 44.5, suffix: ' LPA', label: 'Highest Package', highlight: 'International Offer' },
    { value: 8.2, suffix: ' LPA', label: 'Average Package', highlight: 'Engineering Streams' },
    { value: 180, suffix: '+', label: 'Recruiting Partners', highlight: 'Top Tech Giants & MNCs' },
  ],

  // ── Top Recruiters Showcase ────────────────────────────────
  recruiters: [
    { name: 'Google', domain: 'google.com', category: 'Software & Cloud' },
    { name: 'Microsoft', domain: 'microsoft.com', category: 'Product & OS' },
    { name: 'Amazon', domain: 'amazon.com', category: 'E-Commerce & AWS' },
    { name: 'TCS', domain: 'tcs.com', category: 'IT & Consulting' },
    { name: 'Infosys', domain: 'infosys.com', category: 'Digital Services' },
    { name: 'Capgemini', domain: 'capgemini.com', category: 'Consulting' },
    { name: 'Accenture', domain: 'accenture.com', category: 'Global Tech' },
    { name: 'Deloitte', domain: 'deloitte.com', category: 'Advisory & Tech' },
    { name: 'Wipro', domain: 'wipro.com', category: 'IT Services' },
  ],

  // ── Developer Profile ──────────────────────────────────────
  developer: {
    name: 'Aditya Raj Singh',
    tagline: 'Final Year B.Tech Computer Science Student | Full Stack Developer | AI Enthusiast | Software Engineer',
    college: 'Loknayak Jai Prakash Institute of Technology (LNJPIT)',
    branch: 'Computer Science & Engineering',
    batch: '2021 – 2025',
    bio: `Final-year Computer Science & Engineering undergraduate at Loknayak Jai Prakash Institute of Technology. Architected and engineered this enterprise-grade Placement Management System as a capstone project to digitize campus recruitment drives, automate candidate eligibility evaluation, and deliver real-time placement intelligence.`,
    github: 'https://github.com/Aditya-rjs/-Placement-Management-System',
    linkedin: 'https://linkedin.com/in/adityarajsingh',
    email: 'adityarajsingh.dev@gmail.com',
    resumeUrl: '#resume',
  },

  // ── Tech Stack Chips ───────────────────────────────────────
  techStack: [
    { name: 'React', icon: 'Atom', category: 'Frontend' },
    { name: 'Next.js', icon: 'Zap', category: 'Framework' },
    { name: 'Node.js', icon: 'Server', category: 'Backend' },
    { name: 'Express', icon: 'Cpu', category: 'API Engine' },
    { name: 'MongoDB', icon: 'Database', category: 'Database' },
    { name: 'PostgreSQL', icon: 'HardDrive', category: 'Relational DB' },
    { name: 'Tailwind CSS', icon: 'Palette', category: 'Styling' },
    { name: 'TypeScript', icon: 'Code', category: 'Language' },
    { name: 'REST APIs', icon: 'Layers', category: 'Architecture' },
    { name: 'Git', icon: 'GitBranch', category: 'VCS' },
    { name: 'Vercel', icon: 'Cloud', category: 'Deployment' },
    { name: 'Resend', icon: 'Mail', category: 'Email Service' },
  ],
};

export const SITE_TITLE = `${APP_CONFIG.collegeName} | ${APP_CONFIG.appName}`;
