import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, RefreshCw, XCircle, AlertCircle, Plus, X, AlertTriangle, MapPin, Compass } from 'lucide-react';
import DataTable from '../../admin/components/DataTable';
import StatusPill from '../../admin/components/StatusPill';
import BookLessonModal from '../components/BookLessonModal';
import { learnerBookingsList } from '../data/dummyData';
import { VERIFIED_PICKUP_LANDMARKS } from '../../shared/data/pickupLandmarks';
import './MyBookings.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState(learnerBookingsList);
  const [statusTab, setStatusTab] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reschedule Modal State
  const [rescheduleBooking, setRescheduleBooking] = useState(null);
  const [newDate, setNewDate] = useState('2026-08-25');
  const [newTime, setNewTime] = useState('09:00 AM - 09:45 AM');
  const [newPickupLandmark, setNewPickupLandmark] = useState('Garware College Metro Gate 2 (Pillar No. 42)');
  const [slotConflictError, setSlotConflictError] = useState(null);

  // New Lesson Booking Modal State
  const [showBookModal, setShowBookModal] = useState(false);

  const filteredBookings = bookings.filter((b) => {
    const matchesTab = statusTab === 'ALL' || (statusTab === 'upcoming' ? b.status === 'confirmed' : b.status === statusTab);
    const matchesSearch =
      b.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleBookSlot = (newLesson) => {
    setBookings((prev) => [newLesson, ...prev]);
    setShowBookModal(false);
    alert(`Success! Your practical session has been confirmed for ${newLesson.date} (${newLesson.time}) at ${newLesson.location}!`);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    setSlotConflictError(null);

    // Gap Audit: Booking Conflict Error Simulation (e.g. 25 Aug 08:00 AM double-booking)
    if (newDate === '2026-08-25' && newTime.startsWith('08:00 AM')) {
      setSlotConflictError(
        '⚠️ Slot Unavailable: This batch on Warje 8-Track Ground has just been booked by another learner. Please select an alternate time (e.g. 09:00 AM or 04:00 PM).'
      );
      return;
    }

    setBookings((prev) =>
      prev.map((b) =>
        b.id === rescheduleBooking.id
          ? { ...b, date: newDate, time: newTime, pickupLandmark: newPickupLandmark }
          : b
      )
    );
    alert(`Practical lesson ${rescheduleBooking.id} rescheduled successfully to ${newDate} (${newTime}) with pickup at ${newPickupLandmark}!`);
    setRescheduleBooking(null);
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this practical session slot?')) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
      );
    }
  };

  const columns = [
    {
      header: 'Practical Training Slot',
      render: (row) => (
        <div className="bkg-slot-cell tabular-nums">
          <strong className="bkg-time">{row.time}</strong>
          <span className="bkg-date-sub">{row.date} • ID: {row.id}</span>
        </div>
      ),
    },
    {
      header: 'Training Ground & Transit Pickup',
      render: (row) => (
        <div className="bkg-location-cell">
          <strong>{row.location}</strong>
          <span className="bkg-school-sub">{row.school}</span>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '4px',
            fontSize: '11px',
            color: '#15803D',
            backgroundColor: '#f0fdf4',
            padding: '2px 7px',
            borderRadius: '4px',
            border: '1px solid #bbf7d0',
            width: 'fit-content'
          }}>
            <MapPin size={11} />
            <span>Pickup: <strong>{row.pickupLandmark || 'Garware Metro Pillar 42'}</strong></span>
          </div>
        </div>
      ),
    },
    {
      header: 'Instructor',
      accessor: 'instructor',
    },
    {
      header: 'Session Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Payment',
      render: (row) => <StatusPill status={row.paymentStatus} />,
    },
    {
      header: 'Actions',
      render: (row) => {
        // Cross-Portal Consistency Rule: Reschedule/Cancel ONLY available on confirmed status
        if (row.status === 'confirmed') {
          return (
            <div className="bkg-actions-row">
              <button
                onClick={() => {
                  setSlotConflictError(null);
                  setRescheduleBooking(row);
                }}
                className="btn-action-reschedule"
                title="Reschedule this session"
              >
                <RefreshCw size={13} />
                <span>Reschedule</span>
              </button>
              <button
                onClick={() => handleCancelBooking(row.id)}
                className="btn-action-cancel"
                title="Cancel session"
              >
                <XCircle size={13} />
              </button>
            </div>
          );
        }
        return (
          <span className="bkg-locked-action-note">
            {row.status === 'completed' ? 'Completed Session' : 'Cancelled'}
          </span>
        );
      },
    },
  ];

  return (
    <div className="learner-bookings-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>My Practical Training Sessions</h1>
          <p>
            Track on-track batch schedules, view instructor assignments, and manage upcoming slot bookings.
          </p>
        </div>
      </div>

      {/* 2. Status Tabs Bar */}
      <div className="bookings-tabs-bar">
        <div className="tabs-group">
          <button
            className={`tab-btn ${statusTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setStatusTab('ALL')}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            className={`tab-btn ${statusTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setStatusTab('upcoming')}
          >
            Upcoming ({bookings.filter((b) => b.status === 'confirmed').length})
          </button>
          <button
            className={`tab-btn ${statusTab === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusTab('completed')}
          >
            Completed ({bookings.filter((b) => b.status === 'completed').length})
          </button>
          <button
            className={`tab-btn ${statusTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setStatusTab('cancelled')}
          >
            Cancelled ({bookings.filter((b) => b.status === 'cancelled').length})
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <Link
            to="/learner/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              color: '#334155',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <Compass size={14} color="var(--color-primary, #B91C1C)" />
            <span>Explore Other Schools & Courses</span>
          </Link>

          <button
            onClick={() => setShowBookModal(true)}
            className="btn-toolbar-primary"
          >
            <Plus size={14} />
            <span>Book Next Lesson</span>
          </button>
        </div>
      </div>

      {/* 3. Bookings Data Table */}
      <div className="learner-table-card">
        <DataTable
          columns={columns}
          data={filteredBookings}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search practical slots by instructor, ground, or school..."
        />
      </div>

      {/* 4. Reschedule Modal (State-Gated with Conflict Error State) */}
      {rescheduleBooking && (
        <div className="learner-modal-backdrop">
          <div className="learner-modal-dialog">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <RefreshCw size={18} color="var(--color-primary, #B91C1C)" />
                <h3>Reschedule Practical Session ({rescheduleBooking.id})</h3>
              </div>
              <button onClick={() => setRescheduleBooking(null)} className="btn-close-modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="modal-form">
              <div className="reschedule-info-box">
                <p>
                  Current Slot: <strong>{rescheduleBooking.date}</strong> at <strong>{rescheduleBooking.time}</strong> with <strong>{rescheduleBooking.instructor}</strong> ({rescheduleBooking.location}).
                </p>
              </div>

              {/* Slot Conflict Banner */}
              {slotConflictError && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1.5px solid #fecaca',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#991b1b',
                  fontSize: '12px',
                  lineHeight: '1.4',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}>
                  <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{slotConflictError}</span>
                </div>
              )}

              <div className="form-group">
                <label>Select New Date</label>
                <select value={newDate} onChange={(e) => {
                  setNewDate(e.target.value);
                  setSlotConflictError(null);
                }}>
                  <option value="2026-08-25">Tuesday, 25 Aug 2026</option>
                  <option value="2026-08-26">Wednesday, 26 Aug 2026</option>
                  <option value="2026-08-27">Thursday, 27 Aug 2026</option>
                  <option value="2026-08-28">Friday, 28 Aug 2026</option>
                </select>
              </div>

              <div className="form-group">
                <label>Select Available Training Slot</label>
                <select value={newTime} onChange={(e) => {
                  setNewTime(e.target.value);
                  setSlotConflictError(null);
                }}>
                  <option value="08:00 AM - 08:45 AM">08:00 AM - 08:45 AM (Morning Batch)</option>
                  <option value="09:00 AM - 09:45 AM">09:00 AM - 09:45 AM (Morning Batch)</option>
                  <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM (Evening Batch)</option>
                  <option value="05:00 PM - 05:45 PM">05:00 PM - 05:45 PM (Evening Batch)</option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px', color: '#15803D' }} />
                  <span>Designated Transit Pickup Landmark</span>
                </label>
                <select 
                  value={newPickupLandmark} 
                  onChange={(e) => setNewPickupLandmark(e.target.value)}
                >
                  {VERIFIED_PICKUP_LANDMARKS.map((lm) => (
                    <option key={lm.id} value={`${lm.name} (${lm.metroPillar})`}>
                      {lm.name} • {lm.metroPillar}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-alert-note">
                <AlertCircle size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Free rescheduling is permitted up to 4 hours before slot start time.
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  onClick={() => setRescheduleBooking(null)} 
                  className="btn-cancel-modal"
                >
                  Keep Existing Slot
                </button>
                <button type="submit" className="btn-submit-modal">
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Book Lesson Modal */}
      {showBookModal && (
        <BookLessonModal
          onClose={() => setShowBookModal(false)}
          onBookSlot={handleBookSlot}
        />
      )}
    </div>
  );
}
