import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home, ShieldAlert, Bike } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-badge">
          <ShieldAlert size={28} color="#B91C1C" />
        </div>

        <h1 className="not-found-title tabular-nums">404</h1>
        <h2 className="not-found-subtitle">Wrong Turn! Route Not Found</h2>
        <p className="not-found-desc">
          Looks like this road doesn't exist on our Maharashtra driving map. You may have mistyped the URL or the page has moved to another track.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn-not-found-primary">
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/find-school" className="btn-not-found-secondary">
            <Bike size={16} />
            <span>Explore Driving Schools</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
