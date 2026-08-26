import { useState, useEffect } from 'react';
import { 
  Save, CheckCircle2, Sliders, Shield, Mail, 
  Percent, Moon, Sun, Sparkles, Calendar, 
  MapPin, FileText, AlertCircle 
} from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || localStorage.getItem('admin_theme') || 'light'
  );

  const [settings, setSettings] = useState({
    // Platform general
    platformName: 'DriveLearn India',
    supportEmail: 'support@drivelearnindia.in',
    commissionPercent: 10,
    gstPercent: 18,

    // Launch Offer Configuration (v3 NEW)
    launchFee2Wheeler: 999,
    launchFeeStart: '2026-07-01',
    launchFeeEnd: '2026-08-31',
    signupWalletBonus: 15,
    walletTermsSummary: 'One-time credit per verified user, wallet-only, no cash withdrawal.',

    // Active Launch Region (v3 NEW)
    activeLaunchRegion: 'Maharashtra',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('admin_theme', theme);
  }, [theme]);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSavedSuccess(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved Global Platform & Launch Settings:', settings, 'Theme:', theme);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="admin-settings-page">
      {/* 1. Page Header */}
      <div className="admin-view-header">
        <div>
          <h1>Platform Governance & System Settings</h1>
          <p>Configure subsidized fee parameters, wallet bonuses, active state operations, and portal theme.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="settings-form-container">
        {savedSuccess && (
          <div className="settings-success-alert">
            <CheckCircle2 size={18} />
            <span>Platform & launch configurations saved successfully!</span>
          </div>
        )}

        {/* Sub-section B: NEW — Launch Offer Configuration */}
        <div className="settings-form-card">
          <div className="settings-card-header">
            <Sparkles size={18} color="var(--admin-accent, #B91C1C)" />
            <div>
              <h3>Maharashtra Launch Offer Configuration</h3>
              <p>Control subsidized 2-wheeler pricing rules, wallet bonus amounts, and campaign dates</p>
            </div>
          </div>

          <div className="settings-fields-grid">
            <div className="form-group">
              <label>Subsidized 2-Wheeler Fee (₹)</label>
              <div className="input-field-wrap">
                <input
                  type="number"
                  min="500"
                  max="5000"
                  value={settings.launchFee2Wheeler}
                  onChange={(e) => handleChange('launchFee2Wheeler', Number(e.target.value))}
                  required
                />
              </div>
              <span className="field-hint">Heavily subsidized flat fee for first 2 months</span>
            </div>

            <div className="form-group">
              <label>Signup Wallet Bonus Amount (₹)</label>
              <div className="input-field-wrap">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.signupWalletBonus}
                  onChange={(e) => handleChange('signupWalletBonus', Number(e.target.value))}
                  required
                />
              </div>
              <span className="field-hint">Auto-deposited into learner in-app wallet on signup</span>
            </div>

            <div className="form-group">
              <label>Launch Window Start Date</label>
              <div className="input-field-wrap">
                <input
                  type="date"
                  value={settings.launchFeeStart}
                  onChange={(e) => handleChange('launchFeeStart', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Launch Window End Date</label>
              <div className="input-field-wrap">
                <input
                  type="date"
                  value={settings.launchFeeEnd}
                  onChange={(e) => handleChange('launchFeeEnd', e.target.value)}
                  required
                />
              </div>
              <span className="field-hint">After this date, standard ₹1,500 course pricing resumes</span>
            </div>
          </div>

          <div className="form-group full-width-field">
            <label>Wallet Bonus Terms Summary</label>
            <div className="input-field-wrap">
              <input
                type="text"
                value={settings.walletTermsSummary}
                onChange={(e) => handleChange('walletTermsSummary', e.target.value)}
                required
              />
            </div>
            <span className="field-hint">Displayed across public terms and wallet tooltips</span>
          </div>
        </div>

        {/* Sub-section C: NEW — Active Launch Region */}
        <div className="settings-form-card">
          <div className="settings-card-header">
            <MapPin size={18} color="var(--admin-accent, #B91C1C)" />
            <div>
              <h3>Active Geographic Launch Scope</h3>
              <p>Primary live region for public search and partner school admissions</p>
            </div>
          </div>

          <div className="settings-fields-grid">
            <div className="form-group">
              <label>Live Region State</label>
              <select
                value={settings.activeLaunchRegion}
                onChange={(e) => handleChange('activeLaunchRegion', e.target.value)}
                className="settings-select-input"
              >
                <option value="Maharashtra">Maharashtra (Live Launch — 5 Hubs Active)</option>
                <option value="Karnataka" disabled>Karnataka (Coming Soon — Phase 2)</option>
                <option value="Gujarat" disabled>Gujarat (Coming Soon — Phase 2)</option>
              </select>
              <span className="field-hint">Single-state focus protects operational quality</span>
            </div>
          </div>
        </div>

        {/* Sub-section A: General Financial & Platform Parameters */}
        <div className="settings-form-card">
          <div className="settings-card-header">
            <Sliders size={18} color="var(--admin-accent, #B91C1C)" />
            <div>
              <h3>General Platform & Tax Rules</h3>
              <p>Commission splits, official correspondence contacts, and GST parameters</p>
            </div>
          </div>

          <div className="settings-fields-grid">
            <div className="form-group">
              <label>Platform Brand Name</label>
              <div className="input-field-wrap">
                <input
                  type="text"
                  value={settings.platformName}
                  onChange={(e) => handleChange('platformName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Official Support Email</label>
              <div className="input-field-wrap">
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleChange('supportEmail', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Default Platform Commission (%)</label>
              <div className="input-field-wrap">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.commissionPercent}
                  onChange={(e) => handleChange('commissionPercent', Number(e.target.value))}
                  required
                />
              </div>
              <span className="field-hint">Auto-deducted from driving school course enrollments</span>
            </div>

            <div className="form-group">
              <label>Standard GST Rate (%)</label>
              <div className="input-field-wrap">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.gstPercent}
                  onChange={(e) => handleChange('gstPercent', Number(e.target.value))}
                  required
                />
              </div>
              <span className="field-hint">Applied across SaaS subscriptions and tax invoices</span>
            </div>
          </div>
        </div>

        {/* Sub-section D: Theme & Appearance Section */}
        <div className="settings-form-card">
          <div className="settings-card-header">
            <Moon size={18} color="var(--admin-accent, #B91C1C)" />
            <div>
              <h3>Portal Theme & Appearance</h3>
              <p>Choose high-contrast dark palette or crisp clean light theme</p>
            </div>
          </div>

          <div className="theme-toggle-options">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`btn-theme-choice ${theme === 'light' ? 'active' : ''}`}
            >
              <Sun size={18} />
              <div className="theme-btn-text">
                <strong>Light Mode</strong>
                <span>Clean crisp white canvas</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`btn-theme-choice ${theme === 'dark' ? 'active' : ''}`}
            >
              <Moon size={18} />
              <div className="theme-btn-text">
                <strong>Dark Mode</strong>
                <span>High-contrast dark palette</span>
              </div>
            </button>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="settings-form-footer">
          <button type="submit" className="btn-save-settings">
            <Save size={16} />
            <span>Save All Configurations</span>
          </button>
        </div>
      </form>
    </div>
  );
}
