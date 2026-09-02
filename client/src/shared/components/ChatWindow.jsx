import { useState, useRef, useEffect } from 'react';
import { 
  Send, Search, ShieldCheck, User, Clock, AlertCircle, 
  MessageSquare, CheckCheck, Sparkles, ChevronLeft, PhoneCall, MapPin 
} from 'lucide-react';
import './ChatWindow.css';

export default function ChatWindow({ 
  conversations = [], 
  currentUserRole = 'LEARNER',
  currentUserId = 'usr-learner-1',
  portalTitle = 'Secure Communications Hub',
  emptyStateText = 'Select a conversation to begin messaging'
}) {
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || null);
  const [convList, setConvList] = useState(conversations);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);
  
  const messagesEndRef = useRef(null);

  const activeConversation = convList.find((c) => c.id === activeConvId);

  // Auto-scroll to bottom of active message stream
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || messageInput).trim();
    if (!text || !activeConversation) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderName: 'You',
      text,
      timestamp: 'Just now',
      isMe: true,
    };

    setConvList((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastActivity: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    setMessageInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to determine the other participant's display name and subtitle
  const getPartnerMeta = (conv) => {
    if (!conv) return { name: '', role: '', sub: '' };

    if (conv.type === 'LEARNER_INSTRUCTOR') {
      if (currentUserRole === 'LEARNER') {
        return {
          name: conv.participants.instructor.name,
          role: conv.participants.instructor.role,
          sub: conv.participants.instructor.school,
        };
      }
      return {
        name: conv.participants.learner.name,
        role: conv.participants.learner.role,
        sub: conv.participants.learner.city,
      };
    }

    if (conv.type === 'INSTRUCTOR_OWNER') {
      if (currentUserRole === 'INSTRUCTOR') {
        return {
          name: conv.participants.owner.name,
          role: conv.participants.owner.role,
          sub: conv.participants.owner.school,
        };
      }
      return {
        name: conv.participants.instructor.name,
        role: conv.participants.instructor.role,
        sub: `License: ${conv.participants.instructor.licenseNo}`,
      };
    }

    if (conv.type === 'OWNER_ADMIN') {
      if (currentUserRole === 'OWNER') {
        return {
          name: conv.participants.admin.name,
          role: conv.participants.admin.role,
          sub: conv.participants.admin.badge,
        };
      }
      return {
        name: conv.participants.owner.name,
        role: conv.participants.owner.role,
        sub: conv.participants.owner.city,
      };
    }

    return { name: 'Chat Member', role: '', sub: '' };
  };

  const filteredConversations = convList.filter((c) => {
    const meta = getPartnerMeta(c);
    return (
      meta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meta.sub.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const partnerMeta = getPartnerMeta(activeConversation);

  return (
    <div className="chat-window-shell">
      {/* LEFT PANE: Conversation List */}
      <div className={`chat-sidebar-pane ${mobileShowChat ? 'hide-mobile' : ''}`}>
        <div className="chat-search-header">
          <div className="search-input-wrap">
            <Search size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="conversations-scroll-list">
          {filteredConversations.length === 0 ? (
            <div className="no-convs-state">
              <p>No matching conversations found.</p>
            </div>
          ) : (
            filteredConversations.map((c) => {
              const meta = getPartnerMeta(c);
              const lastMsg = c.messages[c.messages.length - 1];
              const isSelected = c.id === activeConvId;

              return (
                <div
                  key={c.id}
                  className={`conversation-item ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setActiveConvId(c.id);
                    setMobileShowChat(true);
                  }}
                >
                  <div className="conv-avatar">
                    {meta.name.charAt(0)}
                  </div>

                  <div className="conv-meta-wrap">
                    <div className="conv-top-row">
                      <strong className="conv-name">{meta.name}</strong>
                      <span className="conv-time tabular-nums">{c.lastActivity}</span>
                    </div>

                    <span className="conv-role-badge">{meta.role}</span>

                    <p className="conv-preview-snippet">
                      {lastMsg ? lastMsg.text : 'Start chatting...'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT PANE: Message Stream & Input */}
      <div className={`chat-active-pane ${!mobileShowChat ? 'hide-mobile-chat' : ''}`}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="chat-thread-header">
              <button 
                className="btn-back-to-list" 
                onClick={() => setMobileShowChat(false)}
                aria-label="Back to conversations"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="chat-partner-info">
                <div className="partner-name-row">
                  <h3>{partnerMeta.name}</h3>
                  <span className="partner-role-pill">{partnerMeta.role}</span>
                </div>
                <span className="partner-sub-text">{partnerMeta.sub}</span>
              </div>

              <div className="chat-header-actions">
                <span className="verified-channel-badge">
                  <ShieldCheck size={14} color="#15803D" />
                  <span>Official In-App Channel</span>
                </span>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="chat-messages-container">
              {activeConversation.messages.map((m) => {
                const isMine = m.senderId === currentUserId || m.isMe;

                return (
                  <div key={m.id} className={`message-row ${isMine ? 'mine' : 'theirs'}`}>
                    <div className="message-bubble">
                      {m.isOfficialNotice && (
                        <div className="official-notice-flag">
                          <AlertCircle size={13} />
                          <span>{m.noticeTag || 'OFFICIAL COMPLIANCE NOTICE'}</span>
                        </div>
                      )}

                      {!isMine && <span className="message-sender-name">{m.senderName}</span>}
                      
                      <p className="message-text">{m.text}</p>

                      <div className="message-meta-footer">
                        <span className="message-time tabular-nums">{m.timestamp}</span>
                        {isMine && <CheckCheck size={14} color="#3b82f6" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Action Chips */}
            {activeConversation.quickReplies && activeConversation.quickReplies.length > 0 && (
              <div className="chat-quick-replies-bar">
                <span className="quick-lbl">Quick reply:</span>
                <div className="quick-replies-scroll">
                  {activeConversation.quickReplies.map((qr, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="quick-chip-btn"
                      onClick={() => handleSendMessage(qr)}
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input Bar */}
            <div className="chat-input-container">
              <textarea
                rows={1}
                placeholder="Type your message (Enter to send)..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button 
                type="button" 
                className="btn-send-message" 
                onClick={() => handleSendMessage()}
                disabled={!messageInput.trim()}
              >
                <Send size={16} />
                <span>Send</span>
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <MessageSquare size={48} color="#cbd5e1" />
            <p>{emptyStateText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
