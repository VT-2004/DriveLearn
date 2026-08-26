import { Link } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import './SchoolCard.css';

export default function SchoolCard({ school }) {
  const {
    id,
    name,
    tagline,
    rating,
    reviewCount,
    address,
    city,
    state,
    courses,
    startingPrice,
    verified,
    femaleInstructor,
    twoWheelerSpecialist,
    featuredImage,
  } = school;

  return (
    <div className="school-card">
      {/* 1. Cover Image & Clean Status Tags */}
      <div className="school-card-media">
        <img src={featuredImage} alt={name} className="school-card-img" />
        <div className="media-badges">
          {verified && (
            <span className="badge-verified">
              <ShieldCheck size={12} />
              <span>RTO Approved</span>
            </span>
          )}
          {twoWheelerSpecialist && (
            <span className="badge-two-wheeler">
              <span>2-Wheeler Track</span>
            </span>
          )}
          {femaleInstructor && (
            <span className="badge-female-inst">
              <span>Women Trainer</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. Content Body */}
      <div className="school-card-body">
        <div className="school-header-row">
          <div>
            <h3 className="school-name">{name}</h3>
            <p className="school-tagline">{tagline}</p>
          </div>
          <div className="school-rating-box">
            <Star size={13} fill="#dc2626" color="#dc2626" />
            <span className="rating-score">{rating}</span>
            <span className="review-count">({reviewCount})</span>
          </div>
        </div>

        <div className="school-location">
          <MapPin size={13} className="location-icon" />
          <span>{address}, {city}</span>
        </div>

        {/* 3. Clean Course Chips (No redundant vehicle icons) */}
        <div className="school-courses-chips">
          {courses.map((course) => (
            <span key={course} className="course-chip">
              {course}
            </span>
          ))}
        </div>

        {/* 4. Footer */}
        <div className="school-card-footer">
          <div className="price-tag">
            <span className="price-label">Starting Fee</span>
            <span className="price-amount">₹{startingPrice.toLocaleString('en-IN')}</span>
          </div>

          <Link to={`/schools/${id}`} className="btn-view-details">
            <span>View Batches</span>
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
