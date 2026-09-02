import { useState } from 'react';
import { ShieldCheck, Building2, AlertTriangle, Send, Bell } from 'lucide-react';
import ChatWindow from '../../shared/components/ChatWindow';
import { INITIAL_CONVERSATIONS } from '../../shared/data/messagesData';
import './Messages.css';

export default function Messages() {
  const adminConversations = INITIAL_CONVERSATIONS.filter((c) => c.type === 'OWNER_ADMIN');

  return (
    <div className="admin-messages-page">
      <div className="admin-view-header">
        <div>
          <h1>Driving School Communications & Official Advisories</h1>
          <p>
            Issue regulatory compliance notices, monitor Form 5A instructor licenses, and communicate directly with Maharashtra school owners.
          </p>
        </div>

        <div className="compliance-authority-badge">
          <ShieldCheck size={16} color="#15803D" />
          <span>Maharashtra RTO Regulatory Dispatch</span>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="admin-advisory-banner">
        <div className="adv-left">
          <div className="adv-icon">
            <Bell size={20} color="var(--admin-warning-text, #b45309)" />
          </div>
          <div>
            <strong>Legal Audit Protocol Active</strong>
            <p>
              All messages sent from the Super Admin portal are timestamped with digital SHA-256 logs for CMVR 1989 regulatory compliance and court audit admissibility.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <ChatWindow
        conversations={adminConversations}
        currentUserRole="ADMIN"
        currentUserId="usr-admin-1"
        portalTitle="Official School Regulatory Desk"
        emptyStateText="Select a registered driving school to view compliance messages and issue advisories"
      />
    </div>
  );
}
