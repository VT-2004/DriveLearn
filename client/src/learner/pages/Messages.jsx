import { useState } from 'react';
import { MessageSquare, ShieldCheck, MapPin, Bike, Clock } from 'lucide-react';
import ChatWindow from '../../shared/components/ChatWindow';
import { INITIAL_CONVERSATIONS } from '../../shared/data/messagesData';
import './Messages.css';

export default function Messages() {
  // Current logged in learner: Pooja Kulkarni ('usr-learner-1')
  // Receives 1-to-1 threads from all certified instructors assigned to her (e.g. 2W & 4W)
  const currentLearnerId = 'usr-learner-1';
  const learnerConversations = INITIAL_CONVERSATIONS.filter(
    (c) => c.type === 'LEARNER_INSTRUCTOR' && c.participants.learner?.id === currentLearnerId
  );

  return (
    <div className="learner-messages-page">
      <div className="admin-view-header">
        <div>
          <h1>Instructor Direct Coordination Line</h1>
          <p>
            Private, in-app messaging with your certified driving instructor for lesson ETA, track meetups, and queries.
          </p>
        </div>

        <div className="security-notice-chip">
          <ShieldCheck size={16} color="#15803D" />
          <span>Number Masked for Student Safety</span>
        </div>
      </div>

      {/* Quick Location Alert Banner */}
      <div className="track-location-banner">
        <div className="loc-banner-left">
          <div className="loc-icon-bubble">
            <MapPin size={20} color="var(--color-primary, #B91C1C)" />
          </div>
          <div>
            <strong>Today’s Meeting Point: Garware College Ground (Gate 2)</strong>
            <p>Karve Road, Pune · Next practical session at 04:00 PM with Sunita Deshmukh</p>
          </div>
        </div>
        <div className="loc-batch-time tabular-nums">
          <Clock size={13} />
          <span>Batch: 04:00 PM - 04:45 PM</span>
        </div>
      </div>

      {/* Chat Window Component */}
      <ChatWindow
        conversations={learnerConversations}
        currentUserRole="LEARNER"
        currentUserId="usr-learner-1"
        portalTitle="Learner ↔ Instructor Chat"
        emptyStateText="Select your assigned instructor to start messaging"
      />
    </div>
  );
}
