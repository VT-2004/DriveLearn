import { Link } from 'react-router-dom';
import { ShieldCheck, Wallet, Calendar, AlertCircle, Award } from 'lucide-react';
import './TermsAndOffers.css';

export default function TermsAndOffers() {
  return (
    <div className="terms-offers-page">
      <div className="container terms-container">
        {/* Header */}
        <div className="terms-header-block">
          <span className="terms-badge">Official Policy</span>
          <h1>Terms & Promotional Offer Rules</h1>
          <p>
            Effective Date: 1st August 2026 • Launch Region: Maharashtra (MH-01 to MH-50)
          </p>
        </div>

        {/* Content Cards */}
        <div className="terms-sections-list">
          {/* Section 1: ₹15 Instant Wallet Bonus */}
          <div className="terms-card">
            <div className="terms-card-title-row">
              <Wallet size={20} color="var(--color-primary, #B91C1C)" />
              <h2>1. ₹15.00 Instant Introductory Wallet Bonus</h2>
            </div>
            <div className="terms-card-body">
              <ul>
                <li>
                  <strong>Eligibility:</strong> Every new user registering a valid account on DriveLearn India receives an instant, one-time credit of ₹15.00 INR into their in-app wallet upon successful mobile/email verification.
                </li>
                <li>
                  <strong>Redemption Scope:</strong> The ₹15.00 balance is automatically applied as a direct deduction on your first course booking checkout (e.g. reducing the ₹999 subsidized 2-wheeler fee to ₹984 payable).
                </li>
                <li>
                  <strong>Non-Cash / Non-Transferable:</strong> In-app wallet credits are strictly non-withdrawable to external bank accounts, UPI IDs, or third parties, and hold zero cash liquidation value outside the DriveLearn India directory booking service.
                </li>
                <li>
                  <strong>Fair Usage & Limit:</strong> Limited strictly to one (1) wallet credit per unique Aadhaar / Mobile number / Device. Duplicate account creations are subject to automated balance revocation.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2: Subsidized ₹999 2-Wheeler Course */}
          <div className="terms-card">
            <div className="terms-card-title-row">
              <Award size={20} color="var(--color-primary, #B91C1C)" />
              <h2>2. Subsidized ₹999 Two-Wheeler (MCWG/Scooty) Course Window</h2>
            </div>
            <div className="terms-card-body">
              <ul>
                <li>
                  <strong>Launch Window:</strong> The ₹999 flat subsidized package rate is guaranteed across all certified partner driving schools for the first two (2) calendar months from our official Maharashtra launch (1st August 2026 to 30th September 2026).
                </li>
                <li>
                  <strong>Inclusions:</strong> Package covers 10 days of practical riding training (30–45 mins daily), clutch & balancing drills, Warje/RTO 8-track ground simulation, certified instructor time, and RTO Learner License (LL) Form 2 paperwork guidance.
                </li>
                <li>
                  <strong>Official Govt Fees:</strong> Official RTO government testing and smart card license issuance fees levied directly by MoRTH Parivahan Sarathi are separate and payable directly at your designated RTO center.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: Statutory Government Disclaimer */}
          <div className="terms-card disclaimer-card">
            <div className="terms-card-title-row">
              <ShieldCheck size={20} color="#166534" />
              <h2>3. Statutory Boundary & Regulatory Disclaimer</h2>
            </div>
            <div className="terms-card-body">
              <p>
                <strong>DriveLearn India is an independent private technology platform and directory service.</strong> We are not a government agency, RTO authority, or representative of the Ministry of Road Transport and Highways (MoRTH). All motor driving licenses in India are issued exclusively by competent State Transport Authorities via the central Parivahan Sarathi portal after physical driving test clearance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="terms-bottom-nav">
          <Link to="/" className="btn-terms-back">
            &larr; Return to Home
          </Link>
          <Link to="/find-school" className="btn-terms-explore">
            Find Driving Schools in Maharashtra &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
