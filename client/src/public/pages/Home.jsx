import { Link } from 'react-router-dom';
import { 
  Bike, ShieldCheck, Clock, Users, Award, Percent, 
  ArrowRight, Wallet, AlertCircle, Sparkles, CheckCircle2 
} from 'lucide-react';
import HeroSearch from '../components/HeroSearch';
import CourseCard from '../components/CourseCard';
import TestimonialCard, { FeaturedStoryCard } from '../components/TestimonialCard';
import TrustBadgeRow from '../components/TrustBadgeRow';
import StickyMobileCTA from '../components/StickyMobileCTA';
import RTOQuiz from '../components/RTOQuiz';
import { 
  publicCoursesData, 
  featuredTestimonial, 
  secondaryTestimonials 
} from '../data/regionsData';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Sub-section A: Top Red Announcement Bar */}
      <div className="launch-announcement-bar">
        <div className="container announcement-flex">
          <span className="announcement-text">
            <strong>Maharashtra Launch:</strong> Instant ₹15 In-App Wallet Credit + Subsidized 2-Wheeler Course from ₹999 across Pune & Mumbai
          </span>
          <Link to="/terms-and-offers" className="announcement-terms-link">
            Offer details & terms &rarr;
          </Link>
        </div>
      </div>

      {/* Sub-section B: Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Maharashtra RTO Approved • 2-Wheeler & Car Training Network</span>
          </div>

          <h1 className="hero-title">
            Pass Your RTO Driving Test <br />
            <span className="text-highlight">On Your First Attempt. Subsidized ₹999 Fee.</span>
          </h1>

          <p className="hero-subtitle">
            Master the official RTO "8" track, clutch biting zone, and flyover slope stopping. Verified partner driving schools across Pune, Mumbai, Nagpur, Nashik, and Thane with dual-control vehicles.
          </p>

          {/* Search Widget with RegionGuard */}
          <HeroSearch />

          {/* Sub-section C: Wallet Bonus Callout */}
          <div className="wallet-offer-banner">
            <div className="wallet-offer-left">
              <div className="wallet-icon-box">
                <Wallet size={24} color="var(--color-primary, #B91C1C)" />
              </div>
              <div className="wallet-offer-text">
                <h4>Instant ₹15 In-App Wallet Credit on Signup</h4>
                <p>
                  Create a free learner account in 30 seconds. ₹15 is automatically applied as a direct fee deduction on your first course booking. Applicable across all 2-wheeler & car packages. <Link to="/terms-and-offers" className="terms-link-inline">Terms apply</Link>
                </p>
              </div>
            </div>
            <Link to="/signup" className="btn-claim-offer">
              Claim ₹15 Bonus
            </Link>
          </div>

          {/* Sub-section D: Sourced Trust Badge Row */}
          <div className="hero-trust-badges-wrapper">
            <TrustBadgeRow />
          </div>
        </div>
      </section>

      {/* Sub-section E: Course Highlight Cards (2-Wheeler Leads) */}
      <section className="courses-showcase-section">
        <div className="container">
          <div className="section-header left-aligned-header">
            <span className="sub-badge">Maharashtra Rider Track</span>
            <h2>Certified Training Courses & Packages</h2>
            <p>Subsidized ₹999 fee for the first 2 months so college students and commuters can ride fear-free on busy city roads.</p>
          </div>

          <div className="courses-cards-grid">
            {publicCoursesData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Sub-section F: Why Trust Us */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-badge">Safety & Verification</span>
            <h2>Why Maharashtra Learners Trust Our Network</h2>
            <p>100% dual-control safety vehicles, certified instructors, and complete RTO Sarathi documentation support.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <Percent size={24} color="var(--color-primary, #B91C1C)" />
              </div>
              <h3>Subsidized ₹999 Launch Pricing</h3>
              <p>Guaranteed flat fee for 2-wheelers during the first 2 months. No hidden fuel surcharges or vehicle maintenance deposits.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Clock size={24} color="var(--color-primary, #B91C1C)" />
              </div>
              <h3>6:30 AM to 8:30 PM Flexible Batches</h3>
              <p>Early morning batches before college or office shifts, plus dedicated weekend-only batches for working professionals.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <Users size={24} color="var(--color-primary, #B91C1C)" />
              </div>
              <h3>Certified Women Instructors</h3>
              <p>Patient female trainers available across partner academies in Pune, Mumbai, and Nagpur for female riders.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">
                <ShieldCheck size={24} color="var(--color-primary, #B91C1C)" />
              </div>
              <h3>RTO Test Ground Vehicle Allocation</h3>
              <p>We provide the same training motorcycle or dual-pedal car on your official RTO test day to ensure confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-section G: Asymmetric Testimonials (Anti-AI Grid Pattern) */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header left-aligned-header">
            <span className="sub-badge">Verified Maharashtra Riders</span>
            <h2>Real Experiences from Pune, Mumbai & Nagpur Learners</h2>
            <p>Authentic stories from learners who cleared their RTO driving test on their first attempt.</p>
          </div>

          <div className="asymmetric-testimonials-grid">
            {/* Left 60%: Featured Story Card */}
            <div className="featured-story-col">
              <FeaturedStoryCard testimonial={featuredTestimonial} />
            </div>

            {/* Right 40%: Stacked Secondary Testimonials */}
            <div className="secondary-stories-col">
              {secondaryTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sub-section H: Free Mock Test Callout */}
      <RTOQuiz />

      {/* Sub-section I: Official Sarathi Parivahan Disclaimer Block */}
      <section className="rto-boundary-disclaimer-section">
        <div className="container">
          <div className="rto-disclaimer-card">
            <div className="disclaimer-icon-wrap">
              <ShieldCheck size={24} color="#15803D" />
            </div>
            <div className="disclaimer-text">
              <h4>Official Government Regulatory Boundary Notice</h4>
              <p>
                <strong>DriveLearn India is an independent educational technology directory, not a government body.</strong> Official Driving Licenses (LL/DL) are issued exclusively by State Transport Departments (Maharashtra RTO) via the central Ministry of Road Transport and Highways (MoRTH) Parivahan Sarathi portal after clearing practical driving tests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-section J: School Partner CTA */}
      <section className="owner-cta-section">
        <div className="container">
          <div className="owner-cta-card">
            <div className="cta-content">
              <h2>Do you operate an RTO-licensed Driving School in Maharashtra?</h2>
              <p>
                Receive direct student admissions for 2-wheeler and car batches, streamline instructor slot assignments, and grow your local academy with DriveLearn India.
              </p>
              <Link to="/signup" className="btn-cta-light">
                <span>Partner Your Driving School</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-section K: Sticky Mobile Bottom CTA Bar */}
      <StickyMobileCTA />
    </div>
  );
}
