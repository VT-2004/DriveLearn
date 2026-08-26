import { useState } from 'react';
import { Users, Search, Filter, Wallet, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import './AdminUsers.css';

export default function AdminUsers() {
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const [users] = useState([
    {
      id: 'u-1',
      name: 'Pooja Kulkarni',
      email: 'pooja.kulkarni@gmail.com',
      phone: '+91 98230 11223',
      role: 'LEARNER',
      city: 'Pune',
      walletBalance: 15.0,
      joinedDate: '20 Aug 2026',
      enrolledCourse: 'Two-Wheeler Practical Track',
    },
    {
      id: 'u-2',
      name: 'Rajesh Patil',
      email: 'owner@saimotorspune.in',
      phone: '+91 98230 45678',
      role: 'OWNER',
      city: 'Pune',
      walletBalance: 15.0,
      joinedDate: '20 Aug 2026',
      enrolledCourse: 'Sai Motor & 2-Wheeler Training',
    },
    {
      id: 'u-3',
      name: 'Sunita Deshmukh',
      email: 'sunita.trainer@saimotors.in',
      phone: '+91 98230 99887',
      role: 'INSTRUCTOR',
      city: 'Pune',
      walletBalance: 15.0,
      joinedDate: '20 Aug 2026',
      enrolledCourse: 'Lead 2-Wheeler Instructor',
    },
    {
      id: 'u-4',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      phone: '+91 99201 55443',
      role: 'LEARNER',
      city: 'Mumbai',
      walletBalance: 0.0,
      joinedDate: '19 Aug 2026',
      enrolledCourse: 'Four-Wheeler Car Training',
    },
    {
      id: 'u-5',
      name: 'Aakash Deshmukh',
      email: 'aakash.d@gmail.com',
      phone: '+91 94221 77665',
      role: 'LEARNER',
      city: 'Nagpur',
      walletBalance: 15.0,
      joinedDate: '21 Aug 2026',
      enrolledCourse: 'Two-Wheeler Fast Track',
    },
  ]);

  const filteredUsers = users.filter((u) => {
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                        u.email.toLowerCase().includes(search.toLowerCase()) ||
                        u.phone.includes(search);
    return matchRole && matchSearch;
  });

  return (
    <div className="admin-users-page">
      <div className="users-header-row">
        <div>
          <h2>User Directory & In-App Wallets</h2>
          <p>Inspect registered Learners, Driving School Owners, and Instructors across Maharashtra.</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="users-controls-bar">
        <div className="admin-search-input-wrap">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by name, email, or mobile number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="role-filter-pills">
          {['ALL', 'LEARNER', 'OWNER', 'INSTRUCTOR'].map((r) => (
            <button
              key={r}
              className={`pill-btn ${roleFilter === r ? 'active' : ''}`}
              onClick={() => setRoleFilter(r)}
            >
              {r === 'ALL' ? 'All Roles' : r.charAt(0) + r.slice(1).toLowerCase() + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>User Details</th>
              <th>Role</th>
              <th>Contact Info</th>
              <th>City / Hub</th>
              <th>Wallet Balance</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-name-cell">
                    <strong>{user.name}</strong>
                    <span>{user.enrolledCourse}</span>
                  </div>
                </td>
                <td>
                  <span className={`role-tag role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="contact-cell">
                    <span><Mail size={12} /> {user.email}</span>
                    <span><Phone size={12} /> {user.phone}</span>
                  </div>
                </td>
                <td>
                  <span><MapPin size={12} /> {user.city}, MH</span>
                </td>
                <td>
                  <span className={`wallet-cell-pill ${user.walletBalance > 0 ? 'has-balance' : 'zero'}`}>
                    <Wallet size={12} /> ₹{user.walletBalance.toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className="join-date">{user.joinedDate}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
