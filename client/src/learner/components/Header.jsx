import { useState } from 'react';
import { Menu, Bell, User, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import { learnerProfileData, learnerNotifications } from '../data/dummyData';
import './Header.css';

export default function Header({ onToggleSidebar }) {
  const { user } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState(learnerNotifications);

  const learnerName = user?.name || learnerProfileData.name;

  return (
    <header className="learner-portal-header">
      <div className="header-left">
        <button 
          onClick={onToggleSidebar} 
          className="btn-mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="learner-welcome-chip">
          <Sparkles size={15} color="var(--color-primary, #B91C1C)" />
          <span>Maharashtra 2-Wheeler Training Live</span>
        </div>
      </div>

      <div className="header-right">
        {/* Notifications Dropdown */}
        <div className="header-notif-wrap">
          <button 
            onClick={() => setShowNotifs(!showNotifs)} 
            className="btn-header-notif"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notifications.length > 0 && <span className="notif-unread-dot"></span>}
          </button>

          {showNotifs && (
            <div className="learner-notif-dropdown">
              <div className="notif-dropdown-header">
                <strong>Activity & Lesson Alerts</strong>
                <button 
                  onClick={() => setNotifications([])}
                  className="btn-mark-all-read"
                >
                  Clear All
                </button>
              </div>

              <div className="notif-dropdown-list">
                {notifications.length === 0 ? (
                  <p className="no-notifs-text">All caught up! No unread notifications.</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="notif-item">
                      <div className="notif-item-top">
                        <strong className="notif-title">{n.title}</strong>
                        <span className="notif-time tabular-nums">{n.time}</span>
                      </div>
                      <p className="notif-desc">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Chip */}
        <div className="learner-identity-chip">
          <div className="learner-avatar">
            {learnerName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="learner-meta">
            <span className="learner-name">{learnerName}</span>
            <span className="learner-role">Learner • MH-12</span>
          </div>
        </div>
      </div>
    </header>
  );
}
