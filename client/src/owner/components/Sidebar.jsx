import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Users, Award, Car, BookOpen, Calendar, 
  CreditCard, Ticket, Star, Settings, LogOut, ShieldCheck, X, ArrowUpRight 
} from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './Sidebar.css';

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', path: '/owner/dashboard', icon: Home },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { label: 'Students', path: '/owner/students', icon: Users },
      { label: 'Instructors', path: '/owner/instructors', icon: Award },
      { label: 'Vehicles', path: '/owner/vehicles', icon: Car },
      { label: 'Courses & Packages', path: '/owner/courses', icon: BookOpen },
      { label: 'Bookings & Schedule', path: '/owner/bookings', icon: Calendar },
    ],
  },
  {
    label: 'BUSINESS',
    items: [
      { label: 'Payments & Payouts', path: '/owner/payments', icon: CreditCard },
      { label: 'Subscription', path: '/owner/subscription', icon: Ticket },
      { label: 'Reviews', path: '/owner/reviews', icon: Star },
      { label: 'Settings', path: '/owner/settings', icon: Settings },
    ],
  },
];

function SidebarLink({ item, currentPath, onClose }) {
  const Icon = item.icon;
  const isActive = currentPath === item.path || (item.path !== '/owner/dashboard' && currentPath.startsWith(item.path));

  return (
    <Link
      to={item.path}
      className={`owner-sidebar-link ${isActive ? 'active' : ''}`}
      onClick={onClose}
    >
      <Icon size={17} className="sidebar-link-icon" />
      <span className="sidebar-link-label">{item.label}</span>
    </Link>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`owner-portal-sidebar ${isOpen ? 'open' : ''}`}>
      {/* 1. Brand & School Badge */}
      <div className="sidebar-brand-header">
        <Link to="/" className="sidebar-brand-link">
          <div className="brand-badge-icon">
            <ShieldCheck size={20} color="#ffffff" />
          </div>
          <div className="brand-badge-text">
            <span className="brand-name">DriveLearn</span>
            <span className="brand-portal-tag">School Owner</span>
          </div>
        </Link>
        <button className="sidebar-close-toggle" onClick={onClose} aria-label="Close Sidebar">
          <X size={18} />
        </button>
      </div>

      {/* 2. Grouped Navigation Links */}
      <div className="sidebar-nav-scroll">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="sidebar-nav-group">
            <span className="group-heading">{group.label}</span>
            <div className="group-links-list">
              {group.items.map((item, iIdx) => (
                <SidebarLink
                  key={iIdx}
                  item={item}
                  currentPath={location.pathname}
                  onClose={onClose}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Footer: Exit to Website + Sign Out */}
      <div className="sidebar-exit-footer">
        <Link to="/" className="btn-exit-website">
          <ArrowUpRight size={15} />
          <span>Exit to Website</span>
        </Link>
        <button onClick={handleLogout} className="btn-sidebar-logout">
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
