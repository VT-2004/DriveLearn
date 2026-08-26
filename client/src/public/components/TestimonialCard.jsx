import { Star, MapPin, CheckCircle2, Award, Quote } from 'lucide-react';
import './TestimonialCard.css';

export function FeaturedStoryCard({ testimonial }) {
  return (
    <div className="featured-story-card">
      <div className="story-badge-row">
        <span className="story-badge">
          <Award size={13} /> {testimonial.highlight}
        </span>
        <span className="story-rto-tag">{testimonial.rtoCenter}</span>
      </div>

      <div className="story-body">
        <Quote size={32} className="quote-accent-icon" />
        <p className="story-quote">"{testimonial.quote}"</p>
      </div>

      <div className="story-footer">
        <div className="story-author-avatar">
          {testimonial.name.charAt(0)}
        </div>
        <div className="story-author-meta">
          <div className="story-name-line">
            <strong>{testimonial.name}</strong>
            <span className="badge-verified-rider">
              <CheckCircle2 size={11} /> {testimonial.passedOn}
            </span>
          </div>
          <span className="story-course-line">
            <MapPin size={11} /> {testimonial.city} • {testimonial.course}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="compact-testimonial-card">
      <div className="compact-stars-row">
        {Array.from({ length: testimonial.rating }).map((_, idx) => (
          <Star key={idx} size={13} fill="var(--color-primary, #B91C1C)" color="var(--color-primary, #B91C1C)" />
        ))}
        <span className="compact-rto-label">{testimonial.rtoCenter}</span>
      </div>

      <p className="compact-quote">"{testimonial.quote}"</p>

      <div className="compact-author-meta">
        <div className="compact-avatar">
          {testimonial.name.charAt(0)}
        </div>
        <div className="compact-details">
          <strong>{testimonial.name}</strong>
          <span><MapPin size={10} /> {testimonial.city}</span>
        </div>
      </div>
    </div>
  );
}
