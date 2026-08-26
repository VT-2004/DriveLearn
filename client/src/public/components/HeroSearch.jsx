import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import RegionGuard from './RegionGuard';
import './HeroSearch.css';

export default function HeroSearch() {
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedCity, setSelectedCity] = useState('Pune');
  const [selectedCourse, setSelectedCourse] = useState('2wheeler');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedState) params.append('state', selectedState);
    if (selectedCity) params.append('city', selectedCity);
    if (selectedCourse) params.append('course', selectedCourse);
    navigate(`/find-school?${params.toString()}`);
  };

  return (
    <form className="hero-search-card" onSubmit={handleSearch}>
      <div className="search-inputs-grid">
        {/* 1. RegionGuard for State & Dependent City */}
        <div className="search-region-wrapper">
          <RegionGuard
            selectedState={selectedState}
            onStateChange={setSelectedState}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            showLabels={true}
            cityPlaceholder="All Cities in Maharashtra"
          />
        </div>

        {/* 2. Course Category Dropdown (2-Wheeler Leads) */}
        <div className="search-field course-field">
          <label htmlFor="course-select" className="search-field-label">
            <BookOpen size={14} className="field-icon" />
            <span>Training Package</span>
          </label>
          <select
            id="course-select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="search-select highlight-select"
          >
            <option value="2wheeler">Two-Wheeler (MCWG/Scooty) — Subsidized ₹999</option>
            <option value="4wheeler">Four-Wheeler Car Training (LMV)</option>
            <option value="combo">Complete Combo (2-Wheeler + Car)</option>
          </select>
        </div>

        {/* 3. Single Primary CTA Button */}
        <div className="search-btn-wrap">
          <button type="submit" className="search-submit-btn">
            <Search size={18} />
            <span>Find Schools</span>
          </button>
        </div>
      </div>
    </form>
  );
}
