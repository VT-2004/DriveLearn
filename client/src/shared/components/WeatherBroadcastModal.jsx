import { useState } from 'react';
import { X, CloudRain, AlertTriangle, CheckCircle2, ShieldAlert, Send, Trash2 } from 'lucide-react';
import { getWeatherAlert, setWeatherAlert } from '../data/weatherAlertState';
import './WeatherBroadcastModal.css';

export default function WeatherBroadcastModal({ onClose, publisherRole = 'Instructor' }) {
  const currentAlert = getWeatherAlert();
  const [isActive, setIsActive] = useState(currentAlert.isActive);
  const [severity, setSeverity] = useState(currentAlert.severity || 'WARNING');
  const [delayMinutes, setDelayMinutes] = useState(currentAlert.delayMinutes || 45);
  const [affectedArea, setAffectedArea] = useState(currentAlert.affectedArea || 'Warje 8-Track Ground & Karve Road');
  const [message, setMessage] = useState(currentAlert.message);

  const handleBroadcast = (e) => {
    e.preventDefault();
    const updated = {
      isActive: true,
      severity,
      title: `Monsoon Track Alert: ${affectedArea} Rain & Waterlogging`,
      message,
      delayMinutes,
      affectedArea,
      alternativeGround: 'Deccan Indoor Simulator Track',
      issuedBy: publisherRole === 'Owner' 
        ? 'Rajesh Kadam (School Owner & Academy Dispatch)' 
        : 'Sunita Deshmukh (Certified Instructor on Track Ground)',
      issuedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    };
    setWeatherAlert(updated);
    setIsActive(true);
    alert('Monsoon weather delay successfully broadcast! Active learners will now see the high-priority weather banner with 1-click slot adjustments.');
    onClose();
  };

  const handleClearAlert = () => {
    const cleared = {
      ...currentAlert,
      isActive: false,
    };
    setWeatherAlert(cleared);
    setIsActive(false);
    alert('Weather alert cleared! Tracks marked clear & dry. The banner has been removed from all student dashboards.');
    onClose();
  };

  return (
    <div className="learner-modal-backdrop" onClick={onClose}>
      <div className="weather-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="weather-modal-header">
          <div className="weather-title-row">
            <CloudRain size={20} color="#b45309" />
            <div>
              <h3>Monsoon Weather & Track Flooding Broadcast</h3>
              <span className="w-sub">Publish by: <strong>{publisherRole}</strong> • Pune Metro & Highway Hub</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleBroadcast} className="weather-modal-form">
          <div className="current-status-box">
            <span className="c-lbl">Current Live Alert Status:</span>
            <span className={`c-val-pill ${isActive ? 'active' : 'inactive'}`}>
              {isActive ? 'LIVE BROADCAST ACTIVE (Learners can see banner)' : 'NORMAL / DRY WEATHER (Banner hidden)'}
            </span>
          </div>

          <div className="form-group">
            <label>Weather Severity & Advisory Level</label>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option value="WARNING">WARNING: Heavy Rain / Track Waterlogging (+Delay)</option>
              <option value="CRITICAL">CRITICAL: Severe Inundation / Shift to Simulator</option>
            </select>
          </div>

          <div className="form-group">
            <label>Affected Ground / Transit Landmark</label>
            <select value={affectedArea} onChange={(e) => setAffectedArea(e.target.value)}>
              <option value="Warje 8-Track Ground & Karve Road">Warje 8-Track Ground & Karve Road Underpass</option>
              <option value="Alandi Road RTO Ground">Alandi Road RTO Testing Ground</option>
              <option value="Garware College Metro & Deccan">Garware College Metro & Deccan Terminal</option>
            </select>
          </div>

          <div className="form-group">
            <label>Granted Delay Duration</label>
            <select value={delayMinutes} onChange={(e) => setDelayMinutes(Number(e.target.value))}>
              <option value={30}>+30 Minutes Delay (Minor drizzle / traffic crawl)</option>
              <option value={45}>+45 Minutes Delay (Waterlogged track / curb overflow)</option>
              <option value={60}>+60 Minutes Delay (Heavy monsoon storm)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Student Announcement Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="weather-textarea"
              required
            />
          </div>

          <div className="weather-modal-footer">
            {isActive && (
              <button
                type="button"
                onClick={handleClearAlert}
                className="btn-clear-alert"
              >
                <Trash2 size={14} />
                <span>Clear Alert (Tracks Clear & Dry)</span>
              </button>
            )}

            <button type="button" onClick={onClose} className="btn-cancel-modal">
              Cancel
            </button>

            <button type="submit" className="btn-broadcast-alert">
              <Send size={14} />
              <span>{isActive ? 'Update Broadcast' : 'Broadcast Delay to Students'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
