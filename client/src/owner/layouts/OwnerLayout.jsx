import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './OwnerLayout.css';

export default function OwnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="owner-portal-shell">
      {/* 1. Sidebar Nav */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2. Main App Content Area */}
      <div className="owner-main-viewport">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="owner-page-container">
          <Outlet />
        </main>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="owner-sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
