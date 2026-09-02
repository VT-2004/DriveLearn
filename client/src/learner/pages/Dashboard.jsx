import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Calendar, CheckCircle2, TrendingUp, Clock,
  MapPin, User, Bike, ArrowRight, Sparkles, AlertCircle, ChevronRight, Award
} from 'lucide-react';
import StatCard from '../../admin/components/StatCard';
import StatusPill from '../../admin/components/StatusPill';
import ProgressStepper from '../components/ProgressStepper';
import AttendanceCalendar from '../components/AttendanceCalendar';
import {
  learnerProfileData,
  learnerCourseSummary,
  learnerUpcomingLesson,
  progressStages,
  completedAttendanceDates,
  instructorFeedbackNotes,
  learnerNotifications
} from '../data/dummyData';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="learner-dashboard-page">
      {/* 1. View Header with Personalized Greeting */}
      <div className="learner-view-header">
        <div>
          <h1>Welcome back, {learnerProfileData.name.split(' ')[0]}! </h1>
          <p>
            You're currently training for your 2-Wheeler Driving License at <strong>{learnerCourseSummary.schoolName}</strong> (Karve Road, Pune).
          </p>
        </div>
        <Link to="/learner/bookings" className="btn-header-action">
          <Calendar size={15} />
          <span>Book Next Slot</span>
        </Link>
      </div>

      {/* Sub-section A: 4 Stat Cards */}
      <div className="admin-stats-four-grid">
        <StatCard
          label="Enrolled Package"
          value="2-Wheeler Special"
          trend="Subsidized ₹999 Launch"
          trendType="neutral"
          icon={<Bike size={18} />}
          onClick={() => navigate('/learner/progress')}
        />
        <StatCard
          label="Attendance Rate"
          value={`${learnerCourseSummary.attendancePercent}%`}
          trend="8 of 9 Sessions Present"
          trendType="up"
          icon={<Calendar size={18} />}
          onClick={() => {
            document.getElementById('attendance-calendar-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <StatCard
          label="Lessons Completed"
          value={`${learnerCourseSummary.lessonsCompleted} / ${learnerCourseSummary.totalLessons}`}
          trend="2 Lessons remaining for DL"
          trendType="up"
          icon={<CheckCircle2 size={18} />}
          onClick={() => navigate('/learner/bookings')}
        />
        <StatCard
          label="Curriculum Progress"
          value={`${learnerCourseSummary.progressPercent}%`}
          trend="RTO 8-Track Complete"
          trendType="up"
          icon={<TrendingUp size={18} />}
          onClick={() => navigate('/learner/progress')}
        />
      </div>

      {/* Sub-section B: Upcoming Lesson Hero Card */}
      <div className="upcoming-lesson-card">
        <div className="lesson-badge-ribbon">
          <Sparkles size={13} />
          <span>UPCOMING PRACTICAL LESSON</span>
        </div>

        <div className="lesson-card-content">
          <div className="lesson-left-col">
            <div className="lesson-time-wrap tabular-nums">
              <Clock size={18} color="var(--color-primary, #B91C1C)" />
              <strong className="lesson-time-str">{learnerUpcomingLesson.time}</strong>
              <span className="lesson-date-str">{learnerUpcomingLesson.date}</span>
            </div>

            <div className="lesson-topic-box">
              <span className="topic-lbl">Session Focus:</span>
              <strong className="topic-title">{learnerUpcomingLesson.topic}</strong>
            </div>

            <div className="lesson-meta-chips">
              <div className="meta-chip">
                <User size={13} />
                <span>Trainer: <strong>{learnerUpcomingLesson.instructor}</strong></span>
              </div>
              <div className="meta-chip">
                <Bike size={13} />
                <span>Vehicle: <strong>{learnerUpcomingLesson.vehicle}</strong></span>
              </div>
              <div className="meta-chip">
                <MapPin size={13} />
                <span>Ground: <strong>{learnerUpcomingLesson.location}</strong></span>
              </div>
            </div>
          </div>

          <div className="lesson-right-col">
            <StatusPill status={learnerUpcomingLesson.status} />
            <Link to="/learner/bookings" className="btn-view-bookings-link">
              <span>View All Bookings</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-section C: Learning Progress Stepper */}
      <div className="admin-card-panel">
        <div className="panel-header">
          <div>
            <h3>Driving Competency Stage Tracker</h3>
            <p>From Parivahan Learner's License (LL) to official Permanent Smart Card DL</p>
          </div>
          <Link to="/learner/progress" className="panel-header-link">
            <span>Detailed Skills</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <ProgressStepper
          stages={progressStages}
          currentStageIndex={learnerCourseSummary.currentStage}
        />
      </div>

      {/* Sub-section D & E: Attendance Calendar & Recent Instructor Feedback Two-Column Split */}
      <div className="dashboard-charts-split-grid" id="attendance-calendar-section">
        {/* Sub-section D: Monthly Attendance Calendar */}
        <AttendanceCalendar
          completedDates={completedAttendanceDates}
          attendancePercent={learnerCourseSummary.attendancePercent}
        />

        {/* Sub-section E: Recent Instructor Feedback Notes */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Latest Trainer Feedback</h3>
              <p>Practical feedback from Sunita ma’am after your on-track sessions</p>
            </div>
            <Link to="/learner/progress" className="panel-header-link">
              <span>All Notes</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="feedback-notes-stack">
            {instructorFeedbackNotes.slice(0, 2).map((item, idx) => (
              <div key={idx} className="feedback-note-bubble">
                <div className="feedback-note-top">
                  <strong>{item.session}</strong>
                  <span className="feedback-date tabular-nums">{item.date}</span>
                </div>
                <p className="feedback-text">"{item.note}"</p>
                <span className="trainer-signature">— {item.instructor} (Certified Trainer)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
