import { useState } from 'react';
import { 
  Wallet, Sparkles, CheckCircle2, TrendingUp, 
  MapPin, ShieldCheck, Clock, Settings, RefreshCcw 
} from 'lucide-react';
import './AdminCampaigns.css';

export default function AdminCampaigns() {
  // Campaign Statuses
  const [welcomeBonusActive, setWelcomeBonusActive] = useState(true);
  const [twoWheelerSubsidyActive, setTwoWheelerSubsidyActive] = useState(true);

  // Settlement Ledger with Partner Schools
  const [schoolSettlements] = useState([
    {
      id: 'SET-01',
      schoolName: 'Sai Motor & 2-Wheeler Training School',
      city: 'Pune',
      subsidizedStudents: 280,
      subsidyRate: 15,
      totalReimbursed: 4200,
      settlementStatus: 'SETTLED',
      lastBatchDate: '20 Aug 2026',
    },
    {
      id: 'SET-02',
      schoolName: 'Apex Rider & Motor Driving Academy',
      city: 'Mumbai',
      subsidizedStudents: 210,
      subsidyRate: 15,
      totalReimbursed: 3150,
      settlementStatus: 'SETTLED',
      lastBatchDate: '19 Aug 2026',
    },
    {
      id: 'SET-03',
      schoolName: 'Deccan Safe Steer Motor Institute',
      city: 'Pune',
      subsidizedStudents: 195,
      subsidyRate: 15,
      totalReimbursed: 2925,
      settlementStatus: 'PROCESSING',
      lastBatchDate: '21 Aug 2026',
    },
    {
      id: 'SET-04',
      schoolName: 'Nagpur Central Rider School',
      city: 'Nagpur',
      subsidizedStudents: 120,
      subsidyRate: 15,
      totalReimbursed: 1800,
      settlementStatus: 'SETTLED',
      lastBatchDate: '18 Aug 2026',
    },
    {
      id: 'SET-05',
      schoolName: 'Nashik Godavari Motor Training',
      city: 'Nashik',
      subsidizedStudents: 85,
      subsidyRate: 15,
      totalReimbursed: 1275,
      settlementStatus: 'SETTLED',
      lastBatchDate: '17 Aug 2026',
    },
  ]);

  return (
    <div className="admin-campaigns-page">
      {/* 1. Page Header */}
      <div className="campaigns-header-row">
        <div>
          <h2>Maharashtra Launch Campaigns & Subsidies</h2>
          <p>Manage the ₹15 introductory wallet bonus and ₹999 two-wheeler promotional subsidies.</p>
        </div>
      </div>

      {/* 2. Budget Overview Grid */}
      <div className="campaigns-budget-grid">
        <div className="budget-card main-budget">
          <span className="budget-label">Total Promotional Budget</span>
          <div className="budget-number-row">
            <h3>₹50,000</h3>
            <span className="budget-tag">First 2 Months Reserve</span>
          </div>
          <div className="budget-progress-track">
            <div className="budget-progress-fill" style={{ width: '42.6%' }}></div>
          </div>
          <span className="budget-sub">₹21,300 Claimed (42.6% Disbursed) • ₹28,700 Remaining</span>
        </div>

        <div className="budget-card">
          <span className="budget-label">₹15 In-App Wallet Bonuses</span>
          <h3>1,420 Users</h3>
          <span className="budget-sub text-green">₹21,300 Credited on Registration</span>
        </div>

        <div className="budget-card">
          <span className="budget-label">Subsidized 2-Wheeler ₹999 Batches</span>
          <h3>890 Learners</h3>
          <span className="budget-sub text-red">₹13,350 Settled to Partner Schools</span>
        </div>
      </div>

      {/* 3. Campaign Control Switches */}
      <div className="campaign-controls-card">
        <div className="controls-header">
          <Settings size={18} color="#dc2626" />
          <h3>Active Promotional Rules</h3>
        </div>

        <div className="rules-switch-list">
          <div className="rule-switch-item">
            <div className="rule-info">
              <strong>1. Instant ₹15 In-App Wallet Credit on User Registration</strong>
              <p>Every newly registered learner or school owner automatically receives ₹15.00 in their in-app wallet.</p>
            </div>
            <button 
              onClick={() => setWelcomeBonusActive(!welcomeBonusActive)}
              className={`btn-toggle-switch ${welcomeBonusActive ? 'active' : ''}`}
            >
              {welcomeBonusActive ? 'Active (Live)' : 'Paused'}
            </button>
          </div>

          <div className="rule-switch-item">
            <div className="rule-info">
              <strong>2. Subsidized ₹999 2-Wheeler (MCWG/Scooty) Course Cap</strong>
              <p>Guarantees ₹999 flat introductory fee across all partner driving schools in Pune, Mumbai, Nagpur, Nashik, and Thane.</p>
            </div>
            <button 
              onClick={() => setTwoWheelerSubsidyActive(!twoWheelerSubsidyActive)}
              className={`btn-toggle-switch ${twoWheelerSubsidyActive ? 'active' : ''}`}
            >
              {twoWheelerSubsidyActive ? 'Active (Live)' : 'Paused'}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Partner Driving School Settlement Ledger */}
      <div className="settlements-card">
        <div className="settlements-header">
          <div>
            <h3>Partner School Subsidy Settlements</h3>
            <p>Direct reimbursement of ₹15 wallet discounts applied by learners at booking</p>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Driving School</th>
                <th>Hub</th>
                <th>Subsidized Students</th>
                <th>Subsidy Rate</th>
                <th>Total Reimbursed</th>
                <th>Status</th>
                <th>Last Settlement</th>
              </tr>
            </thead>
            <tbody>
              {schoolSettlements.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.schoolName}</strong>
                  </td>
                  <td>
                    <span><MapPin size={12} /> {item.city}</span>
                  </td>
                  <td>
                    <span>{item.subsidizedStudents} Learners</span>
                  </td>
                  <td>
                    <span>₹{item.subsidyRate} / student</span>
                  </td>
                  <td>
                    <strong className="text-red">₹{item.totalReimbursed.toLocaleString('en-IN')}</strong>
                  </td>
                  <td>
                    <span className={`settle-status ${item.settlementStatus.toLowerCase()}`}>
                      <CheckCircle2 size={12} /> {item.settlementStatus}
                    </span>
                  </td>
                  <td>
                    <span className="settle-date">{item.lastBatchDate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
