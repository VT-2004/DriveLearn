import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Clock, MapPin, User, Calendar, 
  Wallet, ShieldCheck, ArrowRight, BookOpen, AlertCircle, Sparkles 
} from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './LearnerDashboard.css';

export default function LearnerDashboard() {
  const { user } = useAuth();

  // Active Enrollment Data
  const [activeCourse] = useState({
    schoolName: 'Sai Motor & 2-Wheeler Training School',
    schoolAddress: 'Karve Road, Kothrud, Pune',
    rtoApprovalNo: 'MH-12/DS/2014/889',
    courseName: 'Two-Wheeler Practical Course (MCWG)',
    duration: '10 Days',
    completedDays: 3,
    totalDays: 10,
    progressPercent: 30,
    status: 'ACTIVE',
    batchTiming: '07:00 AM - 07:45 AM (Morning Batch)',
    instructor: {
      name: 'Sunita Deshmukh',
      phone: '+91 98230 99887',
      experience: '8+ Years Exp',
      badge: 'Certified Female Instructor',
    },
    pickupPoint: 'Garware College Metro Station (Pillar #42), Karve Road',
    todayTopic: 'Clutch Biting Zone & Warje RTO "8" Ground Track Practice',
    nextSession: 'Tomorrow, 07:00 AM',
  });

  const syllabusDays = [
    { day: 1, topic: 'Vehicle controls, main stand balancing & safety gear', done: true },
    { day: 2, topic: '1st gear clutch friction point & smooth takeoff without jerks', done: true },
    { day: 3, topic: 'Clutch biting zone & Warje RTO "8" ground track practice', done: true, current: true },
    { day: 4, topic: '2nd & 3rd gear upshifting, emergency braking control', done: false },
    { day: 5, topic: 'Flyover slope stopping & half-clutch hill start without rolling back', done: false },
    { day: 6, topic: 'City traffic lane navigation & side-mirror checking habits', done: false },
    { day: 7, topic: 'U-turns in tight spaces & roundabout traffic entry', done: false },
    { day: 8, topic: 'Night riding simulation & high/low beam discipline', done: false },
    { day: 9, topic: 'Full RTO mock track test evaluation with instructor', done: false },
    { day: 10, topic: 'Final test track ride & RTO test day vehicle orientation', done: false },
  ];

  return (
    <div className="learner-dashboard-page">
      {/* 1. Top Highlight Cards Grid (Plain Minimal Icon Containers) */}
      <div className="dashboard-metrics-grid">
        {/* Metric 1: Active Course Status */}
        <div className="metric-card highlight-metric">
          <div className="metric-icon-wrap">
            <BookOpen size={20} color="#dc2626" />
          </div>
          <div className="metric-info">
            <span className="metric-label">Current Training</span>
            <h3>Day {activeCourse.completedDays} of {activeCourse.totalDays}</h3>
            <span className="metric-subtext">{activeCourse.courseName}</span>
          </div>
        </div>

        {/* Metric 2: Next Lesson Slot */}
        <div className="metric-card">
          <div className="metric-icon-wrap">
            <Clock size={20} color="#dc2626" />
          </div>
          <div className="metric-info">
            <span className="metric-label">Next Lesson</span>
            <h3>{activeCourse.nextSession}</h3>
            <span className="metric-subtext">{activeCourse.batchTiming}</span>
          </div>
        </div>

        {/* Metric 3: Wallet Balance */}
        <div className="metric-card">
          <div className="metric-icon-wrap">
            <Wallet size={20} color="#dc2626" />
          </div>
          <div className="metric-info">
            <span className="metric-label">In-App Wallet</span>
            <h3>₹{user?.wallet?.balance?.toFixed(2) || '15.00'}</h3>
            <span className="metric-subtext text-green">Available on course bookings</span>
          </div>
        </div>

        {/* Metric 4: RTO License Status */}
        <div className="metric-card">
          <div className="metric-icon-wrap">
            <ShieldCheck size={20} color="#dc2626" />
          </div>
          <div className="metric-info">
            <span className="metric-label">RTO Status (MH-12)</span>
            <h3>LL Form 2 Active</h3>
            <span className="metric-subtext text-purple">DL Test Eligible in 21 Days</span>
          </div>
        </div>
      </div>

      {/* 2. Main Dashboard Layout (2 Columns) */}
      <div className="dashboard-grid-layout">
        {/* Left Column: Active Course & Syllabus Progress */}
        <div className="dashboard-main-col">
          {/* Active Course Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <span className="card-tag">Active Training Course</span>
                <h2>{activeCourse.courseName}</h2>
                <p className="school-sub">
                  <MapPin size={14} /> {activeCourse.schoolName} • {activeCourse.schoolAddress}
                </p>
              </div>
              <span className="badge-active-status">In Training</span>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
              <div className="progress-label-row">
                <span>Training Syllabus Progress</span>
                <strong>{activeCourse.progressPercent}% Completed ({activeCourse.completedDays}/{activeCourse.totalDays} Days)</strong>
              </div>
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${activeCourse.progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Today's Focus Box */}
            <div className="today-focus-banner">
              <Sparkles size={18} color="#dc2626" />
              <div>
                <strong>Today's Milestone (Day 3):</strong>
                <p>{activeCourse.todayTopic}</p>
              </div>
            </div>

            {/* 10-Day Syllabus Checklist */}
            <div className="syllabus-section">
              <h3>10-Day Training Syllabus & Milestones</h3>
              <div className="syllabus-list">
                {syllabusDays.map((item) => (
                  <div 
                    key={item.day} 
                    className={`syllabus-item ${item.done ? 'completed' : ''} ${item.current ? 'current' : ''}`}
                  >
                    <div className="syllabus-day-badge">Day {item.day}</div>
                    <div className="syllabus-content">
                      <span>{item.topic}</span>
                      {item.current && <span className="current-pill">Current Lesson</span>}
                    </div>
                    <div className="syllabus-check">
                      {item.done ? (
                        <CheckCircle2 size={18} color="#16a34a" />
                      ) : (
                        <div className="circle-pending"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Instructor Card + Wallet + RTO Checklist */}
        <div className="dashboard-side-col">
          {/* 1. Assigned Instructor Card */}
          <div className="dash-card">
            <div className="card-title-simple">
              <h3>Your Certified Instructor</h3>
            </div>
            <div className="instructor-profile-box">
              <div className="inst-avatar-large">
                <User size={32} color="#dc2626" />
              </div>
              <div>
                <h4>{activeCourse.instructor.name}</h4>
                <p className="inst-badge-text">{activeCourse.instructor.badge}</p>
                <span className="inst-exp">{activeCourse.instructor.experience}</span>
              </div>
            </div>

            <div className="inst-details-list">
              <div className="inst-detail-row">
                <Clock size={15} color="#dc2626" />
                <div>
                  <span className="detail-label">Batch Slot:</span>
                  <strong>{activeCourse.batchTiming}</strong>
                </div>
              </div>
              <div className="inst-detail-row">
                <MapPin size={15} color="#dc2626" />
                <div>
                  <span className="detail-label">Pickup Spot:</span>
                  <span>{activeCourse.pickupPoint}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. In-App Wallet Bonus Card */}
          <div className="dash-card wallet-dash-card">
            <div className="wallet-card-top">
              <div className="wallet-title-wrap">
                <Wallet size={20} color="#166534" />
                <h3>In-App Wallet</h3>
              </div>
              <span className="wallet-live-badge">₹{user?.wallet?.balance?.toFixed(2) || '15.00'}</span>
            </div>
            <p className="wallet-desc">
              Your <strong>₹15.00 introductory welcome balance</strong> is credited and ready to use. It will be automatically deducted from your fee on your next course booking.
            </p>
            <div className="wallet-actions">
              <Link to="/learner/wallet" className="btn-wallet-full">
                <span>View Wallet Transactions</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* 3. Maharashtra RTO Parivahan Tracker */}
          <div className="dash-card rto-tracker-card">
            <div className="card-title-simple">
              <ShieldCheck size={18} color="#dc2626" />
              <h3>Maharashtra RTO Roadmap</h3>
            </div>
            <ul className="rto-steps-list">
              <li className="rto-step-item done">
                <CheckCircle2 size={16} color="#16a34a" />
                <div>
                  <strong>Learner License (LL) Form 2</strong>
                  <p>MH-12/LL/2026/8942 • Approved</p>
                </div>
              </li>
              <li className="rto-step-item active">
                <div className="step-dot active"></div>
                <div>
                  <strong>Practical Training (10 Days)</strong>
                  <p>Day 3 in progress at Warje Track</p>
                </div>
              </li>
              <li className="rto-step-item pending">
                <div className="step-dot"></div>
                <div>
                  <strong>Permanent DL Test Track</strong>
                  <p>Alandi Road RTO Ground • Slot Pending</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
