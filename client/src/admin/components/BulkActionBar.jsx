import { CheckCircle2, XCircle, X } from 'lucide-react';
import './BulkActionBar.css';

export default function BulkActionBar({ 
  selectedCount = 0, 
  onVerifyAll, 
  onRejectAll, 
  onClear 
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="admin-bulk-action-bar">
      <div className="bulk-bar-info">
        <span className="bulk-count-badge">{selectedCount}</span>
        <strong>{selectedCount === 1 ? 'school selected' : 'schools selected'}</strong>
      </div>

      <div className="bulk-bar-actions">
        {onVerifyAll && (
          <button onClick={onVerifyAll} className="btn-bulk-verify">
            <CheckCircle2 size={15} />
            <span>Verify Selected</span>
          </button>
        )}

        {onRejectAll && (
          <button onClick={onRejectAll} className="btn-bulk-reject">
            <XCircle size={15} />
            <span>Reject Selected</span>
          </button>
        )}

        <button onClick={onClear} className="btn-bulk-clear" title="Clear selection">
          <X size={15} />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}
