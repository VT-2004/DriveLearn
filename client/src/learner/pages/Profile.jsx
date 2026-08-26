import { useState } from 'react';
import { 
  User, Phone, Mail, MapPin, Globe, Save, 
  CheckCircle2, ShieldCheck, Bell, Download, Trash2, AlertTriangle, X 
} from 'lucide-react';
import { learnerProfileData } from '../data/dummyData';
import './Profile.css';

export default function Profile() {
  const [profile, setProfile] = useState(learnerProfileData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Notification Preferences State
  const [notifPrefs, setNotifPrefs] = useState({
    bookingReminders: true,
    promoOffers: false,
    paymentReceipts: true,
  });

  // Account Modals State
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `DriveLearn_UserData_${profile.name.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    alert('Personal data package generated and downloaded.');
  };

  return (
    <div className="learner-profile-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Learner Profile & Account Preferences</h1>
          <p>
            Manage your student identity details, notification preferences, and privacy controls.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="profile-form-container">
        {savedSuccess && (
          <div className="profile-success-alert">
            <CheckCircle2 size={18} />
            <span>Profile settings and notification preferences updated successfully!</span>
          </div>
        )}

        {/* Section 1: Personal Information */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Personal Identification (Parivahan LL Sync)</h3>
              <p>Used for official Maharashtra RTO Learner's License Form 2</p>
            </div>
            <User size={18} color="var(--color-primary, #B91C1C)" />
          </div>

          <div className="profile-fields-grid">
            <div className="form-group">
              <label>Full Name (as per Aadhaar / PAN)</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number (OTP Verified)</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={profile.dob}
                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Residential Address (Pune / Maharashtra)</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Section 2: Language Preference & Regional Settings */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Language Preference & Regional RTO</h3>
              <p>Tailor in-app theory modules and trainer communication to your preferred language</p>
            </div>
            <Globe size={18} color="var(--color-primary, #B91C1C)" />
          </div>

          <div className="profile-fields-grid">
            <div className="form-group">
              <label>Language Preference</label>
              <select
                value={profile.languagePreference}
                onChange={(e) => setProfile({ ...profile, languagePreference: e.target.value })}
              >
                <option value="English">English (Default Interface)</option>
                <option value="Marathi">मराठी (Marathi - Maharashtra Standard)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Assigned Regional RTO Zone</label>
              <input
                type="text"
                value={profile.rtoZone}
                disabled
                className="input-disabled"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Emergency Contact</label>
            <input
              type="text"
              value={profile.emergencyContact}
              onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Section 3: Notification Preferences (Gap Audit Item #3) */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Notification & Communication Preferences</h3>
              <p>Control what practical session updates you receive via SMS, WhatsApp, and Email</p>
            </div>
            <Bell size={18} color="var(--color-primary, #B91C1C)" />
          </div>

          <div className="notif-prefs-stack">
            <label className="pref-toggle-row">
              <div className="pref-meta">
                <strong>Practical Session Reminders & Batch Schedule</strong>
                <span>Receive WhatsApp and SMS alerts 2 hours before your on-track lesson starts.</span>
              </div>
              <input
                type="checkbox"
                checked={notifPrefs.bookingReminders}
                onChange={(e) => setNotifPrefs({ ...notifPrefs, bookingReminders: e.target.checked })}
              />
            </label>

            <label className="pref-toggle-row">
              <div className="pref-meta">
                <strong>Payment & Wallet Invoices</strong>
                <span>Receive instant email copies for course payments and wallet bonus credits.</span>
              </div>
              <input
                type="checkbox"
                checked={notifPrefs.paymentReceipts}
                onChange={(e) => setNotifPrefs({ ...notifPrefs, paymentReceipts: e.target.checked })}
              />
            </label>

            <label className="pref-toggle-row">
              <div className="pref-meta">
                <strong>Promotional Subsidies & Referral Bonuses</strong>
                <span>Get notified about new vehicle packages and student referral perks.</span>
              </div>
              <input
                type="checkbox"
                checked={notifPrefs.promoOffers}
                onChange={(e) => setNotifPrefs({ ...notifPrefs, promoOffers: e.target.checked })}
              />
            </label>
          </div>
        </div>

        {/* Section 4: Privacy & Account Data Management (Gap Audit Item #4) */}
        <div className="admin-card-panel privacy-card-panel">
          <div className="panel-header">
            <div>
              <h3>Privacy & Data Rights (DPDP Act Compliance)</h3>
              <p>Export your complete driving record or request permanent account erasure</p>
            </div>
          </div>

          <div className="privacy-actions-row">
            <button
              type="button"
              onClick={handleDownloadData}
              className="btn-privacy-download"
            >
              <Download size={14} />
              <span>Download My Personal Data (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="btn-privacy-delete"
            >
              <Trash2 size={14} />
              <span>Request Account Deletion</span>
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="profile-footer-row">
          <button type="submit" className="btn-save-profile">
            <Save size={16} />
            <span>Save Profile Settings</span>
          </button>
        </div>
      </form>

      {/* Account Deletion Confirmation Modal */}
      {showDeleteModal && (
        <div className="learner-modal-backdrop">
          <div className="learner-modal-dialog">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <AlertTriangle size={18} color="#dc2626" />
                <h3 style={{ color: '#dc2626' }}>Request Account Deletion</h3>
              </div>
              <button onClick={() => setShowDeleteModal(false)} className="btn-close-modal">
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '13px', color: '#1a1a1a', margin: 0, lineHeight: 1.5 }}>
                Are you sure you want to request permanent erasure of your DriveLearn account?
              </p>
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', color: '#991b1b' }}>
                <strong>Important Notice:</strong> If you delete your account, your remaining practical lesson bookings, trainer feedback history, and in-app wallet balance will be permanently erased.
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" onClick={() => setShowDeleteModal(false)} className="btn-cancel-modal">
                Keep My Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  alert('Your account deletion request has been submitted to DriveLearn support for 30-day compliance processing.');
                }}
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Confirm Deletion Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
