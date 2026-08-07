/**
 * AdminHeader.jsx
 * Top Header Navigation Bar for Admin Dashboard UI.
 * Integrates current session Admin profile & title mapping.
 */

import React from 'react';
import { Search, Bell, LogOut, Menu, Shield, User } from 'lucide-react';
import { getCurrentSession } from '../../services/adminAuthService';

const TAB_TITLES = {
  'dashboard':                  { title: 'System Overview Dashboard', breadcrumb: 'Admin / Dashboard' },
  'authenticate-students':      { title: 'Authenticate Student Profiles', breadcrumb: 'Admin / Authenticate Students' },
  'admin-management':           { title: 'Admin Management & Security', breadcrumb: 'Admin / Security / Admin Management' },
  'admin-profile':              { title: 'Account Settings & Profile', breadcrumb: 'Admin / Account / Profile' },
  'manage-students/add':        { title: 'Add New Student Record', breadcrumb: 'Admin / Manage Students / Add Student' },
  'manage-students/delete':     { title: 'Delete / Deactivate Student', breadcrumb: 'Admin / Manage Students / Delete Student' },
  'manage-students/download':   { title: 'Download Student Dataset', breadcrumb: 'Admin / Manage Students / Download Data' },
  'manage-students/filter-jd':  { title: 'Filter Students for Specific JD', breadcrumb: 'Admin / Manage Students / Filter for JD' },
  'manage-jobs/add':            { title: 'Add Campus Recruitment Job', breadcrumb: 'Admin / Manage Jobs / Add Job' },
  'manage-jobs/remove':         { title: 'Remove Active Job Drive', breadcrumb: 'Admin / Manage Jobs / Remove Job' },
  'notice-board/publish':       { title: 'Publish Institutional Notice', breadcrumb: 'Admin / Notice Board / Publish Notice' },
  'notice-board/remove':        { title: 'Remove / Archive Notice', breadcrumb: 'Admin / Notice Board / Remove Notice' },
};

export default function AdminHeader({ activeTab, onSelectTab, onLogout, onToggleSidebar }) {
  const currentAdmin = getCurrentSession();
  const isSuperAdmin = currentAdmin && currentAdmin.role === 'SUPER_ADMIN';

  const currentTabInfo = TAB_TITLES[activeTab] || {
    title: 'Admin Control Center',
    breadcrumb: 'Admin Dashboard',
  };

  return (
    <header className="admin-top-header" role="banner">
      {/* Title & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="button"
          className="admin-header-icon-btn mobile-only"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar Navigation"
          style={{ display: 'none' }}
        >
          <Menu size={20} />
        </button>

        <div className="admin-header-title-block">
          <span className="admin-header-breadcrumbs">{currentTabInfo.breadcrumb}</span>
          <h2 className="admin-header-page-title">{currentTabInfo.title}</h2>
        </div>
      </div>

      {/* Header Actions: Search, Notifications, Profile, Logout */}
      <div className="admin-header-actions">
        {/* Search Bar UI */}
        <div className="admin-search-box">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search candidates, drives, notices..."
            readOnly
          />
          <span className="admin-search-kbd">⌘K</span>
        </div>

        {/* Notification Bell Icon */}
        <button
          type="button"
          className="admin-header-icon-btn"
          title="System Notifications"
          onClick={() => alert('Notifications Panel: No new security alerts.')}
        >
          <Bell size={18} />
          <span className="admin-notification-badge" />
        </button>

        {/* Profile Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.35rem 0.75rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
          }}
          onClick={() => onSelectTab && onSelectTab('admin-profile')}
          title="View Account Settings &amp; Profile"
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: isSuperAdmin ? 'linear-gradient(135deg, #a855f7, #6b21a8)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#fff',
            }}
          >
            {currentAdmin?.name ? currentAdmin.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)' }}>
            {currentAdmin?.name ? currentAdmin.name.split(' ')[0] : 'Admin'}
          </span>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          className="admin-logout-btn"
          onClick={onLogout}
          title="Sign out of Admin Dashboard"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
