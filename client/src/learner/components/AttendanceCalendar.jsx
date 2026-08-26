import { CheckCircle2, Calendar as CalIcon } from 'lucide-react';
import './AttendanceCalendar.css';

export default function AttendanceCalendar({ completedDates = [], attendancePercent = 88 }) {
  // August 2026 starts on Saturday (Day 6, with Sunday=0 or Mon=0)
  // Let's use standard Sun-Sat grid for Aug 2026 (31 days, Aug 1 is Saturday)
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Aug 1, 2026 was Saturday (6 blank cells before day 1)
  const blankDays = [null, null, null, null, null, null];
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const isDateCompleted = (day) => {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const fullDate = `2026-08-${formattedDay}`;
    return completedDates.includes(fullDate);
  };

  return (
    <div className="attendance-calendar-card">
      <div className="attendance-header">
        <div className="attendance-title-wrap">
          <CalIcon size={16} color="var(--color-primary, #B91C1C)" />
          <strong>August 2026 Lesson Attendance</strong>
        </div>
        <div className="attendance-badge tabular-nums">
          <span>{attendancePercent}% Present</span>
        </div>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((dow) => (
          <div key={dow} className="cal-dow-header">
            {dow}
          </div>
        ))}

        {blankDays.map((_, idx) => (
          <div key={`blank-${idx}`} className="cal-day-cell blank"></div>
        ))}

        {monthDays.map((day) => {
          const completed = isDateCompleted(day);
          const isToday = day === 22;

          return (
            <div 
              key={day} 
              className={`cal-day-cell ${completed ? 'completed-day' : ''} ${isToday ? 'today-day' : ''}`}
            >
              <span className="cal-day-number tabular-nums">{day}</span>
              {completed && <div className="completed-dot"></div>}
            </div>
          );
        })}
      </div>

      <div className="attendance-footer-legend">
        <div className="legend-item">
          <span className="legend-dot green"></span>
          <span>Completed Lesson ({completedDates.length})</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot today"></span>
          <span>Today (Aug 22)</span>
        </div>
      </div>
    </div>
  );
}
