import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, CheckCircle2, XCircle, Eye, MapPin, Filter, UserCheck, Building, ShieldCheck, Award } from 'lucide-react';
import StatusPill from '../components/StatusPill';
import DataTable from '../components/DataTable';
import BulkActionBar from '../components/BulkActionBar';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { initialVerificationRequests } from '../data/dummyData';
import './SchoolVerification.css';

// Gap Audit: Instructor License Verification Data
const initialInstructorVerifications = [
  {
    id: 'ins-v-101',
    name: 'Sunita Deshmukh',
    schoolName: 'Sai Motor & 2-Wheeler Academy',
    city: 'Pune',
    rtoZone: 'MH-12 Pune Central',
    licenseNo: 'MH-12-INS-2018-9411',
    experience: '8 Years',
    submitted: '2026-08-19',
    status: 'verified',
    documents: ['Form 5A Certified Trainer', 'Aadhaar Card', 'RTO Medical Fitness Form 1A'],
  },
  {
    id: 'ins-v-102',
    name: 'Manoj Kulkarni',
    schoolName: 'Sai Motor & 2-Wheeler Academy',
    city: 'Pune',
    rtoZone: 'MH-12 Pune Central',
    licenseNo: 'MH-12-INS-2015-4491',
    experience: '12 Years',
    submitted: '2026-08-20',
    status: 'verified',
    documents: ['Form 5A Senior Trainer Certificate', 'Heavy/Light Dual Control Endorsement'],
  },
  {
    id: 'ins-v-103',
    name: 'Rahul V. Jadhav',
    schoolName: 'Apex Rider Training Academy',
    city: 'Mumbai',
    rtoZone: 'MH-02 Andheri West',
    licenseNo: 'MH-02-INS-2022-8114',
    experience: '4 Years',
    submitted: '2026-08-21',
    status: 'pending',
    documents: ['Form 5A Trainer License', 'Driving School Affidavit'],
  },
  {
    id: 'ins-v-104',
    name: 'Aarti Shinde',
    schoolName: 'Shivaji Driving School',
    city: 'Nashik',
    rtoZone: 'MH-15 Nashik RTO',
    licenseNo: 'MH-15-INS-2023-1109',
    experience: '3 Years',
    submitted: '2026-08-22',
    status: 'pending',
    documents: ['Form 5A Certification', 'Police Clearance Certificate'],
  },
];

export default function SchoolVerification() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const stateParam = searchParams.get('state') || 'Maharashtra';

  // Entity Scope: 'SCHOOLS' vs 'INSTRUCTORS' (Gap Audit Item #1)
  const [entityScope, setEntityScope] = useState('SCHOOLS');

  const [schools, setSchools] = useState(initialVerificationRequests);
  const [instructors, setInstructors] = useState(initialInstructorVerifications);
  const [activeTab, setActiveTab] = useState(
    tabParam && ['pending', 'under-review', 'verified', 'rejected'].includes(tabParam.toLowerCase())
      ? tabParam.charAt(0).toUpperCase() + tabParam.slice(1)
      : 'Pending'
  );
  const [selectedState, setSelectedState] = useState(stateParam);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortBy, setSortBy] = useState({ field: 'submitted', direction: 'desc' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, [activeTab, selectedState, entityScope]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab: tab.toLowerCase(), state: selectedState });
    setSelectedIds([]);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSearchParams({ tab: activeTab.toLowerCase(), state });
    setSelectedIds([]);
  };

  // 1. Filter by Tab & State based on Entity Scope
  const currentDataset = entityScope === 'SCHOOLS' ? schools : instructors;

  const tabFiltered = currentDataset.filter(
    (item) =>
      item.status.toLowerCase() === activeTab.toLowerCase() &&
      (selectedState === 'ALL' || (item.state || 'Maharashtra').toLowerCase() === selectedState.toLowerCase())
  );

  // 2. Filter by Search
  const searchFiltered = tabFiltered.filter((item) => {
    if (entityScope === 'SCHOOLS') {
      return (
        item.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rtoZone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.licenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  // 3. Sort
  const sortedItems = [...searchFiltered].sort((a, b) => {
    if (sortBy.field === 'submitted') {
      const dateA = new Date(a.submitted).getTime();
      const dateB = new Date(b.submitted).getTime();
      return sortBy.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleToggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === sortedItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedItems.map((s) => s.id));
    }
  };

  const handleVerify = (id) => {
    if (entityScope === 'SCHOOLS') {
      setSchools((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'verified' } : item))
      );
    } else {
      setInstructors((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'verified' } : item))
      );
    }
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleReject = (id) => {
    if (entityScope === 'SCHOOLS') {
      setSchools((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
      );
    } else {
      setInstructors((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item))
      );
    }
    setSelectedIds((prev) => prev.filter((i) => i !== id));
  };

  const handleBulkVerify = () => {
    if (entityScope === 'SCHOOLS') {
      setSchools((prev) =>
        prev.map((item) => (selectedIds.includes(item.id) ? { ...item, status: 'verified' } : item))
      );
    } else {
      setInstructors((prev) =>
        prev.map((item) => (selectedIds.includes(item.id) ? { ...item, status: 'verified' } : item))
      );
    }
    setSelectedIds([]);
  };

  const handleBulkReject = () => {
    if (entityScope === 'SCHOOLS') {
      setSchools((prev) =>
        prev.map((item) => (selectedIds.includes(item.id) ? { ...item, status: 'rejected' } : item))
      );
    } else {
      setInstructors((prev) =>
        prev.map((item) => (selectedIds.includes(item.id) ? { ...item, status: 'rejected' } : item))
      );
    }
    setSelectedIds([]);
  };

  const handleView = (item) => {
    if (entityScope === 'SCHOOLS') {
      alert(`Inspecting Dossier: ${item.schoolName}\nOwner: ${item.owner}\nRTO Zone: ${item.rtoZone}\nDocuments: ${item.documents.join(', ')}`);
    } else {
      alert(`Inspecting Trainer License: ${item.name}\nSchool: ${item.schoolName}\nLicense No: ${item.licenseNo}\nDocuments: ${item.documents.join(', ')}`);
    }
  };

  const tabs = ['Pending', 'Under Review', 'Verified', 'Rejected'];

  const schoolColumns = [
    {
      header: 'School Name',
      render: (row) => (
        <div className="school-col-cell">
          <strong>{row.schoolName}</strong>
          <span className="owner-subtext">Owner: {row.owner}</span>
        </div>
      ),
    },
    {
      header: 'Location & RTO Zone',
      render: (row) => (
        <span className="location-cell">
          <MapPin size={13} color="var(--admin-accent, #B91C1C)" /> {row.city} • {row.rtoZone}
        </span>
      ),
    },
    {
      header: 'Submitted Date',
      accessor: 'submitted',
      sortable: true,
      sortField: 'submitted',
      isNumeric: true,
    },
    {
      header: 'Documents',
      render: (row) => (
        <span className="doc-pill tabular-nums">
          <FileText size={13} /> {row.documents ? row.documents.length : 2} files
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="table-actions-cell">
          <button 
            onClick={() => handleView(row)} 
            className="btn-action-view" 
            title="Inspect documents"
          >
            <Eye size={14} />
            <span>View</span>
          </button>

          {row.status !== 'verified' && (
            <button 
              onClick={() => handleVerify(row.id)} 
              className="btn-action-verify" 
              title="Verify school"
            >
              <CheckCircle2 size={14} />
              <span>Verify</span>
            </button>
          )}

          {row.status !== 'rejected' && (
            <button 
              onClick={() => handleReject(row.id)} 
              className="btn-action-reject" 
              title="Reject application"
            >
              <XCircle size={14} />
              <span>Reject</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  const instructorColumns = [
    {
      header: 'Instructor Name & License',
      render: (row) => (
        <div className="school-col-cell">
          <strong>{row.name}</strong>
          <span className="owner-subtext tabular-nums">{row.licenseNo} • {row.experience}</span>
        </div>
      ),
    },
    {
      header: 'Affiliated School & City',
      render: (row) => (
        <div className="school-col-cell">
          <span>{row.schoolName}</span>
          <span className="owner-subtext"><MapPin size={11} style={{ display: 'inline' }} /> {row.city} ({row.rtoZone})</span>
        </div>
      ),
    },
    {
      header: 'Submitted Date',
      accessor: 'submitted',
      sortable: true,
      sortField: 'submitted',
      isNumeric: true,
    },
    {
      header: 'RTO Certifications',
      render: (row) => (
        <span className="doc-pill tabular-nums">
          <ShieldCheck size={13} color="#15803D" /> {row.documents.length} forms
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="table-actions-cell">
          <button onClick={() => handleView(row)} className="btn-action-view" title="Inspect certification">
            <Eye size={14} />
            <span>View</span>
          </button>
          {row.status !== 'verified' && (
            <button onClick={() => handleVerify(row.id)} className="btn-action-verify" title="Verify instructor">
              <CheckCircle2 size={14} />
              <span>Verify</span>
            </button>
          )}
          {row.status !== 'rejected' && (
            <button onClick={() => handleReject(row.id)} className="btn-action-reject" title="Reject license">
              <XCircle size={14} />
              <span>Reject</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  const extraToolbar = (
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
  );

  const pendingSchoolsCount = schools.filter((s) => s.status === 'pending').length;
  const pendingInstructorsCount = instructors.filter((i) => i.status === 'pending').length;

  return (
    <div className="admin-verification-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Government & RTO Verification Moderation</h1>
          <p>Inspect RTO driving school license credentials, verify dual-pedal vehicles, and approve certified instructor licenses.</p>
        </div>
      </div>

      {/* Entity Scope Switcher Tabs (Gap Audit Item #1) */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <button
          onClick={() => {
            setEntityScope('SCHOOLS');
            setSelectedIds([]);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '8px',
            backgroundColor: entityScope === 'SCHOOLS' ? 'var(--color-primary, #B91C1C)' : '#ffffff',
            color: entityScope === 'SCHOOLS' ? '#ffffff' : '#1a1a1a',
            border: `1.5px solid ${entityScope === 'SCHOOLS' ? 'var(--color-primary, #B91C1C)' : '#e5e5e5'}`,
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <Building size={16} />
          <span>Driving Schools</span>
          <span style={{
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '999px',
            backgroundColor: entityScope === 'SCHOOLS' ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
            color: entityScope === 'SCHOOLS' ? '#ffffff' : '#64748b'
          }}>
            {pendingSchoolsCount} Pending
          </span>
        </button>

        <button
          onClick={() => {
            setEntityScope('INSTRUCTORS');
            setSelectedIds([]);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            borderRadius: '8px',
            backgroundColor: entityScope === 'INSTRUCTORS' ? 'var(--color-primary, #B91C1C)' : '#ffffff',
            color: entityScope === 'INSTRUCTORS' ? '#ffffff' : '#1a1a1a',
            border: `1.5px solid ${entityScope === 'INSTRUCTORS' ? 'var(--color-primary, #B91C1C)' : '#e5e5e5'}`,
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <UserCheck size={16} />
          <span>Instructor Licenses</span>
          <span style={{
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '999px',
            backgroundColor: entityScope === 'INSTRUCTORS' ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
            color: entityScope === 'INSTRUCTORS' ? '#ffffff' : '#64748b'
          }}>
            {pendingInstructorsCount} Pending
          </span>
        </button>
      </div>

      {/* 2. Status Tab Bar */}
      <div className="verification-tabs-bar">
        {tabs.map((tab) => {
          const count = currentDataset.filter(
            (item) =>
              item.status.toLowerCase() === tab.toLowerCase() &&
              (selectedState === 'ALL' || (item.state || 'Maharashtra').toLowerCase() === selectedState.toLowerCase())
          ).length;

          return (
            <button
              key={tab}
              className={`verif-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              <span>{tab}</span>
              <span className="tab-count-badge tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedIds.length}
        onVerifyAll={handleBulkVerify}
        onRejectAll={handleBulkReject}
        onClear={() => setSelectedIds([])}
      />

      {/* 4. Loading / Empty / Populated Data Table */}
      {loading ? (
        <SkeletonLoader rows={5} height={52} />
      ) : sortedItems.length === 0 ? (
        <EmptyState
          title={`No ${entityScope === 'SCHOOLS' ? 'schools' : 'instructors'} under "${activeTab}" in ${selectedState}`}
          message="All submissions in this category have been processed or none have been submitted yet."
        />
      ) : (
        <DataTable
          columns={entityScope === 'SCHOOLS' ? schoolColumns : instructorColumns}
          data={sortedItems}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder={`Search ${activeTab.toLowerCase()} ${entityScope === 'SCHOOLS' ? 'schools' : 'instructors'} by name, city, or license...`}
          extraToolbar={extraToolbar}
          selectable={true}
          selectedIds={selectedIds}
          onToggleSelectRow={handleToggleSelectRow}
          onToggleSelectAll={handleToggleSelectAll}
          sortBy={sortBy}
          onSort={handleSort}
        />
      )}
    </div>
  );
}
