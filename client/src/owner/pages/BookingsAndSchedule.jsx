import { useState } from 'react';
import { Plus, Calendar, Clock, Car, User, MapPin, CheckCircle, XCircle, X, AlertTriangle } from 'lucide-react';
import CalendarView from '../components/CalendarView';
import DataTable from '../../admin/components/DataTable';
import StatusPill from '../../admin/components/StatusPill';
import { ownerBookingsList } from '../data/dummyData';
import './BookingsAndSchedule.css';

export default function BookingsAndSchedule() {
  const [bookings, setBookings] = useState(ownerBookingsList);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Manual Create Booking Modal State (Gap Audit)
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStudent, setNewStudent] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDate, setNewDate] = useState('2026-08-22');
  const [newTime, setNewTime] = useState('08:00 AM - 08:45 AM');
  const [newInstructor, setNewInstructor] = useState('Sunita Deshmukh');
  const [newVehicle, setNewVehicle] = useState('Honda Activa 6G (MH-12-PQ-8821)');
  const [conflictError, setConflictError] = useState(null);

  const handleConfirmBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b))
    );
  };

  const handleCancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
  };

  const handleCreateBookingSubmit = (e) => {
    e.preventDefault();
    setConflictError(null);

    // Collision Check: Check if trainer or vehicle is already booked at that exact time on the date
    const isConflict = bookings.some(
      (b) =>
        b.date === newDate &&
        b.time.split(' - ')[0] === newTime.split(' - ')[0] &&
        (b.instructor === newInstructor || b.vehicle === newVehicle) &&
        b.status !== 'cancelled'
    );

    if (isConflict) {
      setConflictError(
        `⚠️ Scheduling Conflict: ${newInstructor} (or ${newVehicle.split(' (')[0]}) is already assigned to another student during ${newTime} on ${newDate}. Please choose another time slot or trainer.`
      );
      return;
    }

    const newEntry = {
      id: `bkg-${Date.now()}`,
      student: newStudent,
      phone: newPhone,
      course: 'Comprehensive 2-Wheeler Training',
      instructor: newInstructor,
      vehicle: newVehicle,
      date: newDate,
      time: newTime,
      trackLocation: 'Warje 8-Track Ground',
      status: 'confirmed',
    };

    setBookings([newEntry, ...bookings]);
    setShowCreateModal(false);
    setNewStudent('');
    setNewPhone('');
    alert(`Practical slot created and assigned to ${newInstructor}!`);
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.trackLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Student & Contact',
      render: (row) => (
        <div className="bkg-student-cell">
          <strong>{row.student}</strong>
          <span className="bkg-phone-sub tabular-nums">{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Training Slot',
      render: (row) => (
        <div className="bkg-time-cell tabular-nums">
          <span>{row.time}</span>
          <span className="bkg-date-sub">{row.date}</span>
        </div>
      ),
    },
    {
      header: 'Instructor & Vehicle',
      render: (row) => (
        <div className="bkg-trainer-cell">
          <strong>{row.instructor}</strong>
          <span className="bkg-vehicle-sub">{row.vehicle}</span>
        </div>
      ),
    },
    {
      header: 'Track / Ground Location',
      accessor: 'trackLocation',
    },
    {
      header: 'Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="bkg-actions-cell">
          {row.status === 'pending' ? (
            <>
              <button
                onClick={() => handleConfirmBooking(row.id)}
                className="btn-confirm-bkg"
                title="Confirm Student Booking"
              >
                <CheckCircle size={13} />
                <span>Confirm</span>
              </button>
              <button
                onClick={() => handleCancelBooking(row.id)}
                className="btn-cancel-bkg"
                title="Cancel Slot"
              >
                <XCircle size={13} />
              </button>
            </>
          ) : (
            <button
              onClick={() => alert(`Managing slot details for ${row.student} (${row.time})`)}
              className="btn-manage-slot"
            >
              Manage
            </button>
          )}
        </div>
      ),
    },
  ];

  const extraToolbar = (
    <button
      onClick={() => {
        setConflictError(null);
        setShowCreateModal(true);
      }}
      className="btn-toolbar-primary"
    >
      <Plus size={14} />
      <span>Create Booking Slot</span>
    </button>
  );

  return (
    <div className="owner-bookings-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Bookings, Timetable & Schedule</h1>
          <p>
            Calendar schedule for practical driving sessions, instructor allocation, and track ground slots.
          </p>
        </div>
      </div>

      {/* 2. Visual Calendar View Component */}
      <CalendarView
        bookings={bookings}
        onSelectBooking={(b) => alert(`Selected Booking: ${b.student}\nTime: ${b.time}\nInstructor: ${b.instructor}\nGround: ${b.trackLocation}`)}
      />

      {/* 3. Detailed Bookings Table */}
      <div className="bookings-table-wrapper">
        <div className="table-section-title">
          <Calendar size={18} color="var(--color-primary, #B91C1C)" />
          <h3>All Scheduled Practical Batches</h3>
        </div>

        <DataTable
          columns={columns}
          data={filteredBookings}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search practical slots by student, instructor, or track location..."
          extraToolbar={extraToolbar}
        />
      </div>

      {/* Manual Slot Creation Modal with Conflict Prevention (Gap Audit) */}
      {showCreateModal && (
        <div className="owner-modal-backdrop">
          <div className="owner-modal-dialog">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Plus size={18} color="var(--color-primary, #B91C1C)" />
                <h3>Manual Practical Slot Allocation</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="btn-close-modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBookingSubmit} className="modal-form">
              {conflictError && (
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
                  <span>{conflictError}</span>
                </div>
              )}

              <div className="form-group">
                <label>Student Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Amit Patil"
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Student Contact Phone</label>
                <input
                  type="tel"
                  placeholder="+91 98230 11223"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Training Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => {
                      setNewDate(e.target.value);
                      setConflictError(null);
                    }}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Batch Time Window</label>
                  <select
                    value={newTime}
                    onChange={(e) => {
                      setNewTime(e.target.value);
                      setConflictError(null);
                    }}
                  >
                    <option value="08:00 AM - 08:45 AM">08:00 AM - 08:45 AM</option>
                    <option value="09:00 AM - 09:45 AM">09:00 AM - 09:45 AM</option>
                    <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM</option>
                    <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM</option>
                    <option value="05:00 PM - 05:45 PM">05:00 PM - 05:45 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Assigned Instructor</label>
                  <select
                    value={newInstructor}
                    onChange={(e) => {
                      setNewInstructor(e.target.value);
                      setConflictError(null);
                    }}
                  >
                    <option value="Sunita Deshmukh">Sunita Deshmukh (2W Specialist)</option>
                    <option value="Manoj Kulkarni">Manoj Kulkarni (4W Senior Trainer)</option>
                    <option value="Ganesh Jadhav">Ganesh Jadhav (2W & 4W Trainer)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Assigned Vehicle</label>
                  <select
                    value={newVehicle}
                    onChange={(e) => {
                      setNewVehicle(e.target.value);
                      setConflictError(null);
                    }}
                  >
                    <option value="Honda Activa 6G (MH-12-PQ-8821)">Honda Activa 6G (MH-12-PQ-8821)</option>
                    <option value="Maruti Swift LXi (MH-12-AB-4471)">Maruti Swift LXi (MH-12-AB-4471)</option>
                    <option value="Hero Splendor Plus (MH-12-KR-3390)">Hero Splendor Plus (MH-12-KR-3390)</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-cancel-modal">
                  Cancel
                </button>
                <button type="submit" className="btn-submit-modal">
                  Allocate & Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
