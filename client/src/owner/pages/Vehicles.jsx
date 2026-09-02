import { useState, useEffect } from 'react';
import { Plus, Car, Bike, Search, Download, Eye, AlertTriangle, CheckCircle2, Fuel, Gauge, ShieldCheck } from 'lucide-react';
import DataTable from '../../admin/components/DataTable';
import StatusPill from '../../admin/components/StatusPill';
import SkeletonLoader from '../../admin/components/SkeletonLoader';
import EmptyState from '../../admin/components/EmptyState';
import VehicleExpiryBadge from '../components/VehicleExpiryBadge';
import VehicleDetailModal from '../components/VehicleDetailModal';
import { ownerVehiclesList } from '../data/dummyData';
import './Vehicles.css';

// Initial Fuel & Odometer Audit Records submitted by trainers
const INITIAL_FUEL_AUDIT_LOGS = [
  {
    id: 'LOG-881',
    date: '22 Aug 2026',
    vehicleNo: 'MH-12-CD-8812',
    model: 'Honda Activa 6G (Dual Control)',
    trainer: 'Sunita Deshmukh',
    startKm: 42100,
    endKm: 42148,
    actualKm: 48,
    scheduledLessons: 5,
    expectedKm: 40,
    varianceKm: '+8 km',
    fuelLitres: 4.2,
    fuelCost: 450,
    pumpStation: 'HP Karve Rd, Kothrud (Bill: HP-KTH-88219)',
    auditStatus: 'VERIFIED',
    notes: 'Tyre pressure checked: 32 PSI. Karve Rd morning top-up.',
  },
  {
    id: 'LOG-882',
    date: '22 Aug 2026',
    vehicleNo: 'MH-12-DE-4419',
    model: 'Maruti Swift LXi (Dual Brake)',
    trainer: 'Rahul Shinde',
    startKm: 68420,
    endKm: 68482,
    actualKm: 62,
    scheduledLessons: 6,
    expectedKm: 60,
    varianceKm: '+2 km',
    fuelLitres: 6.0,
    fuelCost: 630,
    pumpStation: 'Bharat Petroleum Warje (Bill: BP-WRJ-1029)',
    auditStatus: 'VERIFIED',
    notes: 'Clutch travel inspected before Deccan highway batch.',
  },
  {
    id: 'LOG-880',
    date: '21 Aug 2026',
    vehicleNo: 'MH-12-AB-2291',
    model: 'Hero Splendor Plus',
    trainer: 'Vikas Jadhav',
    startKm: 31200,
    endKm: 31252,
    actualKm: 52,
    scheduledLessons: 4,
    expectedKm: 36,
    varianceKm: '+16 km',
    fuelLitres: 3.8,
    fuelCost: 400,
    pumpStation: 'Indian Oil Swargate (Bill: IOC-SWG-441)',
    auditStatus: 'FLAGGED',
    notes: 'High variance (+16 km). Extra practice requested by student at Alandi RTO track.',
  },
];

export default function Vehicles() {
  const [vehicles, setVehicles] = useState(ownerVehiclesList);
  const [activeTab, setActiveTab] = useState('REGISTRY'); // 'REGISTRY' | 'FUEL_AUDIT'
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState(null);
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
          onClick={() => setSelectedVehicleForDetails(row)}
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
          <h1>Training Vehicle Fleet & Operational Audit</h1>
          <p>
            Monitor dual-control pedal inspection certificates, RTO fitness validity, and daily trainer fuel & odometer logs.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="messages-channel-tabs">
        <button
          type="button"
          className={`channel-tab-btn ${activeTab === 'REGISTRY' ? 'active' : ''}`}
          onClick={() => setActiveTab('REGISTRY')}
        >
          <Car size={15} />
          <span>Vehicle Registry & Compliance ({vehicles.length})</span>
        </button>

        <button
          type="button"
          className={`channel-tab-btn ${activeTab === 'FUEL_AUDIT' ? 'active' : ''}`}
          onClick={() => setActiveTab('FUEL_AUDIT')}
        >
          <Fuel size={15} />
          <span>Daily Fuel & Odometer Audit ({INITIAL_FUEL_AUDIT_LOGS.length})</span>
        </button>
      </div>

      {activeTab === 'REGISTRY' ? (
        /* 2. Vehicles Data Table */
        loading ? (
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
        )
      ) : (
        /* 3. Fuel & Odometer Audit Ledger */
        <div className="fuel-audit-panel">
          <div className="audit-header-strip">
            <div className="audit-summary-stat">
              <span className="lbl">Today's Fleet Distance:</span>
              <strong className="val tabular-nums">110 km Total</strong>
            </div>
            <div className="audit-summary-stat">
              <span className="lbl">Total Fuel Claimed:</span>
              <strong className="val tabular-nums">₹1,080 (10.2 Litres)</strong>
            </div>
            <div className="audit-summary-stat">
              <span className="lbl">Discrepancy Alerts:</span>
              <strong className="val text-amber tabular-nums">1 Flagged Entry</strong>
            </div>
          </div>

          <div className="fuel-audit-cards-stack">
            {INITIAL_FUEL_AUDIT_LOGS.map((log) => (
              <div key={log.id} className={`fuel-log-card ${log.auditStatus.toLowerCase()}`}>
                <div className="log-top-row">
                  <div className="log-vehicle-title">
                    <strong className="tabular-nums">{log.vehicleNo}</strong>
                    <span>•</span>
                    <span className="log-model">{log.model}</span>
                    <span>•</span>
                    <span className="log-trainer">Trainer: <strong>{log.trainer}</strong></span>
                  </div>

                  <span className={`log-status-pill ${log.auditStatus.toLowerCase()}`}>
                    {log.auditStatus === 'VERIFIED' ? 'Audit Verified' : 'Variance Flagged (+16 km)'}
                  </span>
                </div>

                <div className="log-metrics-grid">
                  <div className="metric-cell">
                    <span className="m-lbl">Start Odometer</span>
                    <strong className="m-val tabular-nums">{log.startKm} km</strong>
                  </div>
                  <div className="metric-cell">
                    <span className="m-lbl">End Odometer</span>
                    <strong className="m-val tabular-nums">{log.endKm} km</strong>
                  </div>
                  <div className="metric-cell">
                    <span className="m-lbl">Actual Driven</span>
                    <strong className="m-val tabular-nums">{log.actualKm} km</strong>
                  </div>
                  <div className="metric-cell">
                    <span className="m-lbl">Expected ({log.scheduledLessons} lessons)</span>
                    <strong className="m-val tabular-nums">{log.expectedKm} km ({log.varianceKm})</strong>
                  </div>
                  <div className="metric-cell">
                    <span className="m-lbl">Fuel Quantity</span>
                    <strong className="m-val tabular-nums">{log.fuelLitres} L (₹{log.fuelCost})</strong>
                  </div>
                  <div className="metric-cell">
                    <span className="m-lbl">Fuel Station & Bill</span>
                    <strong className="m-val" style={{ fontSize: '11px' }}>{log.pumpStation}</strong>
                  </div>
                </div>

                <div className="log-footer-row">
                  <span className="log-note">
                    <strong>Trainer Log:</strong> "{log.notes}"
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Fuel Voucher #${log.id} approved for expense ledger!`)}
                    className="btn-approve-voucher"
                  >
                    <CheckCircle2 size={13} />
                    <span>Approve Voucher</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Vehicle Details Dossier Modal */}
      {selectedVehicleForDetails && (
        <VehicleDetailModal
          vehicle={selectedVehicleForDetails}
          onClose={() => setSelectedVehicleForDetails(null)}
        />
      )}
    </div>
  );
}
