/**
 * TPOLogin.jsx
 * Placeholder TPO Representative login page.
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

export default function TPOLogin() {
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
      alert('TPO login submitted (backend not yet implemented).');
    }
  };

  return (
    <div className="auth-page" id="tpo-login-page">
      <div className="auth-card">

        <Link to="/" className="auth-back-link" aria-label="Back to home">
          ← Back to Home
        </Link>

        <div className="auth-card-header">
          <div className="auth-card-icon tpo" aria-hidden="true">🎓</div>
          <div className="auth-college-tag">🏛️ {APP_CONFIG.collegeName}</div>
          <h1 className="auth-card-title">TPO Login</h1>
          <p className="auth-card-subtitle">
            Training &amp; Placement Officer portal. Manage drives and student data.
          </p>
        </div>

        <form
          id="tpo-login-form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="TPO login form"
        >
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="tpo-email">Email Address</label>
            <input
              id="tpo-email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="tpo@college.edu"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              aria-describedby={errors.email ? 'tpo-email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span id="tpo-email-error" className="form-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="tpo-password">Password</label>
            <div className="input-wrapper">
              <input
                id="tpo-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                className={`form-input${errors.password ? ' error' : ''}`}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                aria-describedby={errors.password ? 'tpo-password-error' : undefined}
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
              <span id="tpo-password-error" className="form-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button
            id="tpo-login-submit-btn"
            type="submit"
            className="auth-submit-btn tpo"
            aria-label="Submit TPO login"
          >
            🎓 Login as TPO
          </button>
        </form>

        <div className="auth-footer-links">
          <p>
            Not the right portal?{' '}
            <Link to="/" id="tpo-go-home-link">Go back home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
