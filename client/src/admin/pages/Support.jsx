import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/DataTable';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { initialTickets } from '../data/dummyData';
import './Support.css';

const PRIORITY_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function Support() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');

  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(statusParam || 'ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // v3 addition
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleResolve = (id) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'resolved' } : t))
    );
  };

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || t.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory =
      categoryFilter === 'ALL' || t.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Default Sort: High Priority First
  const sortedTickets = [...filtered].sort((a, b) => {
    const weightA = PRIORITY_WEIGHTS[a.priority] || 0;
    const weightB = PRIORITY_WEIGHTS[b.priority] || 0;
    return weightB - weightA;
  });

  const columns = [
    {
      header: 'Ticket ID',
      render: (row) => (
        <div className="ticket-id-cell">
          <span className={`priority-indicator-dot dot-${row.priority}`}></span>
          <strong className="ticket-id-badge">{row.id}</strong>
        </div>
      ),
    },
    {
      header: 'Category',
      render: (row) => (
        <span className={`ticket-category-tag cat-${row.category.toLowerCase()}`}>
          {row.category}
        </span>
      ),
    },
    {
      header: 'From (User / School)',
      render: (row) => <span>{row.from}</span>,
    },
    {
      header: 'Subject & Inquiry',
      render: (row) => <span className="ticket-subject">{row.subject}</span>,
    },
    {
      header: 'Priority',
      render: (row) => (
        <span className={`priority-badge priority-${row.priority}`}>
          <span>{row.priority.toUpperCase()}</span>
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Action',
      render: (row) => (
        <div className="ticket-actions">
          {row.status !== 'resolved' ? (
            <button 
              onClick={() => handleResolve(row.id)} 
              className="btn-resolve-ticket"
            >
              Resolve
            </button>
          ) : (
            <span className="text-resolved-tag">Closed</span>
          )}
        </div>
      ),
    },
  ];

  const extraToolbar = (
    <div className="support-toolbar-filters">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="admin-select-filter"
      >
        <option value="ALL">All Categories</option>
        <option value="Wallet">Wallet Issues (₹15 Bonus)</option>
        <option value="Payment">Payment & Fee Subsidies</option>
        <option value="General">General Inquiries</option>
      </select>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="admin-select-filter"
      >
        <option value="ALL">All Statuses</option>
        <option value="open">Open Tickets Only</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );

  return (
    <div className="admin-support-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Platform Support & Helpdesk Queue</h1>
          <p>
            Prioritized ticket triage with category filters for wallet bonuses, subsidized payment issues, and instructor slots.
          </p>
        </div>
      </div>

      {/* 2. Tickets Table (3-State Pattern) */}
      {loading ? (
        <SkeletonLoader rows={5} height={52} />
      ) : sortedTickets.length === 0 ? (
        <EmptyState
          title="No support tickets match your filter"
          message={`No grievances found under category "${categoryFilter}" and status "${statusFilter}".`}
          ctaText="View All Tickets"
          onCtaClick={() => {
            setCategoryFilter('ALL');
            setStatusFilter('ALL');
            setSearchTerm('');
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={sortedTickets}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search tickets by ID, sender, or subject..."
          extraToolbar={extraToolbar}
        />
      )}
    </div>
  );
}
