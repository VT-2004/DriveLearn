import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, Car, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import './CalendarView.css';

const TIME_SLOTS = [
  '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '04:00 PM', '05:00 PM', '06:00 PM',
];

const DAYS_OF_WEEK = [
  { name: 'Mon', date: 'Aug 17' },
  { name: 'Tue', date: 'Aug 18' },
  { name: 'Wed', date: 'Aug 19' },
  { name: 'Thu', date: 'Aug 20' },
  { name: 'Fri', date: 'Aug 21' },
  { name: 'Sat (Today)', date: 'Aug 22', isToday: true },
  { name: 'Sun', date: 'Aug 23' },
];

export default function CalendarView({ bookings, onSelectBooking }) {
  const [viewMode, setViewMode] = useState('week'); // 'day' | 'week' | 'month'
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (booking) => {
    setSelectedSlot(booking);
    if (onSelectBooking) onSelectBooking(booking);
  };

  return (
    <div className="owner-calendar-component">
      {/* 1. View Control Header */}
      <div className="calendar-controls-bar">
        <div className="calendar-nav-group">
          <button className="btn-cal-nav" title="Previous Range">
            <ChevronLeft size={16} />
          </button>
          <span className="cal-range-label">August 17 – August 23, 2026</span>
          <button className="btn-cal-nav" title="Next Range">
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="calendar-view-toggle">
          <button
            className={`btn-toggle-mode ${viewMode === 'day' ? 'active' : ''}`}
            onClick={() => setViewMode('day')}
          >
            Day
          </button>
          <button
            className={`btn-toggle-mode ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            Week
          </button>
          <button
            className={`btn-toggle-mode ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            Month
          </button>
        </div>
      </div>

      {/* 2. Week View Grid */}
      {viewMode === 'week' && (
        <div className="week-grid-container">
          <div className="week-header-row">
            <div className="time-col-header">Time</div>
            {DAYS_OF_WEEK.map((day, idx) => (
              <div key={idx} className={`day-col-header ${day.isToday ? 'is-today-header' : ''}`}>
                <span className="day-name">{day.name}</span>
                <span className="day-date">{day.date}</span>
              </div>
            ))}
          </div>

          <div className="week-body-scroll">
            {TIME_SLOTS.map((time, tIdx) => (
              <div key={tIdx} className="time-row-grid">
                <div className="time-cell-label tabular-nums">{time}</div>

                {DAYS_OF_WEEK.map((day, dIdx) => {
                  // Find bookings matching this time & day (focus on today Aug 22 for demo)
                  const matchingBooking = day.isToday
                    ? bookings.find((b) => b.time.startsWith(time.split(' ')[0]))
                    : null;

                  return (
                    <div key={dIdx} className={`slot-cell ${day.isToday ? 'is-today-col' : ''}`}>
                      {matchingBooking ? (
                        <div
                          className={`booking-slot-pill status-${matchingBooking.status}`}
                          onClick={() => handleSlotClick(matchingBooking)}
                        >
                          <div className="slot-pill-top">
                            <strong className="slot-student">{matchingBooking.student}</strong>
                            <span className="slot-status-dot"></span>
                          </div>
                          <span className="slot-instructor-sub">{matchingBooking.instructor}</span>
                          <span className="slot-track-sub">{matchingBooking.trackLocation.split(' ')[0]}</span>
                        </div>
                      ) : (
                        <div className="empty-slot-placeholder"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Day View Simple List */}
      {viewMode === 'day' && (
        <div className="day-view-container">
          <div className="day-view-header">
            <h4>Saturday, August 22, 2026 (6 Practical Batches Scheduled)</h4>
          </div>
          <div className="day-slots-list">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className={`day-slot-card status-${booking.status}`}
                onClick={() => handleSlotClick(booking)}
              >
                <div className="day-slot-time tabular-nums">
                  <Clock size={14} color="var(--color-primary, #B91C1C)" />
                  <strong>{booking.time}</strong>
                </div>

                <div className="day-slot-meta">
                  <div className="slot-meta-title">
                    <strong>{booking.student}</strong> ({booking.phone})
                  </div>
                  <div className="slot-meta-details">
                    <span><User size={12} /> {booking.instructor}</span>
                    <span><Car size={12} /> {booking.vehicle}</span>
                    <span><MapPin size={12} /> {booking.trackLocation}</span>
                  </div>
                </div>

                <div className={`day-status-pill status-${booking.status}`}>
                  {booking.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Month View Summary Matrix */}
      {viewMode === 'month' && (
        <div className="month-view-container">
          <div className="month-matrix-grid">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
              const isToday = dayNum === 22;
              const hasBookings = dayNum >= 18 && dayNum <= 24;
              return (
                <div key={dayNum} className={`month-day-cell ${isToday ? 'is-today-month' : ''}`}>
                  <span className="month-day-num tabular-nums">{dayNum}</span>
                  {hasBookings && (
                    <div className="month-day-badge tabular-nums">
                      {isToday ? '6 Batches' : `${(dayNum % 4) + 2} Slots`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
