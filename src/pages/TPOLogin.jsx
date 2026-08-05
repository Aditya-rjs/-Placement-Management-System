/**
 * TPOLogin.jsx
 * Redesigned Split-Screen TPO Officer Portal Authentication Page.
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, HelpCircle, GraduationCap } from 'lucide-react';
import { APP_CONFIG } from '../config/app.config';
import AuthLeftPanel from '../components/AuthLeftPanel';
import LNJPITLogo from '../components/LNJPITLogo';
import '../styles/Auth.css';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function TPOLogin() {
  const [form, setForm]               = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors]           = useState({ email: '', password: '' });
  const [focused, setFocused]         = useState({ email: false, password: false });
  const [showPass, setShowPass]       = useState(false);
  const [capsLockOn, setCapsLockOn]   = useState(false);
  const [loadingState, setLoadingState] = useState('idle');

  useEffect(() => {
    document.title = `TPO Officer Portal | ${APP_CONFIG.collegeName}`;
  }, []);

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
      newErrors.email = 'TPO Officer email address is required.';
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

    setTimeout(() => {
      setLoadingState('success');
      setTimeout(() => {
        alert('TPO Officer authentication verified successfully (Backend integration enabled in Module 5).');
        setLoadingState('idle');
      }, 1000);
    }, 1200);
  };

  return (
    <div className="auth-split-container" id="tpo-login-page">
      <AuthLeftPanel portalTitle="TPO Representative Portal" />

      <main className="auth-right-panel" role="main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="auth-card-modern"
        >
          {/* Header */}
          <div className="auth-institution-header">
            <span className="auth-portal-type-badge tpo">
              <GraduationCap size={14} /> Placement Cell
            </span>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <LNJPITLogo size={36} />
            </div>

            <h2 className="auth-card-main-title">TPO Officer Portal</h2>
            <p className="auth-card-main-sub">
              Training &amp; Placement Office Management Console
            </p>
          </div>

          <form id="tpo-login-form" onSubmit={handleSubmit} noValidate>
            {/* Officer Email */}
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <div className={`floating-input-wrapper ${focused.email ? 'focused' : ''} ${form.email ? 'has-value' : ''}`}>
                <Mail size={18} className="input-leading-icon" />
                <input
                  id="tpo-email"
                  name="email"
                  type="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused(prev => ({ ...prev, email: true }))}
                  onBlur={() => setFocused(prev => ({ ...prev, email: false }))}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
                <label className="floating-label" htmlFor="tpo-email">Officer Email (e.g. tpo@lnjpit.ac.in)</label>
                {form.email && validateEmail(form.email) && (
                  <div className="input-trailing-box"><CheckCircle2 size={16} color="var(--color-success)" /></div>
                )}
              </div>
              {errors.email && <span className="validation-status-text invalid" role="alert"><AlertCircle size={13} /> {errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <div className={`floating-input-wrapper ${focused.password ? 'focused' : ''} ${form.password ? 'has-value' : ''}`}>
                <Lock size={18} className="input-leading-icon" />
                <input
                  id="tpo-password"
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
                />
                <label className="floating-label" htmlFor="tpo-password">Account Password</label>
                <div className="input-trailing-box">
                  <button type="button" className="input-action-toggle" onClick={() => setShowPass(prev => !prev)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {capsLockOn && <div className="caps-lock-warning">⚠️ Caps Lock is ON</div>}
              {errors.password && <span className="validation-status-text invalid" role="alert"><AlertCircle size={13} /> {errors.password}</span>}
            </div>

            {/* Extra Row */}
            <div className="auth-extra-row" style={{ marginBottom: '1.5rem' }}>
              <label className="custom-checkbox-label">
                <input type="checkbox" name="rememberMe" checked={form.rememberMe} onChange={handleChange} />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="auth-forgot-link" onClick={e => { e.preventDefault(); alert('Password reset links for TPO accounts require administrative verification.'); }}>
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              id="tpo-login-submit-btn"
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loadingState !== 'idle'}
              style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
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
                  <span>Authenticated! Redirecting...</span>
                </>
              )}
              {loadingState === 'idle' && (
                <>
                  <span>Authenticate TPO Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="auth-footer-links">
            <p>
              TPO Officer access only. <Link to="/">Return to Overview</Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
