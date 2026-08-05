import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Hash,
  GraduationCap,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { APP_CONFIG } from '../../config/app.config';
import LNJPITLogo from '../LNJPITLogo';
import '../../styles/Auth.css';

const BRANCHES = [
  'Computer Science & Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Artificial Intelligence & Data Science',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
];

const BATCHES = ['2021 - 2025', '2022 - 2026', '2023 - 2027', '2024 - 2028'];

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  regNumber: '',
  branch: '',
  batch: '',
  password: '',
  confirmPassword: '',
};

const VALIDATORS = {
  fullName: (v) => {
    if (!v.trim()) return 'Full name is required';
    if (v.trim().length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s.'-]+$/.test(v)) return 'Name can only contain letters';
    return '';
  },
  phone: (v) => {
    if (!v.trim()) return 'Phone number is required';
    if (!/^[6-9]\d{9}$/.test(v.replace(/\s/g, ''))) return 'Enter valid 10-digit mobile number';
    return '';
  },
  email: (v) => {
    if (!v.trim()) return 'Institutional email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter valid email address';
    return '';
  },
  regNumber: (v) => {
    if (!v.trim()) return 'Registration number is required';
    if (v.trim().length < 5) return 'Reg number must be at least 5 characters';
    return '';
  },
  branch: (v) => (!v ? 'Select engineering branch' : ''),
  batch: (v) => (!v ? 'Select graduation batch' : ''),
  password: (v) => {
    if (!v) return 'Password is required';
    if (v.length < 8) return 'Minimum 8 characters';
    if (!/[A-Z]/.test(v)) return 'Requires 1 uppercase letter';
    if (!/[0-9]/.test(v)) return 'Requires 1 number';
    if (!/[^A-Za-z0-9]/.test(v)) return 'Requires 1 special character';
    return '';
  },
  confirmPassword: (v, form) => {
    if (!v) return 'Please confirm password';
    if (v !== form.password) return 'Passwords do not match';
    return '';
  },
};

export default function StudentRegisterForm({ onSwitchToLogin }) {
  const [form, setForm]                 = useState(INITIAL_FORM);
  const [errors, setErrors]             = useState({});
  const [focused, setFocused]           = useState({});
  const [showPass, setShowPass]         = useState(false);
  const [showConf, setShowConf]         = useState(false);
  const [capsLockOn, setCapsLockOn]     = useState(false);
  const [loadingState, setLoadingState] = useState('idle');

  const handleKeyDown = (e) => {
    if (e.getModifierState) {
      setCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  const validateField = useCallback((name, value, currentForm) => {
    const fn = VALIDATORS[name];
    return fn ? fn(value, currentForm ?? form) : '';
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value, updatedForm),
      ...(name === 'password' && form.confirmPassword
        ? { confirmPassword: VALIDATORS.confirmPassword(form.confirmPassword, updatedForm) }
        : {}),
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    let hasErr = false;
    Object.keys(INITIAL_FORM).forEach(k => {
      const err = VALIDATORS[k]?.(form[k], form) ?? '';
      newErrors[k] = err;
      if (err) hasErr = true;
    });
    setErrors(newErrors);
    return !hasErr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoadingState('creating');

    setTimeout(() => {
      setLoadingState('success');
    }, 1200);
  };

  const reqMin8 = form.password.length >= 8;
  const reqUpper = /[A-Z]/.test(form.password);
  const reqNum   = /[0-9]/.test(form.password);
  const reqSpec  = /[^A-Za-z0-9]/.test(form.password);

  if (loadingState === 'success') {
    return (
      <div className="auth-card-modern" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-success)' }}>
          <CheckCircle2 size={36} />
        </div>

        <h2 className="auth-card-main-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
          🎉 Registration Successful!
        </h2>

        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6, marginBottom: '2rem' }}>
          Your candidate profile for <strong>{form.fullName}</strong> ({form.regNumber}) has been created successfully.<br />
          You can now log in using your institutional email address.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary btn-sm" onClick={onSwitchToLogin}>
            <span>Sign in to Student Portal</span>
            <ArrowRight size={16} />
          </button>
          <Link to="/" className="btn btn-outline btn-sm" id="goto-home-btn">
            Back to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card-modern wide">
      <div className="auth-institution-header">
        <span className="auth-portal-type-badge student">
          <UserPlus size={14} /> Student Candidate Registration
        </span>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
          <LNJPITLogo size={36} />
        </div>

        <h2 className="auth-card-main-title">Create Candidate Profile</h2>
        <p className="auth-card-main-sub">
          Register for upcoming campus recruitment drives &amp; candidate verification
        </p>
      </div>

      <form id="student-register-form" onSubmit={handleSubmit} noValidate>
        <div className="auth-section-divider">
          <span className="auth-section-divider-title">1. Personal Information</span>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className={`floating-input-wrapper ${focused.fullName ? 'focused' : ''} ${form.fullName ? 'has-value' : ''}`}>
              <User size={18} className="input-leading-icon" />
              <input
                id="reg-fullname"
                name="fullName"
                type="text"
                className={`form-input${errors.fullName ? ' error' : ''}`}
                value={form.fullName}
                onChange={handleChange}
                onFocus={() => setFocused(prev => ({ ...prev, fullName: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, fullName: false }))}
                autoComplete="name"
              />
              <label className="floating-label" htmlFor="reg-fullname">Full Name (e.g. Rahul Sharma)</label>
              {form.fullName && !errors.fullName && (
                <div className="input-trailing-box"><CheckCircle2 size={15} color="var(--color-success)" /></div>
              )}
            </div>
            {errors.fullName && <span className="validation-status-text invalid"><AlertCircle size={12} /> {errors.fullName}</span>}
          </div>

          <div className="form-group">
            <div className={`floating-input-wrapper ${focused.phone ? 'focused' : ''} ${form.phone ? 'has-value' : ''}`}>
              <Phone size={18} className="input-leading-icon" />
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                className={`form-input${errors.phone ? ' error' : ''}`}
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setFocused(prev => ({ ...prev, phone: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, phone: false }))}
                maxLength={10}
                autoComplete="tel"
              />
              <label className="floating-label" htmlFor="reg-phone">Phone Number (10 digits)</label>
              {form.phone && !errors.phone && (
                <div className="input-trailing-box"><CheckCircle2 size={15} color="var(--color-success)" /></div>
              )}
            </div>
            {errors.phone && <span className="validation-status-text invalid"><AlertCircle size={12} /> {errors.phone}</span>}
          </div>

          <div className="form-group full">
            <div className={`floating-input-wrapper ${focused.email ? 'focused' : ''} ${form.email ? 'has-value' : ''}`}>
              <Mail size={18} className="input-leading-icon" />
              <input
                id="reg-email"
                name="email"
                type="email"
                className={`form-input${errors.email ? ' error' : ''}`}
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused(prev => ({ ...prev, email: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, email: false }))}
                autoComplete="email"
              />
              <label className="floating-label" htmlFor="reg-email">Institutional Email (e.g. rahul@lnjpit.ac.in)</label>
              {form.email && !errors.email && (
                <div className="input-trailing-box"><CheckCircle2 size={15} color="var(--color-success)" /></div>
              )}
            </div>
            {errors.email && <span className="validation-status-text invalid"><AlertCircle size={12} /> {errors.email}</span>}
          </div>
        </div>

        <div className="auth-section-divider">
          <span className="auth-section-divider-title">2. Academic Information</span>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <div className={`floating-input-wrapper ${focused.regNumber ? 'focused' : ''} ${form.regNumber ? 'has-value' : ''}`}>
              <Hash size={18} className="input-leading-icon" />
              <input
                id="reg-regnumber"
                name="regNumber"
                type="text"
                className={`form-input${errors.regNumber ? ' error' : ''}`}
                value={form.regNumber}
                onChange={handleChange}
                onFocus={() => setFocused(prev => ({ ...prev, regNumber: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, regNumber: false }))}
              />
              <label className="floating-label" htmlFor="reg-regnumber">Registration Number (e.g. 21105128001)</label>
              {form.regNumber && !errors.regNumber && (
                <div className="input-trailing-box"><CheckCircle2 size={15} color="var(--color-success)" /></div>
              )}
            </div>
            {errors.regNumber && <span className="validation-status-text invalid"><AlertCircle size={12} /> {errors.regNumber}</span>}
          </div>

          <div className="form-group">
            <div className={`floating-input-wrapper ${focused.branch ? 'focused' : ''} ${form.branch ? 'has-value' : ''}`}>
              <GraduationCap size={18} className="input-leading-icon" />
              <select
                id="reg-branch"
                name="branch"
                className={`form-input${errors.branch ? ' error' : ''}`}
                value={form.branch}
                onChange={handleChange}
                onFocus={() => setFocused(prev => ({ ...prev, branch: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, branch: false }))}
                style={{ paddingTop: form.branch ? '1.25rem' : '0.7rem' }}
              >
                <option value="">Select Engineering Branch</option>
                {BRANCHES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {form.branch && (
                <label className="floating-label" htmlFor="reg-branch" style={{ top: '0.65rem', transform: 'translateY(0)', fontSize: '0.675rem' }}>
                  Engineering Branch
                </label>
              )}
            </div>
            {errors.branch && <span className="validation-status-text invalid"><AlertCircle size={12} /> {errors.branch}</span>}
          </div>

          <div className="form-group full">
            <div className={`floating-input-wrapper ${focused.batch ? 'focused' : ''} ${form.batch ? 'has-value' : ''}`}>
              <Calendar size={18} className="input-leading-icon" />
              <select
                id="reg-batch"
                name="batch"
                className={`form-input${errors.batch ? ' error' : ''}`}
                value={form.batch}
                onChange={handleChange}
                onFocus={() => setFocused(prev => ({ ...prev, batch: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, batch: false }))}
                style={{ paddingTop: form.batch ? '1.25rem' : '0.7rem' }}
              >
                <option value="">Select Graduation Batch</option>
                {BATCHES.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {form.batch && (
                <label className="floating-label" htmlFor="reg-batch" style={{ top: '0.65rem', transform: 'translateY(0)', fontSize: '0.675rem' }}>
                  Graduation Batch
                </label>
              )}
            </div>
            {errors.batch && <span className="validation-status-text invalid"><AlertCircle size={12} /> {errors.batch}</span>}
          </div>
        </div>

        <div className="auth-section-divider">
          <span className="auth-section-divider-title">3. Account Security</span>
        </div>

        <div className="form-grid-2">
          <div className="form-group full">
            <div className={`floating-input-wrapper ${focused.password ? 'focused' : ''} ${form.password ? 'has-value' : ''}`}>
              <Lock size={18} className="input-leading-icon" />
              <input
                id="reg-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                className={`form-input${errors.password ? ' error' : ''}`}
                value={form.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(prev => ({ ...prev, password: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, password: false }))}
                autoComplete="new-password"
              />
              <label className="floating-label" htmlFor="reg-password">Password</label>

              <div className="input-trailing-box">
                <button
                  type="button"
                  className="input-action-toggle"
                  onClick={() => setShowPass(p => !p)}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {capsLockOn && <div className="caps-lock-warning">⚠️ Caps Lock is ON</div>}

            <div className="password-req-list">
              <span className={`password-req-item ${reqMin8 ? 'met' : ''}`}>
                {reqMin8 ? '✓' : '•'} Min 8 characters
              </span>
              <span className={`password-req-item ${reqUpper ? 'met' : ''}`}>
                {reqUpper ? '✓' : '•'} One uppercase
              </span>
              <span className={`password-req-item ${reqNum ? 'met' : ''}`}>
                {reqNum ? '✓' : '•'} One number
              </span>
              <span className={`password-req-item ${reqSpec ? 'met' : ''}`}>
                {reqSpec ? '✓' : '•'} One special char
              </span>
            </div>
          </div>

          <div className="form-group full">
            <div className={`floating-input-wrapper ${focused.confirmPassword ? 'focused' : ''} ${form.confirmPassword ? 'has-value' : ''}`}>
              <Lock size={18} className="input-leading-icon" />
              <input
                id="reg-confirm-password"
                name="confirmPassword"
                type={showConf ? 'text' : 'password'}
                className={`form-input${errors.confirmPassword ? ' error' : ''}`}
                value={form.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocused(prev => ({ ...prev, confirmPassword: true }))}
                onBlur={() => setFocused(prev => ({ ...prev, confirmPassword: false }))}
                autoComplete="new-password"
              />
              <label className="floating-label" htmlFor="reg-confirm-password">Confirm Password</label>

              <div className="input-trailing-box">
                <button
                  type="button"
                  className="input-action-toggle"
                  onClick={() => setShowConf(p => !p)}
                >
                  {showConf ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {errors.confirmPassword && (
              <span className="validation-status-text invalid"><AlertCircle size={12} /> {errors.confirmPassword}</span>
            )}
            {form.confirmPassword && !errors.confirmPassword && form.password === form.confirmPassword && (
              <span className="validation-status-text valid"><CheckCircle2 size={12} /> Passwords match</span>
            )}
          </div>
        </div>

        <button
          id="student-register-submit-btn"
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={loadingState !== 'idle'}
          style={{ width: '100%', marginTop: '1.25rem' }}
        >
          {loadingState === 'creating' ? (
            <>
              <span className="btn-spinner" />
              <span>Creating Candidate Account...</span>
            </>
          ) : (
            <>
              <span>Create Candidate Account</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="auth-footer-links">
        <p>
          Already have a candidate account?{' '}
          <button type="button" onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary-light)', fontWeight: 600, fontSize: 'inherit', padding: 0 }}>
            Sign in to Student Portal →
          </button>
        </p>
      </div>
    </div>
  );
}
