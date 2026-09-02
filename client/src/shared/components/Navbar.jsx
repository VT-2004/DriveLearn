import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bike, Sparkles, Menu, X, ShieldCheck, Wallet, User, LogOut } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar-wrapper">
      {/* 1. Top Offer Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container announcement-inner">
          <div className="announcement-badge">
            <Sparkles size={14} />
            <span>Maharashtra Launch Offer</span>
          </div>
          <p className="announcement-text">
            Get <strong>₹15 Instant In-App Wallet Credit</strong> on signup • Subsidized 2-Wheeler Course from <strong>₹999</strong> for first 2 months!
          </p>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="main-navbar">
        <div className="container nav-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-icon-wrap">
              <Bike size={24} color="#ffffff" />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">DriveLearn<span className="brand-highlight">India</span></span>
              <span className="brand-subtitle">Maharashtra RTO Network</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            <Link to="/find-school" className="nav-link">Find Schools</Link>
            <Link to="/pricing" className="nav-link">Courses & Pricing</Link>
            <Link to="/find-school?course=2wheeler" className="nav-link special-highlight">
              <span>2-Wheeler Track (₹999)</span>
            </Link>
          </div>

          {/* Desktop Auth State Buttons */}
          <div className="desktop-auth-btns">
            {user ? (
              <div className="nav-user-profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Wallet Balance Pill */}
                <div className="nav-wallet-pill" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  border: '1px solid #bbf7d0'
                }}>
                  <Wallet size={14} />
                  <span>₹{user.wallet?.balance?.toFixed(2) || '15.00'}</span>
                </div>

                {/* User Name & Role */}
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                  <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>{user.name.split(' ')[0]}</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: '700' }}>{user.role}</span>
                </div>

                {/* Direct Portal Link */}
                <Link
                  to={
                    user.role === 'LEARNER' ? '/learner/dashboard' :
                    user.role === 'INSTRUCTOR' ? '/instructor/dashboard' :
                    user.role === 'OWNER' ? '/owner/dashboard' : '/admin/dashboard'
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    backgroundColor: 'var(--primary, #B91C1C)',
                    color: '#ffffff',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    textDecoration: 'none'
                  }}
                >
                  <span>Dashboard &rarr;</span>
                </Link>

                {/* Logout Button */}
                <button onClick={handleLogout} className="btn-nav-logout" title="Sign Out" style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}>
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-nav-login">Sign In</Link>
                <Link to="/signup" className="btn-nav-signup">
                  <span>Register (+₹15 Free)</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <Link to="/find-school" onClick={() => setMobileMenuOpen(false)}>Find Schools</Link>
            <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>Courses & Pricing</Link>
            <Link to="/find-school?course=2wheeler" onClick={() => setMobileMenuOpen(false)}>
              2-Wheeler Track (₹999 Special)
            </Link>
            <div className="mobile-auth-drawer">
              {user ? (
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn-drawer-signup">
                  Sign Out ({user.name.split(' ')[0]})
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-drawer-login">Sign In</Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn-drawer-signup">
                    Create Account (+₹15 Bonus)
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
