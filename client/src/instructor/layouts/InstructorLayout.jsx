import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './InstructorLayout.css';

export default function InstructorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="instructor-portal-shell">
      {/* 1. Flat Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2. Main Viewport */}
      <div className="instructor-main-viewport">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="instructor-page-container">
          <Outlet />
        </main>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="instructor-sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
