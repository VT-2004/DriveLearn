import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, User, ShieldCheck, 
  CheckCircle2, Plus, ArrowRight, Wallet 
} from 'lucide-react';
import './LearnerBookings.css';

export default function LearnerBookings() {
  const [bookings] = useState([
    {
      id: 'BK-2026-081',
      schoolName: 'Sai Motor & 2-Wheeler Training School',
      courseName: 'Two-Wheeler Practical Course (MCWG)',
      address: 'Plot 14, Opposite Garware College Metro, Karve Road, Kothrud, Pune',
      instructor: 'Sunita Deshmukh (Certified Female Instructor)',
      batchTiming: '07:00 AM - 07:45 AM (Morning Batch)',
      startDate: '18 Aug 2026',
      totalFee: 999,
      walletDiscount: 15,
      paidAmount: 984,
      status: 'IN_PROGRESS',
      progressDays: '3/10 Days Completed',
    },
  ]);

  return (
    <div className="learner-bookings-page">
      {/* 1. Header Row */}
      <div className="bookings-page-header">
        <div>
          <h2>My Training Courses & Batches</h2>
          <p>Manage your active driving lessons, batch timings, and center details.</p>
        </div>
        <Link to="/find-school" className="btn-book-new">
          <Plus size={16} />
          <span>Enroll in Another Course</span>
        </Link>
      </div>

      {/* 2. Bookings List */}
      <div className="bookings-list">
        {bookings.map((b) => (
          <div key={b.id} className="booking-card-item">
            <div className="booking-card-top">
              <div className="booking-title-info">
                <span className="booking-id-tag">{b.id}</span>
                <h3>{b.courseName}</h3>
                <p className="booking-school-name">
                  <ShieldCheck size={15} color="#dc2626" /> {b.schoolName}
                </p>
              </div>

              <div className="booking-status-box">
                <span className="status-badge-active">
                  <CheckCircle2 size={13} /> {b.status.replace('_', ' ')}
                </span>
                <span className="progress-badge">{b.progressDays}</span>
              </div>
            </div>

            {/* Meta Grid */}
            <div className="booking-meta-grid">
              <div className="meta-block">
                <span className="meta-label">Location / Pickup Point</span>
                <div className="meta-val">
                  <MapPin size={14} color="#dc2626" />
                  <span>{b.address}</span>
                </div>
              </div>

              <div className="meta-block">
                <span className="meta-label">Batch Slot Timing</span>
                <div className="meta-val">
                  <Clock size={14} color="#dc2626" />
                  <span>{b.batchTiming}</span>
                </div>
              </div>

              <div className="meta-block">
                <span className="meta-label">Assigned Instructor</span>
                <div className="meta-val">
                  <User size={14} color="#dc2626" />
                  <span>{b.instructor}</span>
                </div>
              </div>

              <div className="meta-block">
                <span className="meta-label">Fee Breakdown</span>
                <div className="fee-breakdown-row">
                  <span>Fee: ₹{b.totalFee}</span>
                  <span className="text-green">-₹{b.walletDiscount} (Wallet Bonus)</span>
                  <strong>Total: ₹{b.paidAmount}</strong>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="booking-card-footer">
              <Link to="/learner/dashboard" className="btn-view-syllabus">
                <span>View 10-Day Training Milestones</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
