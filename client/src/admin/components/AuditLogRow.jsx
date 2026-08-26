import { ShieldCheck, User, Clock } from 'lucide-react';
import './AuditLogRow.css';

export default function AuditLogRow({ log }) {
  return (
    <div className="admin-audit-log-row">
      <div className="audit-avatar-chip">
        <User size={14} />
      </div>

      <div className="audit-text-block">
        <p className="audit-sentence">
          <strong className="audit-admin-name">{log.admin}</strong>{' '}
          <span className="audit-action-text">{log.action}</span>{' '}
          <strong className="audit-target-name">{log.target}</strong>
        </p>
      </div>

      <div className="audit-time-block">
        <Clock size={12} />
        <span>{log.timestamp}</span>
      </div>
    </div>
  );
}
