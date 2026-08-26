import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bike, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeRole, setActiveRole] = useState('learner');
  const [emailOrPhone, setEmailOrPhone] = useState('pooja.kulkarni@gmail.com');
  const [password, setPassword] = useState('learner123');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const loggedUser = await login(emailOrPhone, password);
      
      // Dynamic Role-Based Redirection
      if (loggedUser.role === 'LEARNER') {
        navigate('/learner/dashboard');
      } else if (loggedUser.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (loggedUser.role === 'INSTRUCTOR') {
        navigate('/instructor/dashboard');
      } else if (loggedUser.role === 'OWNER') {
        navigate('/owner/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Incorrect email/password.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoFill = (role) => {
    setActiveRole(role);
    setError(null);
    if (role === 'learner') {
      setEmailOrPhone('pooja.kulkarni@gmail.com');
      setPassword('learner123');
    } else if (role === 'owner') {
      setEmailOrPhone('owner@saimotorspune.in');
      setPassword('owner123');
    } else if (role === 'instructor') {
      setEmailOrPhone('sunita.trainer@saimotors.in');
      setPassword('trainer123');
    } else if (role === 'admin') {
      setEmailOrPhone('admin@drivelearn.in');
      setPassword('superadmin123');
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          {/* Top Logo & Title */}
          <div className="auth-header">
            <div className="auth-logo-wrap">
              <Bike size={28} color="#ffffff" />
            </div>
            <h2>Sign In to DriveLearn India</h2>
            <p>Access your training schedule, slot bookings, and wallet balance.</p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="role-switcher">
            <button
              type="button"
              className={`role-tab ${activeRole === 'learner' ? 'active' : ''}`}
              onClick={() => handleQuickDemoFill('learner')}
            >
              Learner / Rider
            </button>
            <button
              type="button"
              className={`role-tab ${activeRole === 'owner' ? 'active' : ''}`}
              onClick={() => handleQuickDemoFill('owner')}
            >
              School Owner
            </button>
            <button
              type="button"
              className={`role-tab ${activeRole === 'instructor' ? 'active' : ''}`}
              onClick={() => handleQuickDemoFill('instructor')}
            >
              Instructor
            </button>
            <button
              type="button"
              className={`role-tab ${activeRole === 'admin' ? 'active' : ''}`}
              onClick={() => handleQuickDemoFill('admin')}
            >
              Super Admin
            </button>
          </div>

          {/* Error Message Box */}
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

          {/* Form */}
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email or Mobile Number</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. pooja.kulkarni@gmail.com"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label>Password</label>
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-auth-submit">
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="auth-footer">
            <p>
              New to DriveLearn?{' '}
              <Link to="/signup" className="auth-switch-link">
                Create an account (+₹15 Wallet Bonus)
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
