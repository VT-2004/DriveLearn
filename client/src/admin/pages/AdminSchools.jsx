import { useState } from 'react';
import { 
  Building2, Search, Filter, ShieldCheck, CheckCircle2, 
  MapPin, Phone, ExternalLink, Plus 
} from 'lucide-react';
import './AdminSchools.css';

export default function AdminSchools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [schools, setSchools] = useState([
    {
      id: 'sch-1',
      name: 'Sai Motor & 2-Wheeler Training School',
      rtoApprovalNo: 'MH-12/DS/2014/889',
      city: 'Pune',
      address: 'Karve Road, Kothrud',
      ownerName: 'Rajesh Patil',
      phone: '+91 98230 45678',
      enrolledLearners: 420,
      status: 'VERIFIED',
      startingPrice: 999,
      femaleInstructor: true,
    },
    {
      id: 'sch-2',
      name: 'Apex Rider & Motor Driving Academy',
      rtoApprovalNo: 'MH-02/DS/2016/412',
      city: 'Mumbai',
      address: 'Link Road, Andheri West',
      ownerName: 'Rohan Mehta',
      phone: '+91 99201 88345',
      enrolledLearners: 312,
      status: 'VERIFIED',
      startingPrice: 999,
      femaleInstructor: true,
    },
    {
      id: 'sch-3',
      name: 'Deccan Safe Steer Motor Institute',
      rtoApprovalNo: 'MH-14/DS/2018/671',
      city: 'Pune',
      address: 'Hinjewadi Phase 1 & Wakad',
      ownerName: 'Sunil Jagtap',
      phone: '+91 97654 11223',
      enrolledLearners: 285,
      status: 'VERIFIED',
      startingPrice: 999,
      femaleInstructor: false,
    },
    {
      id: 'sch-4',
      name: 'Nagpur Central Rider School',
      rtoApprovalNo: 'MH-31/DS/2019/554',
      city: 'Nagpur',
      address: 'Dharampeth Main Road',
      ownerName: 'Vilas Raut',
      phone: '+91 94221 88990',
      enrolledLearners: 198,
      status: 'VERIFIED',
      startingPrice: 999,
      femaleInstructor: true,
    },
    {
      id: 'sch-5',
      name: 'Nashik Godavari Motor Training',
      rtoApprovalNo: 'MH-15/DS/2012/321',
      city: 'Nashik',
      address: 'College Road',
      ownerName: 'Pravin Joshi',
      phone: '+91 98220 77112',
      enrolledLearners: 165,
      status: 'VERIFIED',
      startingPrice: 999,
      femaleInstructor: false,
    },
    {
      id: 'sch-6',
      name: 'Thane Lake City Driving Academy',
      rtoApprovalNo: 'MH-04/DS/2017/582',
      city: 'Thane',
      address: 'Naupada, Near Talao Pali',
      ownerName: 'Sanjay More',
      phone: '+91 98205 66443',
      enrolledLearners: 220,
      status: 'VERIFIED',
      startingPrice: 999,
      femaleInstructor: true,
    },
  ]);

  const filteredSchools = schools.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rtoApprovalNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || s.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="admin-schools-page">
      {/* 1. Header */}
      <div className="schools-header-row">
        <div>
          <h2>Partner Driving Schools Network</h2>
          <p>Manage verified RTO partner institutes across Maharashtra transport hubs.</p>
        </div>
      </div>

      {/* 2. Filter & Search Controls */}
      <div className="schools-controls-bar">
        <div className="admin-search-input-wrap">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by school name or RTO License (e.g. MH-12)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="admin-city-select"
        >
          <option value="">All Maharashtra Hubs</option>
          <option value="Pune">Pune</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Nashik">Nashik</option>
          <option value="Thane">Thane</option>
        </select>
      </div>

      {/* 3. Schools Table */}
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>School & Hub</th>
              <th>RTO License No.</th>
              <th>Owner & Contact</th>
              <th>Active Students</th>
              <th>Launch Fee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchools.map((school) => (
              <tr key={school.id}>
                <td>
                  <div className="school-name-cell">
                    <strong>{school.name}</strong>
                    <span><MapPin size={12} /> {school.address}, {school.city}</span>
                  </div>
                </td>
                <td>
                  <span className="rto-badge">{school.rtoApprovalNo}</span>
                </td>
                <td>
                  <div className="owner-cell">
                    <span>{school.ownerName}</span>
                    <span className="owner-phone"><Phone size={11} /> {school.phone}</span>
                  </div>
                </td>
                <td>
                  <strong>{school.enrolledLearners} Learners</strong>
                </td>
                <td>
                  <span className="price-badge">₹{school.startingPrice}</span>
                </td>
                <td>
                  <span className="status-verified-badge">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
