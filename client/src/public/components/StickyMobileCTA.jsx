import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import './StickyMobileCTA.css';

export default function StickyMobileCTA() {
  return (
    <div className="sticky-mobile-cta-bar">
      <div className="sticky-cta-content">
        <div className="sticky-cta-text">
          <span className="sticky-badge">Subsidized ₹999</span>
          <strong>Find Driving School Near You</strong>
        </div>
        <Link to="/find-school" className="btn-sticky-action">
          <span>Explore</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
