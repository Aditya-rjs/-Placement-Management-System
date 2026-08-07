/**
 * AddStudentView.jsx
 * Manage Students -> Add Student UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Phone, Hash, GraduationCap, Calendar, Save } from 'lucide-react';

export default function AddStudentView() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Add Student Record</h1>
          <p>Manually onboard a candidate student profile into the institutional placement dataset.</p>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: '840px' }}>
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <UserPlus size={18} color="var(--color-primary-light)" /> Candidate Student Details Form
            </h3>
            <p className="admin-card-subtitle">Fill in student personal, contact, and academic credentials.</p>
          </div>
        </div>

        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" readOnly placeholder="Enter student full name" />
            </div>

            <div className="form-group">
              <label className="form-label">Institutional Email</label>
              <input type="email" className="form-input" readOnly placeholder="Enter institutional email" />
            </div>

            <div className="form-group">
              <label className="form-label">Registration Number</label>
              <input type="text" className="form-input" readOnly placeholder="Enter registration number" />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-input" readOnly placeholder="Enter 10-digit mobile number" />
            </div>

            <div className="form-group">
              <label className="form-label">Engineering Branch</label>
              <select className="form-input" readOnly>
                <option value="">Select Branch</option>
                <option value="cse">Computer Science &amp; Engineering</option>
                <option value="ece">Electronics &amp; Communication</option>
                <option value="ee">Electrical Engineering</option>
                <option value="ce">Civil Engineering</option>
                <option value="me">Mechanical Engineering</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Graduation Batch</label>
              <select className="form-input" readOnly>
                <option value="">Select Batch</option>
                <option value="2025">2021 – 2025</option>
                <option value="2026">2022 – 2026</option>
                <option value="2027">2023 – 2027</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button type="button" className="btn btn-outline btn-sm">Cancel</button>
            <button type="button" className="btn btn-primary btn-sm">
              <Save size={16} />
              <span>Save Student Profile</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
