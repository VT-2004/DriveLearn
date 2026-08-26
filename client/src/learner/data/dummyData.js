/* Scoped Dummy Dataset for Learner Portal
   User: Pooja Kulkarni (Kothrud, Pune)
   Enrolled School: Sai Motor & 2-Wheeler Academy
   Enrolled Course: 2-Wheeler Special (Subsidized ₹999 Launch Package)
*/

export const learnerProfileData = {
  id: 'usr-learner-1',
  name: 'Pooja Kulkarni',
  email: 'pooja.kulkarni@gmail.com',
  phone: '+91 98230 11223',
  dob: '2004-05-14',
  address: 'B-402, Mayur Colony, Kothrud, Pune, Maharashtra 411038',
  languagePreference: 'Marathi', // 'English' | 'Marathi' | 'Kannada'
  rtoZone: 'MH-12 (Pune Alandi Rd & Warje Track)',
  emergencyContact: '+91 98230 44556 (Sunil Kulkarni - Father)',
};

export const learnerCourseSummary = {
  courseName: '2-Wheeler Special (Scooter/MCWG)',
  schoolName: 'Sai Motor & 2-Wheeler Academy',
  schoolLocation: 'Karve Road, Kothrud, Pune',
  instructor: 'Sunita Deshmukh',
  instructorPhone: '+91 98230 99887',
  assignedVehicle: 'Honda Activa 6G (MH-12-CD-8812)',
  trainingGround: 'Warje RTO 8-Track Ground',
  startDate: '2026-08-10',
  estimatedCompletion: '2026-08-28',
  attendancePercent: 88,
  lessonsCompleted: 8,
  totalLessons: 10,
  progressPercent: 80,
  currentStage: 3, // 0 to 5 index matching ProgressStepper
};

export const learnerUpcomingLesson = {
  id: 'BKG-503',
  time: '04:00 PM - 04:45 PM',
  date: 'Today (Saturday, Aug 22)',
  instructor: 'Sunita Deshmukh',
  vehicle: 'Honda Activa 6G',
  location: 'Garware College Track Ground, Karve Rd',
  topic: 'Traffic Merge & Turning Indicator Drills',
  status: 'confirmed',
};

export const progressStages = [
  { id: 0, title: 'Theory & Rules', desc: 'RTO signs & Parivahan LL mock', status: 'completed' },
  { id: 1, title: 'Basic Control', desc: 'Throttle, rear brake, balance', status: 'completed' },
  { id: 2, title: 'RTO 8-Track Drills', desc: 'Warje track 8-figure curves', status: 'completed' },
  { id: 3, title: 'City Road Practice', desc: 'Karve Road traffic navigation', status: 'current' },
  { id: 4, title: 'Final DL Assessment', desc: 'Pre-RTO simulated trial test', status: 'upcoming' },
  { id: 5, title: 'Permanent DL', desc: 'Official Smart Card DL issued', status: 'upcoming' },
];

export const completedAttendanceDates = [
  '2026-08-10', '2026-08-11', '2026-08-13',
  '2026-08-14', '2026-08-17', '2026-08-18',
  '2026-08-19', '2026-08-21',
];

export const learnerBookingsList = [
  {
    id: 'BKG-503',
    school: 'Sai Motor & 2-Wheeler Academy',
    course: '2-Wheeler Special (MCWG)',
    instructor: 'Sunita Deshmukh',
    date: '2026-08-22',
    time: '04:00 PM - 04:45 PM',
    status: 'confirmed',
    paymentStatus: 'paid',
    location: 'Garware College Track Ground',
  },
  {
    id: 'BKG-507',
    school: 'Sai Motor & 2-Wheeler Academy',
    course: '2-Wheeler Special (MCWG)',
    instructor: 'Sunita Deshmukh',
    date: '2026-08-24',
    time: '08:00 AM - 08:45 AM',
    status: 'confirmed',
    paymentStatus: 'paid',
    location: 'Warje RTO 8-Track Ground',
  },
  {
    id: 'BKG-500',
    school: 'Sai Motor & 2-Wheeler Academy',
    course: '2-Wheeler Special (MCWG)',
    instructor: 'Sunita Deshmukh',
    date: '2026-08-21',
    time: '04:00 PM - 04:45 PM',
    status: 'completed',
    paymentStatus: 'paid',
    location: 'Karve Road Traffic Stretch',
  },
  {
    id: 'BKG-498',
    school: 'Sai Motor & 2-Wheeler Academy',
    course: '2-Wheeler Special (MCWG)',
    instructor: 'Sunita Deshmukh',
    date: '2026-08-19',
    time: '04:00 PM - 04:45 PM',
    status: 'completed',
    paymentStatus: 'paid',
    location: 'Warje RTO 8-Track Ground',
  },
  {
    id: 'BKG-492',
    school: 'Sai Motor & 2-Wheeler Academy',
    course: '2-Wheeler Special (MCWG)',
    instructor: 'Sunita Deshmukh',
    date: '2026-08-15',
    time: '09:00 AM - 09:45 AM',
    status: 'cancelled',
    paymentStatus: 'refunded',
    location: 'Independence Day Holiday',
  },
];

export const learnerSkillChecklist = [
  { id: 'sk-1', name: 'Starting, Neutral & Throttle Modulation', status: 'completed' },
  { id: 'sk-2', name: 'Dual-Hand Braking & Controlled Stop', status: 'completed' },
  { id: 'sk-3', name: 'Tight Figure-8 Curves on Warje Track', status: 'completed' },
  { id: 'sk-4', name: 'Inclined Slope Start (Flyover Technique)', status: 'completed' },
  { id: 'sk-5', name: 'Lane Changing & Mirror Observation', status: 'in-progress' },
  { id: 'sk-6', name: 'Heavy Traffic Signal Navigation (Karve Rd)', status: 'in-progress' },
  { id: 'sk-7', name: 'Pre-RTO Inspection & Emergency Swerve', status: 'upcoming' },
];

export const instructorFeedbackNotes = [
  {
    session: 'Session 8 (21 Aug 2026)',
    instructor: 'Sunita Deshmukh',
    date: '2026-08-21',
    note: 'Pooja handled the busy evening traffic near Garware Metro station with great composure. Remember to check the right blind-spot mirror before turning into Paud Road.',
  },
  {
    session: 'Session 6 (18 Aug 2026)',
    instructor: 'Sunita Deshmukh',
    date: '2026-08-18',
    note: 'Flawless execution on the 8-track ground at Warje! Foot did not touch the ground even once during tight curves.',
  },
  {
    session: 'Session 2 (11 Aug 2026)',
    instructor: 'Sunita Deshmukh',
    date: '2026-08-11',
    note: 'Great improvement in throttle balance. Keep both hands relaxed on handlebars.',
  },
];

export const learnerWalletData = {
  currentBalance: 0.0, // Used ₹15 for checkout
  totalBonusEarned: 15.0,
  transactions: [
    {
      id: 'WTX-902',
      date: '2026-08-10 14:15',
      description: 'Applied on 2-Wheeler Course Checkout (Sai Motors)',
      amount: -15.0,
      type: 'debit',
      runningBalance: 0.0,
    },
    {
      id: 'WTX-880',
      date: '2026-08-10 14:02',
      description: '🎉 Introductory Signup Bonus Deposit',
      amount: 15.0,
      type: 'credit',
      runningBalance: 15.0,
    },
  ],
  coursePaymentHistory: [
    {
      id: 'TXN-8801-MH',
      course: '2-Wheeler Special (Subsidized ₹999 Launch)',
      stickerPrice: 999.0,
      walletBonusDeducted: 15.0,
      amountPaid: 984.0,
      method: 'UPI / NetBanking',
      date: '2026-08-10',
      status: 'paid',
    },
  ],
};

export const learnerNotifications = [
  {
    id: 1,
    title: 'Practical Session Reminder',
    message: 'Your 4:00 PM session with Sunita ma’am is today at Garware College ground.',
    time: '2h ago',
    type: 'reminder',
  },
  {
    id: 2,
    title: 'Instructor Feedback Added',
    message: 'Sunita Deshmukh added notes for Session 8.',
    time: '1d ago',
    type: 'feedback',
  },
  {
    id: 3,
    title: '₹15 Wallet Bonus Applied',
    message: 'Your ₹15 signup credit was deducted at course checkout.',
    time: '12d ago',
    type: 'wallet',
  },
];
