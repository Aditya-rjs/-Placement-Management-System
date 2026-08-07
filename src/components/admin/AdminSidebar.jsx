/**
 * AdminSidebar.jsx
 * Left Navigation Sidebar for Admin Dashboard UI.
 * Integrates Role-Based Access Control (RBAC) & Admin Management navigation.
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  UserCheck,
  Users,
  UserPlus,
  UserMinus,
  Download,
  Filter,
  Briefcase,
  PlusCircle,
  Trash2,
  Megaphone,
  Send,
  FileX,
  ChevronDown,
  ChevronRight,
  Shield,
  ShieldAlert,
  LogOut,
  User
} from 'lucide-react';
import LNJPITLogo from '../LNJPITLogo';
import { APP_CONFIG } from '../../config/app.config';
import { getCurrentSession } from '../../services/adminAuthService';

export default function AdminSidebar({ activeTab, onSelectTab, isOpen, onLogout }) {
  const currentAdmin = getCurrentSession();
  const isSuperAdmin = currentAdmin && currentAdmin.role === 'SUPER_ADMIN';

  // Submenu toggle states
  const [openSubmenus, setOpenSubmenus] = useState({
    'manage-students': true,
    'manage-jobs': true,
    'notice-board': true,
  });

  const toggleSubmenu = (menuKey) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const isSubmenuOpen = (menuKey) => !!openSubmenus[menuKey];

  return (
    <aside className={`admin-sidebar${isOpen ? ' open' : ''}`} aria-label="Admin Navigation Sidebar">
      {/* Sidebar Header: Logo & Branding */}
      <div className="admin-sidebar-header">
        <div className="admin-brand-block">
          <LNJPITLogo size={36} hideText />
          <div className="admin-brand-text">
            <span className="admin-brand-title">{APP_CONFIG.collegeShortName}</span>
            <span className="admin-brand-subtitle">Placement Management System</span>
          </div>
        </div>
        <div className="admin-portal-badge">
          <Shield size={12} /> {isSuperAdmin ? 'Super Admin Portal' : 'Admin Portal'}
        </div>
      </div>

      {/* Sidebar Nav Items */}
      <nav className="admin-sidebar-nav" role="navigation">
        <div className="admin-nav-section-label">Core Management</div>

        {/* 1. Dashboard */}
        <div
          className={`admin-nav-item${activeTab === 'dashboard' ? ' active' : ''}`}
          onClick={() => onSelectTab('dashboard')}
          role="button"
          tabIndex={0}
        >
          <div className="admin-nav-item-left">
            <LayoutDashboard size={18} className="admin-nav-item-icon" />
            <span>Dashboard</span>
          </div>
        </div>

        {/* 2. Authenticate Students */}
        <div
          className={`admin-nav-item${activeTab === 'authenticate-students' ? ' active' : ''}`}
          onClick={() => onSelectTab('authenticate-students')}
          role="button"
          tabIndex={0}
        >
          <div className="admin-nav-item-left">
            <UserCheck size={18} className="admin-nav-item-icon" />
            <span>Authenticate Students</span>
          </div>
        </div>

        {/* 3. Admin Management (Super Admin Exclusive) */}
        {isSuperAdmin && (
          <div
            className={`admin-nav-item${activeTab === 'admin-management' ? ' active' : ''}`}
            onClick={() => onSelectTab('admin-management')}
            role="button"
            tabIndex={0}
            style={{ marginTop: '0.15rem' }}
          >
            <div className="admin-nav-item-left">
              <ShieldAlert size={18} className="admin-nav-item-icon" color="#c084fc" />
              <span style={{ color: '#c084fc', fontWeight: 600 }}>Admin Management</span>
            </div>
            <span className="admin-badge warning" style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem', background: 'rgba(168,85,247,0.15)', color: '#c084fc', borderColor: 'rgba(168,85,247,0.3)' }}>
              Super
            </span>
          </div>
        )}

        <div className="admin-nav-section-label">Student Administration</div>

        {/* 4. Manage Students (Parent Submenu) */}
        <div>
          <div
            className={`admin-nav-item${activeTab.startsWith('manage-students') ? ' active' : ''}`}
            onClick={() => toggleSubmenu('manage-students')}
            role="button"
            tabIndex={0}
          >
            <div className="admin-nav-item-left">
              <Users size={18} className="admin-nav-item-icon" />
              <span>Manage Students</span>
            </div>
            {isSubmenuOpen('manage-students') ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </div>

          {isSubmenuOpen('manage-students') && (
            <div className="admin-submenu">
              <div
                className={`admin-submenu-item${activeTab === 'manage-students/add' ? ' active' : ''}`}
                onClick={() => onSelectTab('manage-students/add')}
                role="button"
              >
                <UserPlus size={14} className="admin-submenu-item-icon" />
                <span>Add Student</span>
              </div>
              <div
                className={`admin-submenu-item${activeTab === 'manage-students/delete' ? ' active' : ''}`}
                onClick={() => onSelectTab('manage-students/delete')}
                role="button"
              >
                <UserMinus size={14} className="admin-submenu-item-icon" />
                <span>Delete Student</span>
              </div>
              <div
                className={`admin-submenu-item${activeTab === 'manage-students/download' ? ' active' : ''}`}
                onClick={() => onSelectTab('manage-students/download')}
                role="button"
              >
                <Download size={14} className="admin-submenu-item-icon" />
                <span>Download Student Data</span>
              </div>
              <div
                className={`admin-submenu-item${activeTab === 'manage-students/filter-jd' ? ' active' : ''}`}
                onClick={() => onSelectTab('manage-students/filter-jd')}
                role="button"
              >
                <Filter size={14} className="admin-submenu-item-icon" />
                <span>Filter Students for JD</span>
              </div>
            </div>
          )}
        </div>

        <div className="admin-nav-section-label">Recruitment &amp; Circulars</div>

        {/* 5. Manage Jobs (Parent Submenu) */}
        <div>
          <div
            className={`admin-nav-item${activeTab.startsWith('manage-jobs') ? ' active' : ''}`}
            onClick={() => toggleSubmenu('manage-jobs')}
            role="button"
            tabIndex={0}
          >
            <div className="admin-nav-item-left">
              <Briefcase size={18} className="admin-nav-item-icon" />
              <span>Manage Jobs</span>
            </div>
            {isSubmenuOpen('manage-jobs') ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </div>

          {isSubmenuOpen('manage-jobs') && (
            <div className="admin-submenu">
              <div
                className={`admin-submenu-item${activeTab === 'manage-jobs/add' ? ' active' : ''}`}
                onClick={() => onSelectTab('manage-jobs/add')}
                role="button"
              >
                <PlusCircle size={14} className="admin-submenu-item-icon" />
                <span>Add Job</span>
              </div>
              <div
                className={`admin-submenu-item${activeTab === 'manage-jobs/remove' ? ' active' : ''}`}
                onClick={() => onSelectTab('manage-jobs/remove')}
                role="button"
              >
                <Trash2 size={14} className="admin-submenu-item-icon" />
                <span>Remove Job</span>
              </div>
            </div>
          )}
        </div>

        {/* 6. Notice Board (Parent Submenu) */}
        <div>
          <div
            className={`admin-nav-item${activeTab.startsWith('notice-board') ? ' active' : ''}`}
            onClick={() => toggleSubmenu('notice-board')}
            role="button"
            tabIndex={0}
          >
            <div className="admin-nav-item-left">
              <Megaphone size={18} className="admin-nav-item-icon" />
              <span>Notice Board</span>
            </div>
            {isSubmenuOpen('notice-board') ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
          </div>

          {isSubmenuOpen('notice-board') && (
            <div className="admin-submenu">
              <div
                className={`admin-submenu-item${activeTab === 'notice-board/publish' ? ' active' : ''}`}
                onClick={() => onSelectTab('notice-board/publish')}
                role="button"
              >
                <Send size={14} className="admin-submenu-item-icon" />
                <span>Publish Notice</span>
              </div>
              <div
                className={`admin-submenu-item${activeTab === 'notice-board/remove' ? ' active' : ''}`}
                onClick={() => onSelectTab('notice-board/remove')}
                role="button"
              >
                <FileX size={14} className="admin-submenu-item-icon" />
                <span>Remove Notice</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Footer User Info & Logout */}
      <div className="admin-sidebar-footer">
        <div
          className="admin-user-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectTab('admin-profile')}
          title="Click to view Account Settings &amp; Profile"
        >
          <div className="admin-user-info">
            <div
              className="admin-user-avatar"
              style={{
                background: isSuperAdmin ? 'linear-gradient(135deg, #a855f7, #6b21a8)' : 'linear-gradient(135deg, #ef4444, #991b1b)',
              }}
            >
              {currentAdmin?.name ? currentAdmin.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="admin-user-details">
              <span className="admin-user-name">{currentAdmin?.name || 'Administrator'}</span>
              <span className="admin-user-role" style={{ color: isSuperAdmin ? '#c084fc' : 'var(--color-text-muted)' }}>
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="admin-header-icon-btn"
            title="Log Out"
            onClick={(e) => {
              e.stopPropagation();
              onLogout();
            }}
            style={{ width: '32px', height: '32px' }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
