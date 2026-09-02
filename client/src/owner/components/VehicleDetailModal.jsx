import { X, Car, Bike, ShieldCheck, Wrench, Calendar, Fuel, Gauge, AlertTriangle, Printer, CheckCircle2 } from 'lucide-react';
import StatusPill from '../../admin/components/StatusPill';
import VehicleExpiryBadge from './VehicleExpiryBadge';
import './VehicleDetailModal.css';

export default function VehicleDetailModal({ vehicle, onClose }) {
  if (!vehicle) return null;

  const isBike = vehicle.type.includes('2-Wheeler');

  return (
    <div className="learner-modal-backdrop" onClick={onClose}>
      <div className="vehicle-dossier-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="v-dossier-header">
          <div className="v-dossier-title-wrap">
            <div className="v-dossier-icon-box">
              {isBike ? <Bike size={22} color="var(--color-primary, #B91C1C)" /> : <Car size={22} color="#15803D" />}
            </div>
            <div>
              <div className="v-num-row">
                <h2>{vehicle.vehicleNo}</h2>
                <span className={`fleet-status-pill ${vehicle.operationalStatus}`}>
                  {vehicle.operationalStatus === 'in-service' ? 'In Service' : 'Under Maintenance'}
                </span>
              </div>
              <span className="v-model-sub">{vehicle.model} • {vehicle.type}</span>
            </div>
          </div>

          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        {/* Scroll Body */}
        <div className="v-dossier-scroll-body">
          {/* Quick Metrics Strip */}
          <div className="v-quick-strip">
            <div className="strip-cell">
              <span className="s-lbl">Assigned Trainer</span>
              <strong className="s-val">{vehicle.assignedInstructor}</strong>
            </div>
            <div className="strip-cell">
              <span className="s-lbl">Current Odometer</span>
              <strong className="s-val tabular-nums">42,148 km</strong>
            </div>
            <div className="strip-cell">
              <span className="s-lbl">Fuel Efficiency</span>
              <strong className="s-val tabular-nums">45.2 km/L (Avg)</strong>
            </div>
            <div className="strip-cell">
              <span className="s-lbl">Registration Authority</span>
              <strong className="s-val">Pune RTO (MH-12)</strong>
            </div>
          </div>

          {/* Section 1: Registration Certificate (RC) & Technical Specs */}
          <div className="v-section-card">
            <div className="card-header-row">
              <Car size={16} color="var(--color-primary, #B91C1C)" />
              <h4>Government RC & Technical Specifications</h4>
            </div>

            <div className="v-grid-two">
              <div className="v-data-cell">
                <span className="d-lbl">Chassis Number</span>
                <strong className="d-val tabular-nums">ME4JF504LM-881029</strong>
              </div>
              <div className="v-data-cell">
                <span className="d-lbl">Engine Number</span>
                <strong className="d-val tabular-nums">JF50E-99410294</strong>
              </div>
              <div className="v-data-cell">
                <span className="d-lbl">Fuel & Emission Norm</span>
                <strong className="d-val">Petrol • BS-VI Certified</strong>
              </div>
              <div className="v-data-cell">
                <span className="d-lbl">First Registration Date</span>
                <strong className="d-val tabular-nums">15 Nov 2021</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Dual-Control & Statutory Compliance */}
          <div className="v-section-card">
            <div className="card-header-row">
              <ShieldCheck size={16} color="#15803D" />
              <h4>RTO Dual-Control & Fitness Validity</h4>
            </div>

            <div className="v-compliance-stack">
              <div className="comp-row">
                <div className="comp-left">
                  <CheckCircle2 size={16} color="#15803D" />
                  <div>
                    <strong>Dual-Control Auxiliary Brake Lever Certified</strong>
                    <p>RTO authorized mechanic inspection completed 10 Aug 2026. Certified safe for learner training.</p>
                  </div>
                </div>
                <span className="badge-valid">CERTIFIED</span>
              </div>

              <div className="comp-row">
                <div className="comp-left">
                  <Calendar size={16} color="#3b82f6" />
                  <div>
                    <strong>Commercial Insurance Policy (Bajaj Allianz)</strong>
                    <p>Policy #BA-MOT-991402 • Comprehensive Third-Party & Learner Rider Cover.</p>
                  </div>
                </div>
                <VehicleExpiryBadge expiryDate={vehicle.insuranceExpiry} label="Insurance" />
              </div>

              <div className="comp-row">
                <div className="comp-left">
                  <Wrench size={16} color="#eab308" />
                  <div>
                    <strong>RTO Annual Fitness Certificate</strong>
                    <p>Inspected at Alandi Road RTO Ground under Rule 62 Central Motor Vehicles Rules.</p>
                  </div>
                </div>
                <VehicleExpiryBadge expiryDate={vehicle.fitnessExpiry} label="Fitness" />
              </div>
            </div>
          </div>

          {/* Section 3: Fleet Maintenance History */}
          <div className="v-section-card">
            <div className="card-header-row">
              <Wrench size={16} color="#b45309" />
              <h4>Maintenance & Service Ledger</h4>
            </div>

            <div className="v-maintenance-box">
              <div className="m-history-row">
                <div className="m-date-col">
                  <strong>04 Aug 2026</strong>
                  <span>Sai Service Pune</span>
                </div>
                <div className="m-desc-col">
                  <strong>Periodic 40,000 km Major Overhaul</strong>
                  <p>Engine oil replaced, front & rear brake shoes renewed, clutch wire lubricated, tyre pressure calibrated (32 PSI).</p>
                </div>
                <span className="m-cost tabular-nums">₹2,850</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="v-dossier-footer">
          <div className="footer-left-notes">
            <span className="notes-txt">Authorized for official Motor Driving Training School operation under CMVR Form 5A.</span>
          </div>

          <div className="footer-btns">
            <button type="button" onClick={() => window.print()} className="btn-v-print">
              <Printer size={14} />
              <span>Print RC Dossier</span>
            </button>
            <button type="button" onClick={onClose} className="btn-cancel-modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
