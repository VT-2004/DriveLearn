import { useState } from 'react';
import { Menu, Bell, User, ShieldCheck, Award } from 'lucide-react';
import { useAuth } from '../../shared/context/AuthContext';
import { instructorProfileData } from '../data/dummyData';
import './Header.css';

export default function Header({ onToggleSidebar }) {
  const { user } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);

  const trainerName = user?.name || instructorProfileData.name;

  return (
    <header className="instructor-portal-header">
      <div className="header-left">
        <button 
          onClick={onToggleSidebar} 
          className="btn-mobile-menu"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <div className="trainer-school-chip">
          <Award size={15} color="var(--color-primary, #B91C1C)" />
          <span>{instructorProfileData.assignedSchool}</span>
        </div>
      </div>

      <div className="header-right">
        {/* Trainer Identity Chip */}
        <div className="trainer-identity-chip">
          <div className="trainer-avatar">
            {trainerName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="trainer-meta">
            <span className="trainer-name">{trainerName}</span>
            <span className="trainer-role">Certified Trainer • {instructorProfileData.licenseNo}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
