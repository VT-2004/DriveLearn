import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertOctagon, CheckCircle2, Clock, Ticket } from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/DataTable';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { subscriptionStats } from '../data/dummyData';
import './Subscriptions.css';

// Extended subscription list including Lapsed / Expired schools (Gap Audit Item #2)
const allAdminSubscriptions = [
  { id: 'sub-1', school: 'Sai Motor & 2-Wheeler Academy', plan: 'Professional', amount: 2500, renewalDate: '2026-08-28', status: 'expiring soon' },
  { id: 'sub-2', school: 'Shivaji Driving School', plan: 'Basic', amount: 999, renewalDate: '2026-09-15', status: 'active' },
  { id: 'sub-3', school: 'Apex Rider Training Academy', plan: 'Enterprise', amount: 4999, renewalDate: '2026-09-02', status: 'active' },
  { id: 'sub-4', school: 'National Motor Driving Training', plan: 'Professional', amount: 2500, renewalDate: '2026-09-10', status: 'active' },
  { id: 'sub-5', school: 'Patil Motor Training School (Kolhapur)', plan: 'Basic', amount: 999, renewalDate: '2026-08-10', status: 'lapsed' },
  { id: 'sub-6', school: 'Deccan Motor Riders (Pune)', plan: 'Professional', amount: 2500, renewalDate: '2026-08-14', status: 'lapsed' },
];

export default function Subscriptions() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');

  const [subscriptions] = useState(allAdminSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(statusParam ? statusParam.toUpperCase() : 'ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const filtered = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'ALL') return matchesSearch;
    if (activeTab === 'ACTIVE') return matchesSearch && sub.status === 'active';
    if (activeTab === 'EXPIRING') return matchesSearch && sub.status === 'expiring soon';
    if (activeTab === 'LAPSED') return matchesSearch && sub.status === 'lapsed';
    return matchesSearch;
  });

  const columns = [
    {
      header: 'Driving School',
      render: (row) => <strong>{row.school}</strong>,
    },
    {
      header: 'Subscription Plan',
      render: (row) => (
        <span className={`plan-badge plan-${row.plan.toLowerCase()}`}>
          {row.plan}
        </span>
      ),
    },
    {
      header: 'Monthly Fee',
      isNumeric: true,
      render: (row) => <strong>₹{row.amount.toLocaleString('en-IN')}</strong>,
    },
    {
      header: 'Renewal / Expiry Date',
      accessor: 'renewalDate',
      isNumeric: true,
    },
    {
      header: 'Listing Status',
      render: (row) => (
        <StatusPill status={row.status} />
      ),
    },
    {
      header: 'Actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '6px' }}>
          {row.status === 'lapsed' ? (
            <button
              onClick={() => alert(`Sending automated payment reminder to ${row.school}...`)}
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#dc2626',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '4px',
                padding: '3px 8px',
                cursor: 'pointer'
              }}
            >
              Send Reminder
            </button>
          ) : (
            <button
              onClick={() => alert(`Managing billing settings for ${row.school}`)}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#64748b',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                padding: '3px 8px',
                cursor: 'pointer'
              }}
            >
              Details
            </button>
          )}
        </div>
      ),
    },
  ];

  const tabs = [
    { id: 'ALL', label: 'All Subscriptions', count: subscriptions.length },
    { id: 'ACTIVE', label: 'Active', count: subscriptions.filter((s) => s.status === 'active').length },
    { id: 'EXPIRING', label: 'Expiring Soon (7d)', count: subscriptions.filter((s) => s.status === 'expiring soon').length },
    { id: 'LAPSED', label: 'Lapsed / Expired', count: subscriptions.filter((s) => s.status === 'lapsed').length },
  ];

  return (
    <div className="admin-subscriptions-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Driving School Subscriptions</h1>
          <p>Manage SaaS membership tiers, recurring billing cycles, and lapsed school listings.</p>
        </div>
      </div>

      {/* 2. Stat Cards Row (4 cards) */}
      <div className="admin-stats-four-grid">
        {subscriptionStats.map((stat) => (
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

      {/* 3. Filter Tabs (Gap Audit Item #2) */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1.5px solid ${activeTab === tab.id ? 'var(--color-primary, #B91C1C)' : '#e5e5e5'}`,
              backgroundColor: activeTab === tab.id ? 'var(--color-primary, #B91C1C)' : '#ffffff',
              color: activeTab === tab.id ? '#ffffff' : '#1a1a1a',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              fontSize: '10px',
              padding: '2px 5px',
              borderRadius: '999px',
              backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
              color: activeTab === tab.id ? '#ffffff' : '#64748b'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 4. Activity Table Section (3-State Pattern) */}
      <div className="subscriptions-table-section">
        <div className="table-section-title">
          <h3>SaaS License & Directory Listing Registry</h3>
          <p>Lapsed schools are automatically unlisted from the public search directory</p>
        </div>

        {loading ? (
          <SkeletonLoader rows={4} height={50} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No matching subscriptions"
            message={`No subscriptions found matching tab "${activeTab}".`}
            ctaText="Reset Filter"
            onCtaClick={() => setActiveTab('ALL')}
          />
        ) : (
          <DataTable
            columns={columns}
            data={filtered}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search school subscription or tier..."
          />
        )}
      </div>
    </div>
  );
}
