import { useState, useEffect } from 'react';
import { 
  Wallet, Users, Sparkles, Calendar, ShieldAlert, 
  CheckCircle, Ban, ArrowDownRight, ArrowUpRight, Search 
} from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/DataTable';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { 
  walletLiabilityStats, 
  initialFlaggedSignups, 
  initialWalletTransactions 
} from '../data/dummyData';
import './OffersAndWallet.css';

const ICONS_MAP = {
  Wallet,
  Users,
  Sparkles,
  Calendar,
};

export default function OffersAndWallet() {
  const [flaggedList, setFlaggedList] = useState(initialFlaggedSignups);
  const [transactions] = useState(initialWalletTransactions);
  const [abuseSearch, setAbuseSearch] = useState('');
  const [txnSearch, setTxnSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = (id, newStatus) => {
    setFlaggedList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredFlagged = flaggedList.filter(
    (item) =>
      item.phone.toLowerCase().includes(abuseSearch.toLowerCase()) ||
      item.email.toLowerCase().includes(abuseSearch.toLowerCase()) ||
      item.device.toLowerCase().includes(abuseSearch.toLowerCase()) ||
      item.flaggedReason.toLowerCase().includes(abuseSearch.toLowerCase())
  );

  const filteredTransactions = transactions.filter(
    (txn) =>
      txn.user.toLowerCase().includes(txnSearch.toLowerCase()) ||
      txn.reason.toLowerCase().includes(txnSearch.toLowerCase()) ||
      txn.id.toLowerCase().includes(txnSearch.toLowerCase())
  );

  const abuseColumns = [
    {
      header: 'User & Contact',
      render: (row) => (
        <div className="abuse-user-cell">
          <strong>{row.phone}</strong>
          <span className="user-email-sub">{row.email}</span>
        </div>
      ),
    },
    {
      header: 'Device Fingerprint',
      render: (row) => <span className="device-code tabular-nums">{row.device}</span>,
    },
    {
      header: 'Claims Attempted',
      isNumeric: true,
      render: (row) => <strong className="claims-count-badge tabular-nums">{row.claimCount} Signups</strong>,
    },
    {
      header: 'Flag Reason',
      render: (row) => <span className="flag-reason-text">{row.flaggedReason}</span>,
    },
    {
      header: 'Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Moderation Action',
      render: (row) => (
        <div className="abuse-actions-row">
          {row.status === 'under review' ? (
            <>
              <button
                onClick={() => handleAction(row.id, 'approved')}
                className="btn-action-approve"
                title="Approve Wallet Claim"
              >
                <CheckCircle size={13} />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleAction(row.id, 'blocked')}
                className="btn-action-block"
                title="Block Device & Revoke Bonus"
              >
                <Ban size={13} />
                <span>Block</span>
              </button>
            </>
          ) : (
            <span className="action-resolved-text">Resolved ({row.status})</span>
          )}
        </div>
      ),
    },
  ];

  const txnColumns = [
    {
      header: 'TXN ID',
      render: (row) => <strong className="txn-code">{row.id}</strong>,
    },
    {
      header: 'Learner & City',
      accessor: 'user',
    },
    {
      header: 'Type',
      render: (row) => (
        <span className={`txn-type-badge ${row.type.toLowerCase()}`}>
          {row.type === 'Credit' ? <ArrowDownRight size={13} /> : <ArrowUpRight size={13} />}
          <span>{row.type}</span>
        </span>
      ),
    },
    {
      header: 'Amount',
      isNumeric: true,
      render: (row) => (
        <strong className={row.type === 'Credit' ? 'text-credit-amount' : 'text-debit-amount'}>
          {row.type === 'Credit' ? '+₹' : '-₹'}{row.amount}.00
        </strong>
      ),
    },
    {
      header: 'Reason & Inclusions',
      accessor: 'reason',
    },
    {
      header: 'Timestamp',
      accessor: 'date',
      isNumeric: true,
    },
  ];

  return (
    <div className="admin-offers-page">
      {/* 1. Page Header */}
      <div className="admin-view-header">
        <div>
          <h1>Offers, Subsidies & Wallet Oversight</h1>
          <p>
            Monitor signup bonus liabilities, track ₹999 launch subsidies, and review automated abuse prevention flags.
          </p>
        </div>
      </div>

      {/* Sub-section A: Stat Cards Row */}
      <div className="admin-stats-four-grid">
        {walletLiabilityStats.map((stat) => {
          const IconComponent = ICONS_MAP[stat.icon] || Wallet;
          return (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendType={stat.trendType}
              icon={<IconComponent size={18} />}
            />
          );
        })}
      </div>

      {/* Sub-section B: Abuse Monitoring Section */}
      <div className="offers-table-card">
        <div className="table-card-header">
          <div className="table-title-wrap">
            <ShieldAlert size={18} color="var(--admin-accent, #B91C1C)" />
            <div>
              <h3>Automated Abuse & Duplicate Prevention Queue</h3>
              <p>Suspicious signup clusters flagged by device fingerprint, IP frequency, or duplicate Aadhaar OTP</p>
            </div>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader rows={3} height={52} />
        ) : filteredFlagged.length === 0 ? (
          <EmptyState
            title="No abuse flags detected"
            message="No suspicious signup attempts are currently under review."
          />
        ) : (
          <DataTable
            columns={abuseColumns}
            data={filteredFlagged}
            searchTerm={abuseSearch}
            onSearchChange={setAbuseSearch}
            searchPlaceholder="Filter flagged accounts by phone, email, device ID, or reason..."
          />
        )}
      </div>

      {/* Sub-section C: Wallet Transaction Log */}
      <div className="offers-table-card">
        <div className="table-card-header">
          <div className="table-title-wrap">
            <Wallet size={18} color="var(--admin-accent, #B91C1C)" />
            <div>
              <h3>Platform Wallet Transaction Audit Log</h3>
              <p>Live ledger of all ₹15 signup bonus deposits and course checkout fee deductions</p>
            </div>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader rows={4} height={50} />
        ) : filteredTransactions.length === 0 ? (
          <EmptyState
            title="No transactions found"
            message={`No wallet audit records match "${txnSearch}".`}
          />
        ) : (
          <DataTable
            columns={txnColumns}
            data={filteredTransactions}
            searchTerm={txnSearch}
            onSearchChange={setTxnSearch}
            searchPlaceholder="Search ledger by student name, reason, or TXN ID..."
          />
        )}
      </div>
    </div>
  );
}
