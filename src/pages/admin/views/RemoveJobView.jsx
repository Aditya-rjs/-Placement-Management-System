/**
 * RemoveJobView.jsx
 * Manage Jobs -> Remove Job UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Briefcase, Building2, Calendar, AlertCircle } from 'lucide-react';

export default function RemoveJobView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Remove Active Job Drive</h1>
          <p>De-list active corporate recruitment drives or archive expired job postings.</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <Briefcase size={18} color="var(--color-primary-light)" /> Active Corporate Hiring Drives
            </h3>
            <p className="admin-card-subtitle">Manage published jobs currently open for candidate applications.</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role Designation</th>
                <th>Package</th>
                <th>Cutoff CPI</th>
                <th>Deadline</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--color-text)' }}>Google Cloud</td>
                <td>Software Engineer (L3)</td>
                <td style={{ color: '#34d399', fontWeight: 700 }}>22.5 LPA</td>
                <td>7.50 CPI</td>
                <td>15 Aug 2026</td>
                <td><span className="admin-badge success">Active</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button type="button" className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <Trash2 size={13} /> Remove Drive
                  </button>
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--color-text)' }}>TCS Digital</td>
                <td>Systems Engineer</td>
                <td style={{ color: '#34d399', fontWeight: 700 }}>7.5 LPA</td>
                <td>6.50 CPI</td>
                <td>20 Aug 2026</td>
                <td><span className="admin-badge success">Active</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button type="button" className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <Trash2 size={13} /> Remove Drive
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
