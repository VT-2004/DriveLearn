import { Link } from 'react-router-dom';
import { Bike, ShieldCheck, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Bike size={24} color="var(--color-primary, #B91C1C)" />
            <span>DriveLearn<strong>.in</strong></span>
          </div>
          <p className="footer-tagline">
            Maharashtra's dedicated 2-wheeler and car training network. Empowering middle-class riders with safe, affordable RTO-certified learning.
          </p>
          <div className="badge-rto">
            <ShieldCheck size={16} />
            <span>Maharashtra RTO Approved Syllabus</span>
          </div>
        </div>

        <div className="footer-column">
          <h4>2-Wheeler Courses</h4>
          <Link to="/find-school?course=2wheeler">Geared Motorcycle (₹999)</Link>
          <Link to="/find-school?course=2wheeler">Scooty & EV Scooter (₹999)</Link>
          <Link to="/find-school?course=combo">2-Wheeler + Car Combo</Link>
          <Link to="/signup">Claim ₹15 Wallet Bonus</Link>
        </div>

        <div className="footer-column">
          <h4>Top Maharashtra Hubs</h4>
          <Link to="/find-school?city=Pune">Pune (18 Schools)</Link>
          <Link to="/find-school?city=Mumbai">Mumbai (24 Schools)</Link>
          <Link to="/find-school?city=Nagpur">Nagpur (9 Schools)</Link>
          <Link to="/find-school?city=Nashik">Nashik (7 Schools)</Link>
          <Link to="/find-school?city=Thane">Thane (11 Schools)</Link>
        </div>

        <div className="footer-column">
          <h4>Portals & Legal</h4>
          <Link to="/login">Learner Login</Link>
          <Link to="/login">Driving School Login</Link>
          <Link to="/signup">Register School</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-offers">Terms & Promotional Offers</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} DriveLearn India. All rights reserved.</p>
          <p className="footer-credit">
            Built with <Heart size={14} color="var(--color-primary, #B91C1C)" fill="var(--color-primary, #B91C1C)" /> for safer Maharashtra roads.
          </p>
        </div>
      </div>
    </footer>
  );
}
