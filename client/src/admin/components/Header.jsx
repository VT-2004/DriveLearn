import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Settings, Menu, Search, LogOut } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';
import { useAuth } from '../../shared/context/AuthContext';
import { initialNotifications } from '../data/dummyData';
import './Header.css';

export default function Header({ 
  userName = 'Platform Control', 
  userRole = 'Super Admin', 
  onMenuToggle,
  onOpenPalette 
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="admin-portal-header">
      <div className="header-left-col">
        <button className="header-mobile-menu-btn" onClick={onMenuToggle} aria-label="Open Sidebar">
          <Menu size={22} />
        </button>

        {/* Global Cmd+K Search Trigger Button */}
        <button onClick={onOpenPalette} className="header-search-trigger-btn">
          <Search size={15} />
          <span className="search-text-placeholder">Search anything...</span>
          <kbd className="cmd-k-badge">⌘K</kbd>
        </button>
      </div>

      <div className="header-right-col">
        {/* Notification Bell with Dropdown */}
        <div className="notif-wrapper">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)} 
            className="header-icon-btn" 
            aria-label="Notifications" 
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="unread-dot">{unreadCount}</span>}
          </button>

          {isNotifOpen && (
            <NotificationDropdown
              notifications={notifications}
              onMarkAllRead={handleMarkAllRead}
              onNotificationClick={handleNotificationClick}
              onClose={() => setIsNotifOpen(false)}
            />
          )}
        </div>

        {/* Settings Gear */}
        <Link to="/admin/settings" className="header-icon-btn" aria-label="Settings" title="Global Settings">
          <Settings size={18} />
        </Link>

        {/* Sign Out Header Button */}
        <button 
          onClick={handleLogout} 
          className="header-icon-btn header-logout-btn" 
          aria-label="Sign Out" 
          title="Sign Out of Super Admin"
        >
          <LogOut size={18} />
        </button>

        {/* Divider */}
        <div className="header-divider"></div>

        {/* User Chip */}
        <div className="header-user-chip">
          <div className="user-initials-avatar">
            SA
          </div>
          <div className="user-text-meta">
            <strong className="user-chip-name">{userName}</strong>
            <span className="user-chip-role">{userRole}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
