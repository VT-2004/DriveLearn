import { Bike, Car, Layers, Sparkles, Check, Clock, Edit2, Power, ShieldAlert } from 'lucide-react';
import './OwnerCourseCard.css';

export default function OwnerCourseCard({ course, onToggleFeatured, onToggleStatus, onEdit }) {
  const getVehicleIcon = (type) => {
    if (type.toLowerCase().includes('scooter') || type.toLowerCase().includes('2-wheeler') || type.toLowerCase().includes('mcwg')) {
      return <Bike size={18} color="var(--color-primary, #B91C1C)" />;
    }
    if (type.toLowerCase().includes('hatchback') || type.toLowerCase().includes('car') || type.toLowerCase().includes('lmv')) {
      return <Car size={18} color="#334155" />;
    }
    return <Layers size={18} color="#64748b" />;
  };

  return (
    <div className={`owner-course-card ${course.isFeatured ? 'featured-course-border' : ''}`}>
      {course.isFeatured && (
        <div className="course-featured-ribbon">
          <Sparkles size={13} />
          <span>Launch Offer / Featured on Public Site</span>
        </div>
      )}

      <div className="course-card-header">
        <div className="course-type-wrap">
          <div className="course-icon-box">{getVehicleIcon(course.vehicleType)}</div>
          <div>
            <h4 className="course-title">{course.name}</h4>
            <span className="course-vehicle-sub">{course.vehicleType}</span>
          </div>
        </div>

        <span className={`course-status-pill ${course.status}`}>
          {course.status === 'active' ? 'Live' : 'Draft'}
        </span>
      </div>

      <div className="course-pricing-box tabular-nums">
        <div className="price-main-display">
          <span className="currency">₹</span>
          <span className="amount">{course.price.toLocaleString('en-IN')}</span>
          {course.originalPrice && (
            <span className="original-strikethrough">₹{course.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        {course.isFeatured ? (
          <div className="launch-price-lock-note">
            <ShieldAlert size={12} color="var(--color-primary, #B91C1C)" />
            <span>Set by platform launch campaign (₹999 locked)</span>
          </div>
        ) : (
          <span className="custom-price-note">School-managed standard fee</span>
        )}
      </div>

      <div className="course-duration-row tabular-nums">
        <div className="duration-item">
          <Clock size={13} />
          <span>{course.durationDays} Days Duration</span>
        </div>
        <div className="duration-item">
          <span>{course.lessons} Practical Lessons</span>
        </div>
      </div>

      <div className="course-inclusions-list">
        {course.inclusions.map((item, idx) => (
          <div key={idx} className="inclusion-item">
            <Check size={13} color="var(--admin-success-text, #15803D)" flexShrink={0} />
            <span>{item}</span>
          </div>
        ))}
      </div>

      <div className="course-card-footer">
        <button
          onClick={() => onToggleFeatured && onToggleFeatured(course.id)}
          className={`btn-toggle-featured ${course.isFeatured ? 'is-featured' : ''}`}
          title="Toggle launch offer badge on public pricing"
        >
          <Sparkles size={13} />
          <span>{course.isFeatured ? 'Featured (Active)' : 'Make Featured'}</span>
        </button>

        <div className="course-right-actions">
          <button
            onClick={() => onToggleStatus && onToggleStatus(course.id)}
            className="btn-course-action"
            title={course.status === 'active' ? 'Deactivate course' : 'Activate course'}
          >
            <Power size={14} color={course.status === 'active' ? '#15803D' : '#94a3b8'} />
          </button>
          <button
            onClick={() => onEdit && onEdit(course)}
            className="btn-course-action"
            title="Edit course details"
          >
            <Edit2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
