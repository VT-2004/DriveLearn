import { useState, useEffect } from 'react';
import { Play, CheckCircle2, Clock, MapPin, User, X, AlertTriangle, ShieldCheck, PhoneCall, Plus, Sparkles, CheckSquare, Square } from 'lucide-react';
import './StartLessonModal.css';

const DEFAULT_DRILLS = [
  { id: 'd1', label: 'Pre-Drive Safety: Helmet securely strapped & mirrors aligned', checked: true },
  { id: 'd2', label: 'Engine & Clutch: Neutral start, progressive biting point release', checked: false },
  { id: 'd3', label: 'Track Maneuvers: RTO 8-Track clearance without feet touching', checked: false },
  { id: 'd4', label: 'Signals & Head Checks: Turning indicators & blindspot check', checked: false },
  { id: 'd5', label: 'Slope / Incline: Smooth stop & hill-restart with rear brake', checked: false },
];

const QUICK_OBSERVATION_TAGS = [
  'Smooth Clutch Release',
  'Stalled Once on Incline',
  'Prompt Mirror Checks',
  'Needs Tighter 8-Track Turns',
  'Proper Indicator Usage',
  'Safe Following Distance',
];

export default function StartLessonModal({ lesson, onClose, onCompleteLesson }) {
  const [seconds, setSeconds] = useState(14); // start at 00:14 for demo continuity
  const [isActive, setIsActive] = useState(true);
  const [drills, setDrills] = useState(DEFAULT_DRILLS);
  const [trainerNotes, setTrainerNotes] = useState('Practicing Karve Road merge and 8-track cone clearance.');
  const [llVerified, setLlVerified] = useState(true);

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

  const toggleDrill = (id) => {
    setDrills((prev) =>
      prev.map((d) => (d.id === id ? { ...d, checked: !d.checked } : d))
    );
  };

  const addObservationTag = (tag) => {
    if (!trainerNotes.includes(tag)) {
      setTrainerNotes((prev) => (prev ? `${prev} • ${tag}` : tag));
    }
  };

  const handleFinish = () => {
    setIsActive(false);
    const completedCount = drills.filter((d) => d.checked).length;
    onCompleteLesson(lesson.id);
    alert(`Practical session marked completed! ${completedCount}/5 competency drills verified and logged into Form 5A register.`);
  };

  // 45 min = 2700 seconds
  const progressPercent = Math.min(100, Math.round((seconds / 2700) * 100));

  return (
    <div className="instructor-modal-backdrop" onClick={onClose}>
      <div className="cockpit-console-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Cockpit Top Strip */}
        <div className="cockpit-top-bar">
          <div className="cockpit-status-wrap">
            <span className="live-pulsing-circle"></span>
            <strong>PRACTICAL IN-COCKPIT TRAINING CONSOLE</strong>
          </div>

          <div className="top-bar-right">
            <span className="batch-time-tag tabular-nums">{lesson.time}</span>
            <button onClick={onClose} className="btn-close-modal">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Console Body */}
        <div className="cockpit-scroll-body">
          {/* Live In-Session Timer Banner */}
          <div className="cockpit-timer-banner">
            <div className="timer-left">
              <Clock size={28} color="var(--color-primary, #B91C1C)" />
              <div>
                <span className="timer-large tabular-nums">{formatTimer(seconds)}</span>
                <span className="timer-sub">Session Duration • Standard 45 mins batch</span>
              </div>
            </div>

            <div className="timer-progress-col">
              <div className="timer-progress-track">
                <div
                  className="timer-progress-fill"
                  style={{ width: `${Math.max(5, progressPercent)}%` }}
                ></div>
              </div>
              <span className="timer-pct tabular-nums">{progressPercent}% Elapsed (00:45:00 Total)</span>
            </div>
          </div>

          {/* Student & Dual-Control Vehicle Dossier Strip */}
          <div className="cockpit-dossier-grid">
            <div className="cockpit-dossier-cell">
              <span className="cd-lbl">Trainee Student</span>
              <strong className="cd-val">{lesson.student}</strong>
              <div className="sarathi-ll-chip">
                <ShieldCheck size={11} color="#15803D" />
                <span>LL: <strong>MH-12/LL/2026/088192</strong> (Verified)</span>
              </div>
            </div>

            <div className="cockpit-dossier-cell">
              <span className="cd-lbl">Curriculum Focus</span>
              <strong className="cd-val">{lesson.topic}</strong>
              <span className="cd-sub">Session 8 of 10 Mandatory Batches</span>
            </div>

            <div className="cockpit-dossier-cell">
              <span className="cd-lbl">Training Ground</span>
              <strong className="cd-val">{lesson.location}</strong>
              <span className="cd-sub">Warje 8-Track Ground & Karve Rd</span>
            </div>

            <div className="cockpit-dossier-cell">
              <span className="cd-lbl">Dual-Control Vehicle</span>
              <strong className="cd-val">{lesson.vehicle}</strong>
              <span className="cd-sub text-success">Auxiliary Brake Active</span>
            </div>
          </div>

          {/* Interactive Live Drills Checklist */}
          <div className="cockpit-section-card">
            <div className="section-title-row">
              <CheckSquare size={16} color="var(--color-primary, #B91C1C)" />
              <h4>Real-Time Practical Driving Drills Checklist</h4>
              <span className="check-counter">
                {drills.filter((d) => d.checked).length} of {drills.length} Completed
              </span>
            </div>

            <div className="drills-checklist-stack">
              {drills.map((drill) => (
                <div
                  key={drill.id}
                  className={`drill-check-item ${drill.checked ? 'done' : ''}`}
                  onClick={() => toggleDrill(drill.id)}
                >
                  <input
                    type="checkbox"
                    checked={drill.checked}
                    onChange={() => toggleDrill(drill.id)}
                    className="drill-checkbox"
                  />
                  <span className="drill-label">{drill.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Quick Observation Tags */}
          <div className="cockpit-section-card">
            <div className="section-title-row">
              <Sparkles size={16} color="#d97706" />
              <h4>Quick Instructor Observation Tags</h4>
              <span className="sub-tip">Click to append to student's live session log</span>
            </div>

            <div className="quick-tags-wrap">
              {QUICK_OBSERVATION_TAGS.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => addObservationTag(tag)}
                  className="btn-quick-tag"
                >
                  <Plus size={11} />
                  <span>{tag}</span>
                </button>
              ))}
            </div>

            <div className="trainer-note-entry">
              <label>Trainer Remarks for Form 5A & Student Report</label>
              <textarea
                value={trainerNotes}
                onChange={(e) => setTrainerNotes(e.target.value)}
                placeholder="Log clutch handling, mirror check habits, or safety observations..."
                rows={2}
                className="trainer-textarea"
              />
            </div>
          </div>

          {/* Roadside Safety & Emergency Assistance */}
          <div className="cockpit-emergency-strip">
            <div className="em-left">
              <AlertTriangle size={16} color="#b45309" />
              <span>In case of heavy downpour, vehicle stall, or traffic incident on Karve Road:</span>
            </div>
            <a href="tel:+919823099887" className="btn-call-principal">
              <PhoneCall size={13} />
              <span>Call School Principal (Rajesh Kadam: +91 98230 99887)</span>
            </a>
          </div>
        </div>

        {/* Cockpit Footer */}
        <div className="cockpit-footer">
          <button onClick={onClose} className="btn-pause-session">
            Pause / Exit
          </button>
          <button onClick={handleFinish} className="btn-finish-cockpit">
            <CheckCircle2 size={16} />
            <span>Finish & Mark Completed</span>
          </button>
        </div>
      </div>
    </div>
  );
}
