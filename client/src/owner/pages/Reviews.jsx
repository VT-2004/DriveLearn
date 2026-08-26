import { useState } from 'react';
import { Star, MessageSquare, Send, Check, ShieldCheck } from 'lucide-react';
import RatingBreakdownBar from '../components/RatingBreakdownBar';
import { ownerReviewsList, ratingBreakdownData } from '../data/dummyData';
import './Reviews.css';

export default function Reviews() {
  const [reviews, setReviews] = useState(ownerReviewsList);
  const [replyTextMap, setReplyTextMap] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleReplyChange = (id, text) => {
    setReplyTextMap({ ...replyTextMap, [id]: text });
  };

  const handlePostReply = (id) => {
    const text = replyTextMap[id];
    if (!text || text.trim() === '') return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              ownerReply: text.trim(),
              replyDate: new Date().toISOString().split('T')[0],
            }
          : r
      )
    );
    setActiveReplyId(null);
    setReplyTextMap({ ...replyTextMap, [id]: '' });
  };

  return (
    <div className="owner-reviews-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Student Ratings, Feedback & Public Trust</h1>
          <p>
            Monitor verified learner testimonials, respond to student feedback, and build trust in the Maharashtra network.
          </p>
        </div>
      </div>

      {/* 2. Rating Breakdown Bar Component */}
      <RatingBreakdownBar breakdownData={ratingBreakdownData} />

      {/* 3. Student Reviews List */}
      <div className="reviews-list-container">
        <div className="reviews-list-header">
          <h3>Recent Verified Student Testimonials</h3>
          <span className="unanswered-badge">
            {reviews.filter((r) => !r.ownerReply).length} Review Awaiting Reply
          </span>
        </div>

        <div className="reviews-cards-stack">
          {reviews.map((rev) => (
            <div key={rev.id} className="owner-review-card">
              <div className="review-top-meta">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {rev.student.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <strong className="reviewer-name">{rev.student}</strong>
                    <span className="reviewer-loc">{rev.locality} • Enrolled: {rev.course}</span>
                  </div>
                </div>

                <div className="review-right-meta">
                  <div className="review-stars-pill tabular-nums">
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <span>{rev.rating}.0★</span>
                  </div>
                  <span className="review-date-tag tabular-nums">{rev.date}</span>
                </div>
              </div>

              <p className="student-comment-body">"{rev.comment}"</p>

              {/* Owner Reply Display / Inline Form */}
              {rev.ownerReply ? (
                <div className="owner-reply-box">
                  <div className="reply-box-header">
                    <div className="reply-author-tag">
                      <ShieldCheck size={14} color="var(--color-primary, #B91C1C)" />
                      <strong>Sai Motors Official Response</strong>
                    </div>
                    <span className="reply-date tabular-nums">{rev.replyDate}</span>
                  </div>
                  <p className="reply-content-text">{rev.ownerReply}</p>
                </div>
              ) : activeReplyId === rev.id ? (
                <div className="inline-reply-input-box">
                  <textarea
                    placeholder="Write a professional and encouraging response to this student..."
                    value={replyTextMap[rev.id] || ''}
                    onChange={(e) => handleReplyChange(rev.id, e.target.value)}
                    rows={3}
                  />
                  <div className="reply-btn-row">
                    <button
                      type="button"
                      onClick={() => setActiveReplyId(null)}
                      className="btn-cancel-reply"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePostReply(rev.id)}
                      className="btn-submit-reply"
                    >
                      <Send size={13} />
                      <span>Post Official Reply</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="reply-prompt-action">
                  <button
                    onClick={() => setActiveReplyId(rev.id)}
                    className="btn-open-reply-form"
                  >
                    <MessageSquare size={13} />
                    <span>Reply to this student review</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
