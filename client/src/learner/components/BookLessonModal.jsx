import { useState } from 'react';
import { X, Calendar, Clock, MapPin, Bike, User, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { VERIFIED_PICKUP_LANDMARKS } from '../../shared/data/pickupLandmarks';
import './BookLessonModal.css';

const AVAILABLE_LESSON_TOPICS = [
  { id: 'top-9', title: 'Session 9: Simulated RTO 8-Track Exam Trial', ground: 'Warje RTO 8-Track Ground' },
  { id: 'top-10', title: 'Session 10: Pre-RTO Highway Driving & Fast Merge Drill', ground: 'Karve Road & Deccan Highway' },
  { id: 'top-extra', title: 'Special Practice: Slope Biting Point & Emergency Stop', ground: 'Warje Incline Ramp' },
];

export default function BookLessonModal({ onClose, onBookSlot }) {
  const [topic, setTopic] = useState(AVAILABLE_LESSON_TOPICS[0].title);
  const [date, setDate] = useState('2026-08-25');
  const [time, setTime] = useState('08:00 AM - 08:45 AM');
  const [pickupLandmark, setPickupLandmark] = useState('Garware College Metro Gate 2 (Pillar No. 42)');
  const [instructor, setInstructor] = useState('Sunita Deshmukh');
  const [vehicle, setVehicle] = useState('Honda Activa 6G (Dual Control)');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLesson = {
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      date,
      time,
      location: topic.includes('8-Track') ? 'Warje RTO 8-Track Ground' : 'Karve Road / Garware Track',
      school: 'Sai Motor & 2-Wheeler Academy',
      instructor,
      vehicle,
      topic,
      pickupLandmark,
      status: 'confirmed',
      paymentStatus: 'paid',
    };
    onBookSlot(newLesson);
  };

  return (
    <div className="learner-modal-backdrop" onClick={onClose}>
      <div className="book-lesson-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="book-lesson-header">
          <div className="book-header-left">
            <div className="book-header-icon">
              <Calendar size={20} color="#ffffff" />
            </div>
            <div>
              <h3>Book Next Practical Driving Session</h3>
              <span className="book-sub">Sai Motor Academy • Warje Ground & Karve Road Hub</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="book-lesson-form">
          {/* Lesson Topic */}
          <div className="form-group">
            <label>Practical Training Module / Curriculum Focus</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              {AVAILABLE_LESSON_TOPICS.map((t) => (
                <option key={t.id} value={t.title}>
                  {t.title} ({t.ground})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time Row */}
          <div className="form-row-two">
            <div className="form-group">
              <label>Select Training Date</label>
              <select value={date} onChange={(e) => setDate(e.target.value)}>
                <option value="2026-08-25">Tuesday, 25 Aug 2026</option>
                <option value="2026-08-26">Wednesday, 26 Aug 2026</option>
                <option value="2026-08-27">Thursday, 27 Aug 2026</option>
                <option value="2026-08-28">Friday, 28 Aug 2026</option>
                <option value="2026-08-29">Saturday, 29 Aug 2026 (Weekend Batch)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Select Batch Timing Slot</label>
              <select value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="07:00 AM - 07:45 AM">07:00 AM - 07:45 AM (Early Morning Track)</option>
                <option value="08:00 AM - 08:45 AM">08:00 AM - 08:45 AM (Morning Batch)</option>
                <option value="09:00 AM - 09:45 AM">09:00 AM - 09:45 AM (Standard Morning)</option>
                <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM (Evening Batch)</option>
                <option value="05:00 PM - 05:45 PM">05:00 PM - 05:45 PM (Sunset Batch)</option>
              </select>
            </div>
          </div>

          {/* Designated Transit Pickup Point */}
          <div className="form-group">
            <label>
              <MapPin size={13} style={{ display: 'inline', marginRight: '4px', color: '#15803D' }} />
              <span>Designated Transit Pickup Landmark (Zero Phone-Tag)</span>
            </label>
            <select value={pickupLandmark} onChange={(e) => setPickupLandmark(e.target.value)}>
              {VERIFIED_PICKUP_LANDMARKS.map((lm) => (
                <option key={lm.id} value={`${lm.name} (${lm.metroPillar})`}>
                  {lm.name} • {lm.metroPillar}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned Instructor & Vehicle Strip */}
          <div className="assigned-instructor-strip">
            <div className="ai-item">
              <User size={15} color="var(--color-primary, #B91C1C)" />
              <div>
                <span className="ai-lbl">Assigned Trainer</span>
                <strong>{instructor}</strong>
                <span className="ai-sub">Certified Female Road Specialist</span>
              </div>
            </div>

            <div className="ai-item">
              <Bike size={15} color="#15803D" />
              <div>
                <span className="ai-lbl">Dual-Control Vehicle</span>
                <strong>{vehicle}</strong>
                <span className="ai-sub">Auxiliary Brake Inspected</span>
              </div>
            </div>
          </div>

          <div className="book-guarantee-note">
            <ShieldCheck size={14} color="#15803D" />
            <span>Subsidized Course Package: 100% Free Rescheduling up to 4 hours before slot start time.</span>
          </div>

          <div className="book-lesson-footer">
            <button type="button" onClick={onClose} className="btn-cancel-modal">
              Cancel
            </button>
            <button type="submit" className="btn-confirm-booking">
              <CheckCircle2 size={16} />
              <span>Confirm & Reserve Practical Slot</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
