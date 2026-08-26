import { useState } from 'react';
import { Calendar, Clock, Plus, Trash2, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { weeklyAvailabilityData, instructorExceptionsData } from '../data/dummyData';
import './Availability.css';

export default function Availability() {
  const [weekly, setWeekly] = useState(weeklyAvailabilityData);
  const [exceptions, setExceptions] = useState(instructorExceptionsData);
  const [newExcDate, setNewExcDate] = useState('');
  const [newExcReason, setNewExcReason] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggleDay = (dayName) => {
    setWeekly((prev) =>
      prev.map((d) => (d.day === dayName ? { ...d, enabled: !d.enabled } : d))
    );
  };

  const handleTimeChange = (dayName, field, value) => {
    setWeekly((prev) =>
      prev.map((d) => (d.day === dayName ? { ...d, [field]: value } : d))
    );
  };

  const handleAddException = (e) => {
    e.preventDefault();
    if (!newExcDate || !newExcReason) return;
    setExceptions([
      ...exceptions,
      { id: `exc-${Date.now()}`, date: newExcDate, reason: newExcReason },
    ]);
    setNewExcDate('');
    setNewExcReason('');
  };

  const handleRemoveException = (id) => {
    setExceptions((prev) => prev.filter((exc) => exc.id !== id));
  };

  const handleSaveAvailability = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="instructor-availability-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Trainer Availability & Working Hours</h1>
          <p>
            Configure your standard weekly training slots and manage one-off leave date exceptions.
          </p>
        </div>

        <button onClick={handleSaveAvailability} className="btn-save-availability">
          <Save size={15} />
          <span>Save Availability</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="avail-success-alert">
          <CheckCircle2 size={18} />
          <span>Availability timetable synced with school scheduling engine!</span>
        </div>
      )}

      {/* Sub-section A: Weekly Recurring Working Hours Grid */}
      <div className="admin-card-panel">
        <div className="panel-header">
          <div>
            <h3>Standard Weekly Training Window</h3>
            <p>School owners and learners can only book slots within enabled time windows</p>
          </div>
        </div>

        <div className="weekly-grid-stack">
          {weekly.map((item) => (
            <div 
              key={item.day} 
              className={`weekly-day-row ${item.enabled ? 'enabled' : 'disabled'}`}
            >
              <label className="day-checkbox-label">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={() => handleToggleDay(item.day)}
                />
                <strong className="day-name">{item.day}</strong>
              </label>

              {item.enabled ? (
                <div className="time-pickers-wrap tabular-nums">
                  <div className="time-input-group">
                    <span className="lbl">From:</span>
                    <input
                      type="time"
                      value={item.from}
                      onChange={(e) => handleTimeChange(item.day, 'from', e.target.value)}
                    />
                  </div>
                  <span className="time-sep">to</span>
                  <div className="time-input-group">
                    <span className="lbl">To:</span>
                    <input
                      type="time"
                      value={item.to}
                      onChange={(e) => handleTimeChange(item.day, 'to', e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <span className="day-off-label">Off Duty / Rest Day</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sub-section B: One-Off Date Exceptions */}
      <div className="admin-card-panel">
        <div className="panel-header">
          <div>
            <h3>One-Off Unavailable Dates (Leave & Holidays)</h3>
            <p>Block specific dates without modifying your recurring weekly timetable</p>
          </div>
        </div>

        {/* Add Exception Form */}
        <form onSubmit={handleAddException} className="add-exception-form">
          <div className="form-group date-col">
            <label>Specific Date</label>
            <input
              type="date"
              value={newExcDate}
              onChange={(e) => setNewExcDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group reason-col">
            <label>Reason / Note</label>
            <input
              type="text"
              placeholder="e.g. Personal Family Leave or Emergency"
              value={newExcReason}
              onChange={(e) => setNewExcReason(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-add-exc">
            <Plus size={15} />
            <span>Block Date</span>
          </button>
        </form>

        {/* Exceptions List */}
        <div className="exceptions-list-stack">
          {exceptions.length === 0 ? (
            <p className="no-exceptions-text">No active date exceptions configured.</p>
          ) : (
            exceptions.map((exc) => (
              <div key={exc.id} className="exception-item-row">
                <div className="exc-meta">
                  <strong className="tabular-nums">{exc.date}</strong>
                  <span>{exc.reason}</span>
                </div>
                <button
                  onClick={() => handleRemoveException(exc.id)}
                  className="btn-remove-exc"
                  title="Remove exception"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
