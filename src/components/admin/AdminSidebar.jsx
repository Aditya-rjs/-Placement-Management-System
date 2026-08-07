/**
 * AdminSidebar.jsx
 * Left Navigation Sidebar for Admin Dashboard UI.
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
  LogOut
} from 'lucide-react';
import LNJPITLogo from '../LNJPITLogo';
import { APP_CONFIG } from '../../config/app.config';

export default function AdminSidebar({ activeTab, onSelectTab, isOpen, onLogout }) {
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
          <Shield size={12} /> System Admin Portal
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

        <div className="admin-nav-section-label">Student Administration</div>

        {/* 3. Manage Students (Parent Submenu) */}
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

        {/* 4. Manage Jobs (Parent Submenu) */}
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

        {/* 5. Notice Board (Parent Submenu) */}
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
        <div className="admin-user-card">
          <div className="admin-user-info">
            <div className="admin-user-avatar">A</div>
            <div className="admin-user-details">
              <span className="admin-user-name">Aditya Raj Singh</span>
              <span className="admin-user-role">Super Admin</span>
            </div>
          </div>
          <button
            type="button"
            className="admin-header-icon-btn"
            title="Log Out"
            onClick={onLogout}
            style={{ width: '32px', height: '32px' }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
