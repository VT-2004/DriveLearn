import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Filter, CheckCircle2, Clock, MapPin, Bike, Car,
  ShieldCheck, Wallet, Sparkles, User, ArrowRight, BookOpen, Star, AlertCircle
} from 'lucide-react';
import CourseEnrollModal from '../components/CourseEnrollModal';
import { MAHARASHTRA_COURSES_CATALOG } from '../data/coursesCatalogData';
import { learnerCourseSummary } from '../data/dummyData';
import './ExploreCourses.css';

export default function ExploreCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(MAHARASHTRA_COURSES_CATALOG);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [femaleOnly, setFemaleOnly] = useState(false);
  const [subsidizedOnly, setSubsidizedOnly] = useState(false);
  const [enrollingCourse, setEnrollingCourse] = useState(null);
  const [enrollmentSuccessBanner, setEnrollmentSuccessBanner] = useState(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.locality.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'ALL' || c.category === selectedCategory;

      const matchesFemale =
        !femaleOnly || c.hasFemaleInstructor === true;

      const matchesSubsidized =
        !subsidizedOnly || c.isSubsidizedLaunch === true;

      return matchesSearch && matchesCategory && matchesFemale && matchesSubsidized;
    });
  }, [courses, searchQuery, selectedCategory, femaleOnly, subsidizedOnly]);

  const handleEnrollSuccess = (enrollmentRecord) => {
    setEnrollingCourse(null);
    setEnrollmentSuccessBanner(enrollmentRecord);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="explore-courses-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Explore Driving Schools & Course Packages</h1>
          <p>
            Choose from RTO-approved training packages across Maharashtra with dual-control vehicles, certified female trainers, and instant ₹15 wallet bonus.
          </p>
        </div>
      </div>

      {/* Enrollment Success Notification */}
      {enrollmentSuccessBanner && (
        <div className="enroll-success-banner">
          <div className="esb-left">
            <CheckCircle2 size={24} color="#15803D" />
            <div>
              <strong>Enrollment Confirmed! ({enrollmentSuccessBanner.enrollmentId})</strong>
              <p>
                You are registered for <strong>{enrollmentSuccessBanner.courseTitle}</strong> at <strong>{enrollmentSuccessBanner.schoolName}</strong> ({enrollmentSuccessBanner.batchTiming}).
              </p>
            </div>
          </div>
          <Link to="/learner/bookings" className="btn-esb-bookings">
            <span>Manage in My Bookings &rarr;</span>
          </Link>
        </div>
      )}

      {/* 2. Current Active Enrollment Status Card */}
      <div className="active-enrollment-card">
        <div className="aec-left">
          <div className="aec-badge-row">
            <span className="aec-active-tag">CURRENT ACTIVE ENROLLMENT</span>
            <span className="aec-progress-tag">{learnerCourseSummary.progressPercent}% Completed</span>
          </div>
          <h3>{learnerCourseSummary.courseName}</h3>
          <p>
            Enrolled at <strong>{learnerCourseSummary.schoolName}</strong> • {learnerCourseSummary.schoolLocation}
          </p>
          <div className="aec-meta-row">
            <span>Trainer: <strong>{learnerCourseSummary.instructor}</strong></span>
            <span>•</span>
            <span>Vehicle: <strong>{learnerCourseSummary.assignedVehicle}</strong></span>
            <span>•</span>
            <span>Ground: <strong>{learnerCourseSummary.trainingGround}</strong></span>
          </div>
        </div>

        <div className="aec-right">
          <Link to="/learner/bookings" className="btn-view-current-bookings">
            <span>View My 8 Booked Sessions</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="courses-search-bar-wrap">
        <div className="search-input-box">
          <Search size={18} className="search-ico" />
          <input
            type="text"
            placeholder="Search packages by vehicle, school name, or locality (e.g. Karve Rd, Andheri, Hinjewadi)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="courses-search-input"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="btn-clear-search">✕</button>
          )}
        </div>

        <div className="category-pills-row">
          <button
            className={`cat-pill-btn ${selectedCategory === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('ALL')}
          >
            All Courses ({courses.length})
          </button>
          <button
            className={`cat-pill-btn ${selectedCategory === '2-Wheeler' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('2-Wheeler')}
          >
            2-Wheeler (MCWG)
          </button>
          <button
            className={`cat-pill-btn ${selectedCategory === '4-Wheeler' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('4-Wheeler')}
          >
            4-Wheeler (LMV Car)
          </button>
          <button
            className={`cat-pill-btn ${selectedCategory === 'Combo Pack' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Combo Pack')}
          >
            Combo Packages
          </button>
          <button
            className={`cat-pill-btn ${selectedCategory === 'Specialized Practice' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Specialized Practice')}
          >
            Specialized Practice
          </button>
        </div>

        <div className="extra-filters-row">
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              checked={femaleOnly}
              onChange={(e) => setFemaleOnly(e.target.checked)}
              style={{ accentColor: 'var(--color-primary, #B91C1C)' }}
            />
            <span>Certified Female Instructor Available</span>
          </label>

          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              checked={subsidizedOnly}
              onChange={(e) => setSubsidizedOnly(e.target.checked)}
              style={{ accentColor: 'var(--color-primary, #B91C1C)' }}
            />
            <span>Subsidized ₹999 Launch Packages Only</span>
          </label>
        </div>
      </div>

      {/* 4. Course Cards Grid */}
      <div className="courses-catalog-grid">
        {filteredCourses.map((course) => (
          <div key={course.id} className="course-catalog-card">
            {/* Card Top Ribbon */}
            <div className="card-top-ribbon">
              <span className="cat-chip">{course.category}</span>
              {course.isSubsidizedLaunch && (
                <span className="subsidized-launch-chip">
                  <Sparkles size={11} /> ₹999 Launch Special
                </span>
              )}
            </div>

            <div className="card-main-body">
              <h3 className="course-card-title">{course.title}</h3>

              <div className="course-school-line">
                <strong>{course.schoolName}</strong>
                <span className="rto-no tabular-nums">({course.rtoApprovalNo})</span>
              </div>

              <div className="course-specs-grid">
                <div className="spec-row">
                  <MapPin size={14} color="var(--color-primary, #B91C1C)" />
                  <span>Ground: <strong>{course.trainingGround}</strong> ({course.locality})</span>
                </div>
                <div className="spec-row">
                  <Clock size={14} color="#3b82f6" />
                  <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="spec-row">
                  {course.category.includes('2-Wheeler') ? (
                    <Bike size={14} color="#15803D" />
                  ) : (
                    <Car size={14} color="#15803D" />
                  )}
                  <span>Vehicle: <strong>{course.vehicle}</strong></span>
                </div>
                <div className="spec-row">
                  <User size={14} color="#8b5cf6" />
                  <span>Trainer: <strong>{course.instructor}</strong></span>
                </div>
              </div>

              {/* Syllabus Highlights */}
              <div className="syllabus-box">
                <span className="syl-lbl">Key Syllabus Competencies:</span>
                <ul className="syl-list">
                  {course.syllabus.slice(0, 3).map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={12} color="#15803D" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing & CTA Footer */}
            <div className="card-pricing-footer">
              <div className="price-stack">
                <div className="price-top">
                  <span className="old-price tabular-nums">₹{course.originalPrice}</span>
                  <strong className="live-price tabular-nums">₹{course.price}</strong>
                </div>
                <span className="wallet-note">
                  <Wallet size={11} /> Extra ₹15 Wallet bonus eligible
                </span>
              </div>

              <button
                type="button"
                onClick={() => setEnrollingCourse(course)}
                className="btn-enroll-course"
              >
                <span>Enroll & Reserve Slot</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Course Enrollment Modal */}
      {enrollingCourse && (
        <CourseEnrollModal
          course={enrollingCourse}
          onClose={() => setEnrollingCourse(null)}
          onEnrollSuccess={handleEnrollSuccess}
        />
      )}
    </div>
  );
}
