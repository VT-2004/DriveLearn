import { useState, useEffect } from 'react';
import { Plus, Car, Bike, Search, Download, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';
import DataTable from '../../admin/components/DataTable';
import StatusPill from '../../admin/components/StatusPill';
import SkeletonLoader from '../../admin/components/SkeletonLoader';
import EmptyState from '../../admin/components/EmptyState';
import VehicleExpiryBadge from '../components/VehicleExpiryBadge';
import { ownerVehiclesList } from '../data/dummyData';
import './Vehicles.css';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(ownerVehiclesList);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.assignedInstructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      typeFilter === 'ALL' || v.type.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesSearch && matchesType;
  });

  const columns = [
    {
      header: 'Vehicle Number & Model',
      render: (row) => (
        <div className="vehicle-info-cell">
          <div className="vehicle-type-icon-box">
            {row.type.includes('2-Wheeler') ? (
              <Bike size={16} color="var(--color-primary, #B91C1C)" />
            ) : (
              <Car size={16} color="#334155" />
            )}
          </div>
          <div>
            <strong className="tabular-nums">{row.vehicleNo}</strong>
            <span className="vehicle-model-sub">{row.model}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      render: (row) => <span className="vehicle-cat-tag">{row.type}</span>,
    },
    {
      header: 'Assigned Instructor',
      accessor: 'assignedInstructor',
    },
    {
      header: 'Insurance Expiry',
      render: (row) => <VehicleExpiryBadge expiryDate={row.insuranceExpiry} label="Insurance" />,
    },
    {
      header: 'Fitness Expiry',
      render: (row) => <VehicleExpiryBadge expiryDate={row.fitnessExpiry} label="RTO Fitness" />,
    },
    {
      header: 'Fleet Status',
      render: (row) => (
        <span className={`fleet-status-pill ${row.operationalStatus}`}>
          {row.operationalStatus === 'in-service' ? 'In Service' : 'Under Maintenance'}
        </span>
      ),
    },
    {
      header: 'Action',
      render: (row) => (
        <button
          onClick={() => alert(`Vehicle RC & Dual-Brake Fitness Dossier:\nNo: ${row.vehicleNo}\nModel: ${row.model}\nTrainer: ${row.assignedInstructor}\nInsurance: ${row.insuranceExpiry}`)}
          className="btn-inspect-vehicle"
          title="Inspect Vehicle RC & Certificates"
        >
          <Eye size={14} />
          <span>Details</span>
        </button>
      ),
    },
  ];

  const extraToolbar = (
    <div className="vehicles-toolbar-extra">
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="admin-select-filter"
      >
        <option value="ALL">All Vehicle Types</option>
        <option value="2-Wheeler">2-Wheeler (Activa / Jupiter)</option>
        <option value="4-Wheeler">4-Wheeler (Swift / i10 Dual-Brake)</option>
      </select>

      <button
        onClick={() => alert('Exporting fleet compliance roster to CSV...')}
        className="btn-toolbar-secondary"
      >
        <Download size={14} />
        <span>Export Fleet</span>
      </button>

      <button
        onClick={() => alert('Opening Add New Training Vehicle form...')}
        className="btn-toolbar-primary"
      >
        <Plus size={14} />
        <span>Add Vehicle</span>
      </button>
    </div>
  );

  return (
    <div className="owner-vehicles-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Training Vehicle Fleet & Compliance</h1>
          <p>
            Monitor dual-control pedal inspection certificates, RTO fitness validity, and automated insurance expiry alerts.
          </p>
        </div>
      </div>

      {/* 2. Vehicles Data Table */}
      {loading ? (
        <SkeletonLoader rows={5} height={52} />
      ) : filteredVehicles.length === 0 ? (
        <EmptyState
          title="No vehicles found"
          message={`No vehicles match query "${searchTerm}".`}
          ctaText="Reset Filter"
          onCtaClick={() => {
            setSearchTerm('');
            setTypeFilter('ALL');
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filteredVehicles}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search vehicles by RC number, model, or trainer..."
          extraToolbar={extraToolbar}
        />
      )}
    </div>
  );
}
