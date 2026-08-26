import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, PhoneCall, CreditCard, ArrowRight, X } from 'lucide-react';
import { initialAllSchools, initialTickets, initialTransactions } from '../data/dummyData';
import './CommandPalette.css';

export default function CommandPalette({ onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Aggregate searchable items across the platform
  const allResults = [
    ...initialAllSchools.map((s) => ({
      id: `school-${s.id}`,
      type: 'School',
      label: s.name,
      subtext: `${s.city} • Rating ${s.rating}`,
      path: '/admin/schools',
      icon: Building2,
    })),
    ...initialTickets.map((t) => ({
      id: `ticket-${t.id}`,
      type: 'Support Ticket',
      label: `${t.id}: ${t.subject}`,
      subtext: `From: ${t.from} • Priority: ${t.priority.toUpperCase()}`,
      path: '/admin/support',
      icon: PhoneCall,
    })),
    ...initialTransactions.map((tx) => ({
      id: `tx-${tx.txnId}`,
      type: 'Transaction',
      label: `${tx.txnId} (₹${tx.amount.toLocaleString('en-IN')})`,
      subtext: `${tx.school} • Status: ${tx.status}`,
      path: '/admin/payments',
      icon: CreditCard,
    })),
  ];

  const filtered = query.trim() === ''
    ? allResults.slice(0, 8)
    : allResults.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.subtext.toLowerCase().includes(query.toLowerCase()) ||
          r.type.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (item) => {
    navigate(item.path);
    onClose();
  };

  return (
    <div className="admin-palette-overlay" onClick={onClose}>
      <div className="admin-palette-box" onClick={(e) => e.stopPropagation()}>
        {/* Search Header */}
        <div className="palette-input-row">
          <Search size={18} className="palette-search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search driving schools, tickets, or transactions..."
            className="palette-input"
          />
          <button onClick={onClose} className="btn-palette-close" title="Close (Esc)">
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="palette-results-list">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="palette-result-item"
                >
                  <div className="palette-item-icon-box">
                    <ItemIcon size={16} />
                  </div>
                  <div className="palette-item-text">
                    <div className="palette-item-title-row">
                      <span className="palette-item-label">{item.label}</span>
                      <span className="palette-item-type-badge">{item.type}</span>
                    </div>
                    <span className="palette-item-sub">{item.subtext}</span>
                  </div>
                  <ArrowRight size={14} className="palette-arrow" />
                </div>
              );
            })
          ) : (
            <div className="palette-empty">
              <span>No matching records found for "{query}"</span>
            </div>
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="palette-footer-hints">
          <span><strong>Esc</strong> to close</span>
          <span><strong>Click</strong> or <strong>Enter</strong> to navigate</span>
        </div>
      </div>
    </div>
  );
}
