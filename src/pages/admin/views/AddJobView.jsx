/**
 * AddJobView.jsx
 * Manage Jobs -> Add Job UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Briefcase, Building, DollarSign, Calendar, FileText, Check } from 'lucide-react';

export default function AddJobView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Post Campus Recruitment Drive</h1>
          <p>Create a new corporate job opening, set candidate eligibility cutoffs, and publish to the Student Candidate Portal.</p>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: '880px' }}>
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <PlusCircle size={18} color="var(--color-primary-light)" /> Job Drive Details Form
            </h3>
            <p className="admin-card-subtitle">Specify company details, role specifications, compensation &amp; cutoffs.</p>
          </div>
        </div>

        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-input" readOnly placeholder="Enter company name (e.g. Google, Microsoft)" />
            </div>

            <div className="form-group">
              <label className="form-label">Job Title / Designation</label>
              <input type="text" className="form-input" readOnly placeholder="Enter designation (e.g. Software Engineer)" />
            </div>

            <div className="form-group">
              <label className="form-label">Annual CTC Package (LPA)</label>
              <input type="text" className="form-input" readOnly placeholder="Enter CTC (e.g. 14.5 LPA)" />
            </div>

            <div className="form-group">
              <label className="form-label">Job Location</label>
              <input type="text" className="form-input" readOnly placeholder="Enter location (e.g. Bengaluru / Remote)" />
            </div>

            <div className="form-group">
              <label className="form-label">Minimum CPI Cutoff</label>
              <input type="text" className="form-input" readOnly placeholder="Enter minimum CPI (e.g. 7.50)" />
            </div>

            <div className="form-group">
              <label className="form-label">Application Deadline</label>
              <input type="date" className="form-input" readOnly />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Job Description &amp; Role Summary</label>
            <textarea className="form-input" rows={4} readOnly placeholder="Enter job description, skill requirements, and hiring process details..." />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button type="button" className="btn btn-outline btn-sm">Cancel</button>
            <button type="button" className="btn btn-primary btn-sm">
              <PlusCircle size={16} />
              <span>Publish Job Drive</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
