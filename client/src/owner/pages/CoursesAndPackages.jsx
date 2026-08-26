import { useState } from 'react';
import { Plus, BookOpen, Sparkles, AlertCircle } from 'lucide-react';
import OwnerCourseCard from '../components/OwnerCourseCard';
import { ownerCoursesList } from '../data/dummyData';
import './CoursesAndPackages.css';

export default function CoursesAndPackages() {
  const [courses, setCourses] = useState(ownerCoursesList);

  const handleToggleFeatured = (id) => {
    // Only one course can be featured / launch offer at a time (Cross-Portal Rule)
    setCourses((prev) =>
      prev.map((c) => ({
        ...c,
        isFeatured: c.id === id ? !c.isFeatured : false,
      }))
    );
  };

  const handleToggleStatus = (id) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'draft' : 'active' } : c
      )
    );
  };

  const handleEdit = (course) => {
    alert(`Editing course "${course.name}"\nNote: Featured launch courses have their price synchronized with the Maharashtra Launch subsidy.`);
  };

  return (
    <div className="owner-courses-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Courses, Packages & Public Pricing</h1>
          <p>
            Manage driving packages shown on the public directory. Featured launch packages sync directly with the ₹999 subsidized campaign.
          </p>
        </div>
      </div>

      {/* 2. Platform Sync Info Banner */}
      <div className="course-sync-banner">
        <Sparkles size={18} color="var(--color-primary, #B91C1C)" flexShrink={0} />
        <div>
          <strong>Direct Public Site Synchronization</strong>
          <p>
            Courses published here are displayed live on the student search directory and checkout flow. Marking a course as <em>"Featured / Launch Offer"</em> locks its fee to the ₹999 subsidized rate and displays the "Most Popular" ribbon on the public Pricing page.
          </p>
        </div>
      </div>

      {/* 3. Toolbar */}
      <div className="courses-toolbar-bar">
        <span className="courses-count-label">
          <strong>{courses.length} Driving Packages</strong> Configured
        </span>

        <button
          onClick={() => alert('Opening Create New Course Package builder...')}
          className="btn-toolbar-primary"
        >
          <Plus size={15} />
          <span>Create Course</span>
        </button>
      </div>

      {/* 4. Course Cards Grid */}
      <div className="owner-courses-grid">
        {courses.map((course) => (
          <OwnerCourseCard
            key={course.id}
            course={course}
            onToggleFeatured={handleToggleFeatured}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
