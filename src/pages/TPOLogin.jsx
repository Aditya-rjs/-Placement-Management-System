/**
 * TPOLogin.jsx
 * Technical TPO Portal Authentication Page.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Eye, EyeOff, Lock, Building2 } from 'lucide-react';
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
    if (!form.email)                    newErrors.email = 'TPO Officer email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Enter a valid institutional email.';
    if (!form.password)                 newErrors.password = 'Password is required.';
    else if (form.password.length < 6)  newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('TPO Officer credentials submitted for verification (Backend auth enabled in Module 5).');
    }
  };

  return (
    <div className="auth-page" id="tpo-login-page">
      <div className="auth-card">

        <Link to="/" className="auth-back-link">
          <ArrowLeft size={16} /> Back to Overview
        </Link>

        <div className="auth-card-header">
          <div className="auth-card-icon-badge tpo">
            <GraduationCap size={26} />
          </div>
          <div className="auth-college-tag">
            <Building2 size={13} /> {APP_CONFIG.collegeName}
          </div>
          <h1 className="auth-card-title">TPO Officer Portal</h1>
          <p className="auth-card-subtitle">
            Training &amp; Placement Office Management Console
          </p>
        </div>

        <form
          id="tpo-login-form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="tpo-email">Officer Email</label>
            <input
              id="tpo-email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="tpo@xyztech.edu.in"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
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
            id="tpo-login-submit-btn"
            type="submit"
            className="btn btn-primary auth-submit-btn"
            style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
          >
            <Lock size={16} /> Authenticate TPO Account
          </button>
        </form>

        <div className="auth-footer-links">
          <p>
            Training &amp; Placement Officer access only. <Link to="/">Back to main page</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
