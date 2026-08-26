import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Wallet, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import FAQAccordion from '../components/FAQAccordion';
import { publicFaqs } from '../data/regionsData';
import './Pricing.css';

const PRICING_PLANS = [
  {
    id: 'plan-2w',
    category: '2wheeler',
    name: 'Two-Wheeler Practical Course (MCWG)',
    tagline: 'Geared Motorcycle (MCWG) or Non-Geared Scooty (MCWOG)',
    duration: '10 Days (45 mins/day)',
    originalPrice: 1800,
    price: 999,
    popular: true,
    highlight: 'Maharashtra Launch Offer — ₹999 Flat Fee',
    features: [
      'Clutch friction zone & throttle balance',
      'RTO "8" figure ground test practice without stepping down',
      'Flyover slope stopping & half-clutch hill start',
      'Dual instructor safety supervision during traffic rides',
      'RTO Form 2 Learner License (LL) test prep app access',
      'School vehicle provided on your official RTO test day',
    ],
  },
  {
    id: 'plan-4w',
    category: '4wheeler',
    name: 'Four-Wheeler Car Driving Track (LMV)',
    tagline: 'Maruti Swift / WagonR (Dual-Brake Control)',
    duration: '15 Days (1 hour/day)',
    originalPrice: 5500,
    price: 3999,
    popular: false,
    highlight: 'Official LMV License Syllabus',
    features: [
      'Dual-brake control training cars for 100% safety',
      'Reverse "S" track & parallel parking between cones',
      'Heavy city traffic gear shifting (1st, 2nd, 3rd gears)',
      '1 Night driving & highway overtakes training session',
      'Practical bonnet opening, coolant check & tyre puncture guide',
      'RTO permanent test vehicle included on test day',
    ],
  },
  {
    id: 'plan-combo',
    category: 'combo',
    name: 'Two-Wheeler + Car Combined Track',
    tagline: 'Combined Bike (MCWG) + Car (LMV) Full License Track',
    duration: '21 Days Total',
    originalPrice: 7000,
    price: 4499,
    popular: false,
    highlight: 'Save ₹2,501 + Combined RTO Slot',
    features: [
      'Full 10-day 2-wheeler AND 15-day car practical syllabus',
      'Single RTO slot booking for both licenses on Sarathi',
      'Option to train with certified female instructors',
      'Flexible 6:30 AM morning or weekend-only batch slots',
      'Highway driving session on Mumbai-Pune Expressway / NH-48',
      'Instant ₹15 wallet discount applied automatically',
    ],
  },
];

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPlans = PRICING_PLANS.filter(
    (plan) => activeCategory === 'all' || plan.category === activeCategory
  );

  return (
    <div className="pricing-page">
      {/* 1. Page Header */}
      <section className="pricing-hero-header">
        <div className="container">
          <div className="pricing-badge">
            <Sparkles size={14} />
            <span>Zero Hidden Fees • 100% RTO Compliant</span>
          </div>

          <h1>Transparent Driving Course Fees in Maharashtra</h1>
          <p>
            Choose your training track with special subsidized launch pricing for the first 2 months.
          </p>

          {/* Category Tabs */}
          <div className="category-filter-pills">
            <button
              onClick={() => setActiveCategory('all')}
              className={`pill-btn ${activeCategory === 'all' ? 'active' : ''}`}
            >
              All Packages
            </button>
            <button
              onClick={() => setActiveCategory('2wheeler')}
              className={`pill-btn ${activeCategory === '2wheeler' ? 'active' : ''}`}
            >
              Two-Wheeler (Special ₹999)
            </button>
            <button
              onClick={() => setActiveCategory('4wheeler')}
              className={`pill-btn ${activeCategory === '4wheeler' ? 'active' : ''}`}
            >
              Four-Wheeler Car
            </button>
            <button
              onClick={() => setActiveCategory('combo')}
              className={`pill-btn ${activeCategory === 'combo' ? 'active' : ''}`}
            >
              Combined Track
            </button>
          </div>
        </div>
      </section>

      {/* 2. Pricing Cards Grid */}
      <section className="container pricing-cards-section">
        <div className="pricing-cards-grid">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular-card' : ''}`}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}

              <div className="pricing-card-header">
                <span className="plan-category-tag">{plan.highlight}</span>
                <h2>{plan.name}</h2>
                <p className="plan-tagline">{plan.tagline}</p>
                <div className="plan-duration-badge">{plan.duration}</div>
              </div>

              {/* Price Calculation Box */}
              <div className="pricing-numbers-box">
                <div className="price-row-main">
                  <span className="price-cut tabular-nums">₹{plan.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="current-price tabular-nums">₹{plan.price.toLocaleString('en-IN')}</span>
                  <span className="price-period">/ course</span>
                </div>

                <div className="wallet-discount-banner">
                  <Wallet size={14} color="#15803D" />
                  <span className="tabular-nums">
                    Use ₹15 Wallet Bonus &rarr; <strong>Pay ₹{(plan.price - 15).toLocaleString('en-IN')}</strong>
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="plan-features">
                {plan.features.map((feat, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} color="var(--color-primary, #B91C1C)" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <Link
                to={`/find-school?course=${plan.category}`}
                className="btn-select-plan"
              >
                <span>Find Nearby School for this Course</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Fee Transparency Guarantee */}
      <section className="container fee-guarantee-box">
        <div className="guarantee-inner">
          <ShieldCheck size={36} color="var(--color-primary, #B91C1C)" />
          <div>
            <h3>The DriveLearn Price Guarantee</h3>
            <p>
              No unexpected fuel surcharge, no maintenance deposit, and no extra charge for using the school vehicle during your official RTO driving test. Everything is fixed and transparent.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (Rebuilt as real interactive FAQAccordion) */}
      <section className="container faqs-section">
        <div className="faqs-header">
          <HelpCircle size={24} color="var(--color-primary, #B91C1C)" />
          <h2>Frequently Asked Questions</h2>
          <p>Answers to common questions regarding learning 2-wheeler and car driving in Maharashtra.</p>
        </div>

        <div className="faqs-accordion-wrapper">
          <FAQAccordion items={publicFaqs} />
        </div>
      </section>
    </div>
  );
}
