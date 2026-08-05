/**
 * app.config.js
 * ─────────────────────────────────────────────────────────────
 * Central configuration for the Placement Management System.
 * Change values here — they will automatically reflect
 * across the entire application without touching any component.
 * ─────────────────────────────────────────────────────────────
 */

export const APP_CONFIG = {
  // ── College Info ──────────────────────────────────────────
  collegeName: 'XYZ College',             // ← Change this to your college name
  collegeShortName: 'XYZ',
  collegeLocation: 'Mumbai, Maharashtra',

  // ── App Meta ──────────────────────────────────────────────
  appName: 'Placement Management System',
  appShortName: 'PMS',
  appVersion: '1.0.0',
  appTagline: 'Bridging the gap between talent and opportunity — one placement at a time.',
  contactEmail: 'placements@xyzcollege.edu',
  contactPhone: '+91 98765 43210',

  // ── Developer Info ────────────────────────────────────────
  developer: {
    name: 'Your Name Here',                 // ← Update with your name
    title: 'Full Stack Developer',
    college: 'XYZ College',                 // ← Update if different
    branch: 'Computer Engineering',         // ← Update your branch
    batch: '2024–2025',
    bio: `A passionate full-stack developer with a keen interest in building 
          scalable web applications that solve real-world problems. 
          Currently pursuing Computer Engineering and actively working on 
          modern React projects.`,
    skills: [
      'React.js', 'Node.js', 'JavaScript', 'Python',
      'MongoDB', 'SQL', 'Git', 'REST APIs',
    ],
    github: 'https://github.com/yourusername',     // ← Update
    linkedin: 'https://linkedin.com/in/yourname', // ← Update
    email: 'your.email@example.com',              // ← Update
    photoUrl: null,  // Set to image URL/path or leave null for avatar placeholder
  },
};

// Convenience export: full display title
export const SITE_TITLE = `${APP_CONFIG.collegeName} ${APP_CONFIG.appName}`;
