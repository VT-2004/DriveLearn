import { useState } from 'react';
import { 
  Building2, ShieldCheck, CreditCard, Bell, Save, 
  CheckCircle2, Lock, MapPin, Phone, Mail, FileText 
} from 'lucide-react';
import { schoolProfileData } from '../data/dummyData';
import './Settings.css';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: schoolProfileData.name,
    tagline: schoolProfileData.tagline,
    ownerName: schoolProfileData.ownerName,
    phone: schoolProfileData.phone,
    email: schoolProfileData.email,
    address: schoolProfileData.address,
    rtoApprovalNo: schoolProfileData.rtoApprovalNo,
    bankHolder: schoolProfileData.bankAccount.holderName,
    bankAccountNo: schoolProfileData.bankAccount.accountNo,
    bankIfsc: schoolProfileData.bankAccount.ifsc,
    bankBranch: schoolProfileData.bankAccount.branch,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="owner-settings-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Driving School Business Profile & Settings</h1>
          <p>
            Manage public directory business information, payout bank accounts, and view RTO verification status.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="settings-form-container">
        {savedSuccess && (
          <div className="settings-success-alert">
            <CheckCircle2 size={18} />
            <span>School business profile and bank account details saved successfully!</span>
          </div>
        )}

        {/* Sub-section B: Read-Only RTO Verification Badge (Cross-Portal Rule #5) */}
        <div className="settings-form-card rto-verification-card">
          <div className="settings-card-header">
            <ShieldCheck size={20} color="var(--admin-success-text, #15803D)" />
            <div>
              <h3>Government RTO Verification Status (Read-Only)</h3>
              <p>Official compliance clearance verified by Super Admin</p>
            </div>
          </div>

          <div className="verification-status-display">
            <div className="verif-status-badge">
              <span className="verif-dot"></span>
              <strong>RTO License Verified & Active</strong>
            </div>
            <p className="verif-sub-meta">
              Verified by Super Admin on <strong>{schoolProfileData.verifiedDate}</strong> for <strong>{schoolProfileData.rtoZone}</strong> under approval reference <strong>{schoolProfileData.rtoApprovalNo}</strong>.
            </p>
            <span className="read-only-note">
              <Lock size={12} />
              <span>Managed by DriveLearn Super Admin audit queue (Non-editable)</span>
            </span>
          </div>
        </div>

        {/* Sub-section A: Business Profile */}
        <div className="settings-form-card">
          <div className="settings-card-header">
            <Building2 size={18} color="var(--color-primary, #B91C1C)" />
            <div>
              <h3>Public Driving School Information</h3>
              <p>Displayed on student directory searches across Pune & Maharashtra</p>
            </div>
          </div>

          <div className="settings-fields-grid">
            <div className="form-group">
              <label>School Trade Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Owner / Principal Name</label>
              <input
                type="text"
                value={profile.ownerName}
                onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Official Helpline Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Business Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Promotional Tagline (Appears on Search Cards)</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Training Center Address & Track Ground</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Sub-section C: Payout Bank Account */}
        <div className="settings-form-card">
          <div className="settings-card-header">
            <CreditCard size={18} color="var(--color-primary, #B91C1C)" />
            <div>
              <h3>Settlement Bank Account (IMPS / Direct Deposit)</h3>
              <p>Automated disbursement account for net course enrollment payouts</p>
            </div>
          </div>

          <div className="settings-fields-grid">
            <div className="form-group">
              <label>Account Holder Name (LLP / Entity)</label>
              <input
                type="text"
                value={profile.bankHolder}
                onChange={(e) => setProfile({ ...profile, bankHolder: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Bank Account Number</label>
              <input
                type="text"
                value={profile.bankAccountNo}
                onChange={(e) => setProfile({ ...profile, bankAccountNo: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>IFSC Code</label>
              <input
                type="text"
                value={profile.bankIfsc}
                onChange={(e) => setProfile({ ...profile, bankIfsc: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Branch Name & City</label>
              <input
                type="text"
                value={profile.bankBranch}
                onChange={(e) => setProfile({ ...profile, bankBranch: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Sub-section D: Notification Preferences */}
        <div className="settings-form-card">
          <div className="settings-card-header">
            <Bell size={18} color="var(--color-primary, #B91C1C)" />
            <div>
              <h3>Operational Alerts & Reminders</h3>
              <p>Receive live dispatch notifications when students book practical slots</p>
            </div>
          </div>

          <div className="settings-checkbox-group">
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span>SMS & WhatsApp alert whenever a student books a training slot</span>
            </label>
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span>30-day early warning email for training vehicle insurance & fitness expiry</span>
            </label>
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span>Instant email notification for weekly net IMPS payout bank credit</span>
            </label>
          </div>
        </div>

        {/* Submit Footer */}
        <div className="settings-form-footer">
          <button type="submit" className="btn-save-settings">
            <Save size={16} />
            <span>Save School Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
