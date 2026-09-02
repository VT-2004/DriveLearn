import { useState } from 'react';
import { Star, Send, X, ShieldCheck, Heart, Award } from 'lucide-react';
import './LeaveReviewModal.css';

export default function LeaveReviewModal({ schoolName = 'Sai Motor & 2-Wheeler Academy', instructor = 'Sunita Deshmukh', onClose, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      if (onSubmitReview) {
        onSubmitReview({ rating, comment: comment.trim(), instructor });
      }
      setSubmitting(false);
      onClose();
      alert(`Thank you! Your verified ${rating}-star review for ${schoolName} has been published.`);
    }, 400);
  };

  return (
    <div className="learner-modal-backdrop">
      <div className="learner-modal-dialog">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Star size={18} color="#f59e0b" fill="#f59e0b" />
            <h3>Review Your Training Experience</h3>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="review-school-context">
            <strong>{schoolName}</strong>
            <span>Assigned Trainer: {instructor} (Karve Road & Warje 8-Track Ground)</span>
          </div>

          {/* Star Rating Selector */}
          <div className="star-rating-selector-wrap">
            <label>How would you rate your driving instructor & curriculum?</label>
            <div className="star-buttons-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="btn-star-pick"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={32}
                    color={(hoverRating || rating) >= star ? '#f59e0b' : '#cbd5e1'}
                    fill={(hoverRating || rating) >= star ? '#f59e0b' : 'none'}
                  />
                </button>
              ))}
            </div>
            <span className="rating-grade-lbl">
              {rating === 5 && '⭐⭐⭐⭐⭐ Exceptional (Highly Recommended)'}
              {rating === 4 && '⭐⭐⭐⭐ Very Good (Smooth Training)'}
              {rating === 3 && '⭐⭐⭐ Good (Satisfactory)'}
              {rating <= 2 && 'Needs Improvement'}
            </span>
          </div>

          <div className="form-group">
            <label>Your Personal Driving Review & Feedback</label>
            <textarea
              rows={4}
              placeholder="Tell future learners about your on-track training, clutch control balance, and instructor patience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div className="review-verified-hint">
            <ShieldCheck size={14} color="#15803D" style={{ flexShrink: 0 }} />
            <p>
              Your verified review helps students across Pune find certified 2-wheeler & car training schools.
            </p>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancel-modal">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-submit-modal">
              <Send size={14} />
              <span>{submitting ? 'Publishing...' : 'Submit Verified Review'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
