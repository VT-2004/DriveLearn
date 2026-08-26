import React from 'react';
import { AlertOctagon, RotateCw, Home } from 'lucide-react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('DriveLearn Uncaught Runtime Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-screen">
          <div className="error-boundary-card">
            <div className="error-icon-bubble">
              <AlertOctagon size={32} color="#B91C1C" />
            </div>

            <h2>Engine Stall! Something Went Wrong</h2>
            <p>
              An unexpected error occurred while loading this view. Don't worry—your bookings and wallet balance are safe.
            </p>

            {this.state.error && (
              <div className="error-stack-snippet">
                <code>{this.state.error.toString()}</code>
              </div>
            )}

            <div className="error-boundary-actions">
              <button onClick={this.handleReload} className="btn-error-reload">
                <RotateCw size={15} />
                <span>Restart Engine (Reload Page)</span>
              </button>
              <button onClick={this.handleGoHome} className="btn-error-home">
                <Home size={15} />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
