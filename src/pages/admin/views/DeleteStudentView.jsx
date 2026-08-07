/**
 * DeleteStudentView.jsx
 * Manage Students -> Delete Student UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { UserMinus, Trash2, Search, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function DeleteStudentView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Delete Student Account</h1>
          <p>Search and remove or de-list candidate records from active placement processing.</p>
        </div>
      </div>

      {/* Warning Alert Banner */}
      <div
        style={{
          padding: '1.1rem 1.5rem',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <ShieldAlert size={24} color="#ef4444" style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ fontSize: '0.9rem', color: '#f87171', fontWeight: 700, marginBottom: '0.15rem' }}>
            Caution: High-Privilege Action
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Deleting a student profile revokes their authentication access and removes active placement drive applications.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <UserMinus size={18} color="#f87171" /> Search Candidate Record to Delete
            </h3>
            <p className="admin-card-subtitle">Enter student registration number or institutional email.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by Reg. No. or Email..."
            style={{ maxWidth: '420px' }}
            readOnly
          />
          <button type="button" className="btn btn-outline btn-sm">
            <Search size={16} /> Search
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Registration No</th>
                <th>Candidate Name</th>
                <th>Branch</th>
                <th>Batch</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>21105128005</td>
                <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>Kunal Mehta</td>
                <td>Civil Engineering</td>
                <td>2021 – 2025</td>
                <td><span className="admin-badge success">Active</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button type="button" className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <Trash2 size={13} /> Delete Record
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
