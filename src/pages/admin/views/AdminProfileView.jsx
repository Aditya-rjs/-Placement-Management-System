/**
 * AdminProfileView.jsx
 * Account Settings & Credential Management Page.
 * Allows Super Admin and Admins to update their Email and Password.
 * Changes persist immediately in adminAuthService & storage.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, KeyRound, Mail, User, Save, CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { getCurrentSession, updateSelfProfile } from '../../../services/adminAuthService';

export default function AdminProfileView() {
  const currentAdmin = getCurrentSession();

  const [email, setEmail] = useState(currentAdmin?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // If attempting password change, validate inputs
    if (newPassword || currentPassword) {
      if (!currentPassword) {
        setErrorMsg('Please enter your current password to save changes.');
        return;
      }
      if (newPassword.length < 6) {
        setErrorMsg('New password must be at least 6 characters.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMsg('New passwords do not match.');
        return;
      }
    }

    if (!email.trim()) {
      setErrorMsg('Email address cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    try {
      await updateSelfProfile(
        {
          email: email.trim(),
          currentPassword,
          newPassword: newPassword || undefined,
        },
        currentAdmin
      );

      setSuccessMsg('Account credentials updated successfully. Your new credentials are now active for future logins.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Account Settings &amp; Profile</h1>
          <p>Update your administrator credentials, email address, and account password.</p>
        </div>
      </div>

      {successMsg && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-lg)',
            color: '#34d399',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-lg)',
            color: '#f87171',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="admin-card" style={{ maxWidth: '680px' }}>
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <Shield size={18} color="var(--color-primary-light)" /> Admin Credential Settings
            </h3>
            <p className="admin-card-subtitle">
              Current Role: <strong style={{ color: '#c084fc' }}>{currentAdmin?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Normal Admin'}</strong>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Admin Name</label>
            <input type="text" className="form-input" value={currentAdmin?.name || ''} readOnly style={{ opacity: 0.7 }} />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter new email address"
            />
          </div>

          <div style={{ padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', margin: '0.5rem 0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <KeyRound size={16} color="#fbbf24" /> Change Password (Optional)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password to authorize changes"
                />
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="submit" className="btn btn-primary btn-md" disabled={isSubmitting}>
              <Save size={16} />
              <span>{isSubmitting ? 'Saving Changes...' : 'Save Updated Credentials'}</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
