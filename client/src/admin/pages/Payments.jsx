import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/DataTable';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { paymentStats, initialTransactions } from '../data/dummyData';
import './Payments.css';

export default function Payments() {
  const [transactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState({ field: 'date', direction: 'desc' });
  const [loading, setLoading] = useState(true);
  const defaultCommissionRate = 10;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const filtered = transactions.filter(
    (txn) =>
      txn.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy.field === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sortBy.field === 'amount') {
      return sortBy.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const columns = [
    {
      header: 'Transaction ID',
      render: (row) => <strong className="txn-id-code">{row.txnId}</strong>,
    },
    {
      header: 'Driving School',
      accessor: 'school',
    },
    {
      header: 'Gross Amount',
      accessor: 'amount',
      sortable: true,
      sortField: 'amount',
      isNumeric: true,
      render: (row) => <strong>₹{row.amount.toLocaleString('en-IN')}</strong>,
    },
    {
      header: 'Commission (10%)',
      isNumeric: true,
      render: (row) => {
        const commission = Math.round(row.amount * (defaultCommissionRate / 100));
        return <span className="commission-text">+₹{commission.toLocaleString('en-IN')}</span>;
      },
    },
    {
      header: 'Date',
      accessor: 'date',
      sortable: true,
      sortField: 'date',
      isNumeric: true,
    },
    {
      header: 'Status',
      render: (row) => <StatusPill status={row.status} />,
    },
  ];

  return (
    <div className="admin-payments-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Payments & Revenue Settlement</h1>
          <p>Real-time transaction tracking, commission splits, and automated bank settlements.</p>
        </div>
      </div>

      {/* 2. Stat Cards Row */}
      <div className="admin-stats-four-grid">
        {paymentStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            trendType={stat.trendType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* 3. Transactions Table (3-State Pattern) */}
      <div className="payments-table-section">
        <div className="table-section-title">
          <h3>Recent Transactions</h3>
          <p>Student fee transactions and 10% platform commission splits</p>
        </div>

        {loading ? (
          <SkeletonLoader rows={5} height={50} />
        ) : sorted.length === 0 ? (
          <EmptyState
            title="No transactions found"
            message={`No payment records match query "${searchTerm}".`}
          />
        ) : (
          <DataTable
            columns={columns}
            data={sorted}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search by TXN ID, school, or status..."
            sortBy={sortBy}
            onSort={handleSort}
          />
        )}
      </div>
    </div>
  );
}
