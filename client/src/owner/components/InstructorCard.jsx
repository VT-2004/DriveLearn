import { Star, ShieldCheck, Phone, Calendar, Clock, User, Award, CheckCircle2, Clock3 } from 'lucide-react';
import './InstructorCard.css';

export default function InstructorCard({ instructor, onScheduleClick, onViewProfile }) {
  const isVerified = instructor.isVerified !== false; // Default true for demo

  return (
    <div className="owner-instructor-card">
      <div className="instructor-card-top">
        <div className="instructor-avatar-wrap">
          <div className="instructor-avatar-circle">
            {instructor.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="instructor-status-indicator active" title="Active on duty"></div>
        </div>

        <div className="instructor-rating-pill tabular-nums">
          <Star size={13} fill="#f59e0b" color="#f59e0b" />
          <span>{instructor.rating.toFixed(2)}</span>
        </div>
      </div>

      <div className="instructor-main-meta">
        <h4 className="instructor-name">{instructor.name}</h4>
        <span className="instructor-role-tag">{instructor.role}</span>
        <p className="instructor-specialty-sub">{instructor.specialization}</p>
      </div>

      <div className="instructor-stats-row tabular-nums">
        <div className="instructor-stat-col">
          <span className="stat-col-num">{instructor.experience} Yrs</span>
          <span className="stat-col-lbl">Experience</span>
        </div>
        <div className="instructor-stat-col">
          <span className="stat-col-num">{instructor.studentCount}</span>
          <span className="stat-col-lbl">Students</span>
        </div>
        <div className="instructor-stat-col highlight-stat">
          <span className="stat-col-num">{instructor.todayCount} Slots</span>
          <span className="stat-col-lbl">Today's Load</span>
        </div>
      </div>

      {/* License Code with RTO Verification Status Badge (Gap Audit) */}
      <div className="instructor-license-badge">
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <ShieldCheck size={13} color="var(--color-primary, #B91C1C)" />
          <span className="license-code tabular-nums">RTO: {instructor.licenseNo}</span>
        </div>

        <span
          className={`license-verif-pill ${isVerified ? 'verified' : 'pending'}`}
          style={{
            fontSize: '10px',
            fontWeight: 800,
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: isVerified ? '#f0fdf4' : '#fffbeb',
            color: isVerified ? '#15803D' : '#b45309',
            border: `1px solid ${isVerified ? '#bbf7d0' : '#fde68a'}`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px'
          }}
        >
          {isVerified ? (
            <>
              <CheckCircle2 size={10} />
              <span>Verified</span>
            </>
          ) : (
            <>
              <Clock3 size={10} />
              <span>Pending RTO</span>
            </>
          )}
        </span>
      </div>

      <div className="instructor-card-actions">
        <button
          onClick={() => onScheduleClick && onScheduleClick(instructor)}
          className="btn-instructor-schedule"
        >
          <Calendar size={14} />
          <span>View Slots</span>
        </button>
        <button
          onClick={() => onViewProfile && onViewProfile(instructor)}
          className="btn-instructor-profile"
        >
          <User size={14} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
