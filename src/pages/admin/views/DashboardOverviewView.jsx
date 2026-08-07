/**
 * DashboardOverviewView.jsx
 * Admin Dashboard Overview View UI Shell
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Briefcase, Megaphone, ArrowUpRight, TrendingUp, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardOverviewView({ onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* View Header */}
      <div className="admin-view-header">
        <div className="admin-view-title-block">
          <h1>Admin Control Overview</h1>
          <p>Real-time placement management intelligence, candidate metrics, and system operations.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => onNavigate('authenticate-students')}>
            <UserCheck size={16} />
            <span>Verify Candidates</span>
          </button>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => onNavigate('manage-jobs/add')}>
            <Briefcase size={16} />
            <span>Post New Drive</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper blue">
            <Users size={24} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">1,248</span>
            <span className="admin-stat-label">Total Registered Students</span>
            <span className="admin-stat-change up">
              <TrendingUp size={12} /> +12.4% this session
            </span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper amber">
            <UserCheck size={24} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">42</span>
            <span className="admin-stat-label">Pending Verifications</span>
            <span className="admin-stat-change down">Requires Admin Action</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper green">
            <Briefcase size={24} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">18</span>
            <span className="admin-stat-label">Active Campus Drives</span>
            <span className="admin-stat-change up">
              <TrendingUp size={12} /> 6 drive cutoffs closing
            </span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper purple">
            <Megaphone size={24} />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-value">29</span>
            <span className="admin-stat-label">Published Circulars</span>
            <span className="admin-stat-change up">Active Notice Board</span>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix Grid */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">
              <Sparkles size={18} color="var(--color-primary-light)" /> Administrative Quick Actions
            </h3>
            <p className="admin-card-subtitle">Direct shortcuts to system administration modules.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div
            style={{
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => onNavigate('authenticate-students')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="admin-badge warning"><UserCheck size={12} /> Pending Action</span>
              <ArrowUpRight size={16} color="var(--color-text-muted)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
              Authenticate Student Profiles
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Review pending registrations, verify CPI transcripts &amp; approve student access.
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => onNavigate('manage-students/filter-jd')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="admin-badge info">Filter Engine</span>
              <ArrowUpRight size={16} color="var(--color-text-muted)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
              Filter Candidates for Company JD
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Filter eligible student candidates against corporate CPI, branch &amp; backlog criteria.
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => onNavigate('manage-jobs/add')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="admin-badge success">Drive Posting</span>
              <ArrowUpRight size={16} color="var(--color-text-muted)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
              Publish Campus Job Drive
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Post new hiring announcements, salary packages, eligibility cutoffs &amp; deadlines.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
