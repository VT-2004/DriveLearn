import { Inbox } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({ 
  icon: Icon = Inbox, 
  title = 'No records found', 
  message = 'There is currently no data to display here.', 
  ctaText = null, 
  onCtaClick = null 
}) {
  return (
    <div className="admin-empty-state">
      <div className="empty-state-icon-wrap">
        <Icon size={24} color="var(--admin-text-subtle, #94a3b8)" />
      </div>
      <h4 className="empty-state-title">{title}</h4>
      <p className="empty-state-msg">{message}</p>
      {ctaText && onCtaClick && (
        <button onClick={onCtaClick} className="btn-empty-state-cta">
          {ctaText}
        </button>
      )}
    </div>
  );
}
