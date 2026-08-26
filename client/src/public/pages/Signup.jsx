import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, MapPin, Wallet, ArrowRight, ShieldCheck, Bike, AlertCircle, Loader2, KeyRound, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './Signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState(1); // 1: Fill Form, 2: OTP Verification
  const [accountType, setAccountType] = useState('LEARNER');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Pune');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(45);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let interval = null;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setError(null);
    if (!phone || phone.length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }
    setStep(2);
    setResendTimer(45);
  };

  const handleVerifyOtpAndRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (otp.length < 4) {
      setError('Please enter the 4-digit verification code sent to your phone.');
      return;
    }

    setSubmitting(true);

    try {
      await register({
        name,
        email,
        phone,
        password,
        role: accountType,
        city,
        state: 'Maharashtra',
      });
      // Redirect based on role
      if (accountType === 'LEARNER') {
        navigate('/learner/dashboard');
      } else {
        navigate('/owner/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to complete registration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          {/* Welcome ₹15 Bonus Badge */}
          <div className="signup-offer-tag">
            <Wallet size={16} />
            <span>Instant ₹15 Wallet Bonus on Registration!</span>
          </div>

          <div className="auth-header">
            <h2>{step === 1 ? 'Join DriveLearn India' : 'Verify Mobile OTP'}</h2>
            <p>
              {step === 1
                ? "Maharashtra's trusted 2-wheeler and car training network."
                : `Enter the 4-digit verification code sent to ${phone}.`}
            </p>
          </div>

          {/* Error message box */}
          {error && (
            <div className="auth-error-box" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              marginBottom: '1.25rem',
              border: '1px solid #fecaca'
            }}>
              <AlertCircle size={16} flexShrink={0} />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Registration Form */}
          {step === 1 && (
            <>
              {/* Account Type Selector */}
              <div className="account-type-tabs">
                <button
                  type="button"
                  className={`type-tab ${accountType === 'LEARNER' ? 'active' : ''}`}
                  onClick={() => setAccountType('LEARNER')}
                >
                  <Bike size={16} />
                  <span>I want to Learn (Learner)</span>
                </button>
                <button
                  type="button"
                  className={`type-tab ${accountType === 'OWNER' ? 'active' : ''}`}
                  onClick={() => setAccountType('OWNER')}
                >
                  <ShieldCheck size={16} />
                  <span>I own a Driving School</span>
                </button>
              </div>

              <form onSubmit={handleStep1Submit} className="auth-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Mobile Number (For OTP & WhatsApp Updates)</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>City in Maharashtra</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="input-icon" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="auth-select"
                    >
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Nashik">Nashik</option>
                      <option value="Thane">Thane</option>
                      <option value="Kolhapur">Kolhapur</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Create Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Wallet Bonus Preview Box */}
                <div className="signup-wallet-preview">
                  <Wallet size={20} color="#16a34a" />
                  <div>
                    <strong>₹15.00 Welcome Balance</strong>
                    <p>Will be credited to your in-app wallet immediately on completion.</p>
                  </div>
                </div>

                <button type="submit" className="btn-auth-submit">
                  <span>Continue to Mobile OTP</span>
                  <ArrowRight size={18} />
                </button>
              </form>
            </>
          )}

          {/* STEP 2: Mobile OTP Screen */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtpAndRegister} className="auth-form">
              <div className="form-group">
                <label>4-Digit Mobile OTP</label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="e.g. 5821"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="otp-input-field"
                  style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    letterSpacing: '0.3em',
                    fontWeight: '800',
                    fontFamily: 'monospace',
                    padding: '12px'
                  }}
                  required
                />
              </div>

              <div className="otp-resend-row" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#64748b',
                marginTop: '-4px',
                marginBottom: '8px'
              }}>
                <span>
                  {resendTimer > 0
                    ? `Resend OTP in ${resendTimer}s`
                    : "Didn't receive SMS code?"}
                </span>
                <button
                  type="button"
                  disabled={resendTimer > 0}
                  onClick={() => {
                    setResendTimer(45);
                    alert(`New OTP sent to ${phone}!`);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: resendTimer > 0 ? '#94a3b8' : 'var(--color-primary, #B91C1C)',
                    cursor: resendTimer > 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  Resend OTP
                </button>
              </div>

              <button type="submit" disabled={submitting} className="btn-auth-submit">
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Verifying & Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Verify OTP & Claim ₹15 Bonus</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  fontSize: '13px',
                  color: '#64748b',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                <ArrowLeft size={14} />
                <span>Edit Mobile Number</span>
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-switch-link">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
