/**
 * RemoveNoticeView.jsx
 * Notice Board -> Remove Notice UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FileX, Megaphone, Trash2, Calendar, Tag } from 'lucide-react';

export default function RemoveNoticeView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Remove / Archive Notice</h1>
          <p>Manage active notice board circulars, remove expired announcements, or unpublish notices.</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <Megaphone size={18} color="var(--color-primary-light)" /> Published Notice Board Announcements
            </h3>
            <p className="admin-card-subtitle">Active circulars currently visible on student and TPO portals.</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Published Date</th>
                <th>Notice Headline</th>
                <th>Category</th>
                <th>Target Audience</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>06 Aug 2026</td>
                <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>Mandatory Pre-Placement Orientation Drive</td>
                <td><span className="admin-badge info">Drive Announcement</span></td>
                <td>2021–2025 Final Year</td>
                <td><span className="admin-badge success">Live</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button type="button" className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <Trash2 size={13} /> Unpublish Notice
                  </button>
                </td>
              </tr>
              <tr>
                <td>02 Aug 2026</td>
                <td style={{ fontWeight: 600, color: 'var(--color-text)' }}>TCS NQT Registration &amp; Verification Deadline</td>
                <td><span className="admin-badge warning">Deadline Alert</span></td>
                <td>CSE &amp; ECE Batches</td>
                <td><span className="admin-badge success">Live</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button type="button" className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <Trash2 size={13} /> Unpublish Notice
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
