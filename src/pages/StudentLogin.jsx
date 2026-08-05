/**
 * StudentLogin.jsx
 * Technical Student Portal Authentication Page.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, ArrowLeft, Eye, EyeOff, Lock, Building2, UserPlus } from 'lucide-react';
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
    if (!form.email)                    newErrors.email = 'Student email address is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Enter a valid student email address.';
    if (!form.password)                 newErrors.password = 'Password is required.';
    else if (form.password.length < 6)  newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Student credentials submitted for authentication (Backend auth enabled in Module 5).');
    }
  };

  return (
    <div className="auth-page" id="student-login-page">
      <div className="auth-card">

        <Link to="/" className="auth-back-link">
          <ArrowLeft size={16} /> Back to Overview
        </Link>

        <div className="auth-card-header">
          <div className="auth-card-icon-badge student">
            <UserCheck size={26} />
          </div>
          <div className="auth-college-tag">
            <Building2 size={13} /> {APP_CONFIG.collegeName}
          </div>
          <h1 className="auth-card-title">Student Career Portal</h1>
          <p className="auth-card-subtitle">
            Log in to view active hiring drives &amp; manage applications
          </p>
        </div>

        <form
          id="student-login-form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="student-email">Institutional Email</label>
            <input
              id="student-email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="student@xyztech.edu.in"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
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
                placeholder="••••••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-toggle-btn"
                onClick={() => setShowPass(p => !p)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <button
            id="student-login-submit-btn"
            type="submit"
            className="btn btn-primary auth-submit-btn"
            style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
          >
            <Lock size={16} /> Student Login
          </button>
        </form>

        <div className="auth-footer-links">
          <p>
            First time user?{' '}
            <Link to="/register/student" id="student-register-link" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>
              Register Candidate Account <UserPlus size={13} style={{ verticalAlign: 'middle' }} />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
