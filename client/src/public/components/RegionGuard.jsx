import { statesData, citiesData } from '../data/regionsData';
import './RegionGuard.css';

export default function RegionGuard({ 
  selectedState = 'Maharashtra', 
  onStateChange, 
  selectedCity = '', 
  onCityChange,
  showLabels = true,
  cityPlaceholder = 'Select city (e.g. Pune, Mumbai)...'
}) {
  const citiesForState = citiesData.filter(
    (c) => c.state.toLowerCase() === selectedState.toLowerCase()
  );

  const handleStateSelect = (e) => {
    const newState = e.target.value;
    onStateChange(newState);
    onCityChange(''); // Reset city whenever state changes
  };

  return (
    <div className="region-guard-group">
      {/* 1. State Dropdown */}
      <div className="region-field-col">
        {showLabels && <label className="region-field-label">Select State</label>}
        <select
          value={selectedState}
          onChange={handleStateSelect}
          className="region-select-input"
        >
          {statesData.map((st) => (
            <option
              key={st.code}
              value={st.name}
              disabled={st.status === 'coming_soon'}
            >
              {st.name} {st.status === 'coming_soon' ? '(Coming Soon)' : '• Live'}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Dependent City Dropdown */}
      <div className="region-field-col">
        {showLabels && <label className="region-field-label">Select City Hub</label>}
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="region-select-input"
          disabled={citiesForState.length === 0}
        >
          <option value="">{cityPlaceholder}</option>
          {citiesForState.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name} ({city.activeSchools} Partner Schools)
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
