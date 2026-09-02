import { useState } from 'react';
import { Users, Building2, ShieldCheck, MessageSquare, AlertTriangle } from 'lucide-react';
import ChatWindow from '../../shared/components/ChatWindow';
import { INITIAL_CONVERSATIONS } from '../../shared/data/messagesData';
import './Messages.css';

export default function Messages() {
  const [activeTab, setActiveTab] = useState('STUDENTS'); // 'STUDENTS' | 'OWNER'

  const studentConvs = INITIAL_CONVERSATIONS.filter((c) => c.type === 'LEARNER_INSTRUCTOR');
  const ownerConvs = INITIAL_CONVERSATIONS.filter((c) => c.type === 'INSTRUCTOR_OWNER');

  const displayedConversations = activeTab === 'STUDENTS' ? studentConvs : ownerConvs;

  return (
    <div className="instructor-messages-page">
      <div className="admin-view-header">
        <div>
          <h1>Trainer Communications & Dispatch</h1>
          <p>
            Coordinate roadside meetups with your assigned learners, and report fleet maintenance directly to the school owner.
          </p>
        </div>
      </div>

      {/* Channel Switcher Tabs */}
      <div className="messages-channel-tabs">
        <button
          className={`channel-tab-btn ${activeTab === 'STUDENTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('STUDENTS')}
        >
          <Users size={16} />
          <span>My Students ({studentConvs.length})</span>
        </button>

        <button
          className={`channel-tab-btn ${activeTab === 'OWNER' ? 'active' : ''}`}
          onClick={() => setActiveTab('OWNER')}
        >
          <Building2 size={16} />
          <span>School Owner Dispatch ({ownerConvs.length})</span>
        </button>
      </div>

      {/* Chat Window */}
      <ChatWindow
        key={activeTab}
        conversations={displayedConversations}
        currentUserRole="INSTRUCTOR"
        currentUserId="usr-inst-1"
        portalTitle={activeTab === 'STUDENTS' ? 'Student Training Chat' : 'School Owner Fleet Dispatch'}
        emptyStateText={
          activeTab === 'STUDENTS'
            ? 'Select a student to view on-track lesson messages'
            : 'Select the school management channel to view fleet reports'
        }
      />
    </div>
  );
}
