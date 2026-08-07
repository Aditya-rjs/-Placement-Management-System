/**
 * DownloadStudentDataView.jsx
 * Manage Students -> Download Student Data UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileSpreadsheet, Filter, CheckCircle2, FileText } from 'lucide-react';

export default function DownloadStudentDataView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Download Student Data</h1>
          <p>Export candidate datasets, academic records, and placement status reports for accreditation and recruiter sharing.</p>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: '840px' }}>
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <FileSpreadsheet size={18} color="var(--color-primary-light)" /> Dataset Export Options
            </h3>
            <p className="admin-card-subtitle">Configure dataset filters and select export file format.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <div className="form-group">
            <label className="form-label">Filter by Branch</label>
            <select className="form-input" readOnly>
              <option value="all">All Engineering Branches</option>
              <option value="cse">Computer Science &amp; Engineering</option>
              <option value="ece">Electronics &amp; Communication</option>
              <option value="ee">Electrical Engineering</option>
              <option value="ce">Civil Engineering</option>
              <option value="me">Mechanical Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Filter by Batch</label>
            <select className="form-input" readOnly>
              <option value="2025">2021 – 2025 Batch</option>
              <option value="2026">2022 – 2026 Batch</option>
              <option value="all">All Batches</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Placement Status Filter</label>
            <select className="form-input" readOnly>
              <option value="all">All Candidates (Placed &amp; Unplaced)</option>
              <option value="placed">Placed Candidates Only</option>
              <option value="unplaced">Unplaced Eligible Candidates</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Export File Format</label>
            <select className="form-input" readOnly>
              <option value="xlsx">Excel Workbook (.xlsx)</option>
              <option value="csv">Comma Separated Values (.csv)</option>
              <option value="pdf">PDF Institutional Summary Report (.pdf)</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button type="button" className="btn btn-primary btn-lg">
            <Download size={18} />
            <span>Generate &amp; Download Dataset</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
