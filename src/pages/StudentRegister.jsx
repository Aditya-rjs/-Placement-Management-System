/**
 * StudentRegister.jsx
 * Student registration form with comprehensive frontend validation.
 * Backend integration will be added in a future module.
 *
 * Fields: Full Name, Branch, Registration Number, Batch,
 *         Phone Number, Email, Password, Confirm Password
 */

import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../config/app.config';
import '../styles/Auth.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Instrumentation Engineering',
  'Production Engineering',
  'Other',
];

const BATCHES = ['2021-2025', '2022-2026', '2023-2027', '2024-2028', '2025-2029'];

const INITIAL_FORM = {
  fullName: '',
  branch: '',
  regNumber: '',
  batch: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const INITIAL_ERRORS = Object.fromEntries(Object.keys(INITIAL_FORM).map(k => [k, '']));

// ─── Validators ───────────────────────────────────────────────────────────────

const VALIDATORS = {
  fullName: (v) => {
    if (!v.trim()) return 'Full name is required.';
    if (v.trim().length < 3) return 'Name must be at least 3 characters.';
    if (!/^[a-zA-Z\s.'-]+$/.test(v)) return 'Name can only contain letters and spaces.';
    return '';
  },
  branch: (v) => (!v ? 'Please select your branch.' : ''),
  regNumber: (v) => {
    if (!v.trim()) return 'Registration number is required.';
    if (v.trim().length < 5) return 'Registration number must be at least 5 characters.';
    return '';
  },
  batch: (v) => (!v ? 'Please select your batch.' : ''),
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required.';
    if (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, '')))
      return 'Enter a valid 10-digit Indian mobile number.';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.';
    return '';
  },
  password: (v) => {
    if (!v) return 'Password is required.';
    if (v.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(v)) return 'Password must contain at least one uppercase letter.';
    if (!/[0-9]/.test(v)) return 'Password must contain at least one number.';
    return '';
  },
  confirmPassword: (v, form) => {
    if (!v) return 'Please confirm your password.';
    if (v !== form.password) return 'Passwords do not match.';
    return '';
  },
};

// ─── Password Strength Helper ─────────────────────────────────────────────────

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 20, label: 'Very Weak', color: '#ef4444' };
  if (score === 2) return { score: 40, label: 'Weak',      color: '#f59e0b' };
  if (score === 3) return { score: 60, label: 'Fair',      color: '#eab308' };
  if (score === 4) return { score: 80, label: 'Strong',    color: '#10b981' };
  return                  { score: 100, label: 'Very Strong', color: '#06b6d4' };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm]           = useState(INITIAL_FORM);
  const [errors, setErrors]       = useState(INITIAL_ERRORS);
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched]     = useState({});

  const strength = getPasswordStrength(form.password);

  // Validate a single field
  const validateField = useCallback((name, value, currentForm) => {
    const validator = VALIDATORS[name];
    if (!validator) return '';
    return validator(value, currentForm ?? form);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Live validation if field was touched
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value, updatedForm),
        // Re-validate confirm password if password changes
        ...(name === 'password' && touched.confirmPassword
          ? { confirmPassword: VALIDATORS.confirmPassword(updatedForm.confirmPassword, updatedForm) }
          : {}),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateAll = () => {
    const newErrors = {};
    let hasError = false;
    Object.keys(INITIAL_FORM).forEach(field => {
      const err = VALIDATORS[field]?.(form[field], form) ?? '';
      newErrors[field] = err;
      if (err) hasError = true;
    });
    setErrors(newErrors);
    setTouched(Object.fromEntries(Object.keys(INITIAL_FORM).map(k => [k, true])));
    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    setSubmitted(true);
    // TODO: Call backend API in future module
  };

  if (submitted) {
    return (
      <div className="auth-page" id="student-register-success-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 className="auth-card-title" style={{ marginBottom: '1rem' }}>
            Registration Submitted!
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Your registration details have been captured successfully.<br />
            Backend integration will be enabled in the next module.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login/student" className="btn btn-primary" id="goto-student-login-btn">
              Go to Login
            </Link>
            <Link to="/" className="btn btn-outline" id="goto-home-btn">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page" id="student-register-page">
      <div className="auth-card wide">

        <Link to="/login/student" className="auth-back-link" aria-label="Back to student login">
          ← Back to Login
        </Link>

        <div className="auth-card-header">
          <div className="auth-card-icon student" aria-hidden="true">✨</div>
          <div className="auth-college-tag">🏛️ {APP_CONFIG.collegeName}</div>
          <h1 className="auth-card-title">Student Registration</h1>
          <p className="auth-card-subtitle">
            Create your account to access placement drives and opportunities.
          </p>
        </div>

        <form
          id="student-register-form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Student registration form"
        >
          <div className="form-grid-2">

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-fullname">Full Name *</label>
              <input
                id="reg-fullname"
                name="fullName"
                type="text"
                className={`form-input${errors.fullName ? ' error' : ''}`}
                placeholder="e.g. Rahul Sharma"
                value={form.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
                aria-describedby={errors.fullName ? 'reg-fullname-error' : undefined}
                aria-invalid={!!errors.fullName}
                aria-required="true"
              />
              {errors.fullName && (
                <span id="reg-fullname-error" className="form-error" role="alert">
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Branch */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-branch">Branch *</label>
              <select
                id="reg-branch"
                name="branch"
                className={`form-input${errors.branch ? ' error' : ''}`}
                value={form.branch}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby={errors.branch ? 'reg-branch-error' : undefined}
                aria-invalid={!!errors.branch}
                aria-required="true"
              >
                <option value="">Select your branch</option>
                {BRANCHES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {errors.branch && (
                <span id="reg-branch-error" className="form-error" role="alert">
                  {errors.branch}
                </span>
              )}
            </div>

            {/* Registration Number */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-regnumber">Registration Number *</label>
              <input
                id="reg-regnumber"
                name="regNumber"
                type="text"
                className={`form-input${errors.regNumber ? ' error' : ''}`}
                placeholder="e.g. 2021COMP0001"
                value={form.regNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby={errors.regNumber ? 'reg-regnumber-error' : undefined}
                aria-invalid={!!errors.regNumber}
                aria-required="true"
              />
              {errors.regNumber && (
                <span id="reg-regnumber-error" className="form-error" role="alert">
                  {errors.regNumber}
                </span>
              )}
            </div>

            {/* Batch */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-batch">Batch *</label>
              <select
                id="reg-batch"
                name="batch"
                className={`form-input${errors.batch ? ' error' : ''}`}
                value={form.batch}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby={errors.batch ? 'reg-batch-error' : undefined}
                aria-invalid={!!errors.batch}
                aria-required="true"
              >
                <option value="">Select your batch</option>
                {BATCHES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {errors.batch && (
                <span id="reg-batch-error" className="form-error" role="alert">
                  {errors.batch}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-phone">Phone Number *</label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                className={`form-input${errors.phone ? ' error' : ''}`}
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={10}
                autoComplete="tel"
                aria-describedby={errors.phone ? 'reg-phone-error' : undefined}
                aria-invalid={!!errors.phone}
                aria-required="true"
              />
              {errors.phone && (
                <span id="reg-phone-error" className="form-error" role="alert">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address *</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                className={`form-input${errors.email ? ' error' : ''}`}
                placeholder="you@college.edu"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                aria-describedby={errors.email ? 'reg-email-error' : undefined}
                aria-invalid={!!errors.email}
                aria-required="true"
              />
              {errors.email && (
                <span id="reg-email-error" className="form-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group full">
              <label className="form-label" htmlFor="reg-password">Password *</label>
              <div className="input-wrapper">
                <input
                  id="reg-password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  className={`form-input${errors.password ? ' error' : ''}`}
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  aria-describedby={errors.password ? 'reg-password-error' : 'reg-password-strength'}
                  aria-invalid={!!errors.password}
                  aria-required="true"
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
                <span id="reg-password-error" className="form-error" role="alert">
                  {errors.password}
                </span>
              )}
              {form.password && !errors.password && (
                <div className="password-strength" id="reg-password-strength" aria-live="polite">
                  <div className="password-strength-bar">
                    <div
                      className="password-strength-fill"
                      style={{ width: `${strength.score}%`, background: strength.color }}
                      aria-valuenow={strength.score}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      role="progressbar"
                    />
                  </div>
                  <span
                    className="password-strength-text"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group full">
              <label className="form-label" htmlFor="reg-confirm-password">Confirm Password *</label>
              <div className="input-wrapper">
                <input
                  id="reg-confirm-password"
                  name="confirmPassword"
                  type={showConf ? 'text' : 'password'}
                  className={`form-input${errors.confirmPassword ? ' error' : ''}`}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  aria-describedby={errors.confirmPassword ? 'reg-confirm-error' : undefined}
                  aria-invalid={!!errors.confirmPassword}
                  aria-required="true"
                />
                <button
                  type="button"
                  className="input-toggle-btn"
                  onClick={() => setShowConf(p => !p)}
                  aria-label={showConf ? 'Hide confirm password' : 'Show confirm password'}
                >
                  {showConf ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <span id="reg-confirm-error" className="form-error" role="alert">
                  {errors.confirmPassword}
                </span>
              )}
              {form.confirmPassword && !errors.confirmPassword && form.password === form.confirmPassword && (
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)' }}>
                  ✓ Passwords match
                </span>
              )}
            </div>

          </div>

          <button
            id="student-register-submit-btn"
            type="submit"
            className="auth-submit-btn register"
            aria-label="Submit student registration"
          >
            ✨ Create Account
          </button>
        </form>

        <div className="auth-footer-links">
          <p>
            Already have an account?{' '}
            <Link to="/login/student" id="register-to-login-link">Login here →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
