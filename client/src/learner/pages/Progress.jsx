import { useState } from 'react';
import { CheckCircle2, Clock, Award, ShieldCheck, User, MessageSquare, Star } from 'lucide-react';
import StatCard from '../../admin/components/StatCard';
import ProgressStepper from '../components/ProgressStepper';
import LeaveReviewModal from '../components/LeaveReviewModal';
import { 
  learnerCourseSummary, 
  progressStages, 
  learnerSkillChecklist, 
  instructorFeedbackNotes 
} from '../data/dummyData';
import './Progress.css';

export default function Progress() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const completedSkillsCount = learnerSkillChecklist.filter((s) => s.status === 'completed').length;

  return (
    <div className="learner-progress-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Practical Training Curriculum & Skill Mastery</h1>
          <p>
            Track your road competency milestones, RTO 8-track maneuvers, and certified instructor session feedback.
          </p>
        </div>

        <button
          onClick={() => setShowReviewModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fffbeb',
            color: '#b45309',
            border: '1px solid #fde68a',
            borderRadius: '8px',
            padding: '7px 14px',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Sub-section A: 4 Stat Cards */}
      <div className="admin-stats-four-grid">
        <StatCard
          label="Attendance Rate"
          value={`${learnerCourseSummary.attendancePercent}%`}
          trend="8 Sessions Completed"
          trendType="up"
          icon="Calendar"
        />
        <StatCard
          label="Lessons Completed"
          value={`${learnerCourseSummary.lessonsCompleted} of ${learnerCourseSummary.totalLessons}`}
          trend="80% Total Time"
          trendType="up"
          icon="CheckCircle"
        />
        <StatCard
          label="Lessons Remaining"
          value={`${learnerCourseSummary.totalLessons - learnerCourseSummary.lessonsCompleted} Sessions`}
          trend="Estimated DL: 28 Aug"
          trendType="neutral"
          icon="Clock"
        />
        <StatCard
          label="Skills Mastered"
          value={`${completedSkillsCount} of ${learnerSkillChecklist.length}`}
          trend="Warje 8-Track Cleared"
          trendType="up"
          icon="Award"
        />
      </div>

      {/* Sub-section B: Stage Progress Stepper */}
      <div className="admin-card-panel">
        <div className="panel-header">
          <div>
            <h3>Driving Competency Stage Tracker</h3>
            <p>6-step standardized curriculum aligned with Maharashtra RTO requirements</p>
          </div>
        </div>

        <ProgressStepper 
          stages={progressStages} 
          currentStageIndex={learnerCourseSummary.currentStage} 
        />
      </div>

      {/* Sub-section C & D: Skill Checklist + Instructor Feedback Two-Column Split */}
      <div className="progress-two-col-grid">
        {/* Left Column: Skill Checklist */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>2-Wheeler Practical Skills Checklist</h3>
              <p>Critical driving competencies certified by your trainer</p>
            </div>
            <span className="skills-count-pill tabular-nums">
              {completedSkillsCount}/{learnerSkillChecklist.length} Mastered
            </span>
          </div>

          <div className="skills-checklist-stack">
            {learnerSkillChecklist.map((skill) => (
              <div 
                key={skill.id} 
                className={`skill-check-row ${skill.status}`}
              >
                <div className="skill-check-icon">
                  {skill.status === 'completed' ? (
                    <CheckCircle2 size={16} color="var(--admin-success-text, #15803D)" />
                  ) : skill.status === 'in-progress' ? (
                    <div className="in-progress-dot"></div>
                  ) : (
                    <div className="upcoming-dot"></div>
                  )}
                </div>

                <div className="skill-name-text">
                  <span>{skill.name}</span>
                </div>

                <span className={`skill-status-tag ${skill.status}`}>
                  {skill.status === 'completed' ? 'Mastered' : skill.status === 'in-progress' ? 'In Training' : 'Upcoming'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Instructor Feedback (Cross-Portal Single-Writer/Single-Reader) */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Certified Instructor Session Feedback</h3>
              <p>Practical notes submitted by Sunita Deshmukh after each session</p>
            </div>
            <MessageSquare size={16} color="var(--color-primary, #B91C1C)" />
          </div>

          <div className="instructor-notes-list">
            {instructorFeedbackNotes.map((noteItem, idx) => (
              <div key={idx} className="instructor-note-card">
                <div className="note-card-header">
                  <div className="note-session-tag">
                    <User size={13} />
                    <strong>{noteItem.session}</strong>
                  </div>
                  <span className="note-date-tag tabular-nums">{noteItem.date}</span>
                </div>

                <p className="note-body-text">"{noteItem.note}"</p>

                <div className="note-footer-sign">
                  <ShieldCheck size={13} color="var(--admin-success-text, #15803D)" />
                  <span>Verified Instructor: {noteItem.instructor} (Sai Motor Academy)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Review Modal */}
      {showReviewModal && (
        <LeaveReviewModal
          schoolName={learnerCourseSummary.schoolName}
          instructor={learnerCourseSummary.instructor}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
}
