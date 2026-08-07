/**
 * PublishNoticeView.jsx
 * Notice Board -> Publish Notice UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Send, Megaphone, Paperclip, Users, Tag } from 'lucide-react';

export default function PublishNoticeView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Publish Institutional Notice</h1>
          <p>Issue an official placement announcement, campus drive schedule, or administrative circular.</p>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: '880px' }}>
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <Megaphone size={18} color="var(--color-primary-light)" /> Notice Composer Form
            </h3>
            <p className="admin-card-subtitle">Broadcast circulars to students, department TPOs, or all portal users.</p>
          </div>
        </div>

        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Notice Headline / Title</label>
            <input type="text" className="form-input" readOnly placeholder="Enter notice headline (e.g. Mandatory Pre-Placement Talk for Google Drive)" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Category Tag</label>
              <select className="form-input" readOnly>
                <option value="drive">Campus Recruitment Drive</option>
                <option value="schedule">Interview / Exam Schedule</option>
                <option value="general">General Administrative Announcement</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <select className="form-input" readOnly>
                <option value="students">All Registered Students</option>
                <option value="final_year">2021–2025 Final Year Batch</option>
                <option value="cse">CSE Department Candidates</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notice Body Content</label>
            <textarea className="form-input" rows={6} readOnly placeholder="Write the complete announcement details, instructions, date/venue info..." />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button type="button" className="btn btn-outline btn-sm">Cancel</button>
            <button type="button" className="btn btn-primary btn-sm">
              <Send size={16} />
              <span>Publish Notice to Portal</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
