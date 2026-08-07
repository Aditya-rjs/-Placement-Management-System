/**
 * FilterStudentsJDView.jsx
 * Manage Students -> Filter Students for Specific JD UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Briefcase, Search, CheckCircle2, UserCheck, Download } from 'lucide-react';

export default function FilterStudentsJDView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Filter Candidates for Corporate JD</h1>
          <p>Automated candidate eligibility filter based on job description parameters, CPI cutoffs, and branch criteria.</p>
        </div>
      </div>

      {/* JD Filter Selection Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <Filter size={18} color="var(--color-primary-light)" /> Job Description Criteria Parameters
            </h3>
            <p className="admin-card-subtitle">Select an active corporate drive or set custom eligibility cutoffs.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Select Active Drive / Company</label>
            <select className="form-input" readOnly>
              <option value="google">Google — Software Engineer Drive (22 LPA)</option>
              <option value="tcs">TCS Ninja / Digital Drive (7.5 LPA)</option>
              <option value="custom">Custom Eligibility Rule Set</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Minimum CPI Cutoff</label>
            <input type="text" className="form-input" value="7.50 CPI" readOnly />
          </div>

          <div className="form-group">
            <label className="form-label">Maximum Active Backlogs Allowed</label>
            <select className="form-input" readOnly>
              <option value="0">0 Active Backlogs (Strict Clean Record)</option>
              <option value="1">Up to 1 Active Backlog</option>
              <option value="2">Up to 2 Active Backlogs</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" className="btn btn-primary btn-sm">
            <Search size={15} />
            <span>Execute Candidate Filter</span>
          </button>
        </div>
      </div>

      {/* Filtered Candidate Result Table Shell */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <UserCheck size={18} color="#34d399" /> Eligible Candidate Shortlist (84 Candidates Found)
            </h3>
            <p className="admin-card-subtitle">Matching candidate records ready for recruiter export.</p>
          </div>

          <button type="button" className="btn btn-outline btn-sm">
            <Download size={15} /> Export Shortlist
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Branch</th>
                <th>CPI</th>
                <th>Backlogs</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)' }}>21105128001</td>
                <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>Rahul Sharma</td>
                <td>CSE</td>
                <td style={{ color: '#34d399', fontWeight: 700 }}>8.92</td>
                <td>0</td>
                <td><span className="admin-badge success">Eligible</span></td>
              </tr>
              <tr>
                <td style={{ fontFamily: 'var(--font-mono)' }}>21105128014</td>
                <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>Ananya Verma</td>
                <td>ECE</td>
                <td style={{ color: '#34d399', fontWeight: 700 }}>8.45</td>
                <td>0</td>
                <td><span className="admin-badge success">Eligible</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
