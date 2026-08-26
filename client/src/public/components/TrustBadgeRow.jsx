import { useState } from 'react';
import { ShieldCheck, Award, CheckCircle, Star, Info } from 'lucide-react';
import './TrustBadgeRow.css';

export default function TrustBadgeRow() {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const badges = [
    {
      id: 'b1',
      title: '₹999 Subsidized Fee',
      subtitle: '2-Wheeler Practical Course',
      methodology: 'Introductory subsidized launch rate applicable for first 2 months across Maharashtra partner driving schools.',
      icon: Award,
    },
    {
      id: 'b2',
      title: '94.8% Pass Rate',
      subtitle: 'First-Attempt RTO Tests',
      methodology: 'Based on official MoRTH RTO track evaluation records reported by 42 partner driving schools in Pune, Mumbai & Nagpur.',
      icon: CheckCircle,
    },
    {
      id: 'b3',
      title: '100% Dual-Control',
      subtitle: 'Safety Certified Vehicles',
      methodology: 'Every scooter and car equipped with instructor dual-brake pedals and verified under Motor Vehicle Act standards.',
      icon: ShieldCheck,
    },
    {
      id: 'b4',
      title: '4.9★ from 8,400+ Riders',
      subtitle: 'Verified Maharashtra Learners',
      methodology: 'Aggregated reviews submitted by verified students upon completing their 10-day practical training syllabus.',
      icon: Star,
    },
  ];

  return (
    <div className="trust-badge-row-container">
      {badges.map((badge) => {
        const IconComponent = badge.icon;
        const isTooltipOpen = activeTooltip === badge.id;

        return (
          <div 
            key={badge.id} 
            className="trust-badge-item"
            onMouseEnter={() => setActiveTooltip(badge.id)}
            onMouseLeave={() => setActiveTooltip(null)}
            onClick={() => setActiveTooltip(isTooltipOpen ? null : badge.id)}
          >
            <div className="trust-badge-icon-box">
              <IconComponent size={20} color="var(--color-primary, #B91C1C)" />
            </div>

            <div className="trust-badge-text-block">
              <div className="badge-title-row">
                <strong className="badge-title tabular-nums">{badge.title}</strong>
                <button 
                  type="button" 
                  className="badge-info-trigger" 
                  aria-label="View methodology note"
                >
                  <Info size={13} />
                </button>
              </div>
              <span className="badge-subtitle">{badge.subtitle}</span>
            </div>

            {/* Methodology Note Tooltip */}
            {isTooltipOpen && (
              <div className="trust-methodology-tooltip" role="tooltip">
                <strong>Methodology & Verification Note:</strong>
                <p>{badge.methodology}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
