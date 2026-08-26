import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, Lock, KeyRound, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter email/phone, 2: OTP, 3: New Password, 4: Success
  const [contact, setContact] = useState('pooja.kulkarni@gmail.com');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setError(null);
    if (!contact.trim()) {
      setError('Please enter your registered mobile number or email.');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setError(null);
    if (otp.length < 4) {
      setError('Please enter the 4-digit verification code sent to your mobile.');
      return;
    }
    setStep(3);
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setStep(4);
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-wrap">
              <KeyRound size={26} color="#ffffff" />
            </div>
            <h2>Password Recovery</h2>
            <p>
              {step === 1 && 'Enter your registered email or mobile to reset your password.'}
              {step === 2 && `Enter the 4-digit OTP sent to ${contact}.`}
              {step === 3 && 'Create a new secure password for your DriveLearn account.'}
              {step === 4 && 'Your password has been reset successfully!'}
            </p>
          </div>

          {error && (
            <div className="auth-error-box">
              <AlertCircle size={16} flexShrink={0} />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Enter Contact */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="auth-form">
              <div className="form-group">
                <label>Registered Mobile Number or Email</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="text"
                    placeholder="e.g. pooja.kulkarni@gmail.com or +91 98230..."
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-auth-submit">
                <span>Send Verification Code</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="auth-form">
              <div className="form-group">
                <label>4-Digit Verification Code (OTP)</label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 8421"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="otp-input-field"
                  required
                />
              </div>

              <div className="otp-resend-row">
                <span>Didn't receive code?</span>
                <button type="button" onClick={() => alert('New OTP sent to your phone!')} className="btn-resend-otp">
                  Resend Code
                </button>
              </div>

              <button type="submit" className="btn-auth-submit">
                <span>Verify Code</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 3: Set New Password */}
          {step === 3 && (
            <form onSubmit={handleStep3Submit} className="auth-form">
              <div className="form-group">
                <label>New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-auth-submit">
                <span>Set New Password</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && (
            <div className="pwd-success-box">
              <div className="pwd-success-icon">
                <CheckCircle2 size={48} color="#15803D" />
              </div>
              <h3>Password Reset Complete</h3>
              <p>You can now sign in with your updated credentials.</p>
              <Link to="/login" className="btn-auth-submit" style={{ textAlign: 'center', textDecoration: 'none', justifyContent: 'center' }}>
                <span>Back to Sign In</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

          <div className="auth-footer">
            <Link to="/login" className="back-login-link">
              <ArrowLeft size={14} />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
