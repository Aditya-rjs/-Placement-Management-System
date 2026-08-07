/**
 * AdminManagementView.jsx
 * Super Admin Management Page & Role-Based Access Control (RBAC).
 * Supports:
 *  - Viewing all Admin accounts (Max 5: 1 Super Admin + 4 Additional Admins)
 *  - Creating new Admin accounts
 *  - Editing Admin email & details
 *  - Resetting another Admin's password
 *  - Enabling / Disabling Admin accounts
 *  - Deleting Admin accounts
 *  - RBAC protection: Only SUPER_ADMIN role can access this page.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  Edit3,
  KeyRound,
  Trash2,
  Power,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Users,
  Lock,
  Mail,
  User,
  Shield
} from 'lucide-react';
import {
  getAdminAccounts,
  getCurrentSession,
  createAdmin,
  updateAdmin,
  resetAdminPassword,
  toggleAdminStatus,
  deleteAdmin
} from '../../../services/adminAuthService';

export default function AdminManagementView() {
  const currentAdmin = getCurrentSession();
  const isSuperAdmin = currentAdmin && currentAdmin.role === 'SUPER_ADMIN';

  // Data state
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null); // admin object
  const [showResetModal, setShowResetModal] = useState(null); // admin object
  const [showDeleteModal, setShowDeleteModal] = useState(null); // admin object

  // Form states
  const [addForm, setAddForm] = useState({ name: '', email: '', password: '', role: 'NORMAL_ADMIN' });
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'NORMAL_ADMIN' });
  const [resetForm, setResetForm] = useState({ newPassword: '', confirmPassword: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load admins on mount
  const refreshAdmins = () => {
    const list = getAdminAccounts();
    setAdmins(list);
  };

  useEffect(() => {
    refreshAdmins();
  }, []);

  const showNotification = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 5000);
  };

  // ── Access Denied for Normal Admins ──────────────────────────────────────
  if (!isSuperAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '2rem 0' }}
      >
        <div
          style={{
            maxWidth: '680px',
            margin: '2rem auto',
            padding: '3rem 2rem',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#ef4444',
            }}
          >
            <ShieldAlert size={32} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
            Super Admin Access Required
          </h2>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            You are currently logged in as a <strong>Normal Administrator</strong>. Only the default <strong>Super Admin</strong> (`bringaditya1212@gmail.com`) has permission to manage Admin accounts, reset credentials, or configure security roles.
          </p>

          <div className="mono-badge" style={{ display: 'inline-block', padding: '0.4rem 1rem' }}>
            Role-Based Access Control (RBAC) Enforced
          </div>
        </div>
      </motion.div>
    );
  }

  // ── Super Admin Management View ──────────────────────────────────────────
  const totalCount = admins.length;
  const isLimitReached = totalCount >= 5;
  const additionalAdminsCount = admins.filter(a => !a.isDefault).length;

  const filteredAdmins = admins.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Handlers ─────────────────────────────────────────────────────────────

  // Add Admin
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!addForm.name.trim() || !addForm.email.trim() || !addForm.password) {
      setFormError('All fields are required.');
      return;
    }
    if (addForm.password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createAdmin(addForm, currentAdmin);
      refreshAdmins();
      setShowAddModal(false);
      setAddForm({ name: '', email: '', password: '', role: 'NORMAL_ADMIN' });
      showNotification('success', `Admin account for "${addForm.name}" created successfully.`);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit Admin
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!editForm.name.trim() || !editForm.email.trim()) {
      setFormError('Name and email are required.');
      return;
    }

    try {
      updateAdmin(showEditModal.id, editForm, currentAdmin);
      refreshAdmins();
      setShowEditModal(null);
      showNotification('success', `Admin details updated for "${editForm.name}".`);
    } catch (err) {
      setFormError(err.message);
    }
  };

  // Reset Password
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!resetForm.newPassword) {
      setFormError('New password is required.');
      return;
    }
    if (resetForm.newPassword.length < 6) {
      setFormError('New password must be at least 6 characters.');
      return;
    }
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetAdminPassword(showResetModal.id, resetForm.newPassword, currentAdmin);
      setShowResetModal(null);
      setResetForm({ newPassword: '', confirmPassword: '' });
      showNotification('success', `Password reset successfully for "${showResetModal.email}".`);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Enable/Disable
  const handleToggleStatus = (admin) => {
    try {
      const updated = toggleAdminStatus(admin.id, currentAdmin);
      refreshAdmins();
      showNotification('info', `Account status for "${admin.name}" set to ${updated.status.toUpperCase()}.`);
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  // Delete Admin
  const handleDeleteConfirm = () => {
    if (!showDeleteModal) return;
    try {
      deleteAdmin(showDeleteModal.id, currentAdmin);
      refreshAdmins();
      showNotification('success', `Admin account "${showDeleteModal.email}" deleted successfully.`);
      setShowDeleteModal(null);
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* View Header */}
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Admin Management</h1>
          <p>Super Admin Security Console: Manage administrative accounts, roles, access permissions, and credential security.</p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={isLimitReached}
          onClick={() => {
            setFormError('');
            setAddForm({ name: '', email: '', password: '', role: 'NORMAL_ADMIN' });
            setShowAddModal(true);
          }}
          style={isLimitReached ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
        >
          <UserPlus size={16} />
          <span>{isLimitReached ? 'Admin Limit Reached (5/5)' : 'Add New Admin'}</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.12)' : feedback.type === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(37, 99, 235, 0.12)',
            border: `1px solid ${feedback.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : feedback.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(37, 99, 235, 0.3)'}`,
            color: feedback.type === 'success' ? '#34d399' : feedback.type === 'error' ? '#f87171' : '#60a5fa',
          }}
        >
          {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </motion.div>
      )}

      {/* Account Limit Counter Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper purple">
            <ShieldCheck size={24} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{totalCount} / 5</span>
            <span className="admin-stat-label">Total Admin Accounts</span>
            <span className="admin-stat-change up">
              System Maximum = 5 Accounts
            </span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper blue">
            <Shield size={24} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">1</span>
            <span className="admin-stat-label">Default Super Admin</span>
            <span className="admin-stat-change up">bringaditya1212@gmail.com</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper green">
            <Users size={24} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">{additionalAdminsCount} / 4</span>
            <span className="admin-stat-label">Additional Admins</span>
            <span className="admin-stat-change up">
              {4 - additionalAdminsCount} slots available
            </span>
          </div>
        </div>
      </div>

      {/* Admin Accounts Table Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <ShieldCheck size={18} color="var(--color-primary-light)" /> System Administrator Accounts
            </h3>
            <p className="admin-card-subtitle">Manage administrative privileges, credentials, and access status.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div className="admin-search-box" style={{ width: '260px' }}>
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search admin name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Admin Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Account Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => {
                const isDefaultSuper = admin.isDefault;
                return (
                  <tr key={admin.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: admin.role === 'SUPER_ADMIN' ? 'linear-gradient(135deg, #a855f7, #6b21a8)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        >
                          {admin.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--color-text)' }}>{admin.name}</div>
                          {isDefaultSuper && (
                            <span style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 600 }}>Default Super Admin</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{admin.email}</td>
                    <td>
                      {admin.role === 'SUPER_ADMIN' ? (
                        <span className="admin-badge warning" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                          <Shield size={12} /> Super Admin
                        </span>
                      ) : (
                        <span className="admin-badge info">
                          <User size={12} /> Normal Admin
                        </span>
                      )}
                    </td>
                    <td>
                      {admin.status === 'active' ? (
                        <span className="admin-badge success">Active</span>
                      ) : (
                        <span className="admin-badge danger">Disabled</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        {/* Edit */}
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          title="Edit Admin Details"
                          style={{ padding: '0.35rem 0.6rem' }}
                          onClick={() => {
                            setFormError('');
                            setEditForm({ name: admin.name, email: admin.email, role: admin.role });
                            setShowEditModal(admin);
                          }}
                        >
                          <Edit3 size={13} /> Edit
                        </button>

                        {/* Reset Password */}
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          title="Reset Password"
                          style={{ padding: '0.35rem 0.6rem' }}
                          onClick={() => {
                            setFormError('');
                            setResetForm({ newPassword: '', confirmPassword: '' });
                            setShowResetModal(admin);
                          }}
                        >
                          <KeyRound size={13} /> Reset Pass
                        </button>

                        {/* Toggle Enable/Disable */}
                        {!isDefaultSuper && (
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            title={admin.status === 'active' ? 'Disable Account' : 'Enable Account'}
                            style={{
                              padding: '0.35rem 0.6rem',
                              color: admin.status === 'active' ? '#fbbf24' : '#34d399',
                              borderColor: admin.status === 'active' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)',
                            }}
                            onClick={() => handleToggleStatus(admin)}
                          >
                            <Power size={13} /> {admin.status === 'active' ? 'Disable' : 'Enable'}
                          </button>
                        )}

                        {/* Delete Admin */}
                        {!isDefaultSuper && (
                          <button
                            type="button"
                            className="btn btn-sm"
                            title="Delete Admin Account"
                            style={{ padding: '0.35rem 0.6rem', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                            onClick={() => setShowDeleteModal(admin)}
                          >
                            <Trash2 size={13} /> Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══ MODALS ══════════════════════════════════════════════════════════ */}

      {/* 1. Add Admin Modal */}
      {showAddModal && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserPlus size={18} color="var(--color-primary-light)" /> Add New Administrator
              </h3>
              <button type="button" onClick={() => setShowAddModal(false)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: '1rem' }}>
              {formError && <div className="form-error" style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)', borderRadius: '4px' }}>⚠️ {formError}</div>}

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter administrator name"
                  value={addForm.name}
                  onChange={e => setAddForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter admin email address"
                  value={addForm.email}
                  onChange={e => setAddForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Minimum 6 characters"
                  value={addForm.password}
                  onChange={e => setAddForm(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Admin Role</label>
                <select
                  className="form-input"
                  value={addForm.role}
                  onChange={e => setAddForm(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="NORMAL_ADMIN">Normal Admin (Dashboard Access, No Admin Management)</option>
                  <option value="SUPER_ADMIN">Super Admin (Full Control Over System &amp; Admins)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Admin Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit Admin Modal */}
      {showEditModal && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 size={18} color="var(--color-primary-light)" /> Edit Admin: {showEditModal.name}
              </h3>
              <button type="button" onClick={() => setShowEditModal(null)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: '1rem' }}>
              {formError && <div className="form-error" style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)', borderRadius: '4px' }}>⚠️ {formError}</div>}

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editForm.name}
                  onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={editForm.email}
                  onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              {!showEditModal.isDefault && (
                <div className="form-group">
                  <label className="form-label">Admin Role</label>
                  <select
                    className="form-input"
                    value={editForm.role}
                    onChange={e => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                  >
                    <option value="NORMAL_ADMIN">Normal Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowEditModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Reset Password Modal */}
      {showResetModal && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <KeyRound size={18} color="#fbbf24" /> Reset Password for {showResetModal.email}
              </h3>
              <button type="button" onClick={() => setShowResetModal(null)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <form onSubmit={handleResetSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginTop: '1rem' }}>
              {formError && <div className="form-error" style={{ padding: '0.5rem', background: 'rgba(239,68,68,0.1)', borderRadius: '4px' }}>⚠️ {formError}</div>}

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter new password (min 6 chars)"
                  value={resetForm.newPassword}
                  onChange={e => setResetForm(prev => ({ ...prev, newPassword: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Confirm new password"
                  value={resetForm.confirmPassword}
                  onChange={e => setResetForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowResetModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#f59e0b' }}>
                  Set New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <div style={modalHeaderStyle}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Trash2 size={18} color="#f87171" /> Confirm Delete Admin Account
              </h3>
              <button type="button" onClick={() => setShowDeleteModal(null)} style={closeBtnStyle}><X size={18} /></button>
            </div>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: '1rem 0' }}>
              Are you sure you want to delete the Admin account for <strong>{showDeleteModal.name}</strong> (`{showDeleteModal.email}`)? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowDeleteModal(null)}>Cancel</button>
              <button type="button" className="btn btn-sm" style={{ background: '#ef4444', color: '#fff' }} onClick={handleDeleteConfirm}>
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Inline modal styles
const modalOverlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
  backdropFilter: 'blur(8px)',
  zIndex: 999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.5rem',
};

const modalBoxStyle = {
  background: 'var(--color-bg-card)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-xl)',
  width: '100%',
  maxWidth: '480px',
  padding: '1.75rem',
  boxShadow: 'var(--shadow-lg)',
};

const modalHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBottom: '0.75rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--color-text-muted)',
  cursor: 'pointer',
};
