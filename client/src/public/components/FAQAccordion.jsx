import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQAccordion.css';

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0); // Open first by default

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="public-faq-accordion">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-question-btn"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
            >
              <span className="faq-question-text">{item.question}</span>
              <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
            </button>

            {isOpen && (
              <div className="faq-answer-pane">
                <p className="faq-answer-text">{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
