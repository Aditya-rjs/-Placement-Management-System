/**
 * AuthenticateStudentsView.jsx
 * Authenticate Students UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, Search, Filter, CheckCircle2, XCircle, FileText } from 'lucide-react';

export default function AuthenticateStudentsView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Authenticate Students</h1>
          <p>Review student registrations, verify academic credentials, and grant active candidate portal access.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span className="admin-badge warning" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
            <UserCheck size={14} /> 42 Pending Verifications
          </span>
        </div>
      </div>

      {/* Table Card Shell */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <ShieldCheck size={18} color="var(--color-primary-light)" /> Pending Student Verification Queue
            </h3>
            <p className="admin-card-subtitle">Verify institutional email, CPI transcripts, and registration number.</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Filter candidate by name, reg. no, or branch..."
              style={{ width: '280px', height: '38px', fontSize: '0.8rem' }}
              readOnly
            />
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Registration No</th>
                <th>Candidate Name</th>
                <th>Branch</th>
                <th>Batch</th>
                <th>CPI</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions UI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>21105128001</td>
                <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>Rahul Sharma</td>
                <td>Computer Science &amp; Engg.</td>
                <td>2021 – 2025</td>
                <td style={{ fontWeight: 700, color: '#34d399' }}>8.92</td>
                <td><span className="admin-badge warning">Pending Audit</span></td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-outline btn-sm" style={{ padding: '0.3rem 0.65rem' }}>
                      <FileText size={13} /> View Documents
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" style={{ padding: '0.3rem 0.65rem', background: '#10b981' }}>
                      <CheckCircle2 size={13} /> Approve
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>21105128014</td>
                <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>Ananya Verma</td>
                <td>Electrical Engineering</td>
                <td>2021 – 2025</td>
                <td style={{ fontWeight: 700, color: '#34d399' }}>8.45</td>
                <td><span className="admin-badge warning">Pending Audit</span></td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-outline btn-sm" style={{ padding: '0.3rem 0.65rem' }}>
                      <FileText size={13} /> View Documents
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" style={{ padding: '0.3rem 0.65rem', background: '#10b981' }}>
                      <CheckCircle2 size={13} /> Approve
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>21105128029</td>
                <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>Vikram Singh</td>
                <td>Mechanical Engineering</td>
                <td>2021 – 2025</td>
                <td style={{ fontWeight: 700, color: '#fbbf24' }}>7.68</td>
                <td><span className="admin-badge warning">Pending Audit</span></td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-outline btn-sm" style={{ padding: '0.3rem 0.65rem' }}>
                      <FileText size={13} /> View Documents
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" style={{ padding: '0.3rem 0.65rem', background: '#10b981' }}>
                      <CheckCircle2 size={13} /> Approve
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
