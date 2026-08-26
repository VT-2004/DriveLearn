import { useState } from 'react';
import { Menu, Bell, ShieldCheck, LogOut, ChevronDown, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import { schoolProfileData } from '../data/dummyData';
import './Header.css';

const OWNER_NOTIFICATIONS = [
  {
    id: 1,
    title: 'New Booking Awaiting Confirmation',
    desc: 'Pooja Kulkarni booked 2-Wheeler 04:00 PM slot for today.',
    time: '10m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Vehicle Insurance Nearing Expiry',
    desc: 'Swift MH-12-AB-4471 insurance expires in 14 days.',
    time: '2h ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Payout Settled (₹4,215.60)',
    desc: 'IMPS transfer for Combo course enrollment completed.',
    time: '1d ago',
    unread: false,
  },
];

export default function Header({ onToggleSidebar }) {
  const { logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(OWNER_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className="owner-portal-header">
      {/* Left: Mobile hamburger + School Identification */}
      <div className="header-left">
        <button
          className="btn-mobile-menu"
          onClick={onToggleSidebar}
          aria-label="Open Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="header-school-chip">
          <div className="school-chip-badge">
            <ShieldCheck size={16} color="#15803D" />
          </div>
          <div className="school-chip-text">
            <strong>{schoolProfileData.name}</strong>
            <span>{schoolProfileData.rtoZone} • Pro Tier</span>
          </div>
        </div>
      </div>

      {/* Right: Notifications + User Identity */}
      <div className="header-right">
        {/* Notification Bell with Dropdown */}
        <div className="header-notif-wrap">
          <button
            className="btn-header-notif"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notif-unread-dot"></span>}
          </button>

          {showNotifications && (
            <div className="owner-notif-dropdown">
              <div className="notif-dropdown-header">
                <strong>Activity Notifications</strong>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="btn-mark-all-read">
                    Mark read
                  </button>
                )}
              </div>
              <div className="notif-dropdown-list">
                {notifications.map((n) => (
                  <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                    <div className="notif-item-top">
                      <span className="notif-title">{n.title}</span>
                      <span className="notif-time">{n.time}</span>
                    </div>
                    <p className="notif-desc">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Chip */}
        <div className="owner-identity-chip">
          <div className="owner-avatar">RP</div>
          <div className="owner-meta">
            <span className="owner-name">{schoolProfileData.ownerName}</span>
            <span className="owner-role">School Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
}
