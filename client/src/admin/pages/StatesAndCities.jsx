import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Globe, Edit3, Building2, ArrowUpRight } from 'lucide-react';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/DataTable';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { initialStates } from '../data/dummyData';
import './StatesAndCities.css';

export default function StatesAndCities() {
  const [states] = useState(initialStates);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const totalStates = states.length;
  const totalCities = states.reduce((sum, s) => sum + s.cityCount, 0);
  const totalSchools = states.reduce((sum, s) => sum + s.schoolCount, 0);

  const filteredStates = states.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'State Name',
      render: (row) => (
        <div className="state-cell">
          <Globe size={16} color="var(--admin-accent, #dc2626)" />
          <strong>{row.name}</strong>
        </div>
      ),
    },
    {
      header: 'Active Cities',
      render: (row) => <span className="tabular-nums">{row.cityCount} Cities</span>,
    },
    {
      header: 'Partner Schools',
      render: (row) => (
        <button
          onClick={() => navigate(`/admin/schools?state=${encodeURIComponent(row.name)}`)}
          className="schools-count-link-btn tabular-nums"
          title={`Filter driving schools in ${row.name}`}
        >
          <Building2 size={13} />
          <span>{row.schoolCount} Schools</span>
          <ArrowUpRight size={12} />
        </button>
      ),
    },
    {
      header: 'Coverage Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Action',
      render: (row) => (
        <button 
          onClick={() => alert(`Managing active city clusters for ${row.name}`)}
          className="btn-edit-link"
        >
          <Edit3 size={13} />
          <span>Edit Cities</span>
        </button>
      ),
    },
  ];

  const extraToolbar = (
    <button 
      onClick={() => alert('Add New State modal...')}
      className="btn-add-state"
    >
      <Plus size={14} />
      <span>Add State</span>
    </button>
  );

  return (
    <div className="admin-locations-page">
      {/* 1. Header & Summary Row */}
      <div className="admin-view-header">
        <div>
          <h1>Operating States & Transport Hubs</h1>
          <p className="locations-summary-line tabular-nums">
            <strong>{totalStates} States</strong> • <strong>{totalCities} Registered Cities</strong> • <strong>{totalSchools} Partner Driving Schools</strong>
          </p>
        </div>
      </div>

      {/* 2. Loading / Empty / Populated Data Table */}
      {loading ? (
        <SkeletonLoader rows={5} height={50} />
      ) : filteredStates.length === 0 ? (
        <EmptyState
          title="No states found"
          message={`No operating state matched "${searchTerm}".`}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filteredStates}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Filter state by name (e.g. Maharashtra, Karnataka)..."
          extraToolbar={extraToolbar}
        />
      )}
    </div>
  );
}
