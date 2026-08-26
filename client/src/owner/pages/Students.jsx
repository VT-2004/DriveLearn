import { useState, useEffect } from 'react';
import { Search, Plus, Download, Eye, User, Phone, BookOpen, CheckCircle } from 'lucide-react';
import DataTable from '../../admin/components/DataTable';
import StatusPill from '../../admin/components/StatusPill';
import SkeletonLoader from '../../admin/components/SkeletonLoader';
import EmptyState from '../../admin/components/EmptyState';
import { ownerStudentsList } from '../data/dummyData';
import './Students.css';

export default function Students() {
  const [students, setStudents] = useState(ownerStudentsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState({ field: 'progress', direction: 'desc' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field) => {
    setSortBy((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || s.enrollmentStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy.field === 'progress') {
      return sortBy.direction === 'asc' ? a.progress - b.progress : b.progress - a.progress;
    }
    if (sortBy.field === 'startDate') {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return sortBy.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const columns = [
    {
      header: 'Student & Contact',
      render: (row) => (
        <div className="student-name-cell">
          <strong>{row.name}</strong>
          <span className="student-phone-sub tabular-nums">{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Enrolled Course',
      render: (row) => (
        <div className="student-course-cell">
          <span>{row.course}</span>
          <span className="vehicle-type-tag">{row.vehicleType}</span>
        </div>
      ),
    },
    {
      header: 'Assigned Instructor',
      accessor: 'instructor',
    },
    {
      header: 'Start Date',
      accessor: 'startDate',
      sortable: true,
      sortField: 'startDate',
      isNumeric: true,
    },
    {
      header: 'Course Progress',
      sortable: true,
      sortField: 'progress',
      isNumeric: true,
      render: (row) => (
        <div className="student-progress-cell">
          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${row.progress === 100 ? 'complete' : ''}`}
              style={{ width: `${row.progress}%` }}
            ></div>
          </div>
          <span className="progress-percent-lbl tabular-nums">{row.progress}%</span>
        </div>
      ),
    },
    {
      header: 'Payment',
      render: (row) => <StatusPill status={row.paymentStatus} />,
    },
    {
      header: 'Enrollment',
      render: (row) => <StatusPill status={row.enrollmentStatus} />,
    },
    {
      header: 'Action',
      render: (row) => (
        <button
          onClick={() => alert(`Inspecting learner dossier for ${row.name}\nAssigned Instructor: ${row.instructor}\nProgress: ${row.progress}% completed.`)}
          className="btn-inspect-student"
          title="View Student Dossier"
        >
          <Eye size={14} />
          <span>View</span>
        </button>
      ),
    },
  ];

  const extraToolbar = (
    <div className="students-toolbar-extra">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="admin-select-filter"
      >
        <option value="ALL">All Enrollments</option>
        <option value="active">Active On-Track</option>
        <option value="completed">Completed DL</option>
      </select>

      <button
        onClick={() => alert('Exporting student enrollment roster to CSV...')}
        className="btn-toolbar-secondary"
      >
        <Download size={14} />
        <span>Export CSV</span>
      </button>

      <button
        onClick={() => alert('Opening Add New Student enrollment form...')}
        className="btn-toolbar-primary"
      >
        <Plus size={14} />
        <span>Add Student</span>
      </button>
    </div>
  );

  return (
    <div className="owner-students-page">
      {/* 1. View Header */}
      <div className="admin-view-header">
        <div>
          <h1>Student Enrollment Roster</h1>
          <p>
            Track student batch progress, dual-control trainer assignments, and RTO test readiness.
          </p>
        </div>
      </div>

      {/* 2. Data Table */}
      {loading ? (
        <SkeletonLoader rows={6} height={52} />
      ) : sortedStudents.length === 0 ? (
        <EmptyState
          title="No students found"
          message={`No records match query "${searchTerm}".`}
          ctaText="Reset Filter"
          onCtaClick={() => {
            setSearchTerm('');
            setStatusFilter('ALL');
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={sortedStudents}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search students by name, phone, course, or trainer..."
          extraToolbar={extraToolbar}
          sortBy={sortBy}
          onSort={handleSort}
        />
      )}
    </div>
  );
}
