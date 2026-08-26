import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CommandPalette from '../components/CommandPalette';
import { useCommandPalette } from '../hooks/useCommandPalette';
import '../admin-theme.css';
import './AdminLayout.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isOpen: isPaletteOpen, open: openPalette, close: closePalette } = useCommandPalette();

  return (
    <div className="admin-portal-shell">
      {/* 1. Fixed Left Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* 2. Right Content Wrapper (Header + Main) */}
      <div className="admin-content-shell">
        <Header 
          userName="Platform Control"
          userRole="Super Admin"
          onMenuToggle={() => setSidebarOpen(true)}
          onOpenPalette={openPalette}
        />

        <main className="admin-main-viewport">
          <Outlet />
        </main>
      </div>

      {/* 3. Global Command Palette (Cmd+K) */}
      {isPaletteOpen && <CommandPalette onClose={closePalette} />}
    </div>
  );
}
