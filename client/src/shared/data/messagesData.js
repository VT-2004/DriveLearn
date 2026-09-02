// Shared Role-Based Messaging Data for DriveLearn India
// Authentic Maharashtra driving school context: Warje 8-track, Karve Road, Swift dual control, RTO Form 5A

export const INITIAL_CONVERSATIONS = [
  // 1. Learner (Pooja Kulkarni) ↔ Trainer 1: Sunita Deshmukh (2-Wheeler Specialist)
  {
    id: 'conv-learner-instructor-1',
    type: 'LEARNER_INSTRUCTOR',
    participants: {
      learner: { id: 'usr-learner-1', name: 'Pooja Kulkarni', role: 'Learner (Combo)', city: 'Pune (Kothrud)' },
      instructor: { id: 'usr-inst-1', name: 'Sunita Deshmukh', role: '2-Wheeler Track Specialist', school: 'Sai Motor Academy' },
    },
    unreadCount: 1,
    lastActivity: '10:45 AM',
    quickReplies: [
      'Waiting at Garware College Gate 2',
      'Stuck in Karve Road traffic, 5 min delay',
      'Should I bring my Form 2 LL printout?',
      'Cleared the 8-track curve without stalling!'
    ],
    messages: [
      {
        id: 'm1',
        senderId: 'usr-learner-1',
        senderName: 'Pooja Kulkarni',
        text: 'Good morning Sunita ma’am! Should I wait at Garware College Gate 2 for today’s 04:00 PM 2-wheeler session?',
        timestamp: '10:15 AM',
        isMe: false,
      },
      {
        id: 'm2',
        senderId: 'usr-inst-1',
        senderName: 'Sunita Deshmukh',
        text: 'Yes Pooja! Please reach by 03:55 PM. Today we are heading to the Warje ground to practice the reverse S-track and slope clutch biting point.',
        timestamp: '10:20 AM',
        isMe: false,
      },
      {
        id: 'm3',
        senderId: 'usr-learner-1',
        senderName: 'Pooja Kulkarni',
        text: 'Understood ma’am! I have my BIS-certified helmet ready as well.',
        timestamp: '10:22 AM',
        isMe: false,
      },
      {
        id: 'm4',
        senderId: 'usr-inst-1',
        senderName: 'Sunita Deshmukh',
        text: 'Great! See you at 03:55 PM near the gate.',
        timestamp: '10:45 AM',
        isMe: false,
      },
    ],
  },

  // 2. Learner (Pooja Kulkarni) ↔ Trainer 2: Rahul Shinde (4-Wheeler Car Specialist)
  {
    id: 'conv-learner-instructor-2',
    type: 'LEARNER_INSTRUCTOR',
    participants: {
      learner: { id: 'usr-learner-1', name: 'Pooja Kulkarni', role: 'Learner (Combo)', city: 'Pune (Kothrud)' },
      instructor: { id: 'usr-inst-2', name: 'Rahul Shinde', role: '4-Wheeler Car Specialist', school: 'Sai Motor Academy' },
    },
    unreadCount: 0,
    lastActivity: 'Yesterday',
    quickReplies: [
      'Ready for dual-control car practice',
      'Got my Parivahan LMV Learner License',
      'At Kothrud Metro Pillar Ring'
    ],
    messages: [
      {
        id: 'm21',
        senderId: 'usr-learner-1',
        senderName: 'Pooja Kulkarni',
        text: 'Namaste Rahul sir! Since I am enrolled in the Combo Package, when does our 4-wheeler practical driving module start?',
        timestamp: 'Yesterday 03:00 PM',
        isMe: false,
      },
      {
        id: 'm22',
        senderId: 'usr-inst-2',
        senderName: 'Rahul Shinde',
        text: 'Namaste Pooja! As soon as Sunita ma’am signs off on your 2-wheeler 8-track test this Friday, our first Maruti Swift dual-control session starts Monday 08:00 AM at Kothrud Ring.',
        timestamp: 'Yesterday 03:15 PM',
        isMe: false,
      },
      {
        id: 'm23',
        senderId: 'usr-learner-1',
        senderName: 'Pooja Kulkarni',
        text: 'Perfect sir! Looking forward to learning hill-start clutch control.',
        timestamp: 'Yesterday 03:20 PM',
        isMe: false,
      },
    ],
  },

  // 3. Instructor (Sunita Deshmukh) ↔ Student 2: Siddharth More
  {
    id: 'conv-learner-instructor-3',
    type: 'LEARNER_INSTRUCTOR',
    participants: {
      learner: { id: 'usr-learner-2', name: 'Siddharth More', role: 'Learner', city: 'Pune (Deccan)' },
      instructor: { id: 'usr-inst-1', name: 'Sunita Deshmukh', role: 'Certified Instructor', school: 'Sai Motor Academy' },
    },
    unreadCount: 0,
    lastActivity: 'Yesterday',
    quickReplies: [
      'Ready for 05:15 PM batch',
      'Practiced half-clutch at home',
      'At Kothrud Metro Pillar Ring'
    ],
    messages: [
      {
        id: 'm201',
        senderId: 'usr-learner-2',
        senderName: 'Siddharth More',
        text: 'Ma’am, will today’s 05:15 PM batch focus on parallel parking or road maneuvers?',
        timestamp: 'Yesterday 04:30 PM',
        isMe: false,
      },
      {
        id: 'm202',
        senderId: 'usr-inst-1',
        senderName: 'Sunita Deshmukh',
        text: 'Today is parallel parking with cones at the Deccan Gymkhana practice ground, Siddharth.',
        timestamp: 'Yesterday 04:40 PM',
        isMe: false,
      },
    ],
  },

  // 4. Instructor (Sunita Deshmukh) ↔ Student 3: Sneha Joshi
  {
    id: 'conv-learner-instructor-4',
    type: 'LEARNER_INSTRUCTOR',
    participants: {
      learner: { id: 'usr-learner-3', name: 'Sneha Joshi', role: 'Learner (2W)', city: 'Pune (Shivajinagar)' },
      instructor: { id: 'usr-inst-1', name: 'Sunita Deshmukh', role: 'Certified Instructor', school: 'Sai Motor Academy' },
    },
    unreadCount: 0,
    lastActivity: '2 days ago',
    quickReplies: [
      'Requesting shift to 07:00 AM batch',
      'Completed Form 2 LL test online',
      'At Alandi Road ground'
    ],
    messages: [
      {
        id: 'm301',
        senderId: 'usr-learner-3',
        senderName: 'Sneha Joshi',
        text: 'Sunita ma’am, I cleared the RTO computer test on Sarathi portal today! Got my Learner License number.',
        timestamp: '2 days ago',
        isMe: false,
      },
      {
        id: 'm302',
        senderId: 'usr-inst-1',
        senderName: 'Sunita Deshmukh',
        text: 'Hearty congratulations Sneha! Bring a physical printout tomorrow for your first balance and braking session.',
        timestamp: '2 days ago',
        isMe: false,
      },
    ],
  },

  // 5. Instructor (Sunita Deshmukh) ↔ School Owner (Rajesh Kadam)
  {
    id: 'conv-inst-owner-1',
    type: 'INSTRUCTOR_OWNER',
    participants: {
      instructor: { id: 'usr-inst-1', name: 'Sunita Deshmukh', role: 'Senior Instructor', licenseNo: 'MH-12-INST-8841' },
      owner: { id: 'usr-owner-1', name: 'Rajesh Kadam', role: 'School Principal', school: 'Sai Motor Academy' },
    },
    unreadCount: 1,
    lastActivity: '11:10 AM',
    quickReplies: [
      'Morning batch completed without incident',
      'Swift MH-12 clutch play feels loose, please inspect',
      'Need 20 liters fuel voucher for Deccan route',
      'Requesting shift swap for Sunday trial'
    ],
    messages: [
      {
        id: 'm401',
        senderId: 'usr-inst-1',
        senderName: 'Sunita Deshmukh',
        text: 'Namaste Rajesh sir, completed the 08:00 AM batch at Warje 8-track. Both students cleared reverse parking.',
        timestamp: '09:30 AM',
        isMe: false,
      },
      {
        id: 'm402',
        senderId: 'usr-owner-1',
        senderName: 'Rajesh Kadam',
        text: 'Very good Sunita. How is vehicle MH-12-AB-4471 performing?',
        timestamp: '09:45 AM',
        isMe: false,
      },
      {
        id: 'm403',
        senderId: 'usr-inst-1',
        senderName: 'Sunita Deshmukh',
        text: 'Sir, the clutch pedal has slight extra play on the dual control side. Recommend Ramesh check the cable before the 04:00 PM batch.',
        timestamp: '11:05 AM',
        isMe: false,
      },
      {
        id: 'm404',
        senderId: 'usr-owner-1',
        senderName: 'Rajesh Kadam',
        text: 'Noted immediately. I have asked mechanic Ramesh to visit Karve Road branch by 02:00 PM. Keep me posted.',
        timestamp: '11:10 AM',
        isMe: false,
      },
    ],
  },

  // 6. Instructor (Rahul Shinde) ↔ School Owner (Rajesh Kadam)
  {
    id: 'conv-inst-owner-2',
    type: 'INSTRUCTOR_OWNER',
    participants: {
      instructor: { id: 'usr-inst-2', name: 'Rahul Shinde', role: '4-Wheeler Specialist', licenseNo: 'MH-12-INST-9102' },
      owner: { id: 'usr-owner-1', name: 'Rajesh Kadam', role: 'School Principal', school: 'Sai Motor Academy' },
    },
    unreadCount: 0,
    lastActivity: '08:15 AM',
    quickReplies: [
      'Alandi RTO batch on schedule',
      'Vehicle fitness certificate received',
      'Learners passed mock test'
    ],
    messages: [
      {
        id: 'm501',
        senderId: 'usr-inst-2',
        senderName: 'Rahul Shinde',
        text: 'Sir, 4 students scheduled for RTO mock test at Alandi Road track tomorrow 10 AM.',
        timestamp: '08:15 AM',
        isMe: false,
      },
    ],
  },

  // 7. Super Admin ↔ School Owner (Official Compliance & Notices)
  {
    id: 'conv-admin-owner-1',
    type: 'OWNER_ADMIN',
    participants: {
      admin: { id: 'usr-admin-1', name: 'DriveLearn Maharashtra Compliance Desk', role: 'Super Admin', badge: 'RTO Regulatory Cell' },
      owner: { id: 'usr-owner-1', name: 'Sai Motor & 2-Wheeler Academy', role: 'Verified School (MH-12-RTO-2018-004)', city: 'Pune' },
    },
    unreadCount: 1,
    lastActivity: 'Yesterday',
    quickReplies: [
      'Documents uploaded on Sarathi portal',
      'Payment settlement verified via IMPS',
      'Instructor Form 5A submitted for renewal',
      'Acknowledged compliance requirement'
    ],
    messages: [
      {
        id: 'm601',
        senderId: 'usr-admin-1',
        senderName: 'DriveLearn Maharashtra Compliance Desk',
        isOfficialNotice: true,
        noticeTag: 'COMPLIANCE AUDIT',
        text: 'Official Advisory: Annual RTO Form 5A instructor accreditation renewal is due for 1 certified trainer (Rahul Shinde) within 30 days. Please verify status via Maharashtra Sarathi Parivahan portal.',
        timestamp: '20 Aug 2026, 11:30 AM',
        isMe: false,
      },
      {
        id: 'm602',
        senderId: 'usr-owner-1',
        senderName: 'Rajesh Kadam (Sai Motors)',
        text: 'Acknowledged. Rahul Shinde has completed the refresher training course. We have submitted the Form 2 renewal docket to Pune RTO yesterday.',
        timestamp: '21 Aug 2026, 02:15 PM',
        isMe: false,
      },
      {
        id: 'm603',
        senderId: 'usr-admin-1',
        senderName: 'DriveLearn Maharashtra Compliance Desk',
        isOfficialNotice: true,
        noticeTag: 'SUBSIDY CREDIT',
        text: 'August 2026 Subsidized ₹999 launch batch payout processed. Net IMPS disbursement of ₹1,42,800 credited to Bank of Maharashtra A/C ending in 8842.',
        timestamp: 'Yesterday, 06:45 PM',
        isMe: false,
      },
    ],
  },
];
