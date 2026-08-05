/**
 * StudentRegister.jsx
 * Technical Student Candidate Registration Form.
 */

import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  UserPlus,
  ArrowLeft,
  Eye,
  EyeOff,
  Building2,
  CheckCircle2,
  UserCheck
} from 'lucide-react';
import { APP_CONFIG } from '../config/app.config';
import '../styles/Auth.css';

const BRANCHES = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Artificial Intelligence & Data Science',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Other Stream',
];

const BATCHES = ['2021 - 2025', '2022 - 2026', '2023 - 2027', '2024 - 2028'];

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

const VALIDATORS = {
  fullName: (v) => {
    if (!v.trim()) return 'Full name is required.';
    if (v.trim().length < 3) return 'Name must be at least 3 characters.';
    if (!/^[a-zA-Z\s.'-]+$/.test(v)) return 'Name can only contain letters and spaces.';
    return '';
  },
  branch: (v) => (!v ? 'Please select your engineering branch.' : ''),
  regNumber: (v) => {
    if (!v.trim()) return 'Registration number is required.';
    if (v.trim().length < 5) return 'Registration number must be at least 5 characters.';
    return '';
  },
  batch: (v) => (!v ? 'Please select your graduation batch.' : ''),
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required.';
    if (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, '')))
      return 'Enter a valid 10-digit mobile number.';
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
    if (!/[A-Z]/.test(v)) return 'Must contain at least 1 uppercase letter.';
    if (!/[0-9]/.test(v)) return 'Must contain at least 1 number.';
    return '';
  },
  confirmPassword: (v, form) => {
    if (!v) return 'Please confirm your password.';
    if (v !== form.password) return 'Passwords do not match.';
    return '';
  },
};

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 20, label: 'Weak', color: '#ef4444' };
  if (score === 2) return { score: 40, label: 'Fair', color: '#f59e0b' };
  if (score === 3) return { score: 70, label: 'Good', color: '#3b82f6' };
  return                  { score: 100, label: 'Strong', color: '#10b981' };
}

export default function StudentRegister() {
  const [form, setForm]           = useState(INITIAL_FORM);
  const [errors, setErrors]       = useState(INITIAL_ERRORS);
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched]     = useState({});

  const strength = getPasswordStrength(form.password);

  const validateField = useCallback((name, value, currentForm) => {
    const validator = VALIDATORS[name];
    if (!validator) return '';
    return validator(value, currentForm ?? form);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value, updatedForm),
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
  };

  if (submitted) {
    return (
      <div className="auth-page" id="student-register-success-page">
        <div className="auth-card" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div className="auth-card-icon-badge student" style={{ width: '64px', height: '64px', margin: '0 auto 1.5rem' }}>
            <CheckCircle2 size={32} />
          </div>
          <h1 className="auth-card-title" style={{ marginBottom: '0.5rem' }}>
            Candidate Profile Created
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
            Your student candidate registration for <strong>{form.fullName}</strong> ({form.regNumber}) has been submitted successfully.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link to="/login/student" className="btn btn-primary btn-sm" id="goto-student-login-btn">
              Proceed to Student Login
            </Link>
            <Link to="/" className="btn btn-outline btn-sm" id="goto-home-btn">
              Back to Overview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page" id="student-register-page">
      <div className="auth-card wide">

        <Link to="/login/student" className="auth-back-link">
          <ArrowLeft size={16} /> Back to Student Login
        </Link>

        <div className="auth-card-header">
          <div className="auth-card-icon-badge student">
            <UserPlus size={26} />
          </div>
          <div className="auth-college-tag">
            <Building2 size={13} /> {APP_CONFIG.collegeName}
          </div>
          <h1 className="auth-card-title">Student Candidate Registration</h1>
          <p className="auth-card-subtitle">
            Register your candidate record for upcoming placement drives &amp; recruitment activities
          </p>
        </div>

        <form
          id="student-register-form"
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
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
                placeholder="Rahul Sharma"
                value={form.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
              />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>

            {/* Branch */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-branch">Academic Branch *</label>
              <select
                id="reg-branch"
                name="branch"
                className={`form-input${errors.branch ? ' error' : ''}`}
                value={form.branch}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Engineering Branch</option>
                {BRANCHES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {errors.branch && <span className="form-error">{errors.branch}</span>}
            </div>

            {/* Registration Number */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-regnumber">Registration Number *</label>
              <input
                id="reg-regnumber"
                name="regNumber"
                type="text"
                className={`form-input${errors.regNumber ? ' error' : ''}`}
                placeholder="2021CSE084"
                value={form.regNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.regNumber && <span className="form-error">{errors.regNumber}</span>}
            </div>

            {/* Batch */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-batch">Graduation Batch *</label>
              <select
                id="reg-batch"
                name="batch"
                className={`form-input${errors.batch ? ' error' : ''}`}
                value={form.batch}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Graduation Batch</option>
                {BATCHES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {errors.batch && <span className="form-error">{errors.batch}</span>}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-phone">Contact Phone *</label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                className={`form-input${errors.phone ? ' error' : ''}`}
                placeholder="9876543210"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={10}
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Institutional Email *</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                className={`form-input${errors.email ? ' error' : ''}`}
                placeholder="rahul.sharma@xyztech.edu.in"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group full">
              <label className="form-label" htmlFor="reg-password">Account Password *</label>
              <div className="input-wrapper">
                <input
                  id="reg-password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  className={`form-input${errors.password ? ' error' : ''}`}
                  placeholder="Min 8 chars, 1 uppercase letter, 1 number"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
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
              {form.password && !errors.password && (
                <div className="password-strength">
                  <div className="password-strength-bar">
                    <div
                      className="password-strength-fill"
                      style={{ width: `${strength.score}%`, background: strength.color }}
                    />
                  </div>
                  <span className="password-strength-text" style={{ color: strength.color }}>
                    Password Strength: {strength.label}
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
                  placeholder="Re-enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="input-toggle-btn"
                  onClick={() => setShowConf(p => !p)}
                  aria-label={showConf ? 'Hide password' : 'Show password'}
                >
                  {showConf ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              {form.confirmPassword && !errors.confirmPassword && form.password === form.confirmPassword && (
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-success)', fontWeight: 500 }}>
                  ✓ Passwords match
                </span>
              )}
            </div>

          </div>

          <button
            id="student-register-submit-btn"
            type="submit"
            className="btn btn-primary auth-submit-btn"
            style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
          >
            Create Candidate Account
          </button>
        </form>

        <div className="auth-footer-links">
          <p>
            Already registered? <Link to="/login/student">Log in to Student Portal</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
