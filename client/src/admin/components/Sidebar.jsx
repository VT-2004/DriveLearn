import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Shield, Car, Globe, Ticket, CreditCard, 
  PhoneCall, FileText, Settings, LogOut, ShieldCheck, X, ArrowUpRight, Wallet 
} from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './Sidebar.css';

const navGroups = [
  {
    label: 'OVERVIEW',
    items: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: Home },
    ],
  },
  {
    label: 'NETWORK',
    items: [
      { label: 'School Verification', path: '/admin/verification', icon: Shield },
      { label: 'Driving Schools', path: '/admin/schools', icon: Car },
      { label: 'States & Cities', path: '/admin/locations', icon: Globe },
    ],
  },
  {
    label: 'COMMERCE',
    items: [
      { label: 'Offers & Wallet', path: '/admin/offers', icon: Wallet }, // NEW in v3: Placed first per strategic priority
      { label: 'Subscriptions', path: '/admin/subscriptions', icon: Ticket },
      { label: 'Payments', path: '/admin/payments', icon: CreditCard },
      { label: 'Support', path: '/admin/support', icon: PhoneCall },
      { label: 'Audit Log', path: '/admin/audit-log', icon: FileText },
      { label: 'Settings', path: '/admin/settings', icon: Settings },
    ],
  },
];

function SidebarLink({ item, currentPath, onClose }) {
  const Icon = item.icon;
  const isActive = currentPath === item.path || (item.path !== '/admin/dashboard' && currentPath.startsWith(item.path));

  return (
    <Link
      to={item.path}
      className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
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
    <aside className={`admin-portal-sidebar ${isOpen ? 'open' : ''}`}>
      {/* 1. Brand Logo */}
      <div className="sidebar-brand-header">
        <Link to="/" className="sidebar-brand-link">
          <div className="brand-badge-icon">
            <ShieldCheck size={20} color="#ffffff" />
          </div>
          <div className="brand-badge-text">
            <span className="brand-name">DriveLearn</span>
            <span className="brand-portal-tag">Super Admin</span>
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

      {/* 3. Footer Actions: Exit to Website + Sign Out */}
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
