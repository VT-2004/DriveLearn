import { useState } from 'react';
import { X, Fuel, Gauge, Receipt, Building2, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import './FuelOdometerModal.css';

export default function FuelOdometerModal({ onClose, onSave }) {
  const [vehicle, setVehicle] = useState('MH-12-CD-8812 (Honda Activa 6G)');
  const [startKm, setStartKm] = useState(42100);
  const [endKm, setEndKm] = useState(42148);
  const [fuelLitres, setFuelLitres] = useState('4.2');
  const [fuelCost, setFuelCost] = useState('450');
  const [pumpName, setPumpName] = useState('HP Petrol Pump, Karve Road, Kothrud');
  const [receiptNo, setReceiptNo] = useState('HP-KTH-88219');
  const [notes, setNotes] = useState('Standard morning tank top-up before batch starts. Tyre pressure checked: 32 PSI.');

  const distanceDriven = Math.max(0, Number(endKm) - Number(startKm));
  const mileageKmpl = Number(fuelLitres) > 0 ? (distanceDriven / Number(fuelLitres)).toFixed(1) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      id: `FUEL-${Date.now().toString().slice(-4)}`,
      date: 'Today, 22 Aug 2026',
      vehicle,
      instructor: 'Sunita Deshmukh',
      startKm: Number(startKm),
      endKm: Number(endKm),
      distanceKm: distanceDriven,
      fuelLitres: Number(fuelLitres),
      fuelCost: Number(fuelCost),
      mileageKmpl: Number(mileageKmpl),
      pumpName,
      receiptNo,
      status: 'Verified (Within Margin)',
      notes,
    };

    if (onSave) onSave(entry);
    alert(`Daily Fuel & Odometer Log for ${vehicle} submitted to School Owner ledger!`);
    onClose();
  };

  return (
    <div className="learner-modal-backdrop" onClick={onClose}>
      <div className="fuel-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="fuel-modal-header">
          <div className="fuel-header-title">
            <Fuel size={20} color="var(--color-primary, #B91C1C)" />
            <div>
              <h3>Daily Vehicle Fuel & Odometer Log</h3>
              <span className="fuel-sub">Sai Motor & 2-Wheeler Academy • Fleet Operational Audit</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="fuel-form-scroll">
          {/* Vehicle Selector */}
          <div className="fuel-form-group">
            <label>Assigned Training Vehicle</label>
            <select 
              value={vehicle} 
              onChange={(e) => setVehicle(e.target.value)}
              className="fuel-select"
            >
              <option value="MH-12-CD-8812 (Honda Activa 6G)">MH-12-CD-8812 (Honda Activa 6G - Dual Control)</option>
              <option value="MH-12-DE-4419 (Maruti Swift LXi)">MH-12-DE-4419 (Maruti Swift LXi - Dual Brake)</option>
              <option value="MH-12-AB-2291 (Hero Splendor Plus)">MH-12-AB-2291 (Hero Splendor Plus - Clutch Track)</option>
            </select>
          </div>

          {/* Odometer Two-Col */}
          <div className="fuel-two-col">
            <div className="fuel-form-group">
              <label>
                <Gauge size={13} />
                <span>Start of Day Odometer (km)</span>
              </label>
              <input
                type="number"
                value={startKm}
                onChange={(e) => setStartKm(e.target.value)}
                className="fuel-input tabular-nums"
                required
              />
            </div>

            <div className="fuel-form-group">
              <label>
                <Gauge size={13} />
                <span>End of Day Odometer (km)</span>
              </label>
              <input
                type="number"
                value={endKm}
                onChange={(e) => setEndKm(e.target.value)}
                className="fuel-input tabular-nums"
                required
              />
            </div>
          </div>

          {/* Computed Distance Banner */}
          <div className="distance-computed-bar">
            <span>Distance Driven Today: <strong className="tabular-nums">{distanceDriven} km</strong></span>
            <span>Est. Efficiency: <strong className="tabular-nums">{mileageKmpl} km/L</strong></span>
          </div>

          {/* Fuel Litres & Cost */}
          <div className="fuel-two-col">
            <div className="fuel-form-group">
              <label>Fuel Quantity (Litres)</label>
              <input
                type="number"
                step="0.1"
                value={fuelLitres}
                onChange={(e) => setFuelLitres(e.target.value)}
                className="fuel-input tabular-nums"
                required
              />
            </div>

            <div className="fuel-form-group">
              <label>Total Amount Paid (₹)</label>
              <input
                type="number"
                value={fuelCost}
                onChange={(e) => setFuelCost(e.target.value)}
                className="fuel-input tabular-nums"
                required
              />
            </div>
          </div>

          {/* Petrol Pump & Receipt */}
          <div className="fuel-two-col">
            <div className="fuel-form-group">
              <label>Fuel Station & Landmark</label>
              <input
                type="text"
                value={pumpName}
                onChange={(e) => setPumpName(e.target.value)}
                className="fuel-input"
                required
              />
            </div>

            <div className="fuel-form-group">
              <label>
                <Receipt size={13} />
                <span>Bill / Receipt Number</span>
              </label>
              <input
                type="text"
                value={receiptNo}
                onChange={(e) => setReceiptNo(e.target.value)}
                className="fuel-input tabular-nums"
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="fuel-form-group">
            <label>Instructor Maintenance Observations</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="fuel-textarea"
              placeholder="e.g. Engine oil level normal, clutch cable adjusted..."
            />
          </div>

          {/* Footer */}
          <div className="fuel-modal-footer">
            <div className="footer-auth-seal">
              <ShieldCheck size={14} color="#15803D" />
              <span>Signed by Senior Instructor Sunita Deshmukh</span>
            </div>

            <div className="footer-btn-row">
              <button type="button" onClick={onClose} className="btn-cancel-modal">
                Cancel
              </button>
              <button type="submit" className="btn-submit-fuel">
                <CheckCircle2 size={16} />
                <span>Submit to Fleet Ledger</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
