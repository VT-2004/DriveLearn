import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, LayoutDashboard, Building2, Users, 
  Wallet, BarChart3, Settings, LogOut, Menu, X, ChevronRight, UserCheck 
} from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './AdminLayout.css';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Admin Overview', icon: LayoutDashboard },
    { to: '/admin/schools', label: 'School Verifications', icon: Building2 },
    { to: '/admin/users', label: 'User Directory & Wallets', icon: Users },
    { to: '/admin/campaigns', label: '₹15 Bonus & ₹999 Offers', icon: Wallet },
  ];

  return (
    <div className="admin-app-container">
      {/* 1. Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-brand">
            <div className="admin-brand-icon">
              <ShieldCheck size={22} color="#ffffff" />
            </div>
            <div className="admin-brand-text">
              <span className="brand-name">DriveLearn</span>
              <span className="brand-role-tag">Super Admin</span>
            </div>
          </Link>
          <button className="admin-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Admin User Card */}
        <div className="admin-user-card">
          <div className="admin-avatar">
            <UserCheck size={20} color="#dc2626" />
          </div>
          <div className="admin-user-info">
            <strong>{user?.name || 'DriveLearn Admin'}</strong>
            <span>Maharashtra State HQ</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={16} className="active-arrow" />}
              </Link>
            );
          })}
        </nav>

        {/* State Hub Indicator */}
        <div className="admin-region-box">
          <span className="region-title">Active Region</span>
          <strong>Maharashtra (MH-01 to MH-50)</strong>
          <span className="region-sub">5 Launch Cities Active</span>
        </div>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="btn-admin-logout">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content */}
      <div className="admin-main-wrapper">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="topbar-title-block">
              <h2>Maharashtra Operations Dashboard</h2>
              <p>RTO Partner Network, Subsidized 2-Wheeler Enrollments & Wallet Ledger</p>
            </div>
          </div>
        </header>

        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
