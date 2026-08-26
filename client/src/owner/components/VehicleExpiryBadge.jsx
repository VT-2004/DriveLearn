import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import './VehicleExpiryBadge.css';

export default function VehicleExpiryBadge({ expiryDate, label = 'Insurance' }) {
  if (!expiryDate) {
    return <span className="expiry-badge badge-neutral">No Date</span>;
  }

  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return (
      <span className="expiry-badge badge-danger tabular-nums" title={`Expired on ${expiryDate}`}>
        <XCircle size={12} />
        <span>{label} Expired</span>
      </span>
    );
  }

  if (diffDays <= 30) {
    return (
      <span className="expiry-badge badge-warning tabular-nums" title={`Expiring on ${expiryDate} (${diffDays} days left)`}>
        <AlertTriangle size={12} />
        <span>Expiring in {diffDays}d</span>
      </span>
    );
  }

  return (
    <span className="expiry-badge badge-success tabular-nums" title={`Valid until ${expiryDate}`}>
      <CheckCircle2 size={12} />
      <span>Valid till {new Date(expiryDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
    </span>
  );
}
