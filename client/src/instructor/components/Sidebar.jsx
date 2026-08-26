import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, Clock, 
  User, ArrowLeft, LogOut, X, Compass, Award
} from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './Sidebar.css';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/instructor/dashboard', icon: LayoutDashboard },
  { label: 'My Students', path: '/instructor/students', icon: Users },
  { label: "Today's Schedule", path: '/instructor/schedule', icon: Clock },
  { label: 'Availability', path: '/instructor/availability', icon: Calendar },
  { label: 'Profile', path: '/instructor/profile', icon: User },
];

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`instructor-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <Link to="/instructor/dashboard" className="brand-logo-link" onClick={onClose}>
          <div className="brand-logo-badge">DL</div>
          <div className="brand-text">
            <span className="brand-name">DriveLearn</span>
            <span className="portal-tag">Trainer Hub</span>
          </div>
        </Link>
        <button onClick={onClose} className="btn-close-sidebar" aria-label="Close menu">
          <X size={18} />
        </button>
      </div>

      <nav className="instructor-nav-list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `instructor-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer-group">
        <Link to="/" className="instructor-footer-link" onClick={onClose}>
          <Compass size={16} />
          <span>Exit to Main Site</span>
        </Link>
        <button onClick={handleLogout} className="instructor-logout-button">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
