import { useState } from 'react';
import { Award, ShieldCheck, Sparkles, CheckCircle2, Star, MessageSquare } from 'lucide-react';
import CertificateCard from '../components/CertificateCard';
import LeaveReviewModal from '../components/LeaveReviewModal';
import { learnerProfileData, learnerCourseSummary } from '../data/dummyData';
import './Certificates.css';

export default function Certificates() {
  const [demoUnlocked, setDemoUnlocked] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="learner-certificates-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Official Driving Certificates & Accreditation</h1>
          <p>
            Digitally signed certificates of driving competence issued jointly by approved driving schools and the DriveLearn network.
          </p>
        </div>

        {/* Demo Toggle & Review Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowReviewModal(true)}
            className="btn-open-review-modal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#fffbeb',
              color: '#b45309',
              border: '1px solid #fde68a',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>Leave a Review for School</span>
          </button>

          <div className="cert-preview-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={demoUnlocked}
                onChange={(e) => setDemoUnlocked(e.target.checked)}
              />
              <span>Preview Completed State</span>
            </label>
          </div>
        </div>
      </div>

      {/* 2. Certificate Card */}
      <div className="certificate-display-area">
        <CertificateCard
          courseName={learnerCourseSummary.courseName}
          schoolName={learnerCourseSummary.schoolName}
          learnerName={learnerProfileData.name}
          completionDate="28 Aug 2026"
          certificateNo="DL-MH-2026-88421-MCWG"
          isUnlocked={demoUnlocked}
          progress={learnerCourseSummary.progressPercent}
        />
      </div>

      {/* 3. Regulatory Verification Note */}
      <div className="cert-regulatory-card">
        <div className="regulatory-header">
          <ShieldCheck size={20} color="var(--admin-success-text, #15803D)" />
          <strong>RTO Compliance & Verification Standards</strong>
        </div>
        <p>
          Every certificate issued on DriveLearn carries a tamper-proof cryptographic QR code. Maharashtra RTO motor vehicle inspectors (MVIs) can scan the QR code to verify training hours logged on dual-control vehicles and track grounds.
        </p>
      </div>

      {/* 4. Leave Review Modal */}
      {showReviewModal && (
        <LeaveReviewModal
          schoolName={learnerCourseSummary.schoolName}
          instructor={learnerCourseSummary.instructor}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
}
