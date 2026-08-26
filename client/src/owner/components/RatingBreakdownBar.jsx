import { Star } from 'lucide-react';
import './RatingBreakdownBar.css';

export default function RatingBreakdownBar({ breakdownData }) {
  const { average, totalReviews, stars } = breakdownData;

  return (
    <div className="owner-rating-breakdown-card">
      <div className="rating-summary-left">
        <h2 className="rating-big-score tabular-nums">{average.toFixed(1)}</h2>
        <div className="rating-stars-row">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={16} fill="#f59e0b" color="#f59e0b" />
          ))}
        </div>
        <span className="total-reviews-sub tabular-nums">Based on {totalReviews} verified student reviews</span>
      </div>

      <div className="rating-bars-right">
        {stars.map((item) => (
          <div key={item.star} className="rating-bar-row">
            <div className="star-label-col">
              <span>{item.star}</span>
              <Star size={11} fill="#f59e0b" color="#f59e0b" />
            </div>

            <div className="rating-bar-track">
              <div
                className="rating-bar-fill"
                style={{ width: `${item.percent}%` }}
              ></div>
            </div>

            <span className="rating-count-col tabular-nums">
              {item.count} ({item.percent}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
