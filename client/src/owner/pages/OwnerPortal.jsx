import { Link } from 'react-router-dom';
import { Building2, Users, Wallet, ShieldCheck, ArrowLeft, Plus, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './OwnerPortal.css';

export default function OwnerPortal() {
  const { user } = useAuth();

  return (
    <div className="owner-portal-page">
      <div className="container owner-preview-container">
        {/* Top Header */}
        <div className="owner-preview-header">
          <Link to="/" className="portal-back-link">
            <ArrowLeft size={16} />
            <span>Back to Public Website</span>
          </Link>
          <div className="owner-role-badge">
            <Building2 size={16} />
            <span>Driving School Owner Portal</span>
          </div>
        </div>

        {/* School Overview Card */}
        <div className="owner-school-hero">
          <div className="school-hero-info">
            <div className="rto-verified-tag">
              <ShieldCheck size={15} />
              <span>RTO License: MH-12/DS/2014/889 (Verified Partner)</span>
            </div>
            <h1>Sai Motor & 2-Wheeler Training School</h1>
            <p>Plot 14, Opposite Garware College Metro Station, Karve Road, Kothrud, Pune - 411038</p>
            <span className="owner-name-tag">Managing Owner: <strong>{user?.name || 'Rajesh Patil'}</strong></span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="owner-stats-grid">
          <div className="owner-stat-card">
            <div className="stat-icon-wrap bg-red-soft">
              <Users size={22} color="#dc2626" />
            </div>
            <div>
              <span className="stat-label">Active Enrolled Students</span>
              <h3>420 Learners</h3>
              <span className="stat-subtext">280 on 2-Wheeler Track</span>
            </div>
          </div>

          <div className="owner-stat-card">
            <div className="stat-icon-wrap bg-green-soft">
              <Wallet size={22} color="#16a34a" />
            </div>
            <div>
              <span className="stat-label">Wallet Subsidies Settled</span>
              <h3>₹6,300</h3>
              <span className="stat-subtext">₹15/learner reimbursed by DriveLearn</span>
            </div>
          </div>

          <div className="owner-stat-card">
            <div className="stat-icon-wrap bg-purple-soft">
              <ShieldCheck size={22} color="#7c3aed" />
            </div>
            <div>
              <span className="stat-label">Certified Instructors</span>
              <h3>4 Trainers</h3>
              <span className="stat-subtext">2 Female Instructors Active</span>
            </div>
          </div>
        </div>

        {/* Managed Packages Preview */}
        <div className="owner-packages-card">
          <div className="packages-card-header">
            <div>
              <h3>Published Course Packages & Launch Pricing</h3>
              <p>Current fees shown on public search & booking directory</p>
            </div>
          </div>

          <div className="packages-table">
            <div className="package-row">
              <div>
                <strong>Two-Wheeler Practical Course (MCWG / Scooty)</strong>
                <span>10 Days (45 mins/day) • Warje 8-track ground practice included</span>
              </div>
              <div className="package-price-col">
                <span className="launch-tag">Launch Offer</span>
                <strong>₹999</strong>
              </div>
            </div>

            <div className="package-row">
              <div>
                <strong>Four-Wheeler Car Training (Swift / WagonR)</strong>
                <span>15 Days (1 hour/day) • Dual-brake control car</span>
              </div>
              <div className="package-price-col">
                <strong>₹3,999</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
