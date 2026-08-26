import { useState, useEffect } from 'react';
import { Play, CheckCircle2, Clock, MapPin, User, X, AlertTriangle } from 'lucide-react';
import './StartLessonModal.css';

export default function StartLessonModal({ lesson, onClose, onCompleteLesson }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleFinish = () => {
    setIsActive(false);
    onCompleteLesson(lesson.id);
  };

  return (
    <div className="instructor-modal-backdrop">
      <div className="instructor-modal-dialog">
        <div className="in-session-header">
          <div className="pulsing-live-pill">
            <span className="live-dot"></span>
            <strong>PRACTICAL LESSON IN SESSION</strong>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        <div className="in-session-body">
          {/* Live Timer Display */}
          <div className="session-timer-display tabular-nums">
            <Clock size={28} color="var(--color-primary, #B91C1C)" />
            <span className="timer-numbers">{formatTimer(seconds)}</span>
            <span className="timer-sub">Session Duration (Standard 45 mins)</span>
          </div>

          <div className="session-details-card">
            <div className="session-detail-row">
              <span className="lbl">Learner:</span>
              <strong>{lesson.student}</strong>
            </div>
            <div className="session-detail-row">
              <span className="lbl">Curriculum Focus:</span>
              <span>{lesson.topic}</span>
            </div>
            <div className="session-detail-row">
              <span className="lbl">Track Location:</span>
              <span>{lesson.location}</span>
            </div>
            <div className="session-detail-row">
              <span className="lbl">Training Vehicle:</span>
              <span>{lesson.vehicle}</span>
            </div>
          </div>

          <div className="session-safety-note">
            <AlertTriangle size={14} color="#b45309" flexShrink={0} />
            <p>
              Ensure student is wearing safety helmet / seatbelt before conducting 8-track maneuvers or street driving.
            </p>
          </div>
        </div>

        <div className="in-session-footer">
          <button onClick={onClose} className="btn-cancel-session">
            Pause / Exit
          </button>
          <button onClick={handleFinish} className="btn-complete-session">
            <CheckCircle2 size={16} />
            <span>Finish & Mark Completed</span>
          </button>
        </div>
      </div>
    </div>
  );
}
