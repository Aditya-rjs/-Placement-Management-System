/**
 * AdminLoginForm.jsx
 * Form component extracted from AdminLogin auth page.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import '../../styles/Auth.css';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function AdminLoginForm() {
  const navigate = useNavigate();
  const [form, setForm]               = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors]           = useState({ email: '', password: '' });
  const [focused, setFocused]         = useState({ email: false, password: false });
  const [showPass, setShowPass]       = useState(false);
  const [capsLockOn, setCapsLockOn]   = useState(false);
  const [loadingState, setLoadingState] = useState('idle');

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
      newErrors.email = 'Administrator email address is required.';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid administrator email address.';
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
        navigate('/admin/dashboard');
      }, 600);
    }, 1000);
  };

  return (
    <div className="auth-card-modern">
      <form id="admin-login-form" onSubmit={handleSubmit} noValidate>
        {/* Admin Email */}
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <div className={`floating-input-wrapper ${focused.email ? 'focused' : ''} ${form.email ? 'has-value' : ''}`}>
            <Mail size={18} className="input-leading-icon" />
            <input
              id="admin-email"
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
            <label className="floating-label" htmlFor="admin-email">Admin Email</label>
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
              id="admin-password"
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
            <label className="floating-label" htmlFor="admin-password">Account Password</label>
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
          <a href="#forgot" className="auth-forgot-link" onClick={e => { e.preventDefault(); alert('Administrator password resets require direct database access or super-admin key.'); }}>
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          id="admin-login-submit-btn"
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={loadingState !== 'idle'}
          style={{ width: '100%', background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
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
              <span>Authenticate Admin</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Footer Links */}
      <div className="auth-footer-links">
        <p>
          Authorized access only. <Link to="/">Return to Overview</Link>
        </p>
      </div>
    </div>
  );
}
