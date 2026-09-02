import { useState } from 'react';
import { 
  X, Star, ShieldCheck, Award, CheckCircle2, AlertTriangle, 
  HelpCircle, Compass, Bike, FileText 
} from 'lucide-react';
import './PracticalScorecardModal.css';

export default function PracticalScorecardModal({ student, onClose, onSaveScorecard }) {
  const [clutchStars, setClutchStars] = useState(4);
  const [eightTrackStatus, setEightTrackStatus] = useState('Cleared Flawlessly');
  const [mirrorCheckStatus, setMirrorCheckStatus] = useState('Consistent & Prompt');
  const [downshiftStatus, setDownshiftStatus] = useState('Mastered');
  const [emergencyBrakingStatus, setEmergencyBrakingStatus] = useState('Pass');
  const [instructorRemarks, setInstructorRemarks] = useState(
    'Pooja cleared the Warje 8-track without touching feet to tarmac. Great throttle control. Just needs 1 more hill-stop practice on Karve Road slope.'
  );

  if (!student) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const scorecardData = {
      clutchStars,
      eightTrackStatus,
      mirrorCheckStatus,
      downshiftStatus,
      emergencyBrakingStatus,
      instructorRemarks,
      evaluatedAt: '22 Aug 2026, 04:45 PM',
      evaluatorName: 'Sunita Deshmukh (Senior Instructor)',
      evaluatorLicense: 'MH-12-INS-2019-332',
    };

    if (onSaveScorecard) {
      onSaveScorecard(student.id, scorecardData);
    }
    onClose();
  };

  return (
    <div className="learner-modal-backdrop" onClick={onClose}>
      <div className="scorecard-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="scorecard-modal-header">
          <div className="scorecard-header-left">
            <Award size={20} color="var(--color-primary, #B91C1C)" />
            <div>
              <h3>RTO Practical Driving Competency Scorecard</h3>
              <span className="scorecard-sub">
                Candidate: <strong>{student.name}</strong> • {student.course}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="scorecard-form-scroll">
          {/* Rubric Item 1: Clutch Incline */}
          <div className="rubric-card">
            <div className="rubric-header">
              <span className="rubric-step-badge">1</span>
              <div>
                <strong>Clutch Biting Point on 20° Slope (Hill-Start)</strong>
                <p>Ability to hold vehicle stationary on an incline without rolling backward or stalling.</p>
              </div>
            </div>

            <div className="stars-rating-bar">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= clutchStars ? 'active' : ''}`}
                  onClick={() => setClutchStars(star)}
                >
                  <Star size={20} fill={star <= clutchStars ? '#f59e0b' : 'none'} color="#f59e0b" />
                </button>
              ))}
              <span className="star-rating-lbl tabular-nums">{clutchStars} of 5 Stars</span>
            </div>
          </div>

          {/* Rubric Item 2: 8-Track & Reverse S-Bend */}
          <div className="rubric-card">
            <div className="rubric-header">
              <span className="rubric-step-badge">2</span>
              <div>
                <strong>RTO 8-Track & Figure-S Maneuvering</strong>
                <p>Tight cornering and spatial awareness without boundary cone infringement.</p>
              </div>
            </div>

            <div className="rubric-options-grid">
              {['Cleared Flawlessly', '1 Foot Down (Acceptable)', 'Cone Touched / Stalled'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`rubric-pill-btn ${eightTrackStatus === opt ? 'selected' : ''}`}
                  onClick={() => setEightTrackStatus(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Rubric Item 3: Mirror & Blind-Spot Checks */}
          <div className="rubric-card">
            <div className="rubric-header">
              <span className="rubric-step-badge">3</span>
              <div>
                <strong>Rearview Mirror & Blind-Spot Head Checks</strong>
                <p>Verification before signaling, turning, or pulling out into active Karve Road traffic.</p>
              </div>
            </div>

            <div className="rubric-options-grid">
              {['Consistent & Prompt', 'Needs Trainer Reminder', 'Ignored Mirror'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`rubric-pill-btn ${mirrorCheckStatus === opt ? 'selected' : ''}`}
                  onClick={() => setMirrorCheckStatus(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Rubric Item 4: Emergency Braking & Downshift */}
          <div className="rubric-card">
            <div className="rubric-header">
              <span className="rubric-step-badge">4</span>
              <div>
                <strong>Emergency Braking & Smooth Speed Deceleration</strong>
                <p>Rapid progressive brake pressure without skid or engine stall.</p>
              </div>
            </div>

            <div className="rubric-options-grid">
              {['Pass', 'Needs Additional Practice'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`rubric-pill-btn ${emergencyBrakingStatus === opt ? 'selected' : ''}`}
                  onClick={() => setEmergencyBrakingStatus(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Rubric Item 5: Instructor Remarks */}
          <div className="rubric-card">
            <div className="rubric-header">
              <span className="rubric-step-badge">5</span>
              <div>
                <strong>Certified Instructor Practical Assessment Remarks</strong>
                <p>Official notes visible on the student's progress dashboard and final certificate.</p>
              </div>
            </div>

            <textarea
              rows={3}
              className="scorecard-textarea"
              value={instructorRemarks}
              onChange={(e) => setInstructorRemarks(e.target.value)}
              placeholder="Enter specific practical observations and next steps..."
              required
            />
          </div>

          {/* Modal Footer */}
          <div className="scorecard-modal-footer">
            <div className="footer-cert-note">
              <ShieldCheck size={14} color="#15803D" />
              <span>Signed as Sunita Deshmukh (Lic: MH-12-INS-2019-332)</span>
            </div>

            <div className="footer-buttons">
              <button type="button" onClick={onClose} className="btn-cancel-modal">
                Cancel
              </button>
              <button type="submit" className="btn-submit-scorecard">
                <CheckCircle2 size={16} />
                <span>Publish RTO Scorecard</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
