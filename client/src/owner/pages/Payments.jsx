import { useState, useEffect } from 'react';
import { CreditCard, Wallet, TrendingUp, Download, CheckCircle2, ArrowDownRight, FileText, Info } from 'lucide-react';
import StatCard from '../../admin/components/StatCard';
import StatusPill from '../../admin/components/StatusPill';
import DataTable from '../../admin/components/DataTable';
import SkeletonLoader from '../../admin/components/SkeletonLoader';
import EmptyState from '../../admin/components/EmptyState';
import { ownerPaymentsList } from '../data/dummyData';
import './Payments.css';

const PAYMENT_STAT_CARDS = [
  {
    id: 'monthly-net',
    label: 'Monthly Net Payout (August)',
    value: '₹1,48,200',
    trend: '+24.5% vs July',
    trendType: 'up',
    icon: 'CreditCard',
  },
  {
    id: 'pending-batch',
    label: 'Pending Settlement Batch',
    value: '₹4,680',
    trend: 'Auto-clearing tomorrow',
    trendType: 'warning',
    icon: 'Wallet',
  },
  {
    id: 'gross-student-vol',
    label: 'Gross Student Volume',
    value: '₹1,64,660',
    trend: '38 Active Enrollments',
    trendType: 'neutral',
    icon: 'TrendingUp',
  },
  {
    id: 'commission-deducted',
    label: 'Platform Commission (10%)',
    value: '₹16,460',
    trend: 'SaaS Platform Fee',
    trendType: 'neutral',
    icon: 'FileText',
  },
];

export default function Payments() {
  const [payments, setPayments] = useState(ownerPaymentsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const filteredPayments = payments.filter(
    (p) =>
      p.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'TXN ID',
      render: (row) => <strong className="payment-txn-code tabular-nums">{row.id}</strong>,
    },
    {
      header: 'Student & Course',
      render: (row) => (
        <div className="payment-student-cell">
          <strong>{row.student}</strong>
          <span className="payment-course-sub">{row.course}</span>
        </div>
      ),
    },
    {
      header: 'Student Paid',
      isNumeric: true,
      render: (row) => (
        <div className="paid-amount-cell tabular-nums">
          <strong>₹{row.paidAmount.toLocaleString('en-IN')}</strong>
          {row.walletDiscount > 0 && (
            <span className="wallet-applied-sub">(-₹{row.walletDiscount} Wallet)</span>
          )}
        </div>
      ),
    },
    {
      header: 'Platform Fee (10%)',
      isNumeric: true,
      render: (row) => (
        <span className="platform-commission-cell tabular-nums">
          -₹{row.platformFee.toFixed(2)}
        </span>
      ),
    },
    {
      header: 'Your Net Payout (90%)',
      isNumeric: true,
      render: (row) => (
        <strong className="net-payout-cell tabular-nums">
          ₹{row.netPayout.toFixed(2)}
        </strong>
      ),
    },
    {
      header: 'Date',
      accessor: 'date',
      isNumeric: true,
    },
    {
      header: 'Payout Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Invoice',
      render: (row) => (
        <button
          onClick={() => alert(`Downloading GST Tax Invoice for ${row.id}\nGross: ₹${row.paidAmount} | Net Payout: ₹${row.netPayout}`)}
          className="btn-download-invoice"
          title="Download Tax Invoice (PDF)"
        >
          <Download size={13} />
          <span>PDF</span>
        </button>
      ),
    },
  ];

  return (
    <div className="owner-payments-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Financial Payouts & Settlement Ledger</h1>
          <p>
            Track automated IMPS direct bank transfers, student payment methods, and transparent 10% platform fee splits.
          </p>
        </div>
      </div>

      {/* 2. Wallet-Aware Settlement Math Note */}
      <div className="payout-math-info-banner">
        <Info size={18} color="var(--color-primary, #B91C1C)" flexShrink={0} />
        <div>
          <strong>Transparent Wallet-Discount-Aware Payout Calculation</strong>
          <p>
            When a learner pays with their introductory ₹15 in-app wallet bonus (e.g. paying ₹984 for the ₹999 subsidized package), platform commission is calculated as $10\% \times ₹984 = ₹98.40$. Your bank payout receives the full remaining $90\% = ₹885.60$ with zero hidden deductions.
          </p>
        </div>
      </div>

      {/* 3. Stat Cards */}
      <div className="admin-stats-four-grid">
        {PAYMENT_STAT_CARDS.map((stat) => (
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

      {/* 4. Transactions Ledger Table */}
      <div className="payments-table-card">
        <div className="payments-table-header">
          <div>
            <h3>Course Enrollment Payout History</h3>
            <p>Direct bank transfers deposited to HDFC Bank (•••• 4491)</p>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader rows={4} height={50} />
        ) : filteredPayments.length === 0 ? (
          <EmptyState
            title="No payout transactions found"
            message={`No payment records match query "${searchTerm}".`}
          />
        ) : (
          <DataTable
            columns={columns}
            data={filteredPayments}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search payout records by student, course, or TXN ID..."
          />
        )}
      </div>
    </div>
  );
}
