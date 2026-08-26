import { Link } from 'react-router-dom';
import { CheckCheck, Bell, ArrowRight } from 'lucide-react';
import './NotificationDropdown.css';

export default function NotificationDropdown({ 
  notifications = [], 
  onMarkAllRead, 
  onNotificationClick, 
  onClose 
}) {
  return (
    <div className="admin-notification-dropdown" onClick={(e) => e.stopPropagation()}>
      {/* 1. Header */}
      <div className="notif-dropdown-header">
        <div className="notif-title-row">
          <Bell size={16} color="var(--admin-accent, #dc2626)" />
          <strong>Platform Notifications</strong>
        </div>
        <button onClick={onMarkAllRead} className="btn-mark-all-read">
          <CheckCheck size={14} />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* 2. List */}
      <div className="notif-dropdown-list">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <Link
              key={n.id}
              to={n.link}
              onClick={() => {
                onNotificationClick(n.id);
                onClose();
              }}
              className={`notif-item ${!n.read ? 'unread' : ''}`}
            >
              <div className="notif-dot-wrap">
                <span className={`notif-status-dot ${!n.read ? 'active' : ''}`}></span>
              </div>
              <div className="notif-item-body">
                <p className="notif-text">{n.text}</p>
                <span className="notif-time">{n.time}</span>
              </div>
              <ArrowRight size={13} className="notif-arrow" />
            </Link>
          ))
        ) : (
          <div className="notif-empty">
            <span>No notifications right now</span>
          </div>
        )}
      </div>
    </div>
  );
}
