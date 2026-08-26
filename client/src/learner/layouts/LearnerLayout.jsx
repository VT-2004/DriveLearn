import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './LearnerLayout.css';

export default function LearnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="learner-portal-shell">
      {/* 1. Flat Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 2. Main Viewport */}
      <div className="learner-main-viewport">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="learner-page-container">
          <Outlet />
        </main>
      </div>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="learner-sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
