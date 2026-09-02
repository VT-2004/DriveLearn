import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, Calendar, CreditCard, Wallet, Award, 
  AlertTriangle, ArrowRight, Clock, Star, ShieldAlert, ChevronRight, Car, AlertOctagon, MapPin, CloudRain 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';
import StatCard from '../../admin/components/StatCard';
import StatusPill from '../../admin/components/StatusPill';
import SkeletonLoader from '../../admin/components/SkeletonLoader';
import EmptyState from '../../admin/components/EmptyState';
import WeatherBroadcastModal from '../../shared/components/WeatherBroadcastModal';
import { 
  ownerSummaryStats, 
  ownerRevenueChartData, 
  ownerBookingsList, 
  ownerReviewsList, 
  ownerVehiclesList 
} from '../data/dummyData';
import './Dashboard.css';

const ICONS_MAP = {
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  Wallet,
  Award,
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscriptionLapsed, setSubscriptionLapsed] = useState(false); // Gap Audit: Lapsed Subscription State
  const [showWeatherModal, setShowWeatherModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const pendingBookings = ownerBookingsList.filter((b) => b.status === 'pending');
  const todayBookings = ownerBookingsList.slice(0, 4);
  const unansweredReview = ownerReviewsList.find((r) => !r.ownerReply);

  return (
    <div className="owner-dashboard-page">
      {/* 1. View Header */}
      <div className="admin-view-header">
        <div>
          <h1>School Owner Control Center</h1>
          <p>
            Overview of student enrollments, practical batch scheduling, fleet health, and net payouts.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setShowWeatherModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fffbeb',
              border: '1.5px solid #fde68a',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#b45309',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <CloudRain size={14} />
            <span>Broadcast Monsoon Alert</span>
          </button>

          {/* Demo Toggle to test Subscription Lapsed State */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={subscriptionLapsed}
                onChange={(e) => setSubscriptionLapsed(e.target.checked)}
                style={{ accentColor: '#B91C1C' }}
              />
              <span>Preview Lapsed Subscription State</span>
            </label>
          </div>
        </div>
      </div>

      {/* Subscription-Lapsed Critical Banner (Gap Audit Item #1) */}
      {subscriptionLapsed && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '2px solid #ef4444',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertOctagon size={24} color="#dc2626" />
            </div>
            <div>
              <strong style={{ fontSize: '14px', color: '#991b1b', display: 'block' }}>
                Your Platform SaaS Subscription Has Lapsed!
              </strong>
              <p style={{ fontSize: '12px', color: '#b91c1c', margin: '2px 0 0 0' }}>
                Sai Motor Academy is temporarily hidden from the public Maharashtra driving school search directory. Renew your plan to restore new student enrollments.
              </p>
            </div>
          </div>

          <Link
            to="/owner/subscription"
            style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Renew Subscription Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Sub-section A: Needs Your Attention Banner */}
      <div className="owner-attention-banner">
        <div className="attention-left">
          <div className="attention-icon-box">
            <AlertTriangle size={20} color="var(--admin-warning-text, #b45309)" />
          </div>
          <div className="attention-text">
            <strong>Needs Your Attention (3 Action Items)</strong>
            <p>
              2 pending practical slots need confirmation · Swift MH-12-AB-4471 insurance expiring in 14 days · 1 unanswered student review.
            </p>
          </div>
        </div>

        <div className="attention-links-row">
          <Link to="/owner/bookings" className="attention-action-pill">
            <span>Confirm Bookings ({pendingBookings.length})</span>
            <ArrowRight size={13} />
          </Link>
          <Link to="/owner/vehicles" className="attention-action-pill">
            <span>Review Fleet</span>
            <ArrowRight size={13} />
          </Link>
          <Link to="/owner/reviews" className="attention-action-pill">
            <span>Reply to Review</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Sub-section B: 6 Stat Cards Grid */}
      <div className="admin-stats-grid">
        {ownerSummaryStats.map((stat) => {
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

      {/* Sub-section C: Revenue Chart + Today's Schedule Split */}
      <div className="dashboard-charts-split-grid">
        {/* Left: Monthly Revenue Chart */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Net Revenue Payouts (Last 7 Months)</h3>
              <p>Direct IMPS bank settlements after 10% platform commission deduction</p>
            </div>
            <Link to="/owner/payments" className="panel-header-link">
              <span>View Ledger</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="recharts-wrapper-box">
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={ownerRevenueChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ownerRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary, #B91C1C)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--color-primary, #B91C1C)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--admin-border, #e5e5e5)" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Net Disbursed']} 
                  contentStyle={{ backgroundColor: '#1e293b', color: '#ffffff', borderRadius: '8px', border: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-primary, #B91C1C)" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#ownerRevenueGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Sub-section D: Today's Schedule Preview */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Today's Practical Batches (Saturday)</h3>
              <p>On-track sessions scheduled at Warje ground & Karve Road</p>
            </div>
            <Link to="/owner/bookings" className="panel-header-link">
              <span>Full Calendar</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="today-schedule-list">
            {todayBookings.map((b) => (
              <div key={b.id} className="today-schedule-row">
                <div className="schedule-time-box tabular-nums">
                  <Clock size={13} color="var(--color-primary, #B91C1C)" />
                  <span>{b.time.split(' - ')[0]}</span>
                </div>
                <div className="schedule-meta-box">
                  <strong>{b.student}</strong>
                  <span className="schedule-sub">{b.instructor} • {b.vehicle.split(' (')[0]}</span>
                </div>
                <StatusPill status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-section E: Recent Bookings & Reviews Two-Column Grid */}
      <div className="dashboard-lower-grid">
        {/* Recent Student Bookings */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Pending Practical Confirmations</h3>
              <p>Learner slot requests waiting for instructor assignment</p>
            </div>
            <Link to="/owner/bookings" className="panel-header-link">
              <span>Manage All</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          {pendingBookings.length === 0 ? (
            <EmptyState title="All Slots Confirmed" message="No pending session requests." />
          ) : (
            <div className="pending-bookings-list">
              {pendingBookings.map((pb) => (
                <div key={pb.id} className="pending-booking-item">
                  <div className="pending-meta">
                    <strong className="pending-student-name">{pb.student}</strong>
                    <div className="pending-course-sub">
                      <span>{pb.course}</span>
                      <span className="dot-sep">•</span>
                      <span className="tabular-nums font-bold">{pb.time}</span>
                    </div>
                    <div className="track-location-tag">
                      <MapPin size={12} />
                      <span>{pb.trackLocation}</span>
                    </div>
                  </div>
                  <div className="pending-action-btn-wrap">
                    <Link to="/owner/bookings" className="owner-btn-confirm-slot">
                      <span>Confirm Slot</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Student Reviews */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Recent Student Reviews</h3>
              <p>Latest feedback from Kothrud & Deccan learners</p>
            </div>
            <Link to="/owner/reviews" className="panel-header-link">
              <span>All Reviews</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="recent-reviews-list">
            {ownerReviewsList.map((rev) => (
              <div key={rev.id} className="recent-review-item">
                <div className="review-item-header">
                  <div>
                    <strong>{rev.student}</strong>
                    <span className="review-locality"> ({rev.locality})</span>
                  </div>
                  <div className="review-star-pill tabular-nums">
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span>{rev.rating}★</span>
                  </div>
                </div>
                <p className="review-comment-snippet">"{rev.comment}"</p>
                {rev.ownerReply ? (
                  <div className="review-reply-pill">
                    <strong>Your Reply:</strong> {rev.ownerReply}
                  </div>
                ) : (
                  <Link to="/owner/reviews" className="unanswered-reply-link">
                    Reply to student review &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weather Broadcast Modal */}
      {showWeatherModal && (
        <WeatherBroadcastModal
          onClose={() => setShowWeatherModal(false)}
          publisherRole="Owner"
        />
      )}
    </div>
  );
}
