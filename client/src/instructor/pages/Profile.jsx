import { useState } from 'react';
import { Award, User, Phone, Mail, FileText, Save, CheckCircle2, ShieldCheck, Bike } from 'lucide-react';
import { instructorProfileData } from '../data/dummyData';
import './Profile.css';

export default function Profile() {
  const [profile, setProfile] = useState(instructorProfileData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="instructor-profile-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Instructor Certification & Profile</h1>
          <p>
            Manage your certified trainer credentials, RTO instructor license, and training specialization.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="profile-form-container">
        {savedSuccess && (
          <div className="profile-success-alert">
            <CheckCircle2 size={18} />
            <span>Trainer certification and profile updated successfully!</span>
          </div>
        )}

        {/* Certification Status Card */}
        <div className="trainer-cert-badge-card">
          <div className="cert-left">
            <div className="cert-shield-icon">
              <ShieldCheck size={22} color="#ffffff" />
            </div>
            <div>
              <span className="cert-authority">Government Approved Driving Trainer</span>
              <strong className="cert-license tabular-nums">License: {profile.licenseNo}</strong>
            </div>
          </div>

          <div className="cert-status-pill">
            <span className="verif-dot"></span>
            <span>RTO Certified ({profile.experience} Years Active)</span>
          </div>
        </div>

        {/* Personal Details Card */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Trainer Identity & Contact</h3>
              <p>Primary contact information shared with assigned learners</p>
            </div>
            <User size={18} color="var(--color-primary, #B91C1C)" />
          </div>

          <div className="profile-fields-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number (For Student Calls & OTP)</label>
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
              <label>Years of Practical Experience</label>
              <input
                type="number"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Training Specialization & Curriculum Strengths</label>
            <input
              type="text"
              value={profile.specialization}
              onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Assigned School & Vehicle */}
        <div className="admin-card-panel">
          <div className="panel-header">
            <div>
              <h3>Driving School Association & Vehicle</h3>
              <p>Current active training grounds and dual-control vehicle</p>
            </div>
            <Bike size={18} color="var(--color-primary, #B91C1C)" />
          </div>

          <div className="profile-fields-grid">
            <div className="form-group">
              <label>Affiliated Driving School</label>
              <input
                type="text"
                value={profile.assignedSchool}
                disabled
                className="input-disabled"
              />
            </div>

            <div className="form-group">
              <label>Active Training Vehicle</label>
              <input
                type="text"
                value={profile.activeVehicle}
                disabled
                className="input-disabled"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="profile-footer-row">
          <button type="submit" className="btn-save-profile">
            <Save size={16} />
            <span>Save Trainer Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
