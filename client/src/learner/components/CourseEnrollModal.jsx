import { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, MapPin, ShieldCheck, Wallet, User, Bike, Car } from 'lucide-react';
import { VERIFIED_PICKUP_LANDMARKS } from '../../shared/data/pickupLandmarks';
import './CourseEnrollModal.css';

export default function CourseEnrollModal({ course, onClose, onEnrollSuccess }) {
  if (!course) return null;

  const [batchTiming, setBatchTiming] = useState(course.batchTimings[0] || 'Morning 8:30 AM');
  const [pickupPoint, setPickupPoint] = useState(course.pickupLandmark || 'Garware College Metro Gate 2 (Pillar 42)');
  const [applyWallet, setApplyWallet] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const discount = applyWallet ? (course.walletBonusAvailable || 15) : 0;
  const finalPrice = Math.max(0, course.price - discount);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const enrollmentRecord = {
        enrollmentId: `ENR-${Math.floor(1000 + Math.random() * 9000)}`,
        courseTitle: course.title,
        schoolName: course.schoolName,
        locality: course.locality,
        batchTiming,
        pickupPoint,
        amount: finalPrice,
        enrolledAt: new Date().toLocaleDateString('en-GB'),
        status: 'confirmed',
      };
      onEnrollSuccess(enrollmentRecord);
    }, 400);
  };

  return (
    <div className="learner-modal-backdrop" onClick={onClose}>
      <div className="course-enroll-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="course-enroll-header">
          <div>
            <span className="enroll-cat-pill">{course.category}</span>
            <h3>Enroll in {course.title}</h3>
            <span className="enroll-school-sub">
              {course.schoolName} • RTO Lic: <strong>{course.rtoApprovalNo}</strong>
            </span>
          </div>
          <button onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        {/* Scroll Body */}
        <form onSubmit={handleSubmit} className="course-enroll-form">
          {/* Trainee Profile Dossier Strip */}
          <div className="trainee-dossier-box">
            <div className="td-cell">
              <span className="td-lbl">Trainee Candidate</span>
              <strong>Pooja Kulkarni</strong>
              <span className="td-sub">+91 98230 11223</span>
            </div>
            <div className="td-cell">
              <span className="td-lbl">Parivahan Sarathi LL</span>
              <strong className="text-success">MH-12/LL/2026/088192</strong>
              <span className="td-sub">Form 2 Verified (Valid)</span>
            </div>
            <div className="td-cell">
              <span className="td-lbl">Assigned Trainer</span>
              <strong>{course.instructor}</strong>
              <span className="td-sub">{course.hasFemaleInstructor ? 'Female Specialist' : 'RTO Examiner'}</span>
            </div>
          </div>

          {/* Batch Timing Selection */}
          <div className="form-group">
            <label>
              <Clock size={13} style={{ display: 'inline', marginRight: '4px', color: 'var(--color-primary, #B91C1C)' }} />
              <span>Select Your Preferred Batch Timing</span>
            </label>
            <select value={batchTiming} onChange={(e) => setBatchTiming(e.target.value)} className="enroll-select">
              {course.batchTimings.map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Designated Landmark Selection */}
          <div className="form-group">
            <label>
              <MapPin size={13} style={{ display: 'inline', marginRight: '4px', color: '#15803D' }} />
              <span>Designated Transit Pickup Landmark</span>
            </label>
            <select value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)} className="enroll-select">
              {VERIFIED_PICKUP_LANDMARKS.map((lm) => (
                <option key={lm.id} value={`${lm.name} (${lm.metroPillar})`}>
                  {lm.name} • {lm.metroPillar}
                </option>
              ))}
            </select>
          </div>

          {/* Payment & In-App Wallet Calculation */}
          <div className="fee-breakdown-card">
            <div className="fee-row">
              <span>Standard Course Package Fee:</span>
              <strong className="tabular-nums">₹{course.price}</strong>
            </div>

            <div className="fee-row wallet-row">
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={applyWallet}
                  onChange={(e) => setApplyWallet(e.target.checked)}
                  style={{ accentColor: '#15803D' }}
                />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#166534' }}>
                  Apply In-App ₹15 Signup Bonus Balance
                </span>
              </label>
              <strong className="text-success tabular-nums">-₹{discount}</strong>
            </div>

            <div className="fee-total-row">
              <div>
                <strong>Net Payable at Academy Center:</strong>
                <span className="fee-pay-note">Zero Advance Required • Pay on Day 1</span>
              </div>
              <span className="net-price-val tabular-nums">₹{finalPrice}</span>
            </div>
          </div>

          <div className="enroll-guarantee-note">
            <ShieldCheck size={14} color="#15803D" />
            <span>Official Parivahan Form 5 Certificate issued on completion under CMVR 1989 Rule 27.</span>
          </div>

          {/* Footer Buttons */}
          <div className="enroll-footer">
            <button type="button" onClick={onClose} className="btn-cancel-modal">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-confirm-enroll">
              <CheckCircle2 size={16} />
              <span>{submitting ? 'Confirming Enrollment...' : 'Confirm Enrollment & Reserve Batch'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
