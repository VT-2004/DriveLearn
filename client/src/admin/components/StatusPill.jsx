import './StatusPill.css';

export default function StatusPill({ status }) {
  if (!status) return null;
  const normalized = status.toLowerCase().replace(/\s+/g, '-');

  return (
    <span className={`admin-status-pill pill-${normalized}`}>
      <span className="pill-dot"></span>
      <span className="pill-text">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    </span>
  );
}
