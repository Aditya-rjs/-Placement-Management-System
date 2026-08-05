/**
 * AdminLogin.jsx
 * Placeholder Admin login page.
 * Backend authentication will be implemented in a future module.
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

export default function AdminLogin() {
  const [form, setForm]       = useState(INITIAL_STATE);
  const [errors, setErrors]   = useState(INITIAL_ERRORS);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = { ...INITIAL_ERRORS };
    if (!form.email)               newErrors.email = 'Email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Enter a valid email address.';
    if (!form.password)            newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // TODO: Implement backend authentication in future module
      alert('Admin login submitted (backend not yet implemented).');
    }
  };

  return (
    <div className="auth-page" id="admin-login-page">
      <div className="auth-card">

        <Link to="/" className="auth-back-link" aria-label="Back to home">
          ← Back to Home
        </Link>

        <div className="auth-card-header">
          <div className="auth-card-icon admin" aria-hidden="true">🛡️</div>
          <div className="auth-college-tag">
            🏛️ {APP_CONFIG.collegeName}
          </div>
          <h1 className="auth-card-title">Admin Login</h1>
          <p className="auth-card-subtitle">
            Access the admin panel to manage the placement system.
          </p>
        </div>

        <form
          id="admin-login-form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Admin login form"
        >
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="admin@college.edu"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              aria-describedby={errors.email ? 'admin-email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span id="admin-email-error" className="form-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div className="input-wrapper">
              <input
                id="admin-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                className={`form-input${errors.password ? ' error' : ''}`}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                aria-describedby={errors.password ? 'admin-password-error' : undefined}
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
              <span id="admin-password-error" className="form-error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <button
            id="admin-login-submit-btn"
            type="submit"
            className="auth-submit-btn admin"
            aria-label="Submit admin login"
          >
            🔐 Login as Admin
          </button>
        </form>

        <div className="auth-footer-links">
          <p>
            Not the right portal?{' '}
            <Link to="/" id="admin-go-home-link">Go back home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
