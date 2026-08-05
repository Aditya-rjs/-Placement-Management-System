/**
 * StudentLogin.jsx
 * Redesigned Split-Screen Student Portal Authentication Page.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, HelpCircle, UserCheck } from 'lucide-react';
import { APP_CONFIG } from '../config/app.config';
import AuthLeftPanel from '../components/AuthLeftPanel';
import LNJPITLogo from '../components/LNJPITLogo';
import '../styles/Auth.css';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function StudentLogin() {
  const navigate = useNavigate();

  const [form, setForm]               = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors]           = useState({ email: '', password: '' });
  const [focused, setFocused]         = useState({ email: false, password: false });
  const [showPass, setShowPass]       = useState(false);
  const [capsLockOn, setCapsLockOn]   = useState(false);
  const [loadingState, setLoadingState] = useState('idle'); // 'idle' | 'authenticating' | 'success'

  useEffect(() => {
    document.title = `Student Portal Login | ${APP_CONFIG.collegeName}`;
  }, []);

  // Detect Caps Lock key
  const handleKeyDown = (e) => {
    if (e.getModifierState) {
      setCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'Institutional email address is required.';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid institutional email address.';
    }

    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoadingState('authenticating');

    // Simulate authentication sequence
    setTimeout(() => {
      setLoadingState('success');
      setTimeout(() => {
        alert('Student authentication verified successfully (Backend integration enabled in Module 5).');
        setLoadingState('idle');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="auth-split-container" id="student-login-page">
      {/* Left Branding Panel (Desktop) */}
      <AuthLeftPanel portalTitle="Student Candidate Portal" />

      {/* Right Panel: Form Card */}
      <main className="auth-right-panel" role="main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="auth-card-modern"
        >
          {/* Top Header */}
          <div className="auth-institution-header">
            <span className="auth-portal-type-badge student">
              <UserCheck size={14} /> Student Candidate Portal
            </span>

            {/* Logo display on Mobile */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <LNJPITLogo size={36} />
            </div>

            <h2 className="auth-card-main-title">Log in to Your Portal</h2>
            <p className="auth-card-main-sub">
              Training &amp; Placement Cell • {APP_CONFIG.collegeName}
            </p>
          </div>

          {/* Form */}
          <form id="student-login-form" onSubmit={handleSubmit} noValidate>
            {/* Email Field with Floating Label */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <div
                className={`floating-input-wrapper ${focused.email ? 'focused' : ''} ${form.email ? 'has-value' : ''}`}
              >
                <Mail size={18} className="input-leading-icon" />
                <input
                  id="student-email"
                  name="email"
                  type="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused(prev => ({ ...prev, email: true }))}
                  onBlur={() => setFocused(prev => ({ ...prev, email: false }))}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error-msg' : undefined}
                />
                <label className="floating-label" htmlFor="student-email">
                  Institutional Email (e.g. name@lnjpit.ac.in)
                </label>

                {form.email && validateEmail(form.email) && (
                  <div className="input-trailing-box">
                    <CheckCircle2 size={16} color="var(--color-success)" />
                  </div>
                )}
              </div>
              {errors.email && (
                <span id="email-error-msg" className="validation-status-text invalid" role="alert">
                  <AlertCircle size={13} /> {errors.email}
                </span>
              )}
            </div>

            {/* Password Field with Floating Label */}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <div
                className={`floating-input-wrapper ${focused.password ? 'focused' : ''} ${form.password ? 'has-value' : ''}`}
              >
                <Lock size={18} className="input-leading-icon" />
                <input
                  id="student-password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  className={`form-input${errors.password ? ' error' : ''}`}
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setFocused(prev => ({ ...prev, password: true }))}
                  onBlur={() => setFocused(prev => ({ ...prev, password: false }))}
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error-msg' : undefined}
                />
                <label className="floating-label" htmlFor="student-password">
                  Account Password
                </label>

                <div className="input-trailing-box">
                  <button
                    type="button"
                    className="input-action-toggle"
                    onClick={() => setShowPass(prev => !prev)}
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {capsLockOn && (
                <div className="caps-lock-warning">
                  <span>⚠️ Caps Lock is ON</span>
                </div>
              )}

              {errors.password && (
                <span id="password-error-msg" className="validation-status-text invalid" role="alert">
                  <AlertCircle size={13} /> {errors.password}
                </span>
              )}
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="auth-extra-row" style={{ marginBottom: '1.5rem' }}>
              <label className="custom-checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </label>

              <a
                href="#forgot"
                className="auth-forgot-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password reset link will be sent to your institutional email. Contact TPO office if needed.');
                }}
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button with Animated Loading State */}
            <button
              id="student-login-submit-btn"
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loadingState !== 'idle'}
              style={{ width: '100%' }}
            >
              {loadingState === 'authenticating' && (
                <>
                  <span className="btn-spinner" />
                  <span>Authenticating...</span>
                </>
              )}
              {loadingState === 'success' && (
                <>
                  <CheckCircle2 size={18} />
                  <span>Login Successful! Redirecting...</span>
                </>
              )}
              {loadingState === 'idle' && (
                <>
                  <span>Sign in to Student Portal</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Links & Assistance */}
          <div className="auth-footer-links">
            <p>
              New student candidate?{' '}
              <Link to="/register/student" id="student-register-link" style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>
                Create Candidate Account →
              </Link>
            </p>
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.725rem' }}>
              <Link to="/" style={{ color: 'var(--color-text-muted)' }}>← Back to Overview</Link>
              <a
                href="#assistance"
                style={{ color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                onClick={(e) => {
                  e.preventDefault();
                  alert('For login issues or email verification, contact LNJPIT TPO office at tpo@lnjpit.ac.in');
                }}
              >
                <HelpCircle size={12} /> Need Assistance?
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
