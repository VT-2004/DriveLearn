import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, ShieldCheck, Wallet, Bike, CreditCard, 
  TrendingUp, AlertTriangle, ArrowRight, ShieldAlert,
  Car, Layers, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';
import StatCard from '../components/StatCard';
import StatusPill from '../components/StatusPill';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { 
  adminSummaryStats, 
  bookingVehicleSplit, 
  initialVerificationRequests 
} from '../data/dummyData';
import './Dashboard.css';

const REVENUE_CHART_DATA = [
  { month: 'Mar', gross: 240000, commission: 24000 },
  { month: 'Apr', gross: 420000, commission: 42000 },
  { month: 'May', gross: 680000, commission: 68000 },
  { month: 'Jun', gross: 1100000, commission: 110000 },
  { month: 'Jul', gross: 1480000, commission: 148000 },
  { month: 'Aug (Launch)', gross: 1842000, commission: 184200 },
];

const ICONS_MAP = {
  Users,
  ShieldCheck,
  Wallet,
  Bike,
  CreditCard,
  TrendingUp,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const pendingRequests = initialVerificationRequests.filter((r) => r.status === 'pending');

  return (
    <div className="admin-dashboard-page">
      {/* 1. Page Header */}
      <div className="admin-view-header">
        <div>
          <h1>Super Admin Control Center</h1>
          <p>Platform network monitoring, 2-wheeler enrollment focus, revenue split, and pending verifications.</p>
        </div>
      </div>

      {/* Sub-section A: Needs Your Attention Banner */}
      <div className="action-queue-banner">
        <div className="action-queue-left">
          <div className="action-alert-icon">
            <AlertTriangle size={20} color="var(--admin-warning-text, #b45309)" />
          </div>
          <div className="action-alert-text">
            <strong>Needs Your Attention (3 Action Items)</strong>
            <p>1 driving school awaiting RTO verification, 2 high-priority support tickets, and 2 expiring subscriptions.</p>
          </div>
        </div>

        <div className="action-queue-links">
          <Link to="/admin/verification?tab=pending" className="action-link-pill">
            <span>Verify Schools ({pendingRequests.length})</span>
            <ArrowRight size={13} />
          </Link>
          <Link to="/admin/offers" className="action-link-pill">
            <span>Abuse Monitoring (2)</span>
            <ArrowRight size={13} />
          </Link>
          <Link to="/admin/support?status=open" className="action-link-pill">
            <span>Open Tickets (2)</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Sub-section B: 6 Stat Cards Grid (Tabular Figures & Clickable Navigation) */}
      <div className="admin-stats-grid">
        {adminSummaryStats.map((stat) => {
          const IconComp = ICONS_MAP[stat.icon] || Users;
          return (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendType={stat.trendType}
              icon={<IconComp size={18} />}
              onClick={() => stat.link && navigate(stat.link)}
            />
          );
        })}
      </div>

      {/* Sub-section C: NEW in v3 — Strategic 2-Wheeler Focus Split & Revenue Growth */}
      <div className="dashboard-charts-split-grid">
        {/* Left: 2-Wheeler Strategic Split Widget */}
        <div className="admin-card-panel vehicle-split-panel">
          <div className="panel-header">
            <div>
              <h3>Bookings by Vehicle Type (August 2026)</h3>
              <p>Real-time enrollment tracking for the subsidized 2-wheeler launch initiative</p>
            </div>
            <span className="strategic-priority-badge">Strategic Priority</span>
          </div>

          <div className="vehicle-split-bars-list">
            {bookingVehicleSplit.map((item, idx) => (
              <div key={idx} className="vehicle-bar-item">
                <div className="bar-label-row">
                  <div className="vehicle-name-wrap">
                    {item.type.includes('2-Wheeler') ? (
                      <Bike size={16} color="var(--admin-accent, #B91C1C)" />
                    ) : item.type.includes('4-Wheeler') ? (
                      <Car size={16} color="#334155" />
                    ) : (
                      <Layers size={16} color="#64748b" />
                    )}
                    <strong>{item.type}</strong>
                  </div>
                  <span className="bar-percent-tag tabular-nums">
                    <strong>{item.percent}%</strong> ({item.count} Bookings)
                  </span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="vehicle-split-footer-note">
            <CheckCircle2 size={15} color="var(--admin-success-text, #15803D)" />
            <span>
              <strong>68% Two-Wheeler Dominance:</strong> Subsidized ₹999 launch package is meeting the target ratio.
            </span>
          </div>
        </div>

        {/* Right: Revenue Growth Chart (Recharts) */}
        <div className="admin-card-panel revenue-chart-panel">
          <div className="panel-header">
            <div>
              <h3>Platform Gross Bookings & Net Split</h3>
              <p>Monthly gross student volume (₹) vs 10% platform commission retained</p>
            </div>
          </div>

          <div className="recharts-wrapper-box">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={REVENUE_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--admin-accent, #B91C1C)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--admin-accent, #B91C1C)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border, #e5e5e5)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Gross Volume']} 
                  contentStyle={{ backgroundColor: '#1e293b', color: '#ffffff', borderRadius: '8px', border: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="gross" 
                  stroke="var(--admin-accent, #B91C1C)" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorGross)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sub-section E & F: Operating States & Pending Verifications */}
      <div className="dashboard-lower-grid">
        {/* Sub-section E: Operating States (Maharashtra Dominant Launch) */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Active Driving Schools by State</h3>
              <p>Single-state live launch distribution across 5 transport hubs</p>
            </div>
            <Link to="/admin/locations" className="panel-header-link">
              <span>View Hubs</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="states-distribution-list">
            <button
              onClick={() => navigate('/admin/schools?state=Maharashtra')}
              className="state-row-btn active-state-row"
            >
              <div className="state-row-info">
                <strong>Maharashtra (Live Launch)</strong>
                <span className="state-cities-sub">Pune, Mumbai, Nagpur, Nashik, Thane</span>
              </div>
              <div className="state-row-stat tabular-nums">
                <strong>42 Schools</strong>
                <span className="state-badge-active">Active</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/locations')}
              className="state-row-btn disabled-state-row"
              title="Coming Soon in Phase 2"
            >
              <div className="state-row-info">
                <strong>Karnataka</strong>
                <span className="state-cities-sub">Bengaluru, Mysuru</span>
              </div>
              <div className="state-row-stat">
                <span className="state-badge-soon">Coming Soon</span>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/locations')}
              className="state-row-btn disabled-state-row"
              title="Coming Soon in Phase 2"
            >
              <div className="state-row-info">
                <strong>Gujarat</strong>
                <span className="state-cities-sub">Ahmedabad, Surat</span>
              </div>
              <div className="state-row-stat">
                <span className="state-badge-soon">Coming Soon</span>
              </div>
            </button>
          </div>
        </div>

        {/* Sub-section F: Pending Verification Queue */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Recent Verification Submissions</h3>
              <p>RTO licenses & dual-brake inspection document queue</p>
            </div>
            <Link to="/admin/verification" className="panel-header-link">
              <span>Full Queue</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {loading ? (
            <SkeletonLoader rows={3} height={48} />
          ) : pendingRequests.length === 0 ? (
            <EmptyState
              title="All Caught Up"
              message="No driving schools currently waiting for document review."
            />
          ) : (
            <div className="pending-preview-table">
              {pendingRequests.map((req) => (
                <div key={req.id} className="pending-preview-row">
                  <div className="preview-school-meta">
                    <strong>{req.schoolName}</strong>
                    <span>{req.city} • {req.rtoZone}</span>
                  </div>
                  <div className="preview-action-wrap">
                    <StatusPill status={req.status} />
                    <Link to="/admin/verification" className="btn-review-now">
                      Review &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
