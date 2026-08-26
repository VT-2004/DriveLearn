import { useState } from 'react';
import { Plus, Search, Award, ShieldCheck, X, Check } from 'lucide-react';
import InstructorCard from '../components/InstructorCard';
import { ownerInstructorsList } from '../data/dummyData';
import './Instructors.css';

export default function Instructors() {
  const [instructors, setInstructors] = useState(ownerInstructorsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    role: 'Certified Driving Instructor',
    phone: '',
    licenseNo: '',
    experience: 5,
    specialization: 'Two-Wheeler & City Roads',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: `INS-0${instructors.length + 1}`,
      ...newInstructor,
      rating: 5.0,
      studentCount: 0,
      todayCount: 0,
      status: 'active',
    };
    setInstructors([created, ...instructors]);
    setShowAddModal(false);
    setNewInstructor({
      name: '',
      role: 'Certified Driving Instructor',
      phone: '',
      licenseNo: '',
      experience: 5,
      specialization: 'Two-Wheeler & City Roads',
    });
  };

  const filteredInstructors = instructors.filter(
    (ins) =>
      ins.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ins.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ins.licenseNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="owner-instructors-page">
      {/* 1. Header */}
      <div className="admin-view-header">
        <div>
          <h1>Certified Instructors Fleet</h1>
          <p>
            Manage certified trainers, monitor student satisfaction ratings, and assign daily training loads.
          </p>
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="instructors-toolbar-bar">
        <div className="instructors-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search instructors by name, RTO license, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button onClick={() => setShowAddModal(true)} className="btn-toolbar-primary">
          <Plus size={15} />
          <span>Add Instructor</span>
        </button>
      </div>

      {/* 3. Instructors Card Grid */}
      <div className="instructors-cards-grid">
        {filteredInstructors.map((ins) => (
          <InstructorCard
            key={ins.id}
            instructor={ins}
            onScheduleClick={(i) => alert(`Opening active timetable for ${i.name} (Today: ${i.todayCount} practical batches).`)}
            onViewProfile={(i) => alert(`Instructor Dossier:\nName: ${i.name}\nRTO License: ${i.licenseNo}\nExperience: ${i.experience} Years\nSpecialty: ${i.specialization}`)}
          />
        ))}
      </div>

      {/* 4. Add Instructor Modal */}
      {showAddModal && (
        <div className="owner-modal-backdrop">
          <div className="owner-modal-dialog">
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Award size={18} color="var(--color-primary, #B91C1C)" />
                <h3>Onboard Certified Instructor</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="btn-close-modal">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="modal-form">
              <div className="modal-form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Anand Kulkarni"
                    value={newInstructor.name}
                    onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98220 00000"
                    value={newInstructor.phone}
                    onChange={(e) => setNewInstructor({ ...newInstructor, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>RTO Instructor License No.</label>
                  <input
                    type="text"
                    placeholder="e.g. MH-12-INS-2024-889"
                    value={newInstructor.licenseNo}
                    onChange={(e) => setNewInstructor({ ...newInstructor, licenseNo: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Experience (Years)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={newInstructor.experience}
                    onChange={(e) => setNewInstructor({ ...newInstructor, experience: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Training Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Female specialist, 8-track maneuvers, Karve Road clutch technique"
                  value={newInstructor.specialization}
                  onChange={(e) => setNewInstructor({ ...newInstructor, specialization: e.target.value })}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAddModal(false)} className="btn-cancel-modal">
                  Cancel
                </button>
                <button type="submit" className="btn-submit-modal">
                  <Check size={16} />
                  <span>Save & Onboard Instructor</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
