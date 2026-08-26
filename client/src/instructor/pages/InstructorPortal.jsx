import { Link } from 'react-router-dom';
import { UserCheck, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './InstructorPortal.css';

export default function InstructorPortal() {
  const { user } = useAuth();

  return (
    <div className="portal-preview-page">
      <div className="container portal-preview-container">
        {/* Top Header */}
        <div className="portal-preview-header">
          <Link to="/" className="portal-back-link">
            <ArrowLeft size={16} />
            <span>Back to Public Website</span>
          </Link>
          <div className="portal-role-badge">
            <UserCheck size={16} />
            <span>Instructor Portal</span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="portal-hero-box">
          <div className="portal-hero-content">
            <h1>Instructor Batch & Student Dashboard</h1>
            <p>
              Welcome, <strong>{user?.name || 'Sunita Deshmukh'}</strong>! Manage your assigned student batches, 8-track ground practical timings, and RTO test day readiness.
            </p>
            <div className="portal-assigned-pill">
              <ShieldCheck size={16} color="#166534" />
              <span>Assigned Partner: <strong>Sai Motor & 2-Wheeler Training School (Pune)</strong></span>
            </div>
          </div>
        </div>

        {/* Today's Batch Schedule Preview */}
        <div className="preview-section-card">
          <div className="section-title-row">
            <Calendar size={20} color="#dc2626" />
            <h3>Today's Scheduled Batches (Karve Road & Warje Ground)</h3>
          </div>

          <div className="batches-preview-list">
            <div className="batch-preview-item">
              <div className="batch-time-col">
                <Clock size={16} color="#dc2626" />
                <strong>07:00 AM - 07:45 AM</strong>
                <span>Morning Slot 1</span>
              </div>
              <div className="batch-student-col">
                <strong>Pooja Kulkarni</strong>
                <span>2-Wheeler (MCWG) • Day 3 of 10</span>
                <p><MapPin size={12} /> Pickup: Garware College Metro Station</p>
              </div>
              <div className="batch-action-col">
                <span className="batch-status-pill in-progress">
                  <CheckCircle2 size={13} /> Active Session
                </span>
              </div>
            </div>

            <div className="batch-preview-item">
              <div className="batch-time-col">
                <Clock size={16} color="#dc2626" />
                <strong>08:00 AM - 08:45 AM</strong>
                <span>Morning Slot 2</span>
              </div>
              <div className="batch-student-col">
                <strong>Aniket Shinde</strong>
                <span>4-Wheeler Car (LMV) • Day 7 of 15</span>
                <p><MapPin size={12} /> Pickup: Karve Nagar Chowk</p>
              </div>
              <div className="batch-action-col">
                <span className="batch-status-pill upcoming">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
