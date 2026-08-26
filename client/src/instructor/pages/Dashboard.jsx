import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, CheckCircle, Calendar, Sparkles, ArrowRight, Play } from 'lucide-react';
import StatCard from '../../admin/components/StatCard';
import LessonRow from '../components/LessonRow';
import StartLessonModal from '../components/StartLessonModal';
import {
  instructorProfileData,
  instructorSummaryStats,
  instructorTodaysLessons
} from '../data/dummyData';
import './Dashboard.css';

export default function Dashboard() {
  const [lessons, setLessons] = useState(instructorTodaysLessons);
  const [activeLessonModal, setActiveLessonModal] = useState(null);

  const handleStartLesson = (lesson) => {
    setActiveLessonModal(lesson);
  };

  const handleCompleteLesson = (lessonId) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId
          ? { ...l, status: 'completed', isUpNext: false }
          : l
      )
    );
    setActiveLessonModal(null);
    alert(`Lesson marked as Completed! Booking status transitioned to 'completed'.`);
  };

  return (
    <div className="instructor-dashboard-page">
      {/* Sub-section A: Day-focused Greeting */}
      <div className="trainer-hero-greeting">
        <div className="greeting-text">
          <h1>Good morning, {instructorProfileData.name.split(' ')[0]}! </h1>
          <p>
            Here’s your practical training schedule today at <strong>{instructorProfileData.assignedSchool}</strong>.
          </p>
        </div>

        <div className="active-vehicle-pill">
          <span>Active Dual-Control: <strong>{instructorProfileData.activeVehicle}</strong></span>
        </div>
      </div>

      {/* Sub-section B: 4 Stat Cards */}
      <div className="admin-stats-four-grid">
        {instructorSummaryStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            trendType={stat.trendType}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Sub-section C: Today's Practical Lessons List */}
      <div className="admin-card-panel">
        <div className="panel-header">
          <div>
            <h3>Today's Practical Training Batches (Saturday, 22 Aug)</h3>
            <p>On-track sessions at Warje RTO 8-Track ground and Garware College track</p>
          </div>
          <Link to="/instructor/schedule" className="panel-header-link">
            <span>Full Schedule</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="trainer-lessons-stack">
          {lessons.map((lesson) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              onStartLesson={handleStartLesson}
            />
          ))}
        </div>
      </div>

      {/* In-Session Lesson Timer Modal */}
      {activeLessonModal && (
        <StartLessonModal
          lesson={activeLessonModal}
          onClose={() => setActiveLessonModal(null)}
          onCompleteLesson={handleCompleteLesson}
        />
      )}
    </div>
  );
}
