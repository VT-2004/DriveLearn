import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, Wallet, FileText, 
  Settings, LogOut, Menu, X, ShieldCheck, ChevronRight, User
} from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './LearnerLayout.css';

export default function LearnerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/learner/dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { to: '/learner/bookings', label: 'My Courses & Slots', icon: Calendar },
    { to: '/learner/wallet', label: 'In-App Wallet (₹15)', icon: Wallet },
    { to: '/learner/rto-docs', label: 'RTO Form 2 & DL Status', icon: FileText },
  ];

  return (
    <div className="learner-app-container">
      {/* 1. Sidebar Navigation */}
      <aside className={`learner-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <Link to="/" className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <ShieldCheck size={22} color="#ffffff" />
            </div>
            <div className="sidebar-logo-text">
              <span className="brand-title">DriveLearn</span>
              <span className="brand-badge">Learner Portal</span>
            </div>
          </Link>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* User Mini Profile Card */}
        <div className="sidebar-user-card">
          <div className="user-avatar-circle">
            <User size={20} color="#dc2626" />
          </div>
          <div className="user-info">
            <strong className="user-name">{user?.name || 'Pooja Kulkarni'}</strong>
            <span className="user-location">{user?.city || 'Pune'}, Maharashtra</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} className="nav-item-icon" />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={16} className="active-chevron" />}
              </Link>
            );
          })}
        </nav>

        {/* In-App Wallet Quick Card */}
        <div className="sidebar-wallet-card">
          <div className="wallet-card-header">
            <Wallet size={16} color="#16a34a" />
            <span>Active Wallet</span>
          </div>
          <div className="wallet-balance-row">
            <span className="wallet-amount">₹{user?.wallet?.balance?.toFixed(2) || '15.00'}</span>
            <span className="wallet-status">Introductory Balance</span>
          </div>
          <Link to="/learner/wallet" className="btn-wallet-view">
            View Ledger &rarr;
          </Link>
        </div>

        {/* Sidebar Footer / Logout */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-sidebar-logout">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="learner-main-wrapper">
        {/* Top Navbar */}
        <header className="learner-topbar">
          <div className="topbar-left">
            <button className="mobile-toggle-btn" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="topbar-welcome">
              <h2>Welcome back, {user?.name?.split(' ')[0] || 'Learner'}! 👋</h2>
              <p>Maharashtra 2-Wheeler & Car Training Hub</p>
            </div>
          </div>

          <div className="topbar-right">
            {/* Wallet Pill */}
            <Link to="/learner/wallet" className="topbar-wallet-pill">
              <Wallet size={15} color="#16a34a" />
              <span>Balance: <strong>₹{user?.wallet?.balance?.toFixed(2) || '15.00'}</strong></span>
            </Link>

            <Link to="/find-school" className="btn-topbar-explore">
              Explore More Schools
            </Link>
          </div>
        </header>

        {/* Page Content Rendered Here */}
        <main className="learner-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
