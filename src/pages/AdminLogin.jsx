/**
 * AdminLogin.jsx
 * Technical Admin Portal Authentication Page.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Eye, EyeOff, Lock, Mail, Building2 } from 'lucide-react';
import { APP_CONFIG } from '../config/app.config';
import '../styles/Auth.css';

const INITIAL_STATE = { email: '', password: '' };
const INITIAL_ERRORS = { email: '', password: '' };

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AdminLogin() {
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
    if (!form.email)                    newErrors.email = 'Administrator email is required.';
    else if (!validateEmail(form.email)) newErrors.email = 'Enter a valid administrator email.';
    if (!form.password)                 newErrors.password = 'Password is required.';
    else if (form.password.length < 6)  newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Admin credentials submitted for verification (Backend auth enabled in Module 5).');
    }
  };

  return (
    <div className="auth-page" id="admin-login-page">
      <div className="auth-card">

        <Link to="/" className="auth-back-link">
          <ArrowLeft size={16} /> Back to Overview
        </Link>

        <div className="auth-card-header">
          <div className="auth-card-icon-badge admin">
            <Shield size={26} />
          </div>
          <div className="auth-college-tag">
            <Building2 size={13} /> {APP_CONFIG.collegeName}
          </div>
          <h1 className="auth-card-title">Admin Control Portal</h1>
          <p className="auth-card-subtitle">
            System administration &amp; enterprise security controls
          </p>
        </div>

        <form
          id="admin-login-form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Admin Email</label>
            <input
              id="admin-email"
              name="email"
              type="email"
              className={`form-input${errors.email ? ' error' : ''}`}
              placeholder="admin@xyztech.edu.in"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
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
            id="admin-login-submit-btn"
            type="submit"
            className="btn btn-primary auth-submit-btn"
            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
          >
            <Lock size={16} /> Authenticate Admin
          </button>
        </form>

        <div className="auth-footer-links">
          <p>
            Authorized access only. <Link to="/">Return to main page</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
