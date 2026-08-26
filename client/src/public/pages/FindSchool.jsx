import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, Sparkles, Navigation } from 'lucide-react';
import SchoolCard from '../components/SchoolCard';
import RegionGuard from '../components/RegionGuard';
import SkeletonLoader from '../../admin/components/SkeletonLoader';
import EmptyState from '../../admin/components/EmptyState';
import './FindSchool.css';

const MAHARASHTRA_SCHOOLS_DATA = [
  {
    id: 'school-1',
    name: 'Sai Motor & 2-Wheeler Training School',
    tagline: 'Pune’s top rated training center with dedicated female instructors & Warje 8-track ground',
    rating: 4.9,
    reviewCount: 420,
    address: 'Karve Road, Kothrud & Deccan',
    city: 'Pune',
    state: 'Maharashtra',
    courses: ['Two-Wheeler (MCWG/Scooty)', 'Car Training (LMV)', 'Combined Track'],
    startingPrice: 999,
    verified: true,
    femaleInstructor: true,
    twoWheelerSpecialist: true,
    featuredImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'school-2',
    name: 'Apex Rider & Motor Driving Academy',
    tagline: 'Special 8-figure ground training for Mumbai RTO test confidence',
    rating: 4.8,
    reviewCount: 312,
    address: 'Link Road, Andheri West & Borivali',
    city: 'Mumbai',
    state: 'Maharashtra',
    courses: ['Two-Wheeler (MCWG/Scooty)', 'Car Training (LMV)'],
    startingPrice: 999,
    verified: true,
    femaleInstructor: true,
    twoWheelerSpecialist: true,
    featuredImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'school-3',
    name: 'Deccan Safe Steer Motor Institute',
    tagline: 'Clutch biting point, slope stopping, and geared motorcycle mastery',
    rating: 4.9,
    reviewCount: 285,
    address: 'Hinjewadi Phase 1 & Wakad',
    city: 'Pune',
    state: 'Maharashtra',
    courses: ['Two-Wheeler (MCWG/Scooty)', 'Two-Wheeler + Car Combo'],
    startingPrice: 999,
    verified: true,
    femaleInstructor: false,
    twoWheelerSpecialist: true,
    featuredImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'school-4',
    name: 'Nagpur Central Rider School',
    tagline: 'Fast track 10-day 2-wheeler learner license & road safety course',
    rating: 4.7,
    reviewCount: 198,
    address: 'Dharampeth & Sitabuldi',
    city: 'Nagpur',
    state: 'Maharashtra',
    courses: ['Two-Wheeler (MCWG/Scooty)', 'Car Training (LMV)'],
    startingPrice: 999,
    verified: true,
    femaleInstructor: true,
    twoWheelerSpecialist: true,
    featuredImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'school-5',
    name: 'Nashik Godavari Motor Training',
    tagline: 'Trusted by over 8,000 riders in Nashik with complete RTO test support',
    rating: 4.8,
    reviewCount: 165,
    address: 'College Road & Gangapur Road',
    city: 'Nashik',
    state: 'Maharashtra',
    courses: ['Two-Wheeler (MCWG/Scooty)', 'Car Training (LMV)'],
    startingPrice: 999,
    verified: true,
    femaleInstructor: false,
    twoWheelerSpecialist: true,
    featuredImage: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'school-6',
    name: 'Thane Lake City Driving Academy',
    tagline: 'EV Scooter & Motorcycle gear training with complete DL service',
    rating: 4.7,
    reviewCount: 220,
    address: 'Naupada & Ghodbunder Road',
    city: 'Thane',
    state: 'Maharashtra',
    courses: ['Two-Wheeler (MCWG/Scooty)', 'Car Training (LMV)'],
    startingPrice: 999,
    verified: true,
    femaleInstructor: true,
    twoWheelerSpecialist: true,
    featuredImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
  },
];

export default function FindSchool() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'Maharashtra');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [femaleOnly, setFemaleOnly] = useState(false);
  const [twoWheelerOnly, setTwoWheelerOnly] = useState(false);
  const [locating, setLocating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedState, selectedCity, sortBy, femaleOnly, twoWheelerOnly]);

  // "Near Me" Browser Geolocation Trigger
  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Defaults gracefully to Maharashtra / Pune zone for demo simulation
        setSelectedState('Maharashtra');
        setSelectedCity('Pune');
        setLocating(false);
      },
      (error) => {
        alert('Location access denied. Please select your Maharashtra city from the dropdown.');
        setLocating(false);
      }
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedState('Maharashtra');
    setSelectedCity('');
    setSortBy('rating-desc');
    setFemaleOnly(false);
    setTwoWheelerOnly(false);
    setSearchParams({});
  };

  // Filtered dataset
  const filteredSchools = useMemo(() => {
    const list = MAHARASHTRA_SCHOOLS_DATA.filter((school) => {
      const matchQuery =
        !searchQuery ||
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchState = !selectedState || school.state.toLowerCase() === selectedState.toLowerCase();
      const matchCity = !selectedCity || school.city.toLowerCase() === selectedCity.toLowerCase();
      const matchFemale = !femaleOnly || school.femaleInstructor === true;
      const matchTwoWheeler = !twoWheelerOnly || school.twoWheelerSpecialist === true;

      return matchQuery && matchState && matchCity && matchFemale && matchTwoWheeler;
    });

    // Sort
    return list.sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.startingPrice - b.startingPrice;
      if (sortBy === 'reviews-desc') return b.reviewCount - a.reviewCount;
      return 0;
    });
  }, [searchQuery, selectedState, selectedCity, sortBy, femaleOnly, twoWheelerOnly]);

  return (
    <div className="find-school-page">
      {/* 1. Header Banner */}
      <div className="search-header-bar">
        <div className="container">
          <div className="search-header-badge">
            <Sparkles size={14} />
            <span>Subsidized Launch Fee: ₹999 Flat for 2-Wheelers</span>
          </div>
          <h1>RTO-Approved Driving Schools in Maharashtra</h1>
          <p>Compare verified training centers, female instructor availability, and RTO test pass rates.</p>

          <div className="search-bar-wrap">
            <Search size={18} className="search-bar-icon" />
            <input
              type="text"
              placeholder="Search by driving school name, city, or area (e.g. Kothrud, Hinjewadi, Andheri)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="btn-clear-input">
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Layout */}
      <div className="container find-school-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="filters-header">
            <div className="filters-title">
              <Filter size={16} color="var(--color-primary, #B91C1C)" />
              <span>Filters</span>
            </div>
            <button onClick={handleResetFilters} className="btn-reset-filters">
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>

          {/* Near Me Action Button */}
          <div className="filter-group">
            <button 
              type="button" 
              onClick={handleNearMe} 
              disabled={locating}
              className="btn-near-me"
            >
              <Navigation size={14} />
              <span>{locating ? 'Detecting Location...' : 'Use My Current Location (Near Me)'}</span>
            </button>
          </div>

          {/* State & City RegionGuard */}
          <div className="filter-group">
            <RegionGuard
              selectedState={selectedState}
              onStateChange={setSelectedState}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              showLabels={true}
              cityPlaceholder="All Maharashtra Hubs"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="filter-group">
            <label className="filter-label">Sort Results By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="rating-desc">Rating: Highest First</option>
              <option value="price-asc">Price: Lowest First (₹999)</option>
              <option value="reviews-desc">Most Student Reviews</option>
            </select>
          </div>

          {/* Training Preferences */}
          <div className="filter-group">
            <label className="filter-label">Training Preferences</label>
            <div className="checkboxes-list">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={twoWheelerOnly}
                  onChange={(e) => setTwoWheelerOnly(e.target.checked)}
                />
                <span>2-Wheeler (MCWG/Scooty) Focus</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={femaleOnly}
                  onChange={(e) => setFemaleOnly(e.target.checked)}
                />
                <span>Certified Female Instructor Available</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <main className="schools-results-area">
          <div className="results-count-bar">
            <span className="results-count-text">
              Showing <strong className="tabular-nums">{filteredSchools.length}</strong> verified driving schools in{' '}
              <strong>{selectedCity || selectedState || 'Maharashtra'}</strong>
            </span>
          </div>

          {loading ? (
            <SkeletonLoader rows={4} height={140} />
          ) : filteredSchools.length === 0 ? (
            <EmptyState
              title="No driving schools match your criteria"
              message={`No partner driving schools found for the selected area. Try resetting your city filter or searching for another locality.`}
              ctaText="Reset All Filters"
              onCtaClick={handleResetFilters}
            />
          ) : (
            <div className="schools-grid">
              {filteredSchools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
