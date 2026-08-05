/**
 * StudentLogin.jsx
 * Placeholder Student login page with link to registration.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../config/app.config';
import '../styles/Auth.css';

const INITIAL_STATE = { email: '', password: '' };
const INITIAL_ERRORS = { email: '', password: '' };

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function StudentLogin() {
  const [form, setForm]         = useState(INITIAL_STATE);
  const [errors, setErrors]     = useState(INITIAL_ERRORS);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = { ...INITIAL_ERRORS };
    if (!form.email)                    newErrors.email = 'Email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!form.password)                 newErrors.password = 'Password is required.';
    else if (form.password.length < 6)  newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Student login submitted (backend not yet implemented).');
    }
  };

  return (
    <div className="auth-page" id="student-login-page">
      <div className="auth-card">

        <Link to="/" className="auth-back-link" aria-label="Back to home">
          ← Back to Home
        </Link>

        <div className="auth-card-header">
          <div className="auth-card-icon student" aria-hidden="true">📚</div>
          <div className="auth-college-tag">🏛️ {APP_CONFIG.collegeName}</div>
          <h1 className="auth-card-title">Student Login</h1>
          <p className="auth-card-subtitle">
            Access your dashboard to view drives and manage applications.
          </p>
        </div>

        <form
          id="student-login-form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Student login form"
        >
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="student-email">Email Address</label>
            <input
              id="student-email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="you@college.edu"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              aria-describedby={errors.email ? 'student-email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span id="student-email-error" className="form-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="student-password">Password</label>
            <div className="input-wrapper">
              <input
                id="student-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                className={`form-input${errors.password ? ' error' : ''}`}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                aria-describedby={errors.password ? 'student-password-error' : undefined}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                className="input-toggle-btn"
                onClick={() => setShowPass(p => !p)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <span id="student-password-error" className="form-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button
            id="student-login-submit-btn"
            type="submit"
            className="auth-submit-btn student"
            aria-label="Submit student login"
          >
            📚 Login as Student
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-footer-links">
          <p>
            New student?{' '}
            <Link to="/register/student" id="student-register-link">
              Create an account →
            </Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <Link to="/" id="student-go-home-link">← Back to home</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
