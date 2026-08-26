import { useState } from 'react';
import { Clock, Calendar, MapPin, Play, CheckCircle } from 'lucide-react';
import LessonRow from '../components/LessonRow';
import StartLessonModal from '../components/StartLessonModal';
import { instructorTodaysLessons } from '../data/dummyData';
import './TodaysSchedule.css';

export default function TodaysSchedule() {
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
    </div>
  );
}
