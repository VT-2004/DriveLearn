import { useState } from 'react';
import { Clock, Calendar, MapPin, Play, CheckCircle, Fuel } from 'lucide-react';
import LessonRow from '../components/LessonRow';
import StartLessonModal from '../components/StartLessonModal';
import FuelOdometerModal from '../components/FuelOdometerModal';
import { instructorTodaysLessons } from '../data/dummyData';
import './TodaysSchedule.css';

export default function TodaysSchedule() {
  const [lessons, setLessons] = useState(instructorTodaysLessons);
  const [activeLessonModal, setActiveLessonModal] = useState(null);
  const [showFuelModal, setShowFuelModal] = useState(false);

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
    alert(`Practical session marked completed!`);
  };

  return (
    <div className="instructor-schedule-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Today's Practical Driving Timetable</h1>
          <p>
            Saturday, 22 August 2026 • 5 Practical Batches Assigned at Warje & Karve Road
          </p>
        </div>

        <button
          onClick={() => setShowFuelModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid #fed7aa',
            backgroundColor: '#fffaf5',
            color: '#c2410c',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <Fuel size={14} />
          <span>Log Daily Fuel & Odometer</span>
        </button>
      </div>

      {/* 2. Full Timeline Stack */}
      <div className="schedule-timeline-container">
        {lessons.map((lesson) => (
          <LessonRow
            key={lesson.id}
            lesson={lesson}
            onStartLesson={handleStartLesson}
          />
        ))}
      </div>

      {/* 3. In-Session Modal */}
      {activeLessonModal && (
        <StartLessonModal
          lesson={activeLessonModal}
          onClose={() => setActiveLessonModal(null)}
          onCompleteLesson={handleCompleteLesson}
        />
      )}

      {/* 4. Fuel & Odometer Modal */}
      {showFuelModal && (
        <FuelOdometerModal
          onClose={() => setShowFuelModal(false)}
          onSave={() => setShowFuelModal(false)}
        />
      )}
    </div>
  );
}
