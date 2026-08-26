import { useState, useEffect } from 'react';
import { ShieldCheck, Search, Filter, RefreshCcw } from 'lucide-react';
import AuditLogRow from '../components/AuditLogRow';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { initialAuditLogs } from '../data/dummyData';
import './AuditLog.css';

export default function AuditLog() {
  const [logs, setLogs] = useState(initialAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-audit-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Platform Audit Trail & Security Log</h1>
          <p>Complete reverse-chronological log of administrative actions, verifications, and settings changes.</p>
        </div>
      </div>

      {/* 2. Filter / Search Toolbar */}
      <div className="audit-toolbar">
        <div className="audit-search-box">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter audit logs by admin name, action, or target..."
            className="audit-search-input"
          />
        </div>

        <div className="audit-meta-tag tabular-nums">
          <ShieldCheck size={14} color="var(--admin-accent, #dc2626)" />
          <span>{filtered.length} Recorded Actions</span>
        </div>
      </div>

      {/* 3. Feed List (3-State Pattern) */}
      <div className="audit-feed-container">
        {loading ? (
          <SkeletonLoader rows={5} height={56} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No audit entries found"
            message={`No administrative records matched "${searchTerm}".`}
          />
        ) : (
          <div className="audit-feed-list">
            {filtered.map((log) => (
              <AuditLogRow key={log.id} log={log} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
