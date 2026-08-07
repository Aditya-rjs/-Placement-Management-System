/**
 * AdminDashboardLayout.jsx
 * Enterprise Admin Dashboard Master Layout Component.
 * Integrates AdminSidebar, AdminHeader, and sub-view switcher.
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import '../../styles/AdminDashboard.css';

// ── Subview imports ──────────────────────────────────────
import DashboardOverviewView     from './views/DashboardOverviewView';
import AuthenticateStudentsView  from './views/AuthenticateStudentsView';
import AddStudentView            from './views/AddStudentView';
import DeleteStudentView         from './views/DeleteStudentView';
import DownloadStudentDataView   from './views/DownloadStudentDataView';
import FilterStudentsJDView      from './views/FilterStudentsJDView';
import AddJobView                from './views/AddJobView';
import RemoveJobView             from './views/RemoveJobView';
import PublishNoticeView         from './views/PublishNoticeView';
import RemoveNoticeView          from './views/RemoveNoticeView';

export default function AdminDashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Derive active tab from current URL pathname or fallback to state
  const currentPath = location.pathname.replace('/admin/', '').replace('/admin', '');
  const [activeTab, setActiveTab] = useState(currentPath || 'dashboard');

  useEffect(() => {
    if (currentPath) {
      setActiveTab(currentPath);
    } else {
      setActiveTab('dashboard');
    }
  }, [currentPath]);

  const handleSelectTab = (tabKey) => {
    setActiveTab(tabKey);
    setIsSidebarOpen(false);
    navigate(`/admin/${tabKey}`);
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Render subview based on activeTab
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverviewView onNavigate={handleSelectTab} />;

      case 'authenticate-students':
        return <AuthenticateStudentsView />;

      case 'manage-students/add':
        return <AddStudentView />;

      case 'manage-students/delete':
        return <DeleteStudentView />;

      case 'manage-students/download':
        return <DownloadStudentDataView />;

      case 'manage-students/filter-jd':
        return <FilterStudentsJDView />;

      case 'manage-jobs/add':
        return <AddJobView />;

      case 'manage-jobs/remove':
        return <RemoveJobView />;

      case 'notice-board/publish':
        return <PublishNoticeView />;

      case 'notice-board/remove':
        return <RemoveNoticeView />;

      default:
        return <DashboardOverviewView onNavigate={handleSelectTab} />;
    }
  };

  return (
    <div className="admin-dashboard-layout" id="admin-dashboard-root">
      {/* 1. Left Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isOpen={isSidebarOpen}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Wrapper */}
      <div className="admin-main-wrapper">
        {/* Top Navigation Bar */}
        <AdminHeader
          activeTab={activeTab}
          onLogout={handleLogout}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        />

        {/* Dynamic Content Area */}
        <main className="admin-content-area" role="main">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
