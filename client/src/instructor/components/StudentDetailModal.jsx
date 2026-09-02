import { useNavigate } from 'react-router-dom';
import { 
  X, User, Phone, MapPin, Calendar, Clock, Bike, 
  ShieldCheck, AlertCircle, MessageSquare, Award, FileText 
} from 'lucide-react';
import StatusPill from '../../admin/components/StatusPill';
import './StudentDetailModal.css';

export default function StudentDetailModal({ student, onClose, onOpenFeedback }) {
  const navigate = useNavigate();

  if (!student) return null;

  const handleOpenChat = () => {
    onClose();
    navigate('/instructor/messages');
  };

  return (
    <div className="learner-modal-backdrop" onClick={onClose}>
      <div className="student-dossier-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="dossier-header">
          <div className="dossier-title-wrap">
            <div className="dossier-avatar">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="dossier-name-row">
                <h2>{student.name}</h2>
                <StatusPill status={student.status} />
              </div>
              <span className="dossier-sub">{student.course} • Student ID: {student.id}</span>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-modal" aria-label="Close dossier">
            <X size={18} />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="dossier-scroll-body">
          {/* Quick Contact Bar */}
          <div className="dossier-contact-strip">
            <div className="contact-item">
              <Phone size={14} color="#15803D" />
              <span>Mobile: <strong className="tabular-nums">{student.phone}</strong></span>
            </div>
            <div className="contact-item">
              <AlertCircle size={14} color="#b45309" />
              <span>Emergency: <strong>{student.emergencyContact}</strong></span>
            </div>
          </div>

          {/* Section 1: RTO & Parivahan License Verification */}
          <div className="dossier-section-card">
            <div className="card-sec-head">
              <ShieldCheck size={16} color="var(--color-primary, #B91C1C)" />
              <h4>Parivahan Sarathi LL & Verification</h4>
            </div>

            <div className="dossier-grid-two">
              <div className="dossier-cell">
                <span className="cell-lbl">Learner License (LL) No.</span>
                <strong className="cell-val tabular-nums">{student.learnerLicense}</strong>
              </div>
              <div className="dossier-cell">
                <span className="cell-lbl">Assigned RTO Testing Ground</span>
                <strong className="cell-val">{student.targetRTO}</strong>
              </div>
              <div className="dossier-cell">
                <span className="cell-lbl">Blood Group</span>
                <strong className="cell-val">{student.bloodGroup}</strong>
              </div>
              <div className="dossier-cell">
                <span className="cell-lbl">Pickup Ground / Locality</span>
                <strong className="cell-val">{student.locality}</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Training Progress & Vehicle */}
          <div className="dossier-section-card">
            <div className="card-sec-head">
              <Award size={16} color="var(--color-primary, #B91C1C)" />
              <h4>Practical Curriculum & Vehicle Allocation</h4>
            </div>

            <div className="dossier-progress-box">
              <div className="prog-top">
                <span>Completed Lessons</span>
                <strong className="tabular-nums">
                  {student.completedSessions} of {student.totalSessions} Sessions ({student.progress}%)
                </strong>
              </div>
              <div className="prog-bar-track">
                <div 
                  className="prog-bar-fill" 
                  style={{ width: `${student.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="dossier-grid-two" style={{ marginTop: '12px' }}>
              <div className="dossier-cell">
                <span className="cell-lbl">Assigned Training Vehicle</span>
                <strong className="cell-val">{student.assignedVehicle}</strong>
              </div>
              <div className="dossier-cell">
                <span className="cell-lbl">Next Scheduled Practical Slot</span>
                <strong className="cell-val text-primary">{student.nextSlot}</strong>
              </div>
            </div>
          </div>

          {/* Section 3: Trainer Observations & Focus Areas */}
          <div className="dossier-section-card">
            <div className="card-sec-head">
              <FileText size={16} color="var(--color-primary, #B91C1C)" />
              <h4>Driving Competency Assessment</h4>
            </div>

            <div className="dossier-feedback-stack">
              <div className="assessment-row">
                <span className="assess-tag strength">Observed Strengths:</span>
                <p>{student.strengths}</p>
              </div>

              <div className="assessment-row">
                <span className="assess-tag improve">Focus for Next Session:</span>
                <p>{student.areasToImprove}</p>
              </div>

              <div className="latest-note-bubble">
                <span className="note-bubble-lbl">Latest Feedback Published:</span>
                <p>"{student.latestFeedback}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="dossier-footer">
          <div className="footer-left-actions">
            <button 
              type="button" 
              onClick={handleOpenChat} 
              className="btn-dossier-chat"
            >
              <MessageSquare size={14} />
              <span>Direct Chat with Student</span>
            </button>
            <button 
              type="button" 
              onClick={() => {
                onClose();
                if (onOpenFeedback) onOpenFeedback(student);
              }} 
              className="btn-dossier-note"
            >
              <FileText size={14} />
              <span>Log Session Feedback</span>
            </button>
          </div>

          <button 
            type="button" 
            onClick={onClose} 
            className="btn-cancel-modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
