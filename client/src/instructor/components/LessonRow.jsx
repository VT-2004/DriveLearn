import { Clock, MapPin, User, CheckCircle, Play, Sparkles } from 'lucide-react';
import StatusPill from '../../admin/components/StatusPill';
import './LessonRow.css';

export default function LessonRow({ lesson, onStartLesson, onInspectLesson }) {
  const isCompleted = lesson.status === 'completed';
  const isUpNext = lesson.isUpNext;

  return (
    <div className={`instructor-lesson-row ${isCompleted ? 'is-completed' : ''} ${isUpNext ? 'is-up-next' : ''}`}>
      {isUpNext && (
        <div className="up-next-accent-ribbon">
          <Sparkles size={11} />
          <span>UP NEXT (SOONEST BATCH)</span>
        </div>
      )}

      <div className="lesson-left-main">
        <div className="lesson-time-pill tabular-nums">
          <Clock size={13} color="var(--color-primary, #B91C1C)" />
          <strong>{lesson.time}</strong>
        </div>

        <div className="lesson-student-info">
          <strong className="student-name">{lesson.student}</strong>
          <span className="lesson-topic-sub">{lesson.topic}</span>
          <div className="lesson-location-tag">
            <MapPin size={12} />
            <span>{lesson.location} • {lesson.vehicle}</span>
          </div>
        </div>
      </div>

      <div className="lesson-right-action">
        <StatusPill status={lesson.status} />

        {isCompleted ? (
          <div className="completed-lesson-tag">
            <CheckCircle size={14} color="var(--admin-success-text, #15803D)" />
            <span>Finished</span>
          </div>
        ) : (
          <button
            onClick={() => onStartLesson && onStartLesson(lesson)}
            className="btn-start-lesson"
          >
            <Play size={13} fill="#ffffff" />
            <span>Start Lesson</span>
          </button>
        )}
      </div>
    </div>
  );
}
