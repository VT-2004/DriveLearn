import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Mail } from 'lucide-react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <div className="container privacy-container">
        {/* Header */}
        <div className="privacy-header-block">
          <span className="privacy-badge">Data Protection</span>
          <h1>Privacy Policy & Learner Data Protection</h1>
          <p>Last Updated: August 2026 • DriveLearn India</p>
        </div>

        <div className="privacy-card">
          <div className="privacy-section">
            <div className="privacy-section-header">
              <Lock size={18} color="var(--color-primary, #B91C1C)" />
              <h2>1. Information We Collect</h2>
            </div>
            <p>
              When registering as a learner or reserving a course, we collect necessary identification data including your full name, mobile number, email address, and residential city in Maharashtra.
            </p>
          </div>

          <div className="privacy-section">
            <div className="privacy-section-header">
              <Shield size={18} color="var(--color-primary, #B91C1C)" />
              <h2>2. How Your Data is Used</h2>
            </div>
            <p>
              Your contact details are shared strictly with your selected RTO-verified partner driving school for batch scheduling, pickup point coordination, and Learner License (LL) Form 2 paperwork guidance. <strong>We do not sell personal data to third-party telemarketers.</strong>
            </p>
          </div>

          <div className="privacy-section">
            <div className="privacy-section-header">
              <Eye size={18} color="var(--color-primary, #B91C1C)" />
              <h2>3. Data Deletion & Grievance Officer</h2>
            </div>
            <p>
              You have the right to request deletion of your account and wallet records at any time. For privacy inquiries or data removal, contact our data grievance officer at <strong>privacy@drivelearnindia.in</strong>.
            </p>
          </div>
        </div>

        <div className="privacy-footer-nav">
          <Link to="/" className="btn-privacy-back">&larr; Return to Home</Link>
        </div>
      </div>
    </div>
  );
}
