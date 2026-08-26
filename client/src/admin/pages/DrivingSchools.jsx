import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Star, Download, Plus, Eye, MapPin } from 'lucide-react';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/DataTable';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { initialSchoolsList } from '../data/dummyData';
import './DrivingSchools.css';

export default function DrivingSchools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const stateQuery = searchParams.get('state') || 'Maharashtra'; // v3 change: defaults to Maharashtra

  const [schools] = useState(initialSchoolsList);
  const [selectedState, setSelectedState] = useState(stateQuery);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState({ field: 'rating', direction: 'desc' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [selectedState, statusFilter]);

  const handleStateChange = (st) => {
    setSelectedState(st);
    setSearchParams(st === 'ALL' ? {} : { state: st });
  };

  // Filter logic
  const filteredSchools = schools.filter((school) => {
    const matchesState = selectedState === 'ALL' || school.state.toLowerCase() === selectedState.toLowerCase();
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.rtoZone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || school.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesState && matchesSearch && matchesStatus;
  });

  // Sort logic
  const sortedSchools = [...filteredSchools].sort((a, b) => {
    if (sortBy.field === 'rating') {
      return sortBy.direction === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    }
    if (sortBy.field === 'reviews') {
      return sortBy.direction === 'asc' ? a.reviews - b.reviews : b.reviews - a.reviews;
    }
    return 0;
  });

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const columns = [
    {
      header: 'School Name',
      render: (row) => (
        <div className="school-table-title">
          <strong>{row.name}</strong>
        </div>
      ),
    },
    {
      header: 'Location & RTO',
      render: (row) => (
        <span className="school-table-loc">
          <MapPin size={13} color="var(--admin-accent, #B91C1C)" /> {row.city} ({row.rtoZone})
        </span>
      ),
    },
    {
      header: 'Rating',
      accessor: 'rating',
      sortable: true,
      sortField: 'rating',
      isNumeric: true,
      render: (row) => (
        <div className="school-rating-pill tabular-nums">
          <Star size={13} fill="var(--admin-accent, #B91C1C)" color="var(--admin-accent, #B91C1C)" />
          <span>{row.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      header: 'Reviews',
      accessor: 'reviews',
      sortable: true,
      sortField: 'reviews',
      isNumeric: true,
      render: (row) => <span className="tabular-nums">{row.reviews} reviews</span>,
    },
    {
      header: 'Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Action',
      render: (row) => (
        <button 
          onClick={() => alert(`Opening public profile for ${row.name}`)}
          className="btn-icon-view" 
          title="View Details"
        >
          <Eye size={15} />
        </button>
      ),
    },
  ];

  const extraToolbar = (
    <div className="schools-extra-actions">
      <select
        value={selectedState}
        onChange={(e) => handleStateChange(e.target.value)}
        className="admin-select-filter"
      >
        <option value="Maharashtra">State: Maharashtra (Live Launch)</option>
        <option value="Karnataka">State: Karnataka (Coming Soon)</option>
        <option value="Gujarat">State: Gujarat (Coming Soon)</option>
        <option value="ALL">All States</option>
      </select>

      <select 
        value={statusFilter} 
        onChange={(e) => setStatusFilter(e.target.value)}
        className="admin-select-filter"
      >
        <option value="ALL">All Statuses</option>
        <option value="active">Active Only</option>
        <option value="inactive">Inactive</option>
      </select>

      <button 
        onClick={() => alert('Exporting Maharashtra directory to CSV format...')}
        className="btn-toolbar-secondary"
      >
        <Download size={14} />
        <span>Export CSV</span>
      </button>

      <button 
        onClick={() => alert('Opening Add New School registration form...')}
        className="btn-toolbar-primary"
      >
        <Plus size={14} />
        <span>Add School</span>
      </button>
    </div>
  );

  return (
    <div className="admin-schools-view">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Partner Driving Schools Directory</h1>
          <p>
            Catalog of all RTO-verified partner driving schools with real-time ratings, reviews, and student capacity.
          </p>
        </div>
      </div>

      {/* 2. Loading / Empty / Populated Data Table */}
      {loading ? (
        <SkeletonLoader rows={6} height={52} />
      ) : sortedSchools.length === 0 ? (
        <EmptyState
          title={`No driving schools found in ${selectedState}`}
          message={`No partner driving schools found matching "${searchTerm}".`}
          ctaText="Reset State Filter"
          onCtaClick={() => {
            setSelectedState('Maharashtra');
            setSearchTerm('');
            setStatusFilter('ALL');
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={sortedSchools}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Filter schools by name, city, or RTO zone..."
          extraToolbar={extraToolbar}
          sortBy={sortBy}
          onSort={handleSort}
        />
      )}
    </div>
  );
}
