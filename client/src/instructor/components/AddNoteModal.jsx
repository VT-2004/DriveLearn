import { useState } from 'react';
import { MessageSquare, Send, X, ShieldCheck } from 'lucide-react';
import './AddNoteModal.css';

export default function AddNoteModal({ student, onClose, onSaveNote }) {
  const [noteText, setNoteText] = useState(student.latestFeedback || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onSaveNote(student.id, noteText.trim());
    onClose();
  };

  return (
    <div className="instructor-modal-backdrop">
      <div className="instructor-modal-dialog">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <MessageSquare size={18} color="var(--color-primary, #B91C1C)" />
            <h3>Log Practical Lesson Feedback</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="note-target-student-bar">
            <strong>Learner: {student.name}</strong>
            <span>Enrolled in {student.course} ({student.progress}% Completed)</span>
          </div>

          <div className="form-group">
            <label>Practical Session Observations & Guidance</label>
            <textarea
              rows={4}
              placeholder="e.g. Good progress on clutch biting point and 8-track maneuvers. Keep both hands relaxed..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              required
            />
          </div>

          <div className="note-sync-hint">
            <ShieldCheck size={14} color="var(--admin-success-text, #15803D)" flexShrink={0} />
            <p>
              This observation note will sync directly into the student's personal Learner Portal under <em>"Instructor Feedback"</em>.
            </p>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancel-modal">
              Cancel
            </button>
            <button type="submit" className="btn-submit-modal">
              <Send size={14} />
              <span>Save & Publish Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
