import { useState } from 'react';
import { Award, ShieldAlert, FileText, Bell, CheckCircle2 } from 'lucide-react';
import ChatWindow from '../../shared/components/ChatWindow';
import { INITIAL_CONVERSATIONS } from '../../shared/data/messagesData';
import './Messages.css';

export default function Messages() {
  const [activeTab, setActiveTab] = useState('INSTRUCTORS'); // 'INSTRUCTORS' | 'ADMIN'

  const instructorConvs = INITIAL_CONVERSATIONS.filter((c) => c.type === 'INSTRUCTOR_OWNER');
  const adminConvs = INITIAL_CONVERSATIONS.filter((c) => c.type === 'OWNER_ADMIN');

  const displayedConversations = activeTab === 'INSTRUCTORS' ? instructorConvs : adminConvs;

  return (
    <div className="owner-messages-page">
      <div className="admin-view-header">
        <div>
          <h1>Operations Dispatch & Regulatory Notices</h1>
          <p>
            Communicate directly with your certified driving instructors and receive official compliance advisories from DriveLearn Super Admin.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="messages-channel-tabs">
        <button
          className={`channel-tab-btn ${activeTab === 'INSTRUCTORS' ? 'active' : ''}`}
          onClick={() => setActiveTab('INSTRUCTORS')}
        >
          <Award size={16} />
          <span>School Instructors ({instructorConvs.length})</span>
        </button>

        <button
          className={`channel-tab-btn ${activeTab === 'ADMIN' ? 'active' : ''}`}
          onClick={() => setActiveTab('ADMIN')}
        >
          <ShieldAlert size={16} />
          <span>Super Admin & Compliance Notices ({adminConvs.length})</span>
        </button>
      </div>

      {/* Chat Window */}
      <ChatWindow
        key={activeTab}
        conversations={displayedConversations}
        currentUserRole="OWNER"
        currentUserId="usr-owner-1"
        portalTitle={activeTab === 'INSTRUCTORS' ? 'Instructor Dispatch & Fleet Line' : 'Super Admin Regulatory Desk'}
        emptyStateText={
          activeTab === 'INSTRUCTORS'
            ? 'Select an instructor to review fleet reports and shift updates'
            : 'Select the compliance channel to view official advisories'
        }
      />
    </div>
  );
}
