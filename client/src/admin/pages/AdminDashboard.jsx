import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Building2, Wallet, CheckCircle2, XCircle, 
  Clock, TrendingUp, ShieldCheck, MapPin, ArrowRight, AlertTriangle 
} from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  // Pending School Verification Queue
  const [pendingSchools, setPendingSchools] = useState([
    {
      id: 'sch-pending-1',
      name: 'Deccan Safe Steer Motor Institute',
      rtoApprovalNo: 'MH-14/DS/2018/671',
      ownerName: 'Sunil Jagtap',
      city: 'Pune',
      area: 'Hinjewadi Phase 1 & Wakad',
      phone: '+91 97654 11223',
      vehicleCount: 8,
      twoWheelerTrack: true,
      appliedDate: '21 Aug 2026',
    },
    {
      id: 'sch-pending-2',
      name: 'Nagpur Central Rider School',
      rtoApprovalNo: 'MH-31/DS/2019/554',
      ownerName: 'Vilas Raut',
      city: 'Nagpur',
      area: 'Dharampeth & Sitabuldi',
      phone: '+91 94221 88990',
      vehicleCount: 6,
      twoWheelerTrack: true,
      appliedDate: '20 Aug 2026',
    },
  ]);

  const [verifiedCount, setVerifiedCount] = useState(42);

  const handleApproveSchool = (id) => {
    setPendingSchools(pendingSchools.filter((s) => s.id !== id));
    setVerifiedCount((prev) => prev + 1);
  };

  const handleRejectSchool = (id) => {
    setPendingSchools(pendingSchools.filter((s) => s.id !== id));
  };

  const cityDistribution = [
    { city: 'Pune (MH-12 / MH-14)', learners: 640, percentage: 45 },
    { city: 'Mumbai (MH-01 / MH-02 / MH-03)', learners: 430, percentage: 30 },
    { city: 'Nagpur (MH-31)', learners: 170, percentage: 12 },
    { city: 'Nashik (MH-15)', learners: 110, percentage: 8 },
    { city: 'Thane (MH-04)', learners: 70, percentage: 5 },
  ];

  const recentWalletEvents = [
    { id: '1', user: 'Pooja Kulkarni', type: 'CREDIT', amount: 15, desc: 'Introductory Signup Bonus', time: '5 mins ago', city: 'Pune' },
    { id: '2', user: 'Rahul Sharma', type: 'DEBIT', amount: 15, desc: 'Used for 2-Wheeler Course Booking', time: '18 mins ago', city: 'Mumbai' },
    { id: '3', user: 'Aakash Deshmukh', type: 'CREDIT', amount: 15, desc: 'Introductory Signup Bonus', time: '32 mins ago', city: 'Nagpur' },
    { id: '4', user: 'Meera Kadam', type: 'CREDIT', amount: 15, desc: 'Introductory Signup Bonus', time: '1 hour ago', city: 'Pune' },
  ];

  return (
    <div className="admin-dashboard-page">
      {/* 1. Metric Cards Grid (Plain Minimal Icon Containers) */}
      <div className="admin-metrics-grid">
        <div className="admin-metric-card">
          <div className="metric-icon-box">
            <Users size={20} color="#dc2626" />
          </div>
          <div className="metric-details">
            <span className="metric-title">Total Registered Learners</span>
            <h3>1,420</h3>
            <span className="metric-growth positive">
              <TrendingUp size={13} /> +18.4% this week
            </span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-icon-box">
            <Building2 size={20} color="#dc2626" />
          </div>
          <div className="metric-details">
            <span className="metric-title">Verified Driving Schools</span>
            <h3>{verifiedCount}</h3>
            <span className="metric-growth">Across 5 Maharashtra Hubs</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-icon-box">
            <Wallet size={20} color="#dc2626" />
          </div>
          <div className="metric-details">
            <span className="metric-title">₹15 Bonuses Credited</span>
            <h3>₹21,300</h3>
            <span className="metric-growth positive">1,420 Active Wallets</span>
          </div>
        </div>

        <div className="admin-metric-card">
          <div className="metric-icon-box">
            <ShieldCheck size={20} color="#dc2626" />
          </div>
          <div className="metric-details">
            <span className="metric-title">Subsidized ₹999 Enrollments</span>
            <h3>890</h3>
            <span className="metric-growth text-purple">62.6% 2-Wheeler Focus</span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid: Pending Queue & City Distribution */}
      <div className="admin-grid-layout">
        {/* Left Col: Verification Queue */}
        <div className="admin-main-column">
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <span className="card-badge">Action Required</span>
                <h3>Partner School Verification Queue</h3>
                <p>Verify official RTO license certificates before publishing to public directory.</p>
              </div>
              <span className="queue-count">{pendingSchools.length} Pending</span>
            </div>

            {pendingSchools.length > 0 ? (
              <div className="pending-schools-list">
                {pendingSchools.map((school) => (
                  <div key={school.id} className="pending-school-item">
                    <div className="school-item-info">
                      <div className="school-item-title-row">
                        <h4>{school.name}</h4>
                        <span className="rto-num-tag">{school.rtoApprovalNo}</span>
                      </div>
                      <div className="school-item-meta">
                        <span><MapPin size={13} /> {school.area}, {school.city}</span>
                        <span>• Owner: <strong>{school.ownerName}</strong> ({school.phone})</span>
                        <span>• {school.vehicleCount} Training Vehicles</span>
                      </div>
                    </div>

                    <div className="school-action-buttons">
                      <button
                        onClick={() => handleApproveSchool(school.id)}
                        className="btn-approve"
                        title="Approve and Publish to Directory"
                      >
                        <CheckCircle2 size={16} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleRejectSchool(school.id)}
                        className="btn-reject"
                        title="Reject Application"
                      >
                        <XCircle size={16} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="all-clear-box">
                <CheckCircle2 size={36} color="#16a34a" />
                <h4>All Verification Requests Handled!</h4>
                <p>No driving school applications are currently pending review.</p>
              </div>
            )}
          </div>

          {/* Maharashtra City Distribution */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h3>Maharashtra Regional Distribution</h3>
                <p>Active learner breakdown across key RTO transport zones</p>
              </div>
            </div>

            <div className="city-bars-list">
              {cityDistribution.map((item) => (
                <div key={item.city} className="city-bar-item">
                  <div className="city-bar-label">
                    <strong>{item.city}</strong>
                    <span>{item.learners} Learners ({item.percentage}%)</span>
                  </div>
                  <div className="city-bar-track">
                    <div className="city-bar-fill" style={{ width: `${item.percentage * 2}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Live ₹15 Wallet Audit Ledger */}
        <div className="admin-side-column">
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h3>Live Wallet Ledger</h3>
                <p>Real-time ₹15 introductory credits & checkout deductions</p>
              </div>
            </div>

            <div className="wallet-audit-feed">
              {recentWalletEvents.map((evt) => (
                <div key={evt.id} className="audit-feed-item">
                  <div className={`audit-badge ${evt.type === 'CREDIT' ? 'credit' : 'debit'}`}>
                    {evt.type === 'CREDIT' ? '+₹15' : '-₹15'}
                  </div>
                  <div className="audit-info">
                    <strong>{evt.user} ({evt.city})</strong>
                    <p>{evt.desc}</p>
                    <span className="audit-time">
                      <Clock size={11} /> {evt.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ledger-card-footer">
              <Link to="/admin/campaigns" className="btn-view-campaigns">
                <span>Manage Promotional Budget</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
