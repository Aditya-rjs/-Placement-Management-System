import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

const STEPS = [
  { id: 'personal', label: 'Personal', fields: ['fullName', 'phone'] },
  { id: 'academic', label: 'Academic', fields: ['email', 'regNumber'] },
  { id: 'details', label: 'Details', fields: ['branch', 'batch'] },
  { id: 'security', label: 'Security', fields: ['password', 'confirmPassword'] },
];

export default function StudentRegisterForm({ onSwitchToLogin }) {
  const [form, setForm]                 = useState(INITIAL_FORM);
  const [errors, setErrors]             = useState({});
  const [focused, setFocused]           = useState({});
  const [showPass, setShowPass]         = useState(false);
  const [showConf, setShowConf]         = useState(false);
  const [capsLockOn, setCapsLockOn]     = useState(false);
  const [loadingState, setLoadingState] = useState('idle');
  const [currentStep, setCurrentStep]   = useState(0);

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

  const handleSubmitFinal = () => {
    setLoadingState('creating');
    setTimeout(() => { setLoadingState('success'); }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    handleSubmitFinal();
  };
  
  const handleNext = () => {
    const stepFields = STEPS[currentStep].fields;
    const stepErrors = {};
    let hasError = false;
    stepFields.forEach(field => {
      const err = VALIDATORS[field]?.(form[field], form) ?? '';
      stepErrors[field] = err;
      if (err) hasError = true;
    });
    setErrors(prev => ({ ...prev, ...stepErrors }));
    if (!hasError) {
      if (currentStep === STEPS.length - 1) {
        handleSubmitFinal();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
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

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
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
          </div>
        );
      case 1:
        return (
          <div className="form-grid-2">
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
            
            <div className="form-group full">
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
          </div>
        );
      case 2:
        return (
          <div className="form-grid-2">
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
        );
      case 3:
        return (
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="auth-card-modern">
      <div className="auth-stepper" role="list">
        {STEPS.map((step, idx) => (
          <div key={step.id} className="auth-step-item" role="listitem">
            <div className={`auth-step-dot ${
              currentStep > idx ? 'completed' : currentStep === idx ? 'active' : ''
            }`}>
              {currentStep > idx ? <CheckCircle2 size={16} /> : idx + 1}
            </div>
            <span className={`auth-step-label ${
              currentStep > idx ? 'completed' : currentStep === idx ? 'active' : ''
            }`}>{step.label}</span>
          </div>
        ))}
      </div>

      <form id="student-register-form" onSubmit={(e) => { e.preventDefault(); handleNext(); }} noValidate>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, exit: { duration: 0.2 } }}
          >
            {renderStepContent(currentStep)}
          </motion.div>
        </AnimatePresence>

        <div className="auth-step-actions">
          {currentStep > 0 && (
            <button
              type="button"
              className="btn btn-outline auth-step-btn-back"
              onClick={handleBack}
              disabled={loadingState !== 'idle'}
            >
              Back
            </button>
          )}
          <button
            id="student-register-submit-btn"
            type="button"
            className="btn btn-primary auth-step-btn-next"
            onClick={handleNext}
            disabled={loadingState !== 'idle'}
          >
            {loadingState === 'creating' ? (
              <>
                <span className="btn-spinner" />
                <span>Creating Account...</span>
              </>
            ) : currentStep === STEPS.length - 1 ? (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} />
              </>
            ) : (
              <>
                <span>Next</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
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
