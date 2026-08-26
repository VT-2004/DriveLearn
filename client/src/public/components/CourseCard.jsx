import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Gauge, Navigation2, 
  UserCheck, ShieldCheck, FileText, Compass, 
  MapPin, Moon, Shield, Award 
} from 'lucide-react';
import './CourseCard.css';

// Contextual Icon Resolver (Anti-AI rule: no generic single checkmark for everything)
function getFeatureIcon(type) {
  switch (type) {
    case 'clutch':
    case 'slope':
      return <Gauge size={15} className="feature-icon feature-gauge" />;
    case 'track':
      return <Navigation2 size={15} className="feature-icon feature-track" />;
    case 'female':
    case 'trainer':
      return <UserCheck size={15} className="feature-icon feature-user" />;
    case 'safety':
    case 'brake':
      return <ShieldCheck size={15} className="feature-icon feature-shield" />;
    case 'docs':
      return <FileText size={15} className="feature-icon feature-doc" />;
    case 'highway':
      return <Moon size={15} className="feature-icon feature-highway" />;
    case 'parking':
      return <Compass size={15} className="feature-icon feature-parking" />;
    case 'pickup':
      return <MapPin size={15} className="feature-icon feature-map" />;
    default:
      return <Shield size={15} className="feature-icon" />;
  }
}

export default function CourseCard({ course }) {
  const isFeatured = course.badge !== null;

  return (
    <div className={`public-course-card ${isFeatured ? 'featured-course-spotlight' : ''}`}>
      {/* Ribbon Badge */}
      {course.badge && (
        <div className="course-ribbon-badge">
          <Award size={13} />
          <span>{course.badge}</span>
        </div>
      )}

      {/* Header */}
      <div className="course-card-header">
        <span className="course-vehicle-type">{course.vehicle}</span>
        <h3 className="course-title">{course.title}</h3>
        <span className="course-duration-pill">{course.duration}</span>
      </div>

      {/* Pricing Block with ₹15 Wallet Bonus Math */}
      <div className="course-pricing-box">
        <div className="price-strike-row">
          <span className="strike-price tabular-nums">₹{course.originalFee.toLocaleString('en-IN')}</span>
          <span className="discount-tag">Subsidized Launch Fee</span>
        </div>

        <div className="price-main-row">
          <span className="price-currency">₹</span>
          <span className="price-amount tabular-nums">{course.subsidizedFee}</span>
        </div>

        <div className="wallet-discount-callout">
          <span className="wallet-math-text">
            Use <strong>₹15 Wallet Bonus</strong> &rarr; Pay <strong className="tabular-nums">₹{course.finalFee}</strong>
          </span>
        </div>
      </div>

      {/* Purpose-selected Features List */}
      <ul className="course-features-list">
        {course.features.map((feat, idx) => (
          <li key={idx} className="course-feature-item">
            {getFeatureIcon(feat.type)}
            <span>{feat.text}</span>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <div className="course-card-footer">
        <Link to={`/find-school?course=${course.id}`} className="btn-course-enroll">
          <span>Find Partner Schools in Maharashtra</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
