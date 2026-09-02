import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Calendar, TrendingUp, Wallet, 
  Award, User, ArrowLeft, LogOut, X, Compass, MessageSquare, BookOpenCheck, Search 
} from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './Sidebar.css';

const NAV_LINKS = [
  { label: 'Dashboard', path: '/learner/dashboard', icon: LayoutDashboard },
  { label: 'Courses & Schools', path: '/learner/courses', icon: Compass },
  { label: 'My Bookings', path: '/learner/bookings', icon: Calendar },
  { label: 'Progress', path: '/learner/progress', icon: TrendingUp },
  { label: 'RTO Exam Prep', path: '/learner/rto-mock-test', icon: BookOpenCheck },
  { label: 'Wallet', path: '/learner/wallet', icon: Wallet },
  { label: 'Certificates', path: '/learner/certificates', icon: Award },
  { label: 'Messages', path: '/learner/messages', icon: MessageSquare, badge: '1' },
  { label: 'Profile', path: '/learner/profile', icon: User },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`learner-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <Link to="/learner/dashboard" className="brand-logo-link" onClick={onClose}>
          <div className="brand-logo-badge">DL</div>
          <div className="brand-text">
            <span className="brand-name">DriveLearn</span>
            <span className="portal-tag">Learner Hub</span>
          </div>
        </Link>
        <button onClick={onClose} className="btn-close-sidebar" aria-label="Close menu">
          <X size={18} />
        </button>
      </div>

      {/* Flat Nav List */}
      <nav className="learner-nav-list">
        {NAV_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `learner-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge && <span className="nav-unread-badge">{item.badge}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Exit Links */}
      <div className="sidebar-footer-group">
        <Link to="/" className="learner-footer-link" onClick={onClose}>
          <Compass size={16} />
          <span>Exit to Main Site</span>
        </Link>
        <button onClick={handleLogout} className="learner-logout-button">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
