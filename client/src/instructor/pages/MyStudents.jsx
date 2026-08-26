import { useState } from 'react';
import { Users, MessageSquare, Search, Phone, CheckCircle, Award } from 'lucide-react';
import DataTable from '../../admin/components/DataTable';
import StatusPill from '../../admin/components/StatusPill';
import AddNoteModal from '../components/AddNoteModal';
import { instructorAssignedStudents } from '../data/dummyData';
import './MyStudents.css';

export default function MyStudents() {
  const [students, setStudents] = useState(instructorAssignedStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNoteStudent, setActiveNoteStudent] = useState(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveNote = (studentId, noteText) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, latestFeedback: noteText } : s
      )
    );
    alert(`Feedback note published to student's Learner Portal!`);
  };

  const columns = [
    {
      header: 'Learner & Contact',
      render: (row) => (
        <div className="ins-student-cell">
          <strong>{row.name}</strong>
          <span className="ins-phone-sub tabular-nums">{row.phone} • ID: {row.id}</span>
        </div>
      ),
    },
    {
      header: 'Enrolled Course',
      accessor: 'course',
    },
    {
      header: 'Curriculum Progress',
      render: (row) => (
        <div className="ins-progress-cell">
          <div className="ins-progress-track">
            <div 
              className={`ins-progress-fill ${row.progress === 100 ? 'done' : ''}`}
              style={{ width: `${row.progress}%` }}
            ></div>
          </div>
          <span className="ins-progress-lbl tabular-nums">{row.progress}%</span>
        </div>
      ),
    },
    {
      header: 'Last Session',
      accessor: 'lastSession',
    },
    {
      header: 'Training Status',
      render: (row) => <StatusPill status={row.status} />,
    },
    {
      header: 'Trainer Feedback',
      render: (row) => (
        <button
          onClick={() => setActiveNoteStudent(row)}
          className="btn-open-notes"
          title="Add or update session feedback"
        >
          <MessageSquare size={13} />
          <span>Feedback Notes</span>
        </button>
      ),
    },
  ];

  return (
    <div className="instructor-students-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>My Assigned Learners Roster</h1>
          <p>
            Track student batch progress, review driving milestones, and submit practical session guidance.
          </p>
        </div>
      </div>

      {/* 2. Students Table */}
      <div className="instructor-table-panel">
        <DataTable
          columns={columns}
          data={filteredStudents}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search assigned learners by name or phone..."
          emptyMessage="No assigned students yet. New learners assigned to you by the school will appear here."
        />
      </div>

      {/* 3. Add Note Modal */}
      {activeNoteStudent && (
        <AddNoteModal
          student={activeNoteStudent}
          onClose={() => setActiveNoteStudent(null)}
          onSaveNote={handleSaveNote}
        />
      )}
    </div>
  );
}
