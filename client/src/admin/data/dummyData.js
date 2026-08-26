/* Centralized Dummy Data for Super Admin Portal v3 (Maharashtra Launch) */

export const adminSummaryStats = [
  {
    id: 'learners',
    label: 'Total Registered Learners',
    value: '1,420',
    trend: '+18.4%',
    trendType: 'up',
    icon: 'Users',
    link: '/admin/schools',
  },
  {
    id: 'schools',
    label: 'Verified Partner Schools',
    value: '42',
    trend: '+4 this month',
    trendType: 'up',
    icon: 'ShieldCheck',
    link: '/admin/schools',
  },
  {
    id: 'bonuses',
    label: '₹15 Bonuses Credited',
    value: '₹21,300',
    trend: '1,420 Active Wallets',
    trendType: 'neutral',
    icon: 'Wallet',
    link: '/admin/offers',
  },
  {
    id: 'subsidized',
    label: 'Subsidized ₹999 Enrollments',
    value: '890',
    trend: '62.6% 2-Wheeler Focus',
    trendType: 'up',
    icon: 'Bike',
    link: '/admin/schools',
  },
  {
    id: 'revenue',
    label: 'Gross Platform Bookings',
    value: '₹18,42,000',
    trend: '+22.5%',
    trendType: 'up',
    icon: 'CreditCard',
    link: '/admin/payments',
  },
  {
    id: 'commission',
    label: 'Net Platform Commission (10%)',
    value: '₹1,84,200',
    trend: '+22.5%',
    trendType: 'up',
    icon: 'TrendingUp',
    link: '/admin/payments',
  },
];

// Strategic 2-Wheeler Focus Split (v3 Spec)
export const bookingVehicleSplit = [
  { type: '2-Wheeler (MCWG/Scooty)', percent: 68, count: 890, color: 'var(--color-primary, #B91C1C)' },
  { type: '4-Wheeler Car (LMV)', percent: 24, count: 340, color: '#334155' },
  { type: 'Combo (2W + 4W)', percent: 8, count: 190, color: '#64748b' },
];

export const initialVerificationRequests = [
  {
    id: 'REQ-101',
    schoolName: 'Sai Motor & 2-Wheeler Academy',
    owner: 'Sunita & Ramesh Patil',
    city: 'Pune',
    state: 'Maharashtra',
    rtoZone: 'MH-12 (Pune Alandi Rd)',
    submitted: '2026-08-19',
    status: 'pending',
    documents: ['RTO-Lic-2024.pdf', 'Dual-Brake-Cert.pdf'],
  },
  {
    id: 'REQ-102',
    schoolName: 'Apex Rider & Safety Academy',
    owner: 'Vikram Shinde',
    city: 'Mumbai',
    state: 'Maharashtra',
    rtoZone: 'MH-02 (Andheri West)',
    submitted: '2026-08-18',
    status: 'under review',
    documents: ['Form-11-DL.pdf', 'Tax-Invoice-2026.pdf'],
  },
  {
    id: 'REQ-103',
    schoolName: 'Deccan Safe Steer Motor Institute',
    owner: 'Anand Kulkarni',
    city: 'Pune',
    state: 'Maharashtra',
    rtoZone: 'MH-14 (Pimpri Chinchwad)',
    submitted: '2026-08-16',
    status: 'verified',
    documents: ['Full-Inspection-Clearance.pdf'],
  },
  {
    id: 'REQ-104',
    schoolName: 'Nagpur Central Rider School',
    owner: 'Pravin Deshmukh',
    city: 'Nagpur',
    state: 'Maharashtra',
    rtoZone: 'MH-31 (Nagpur Urban)',
    submitted: '2026-08-15',
    status: 'rejected',
    documents: ['Expired-DualPedal-Doc.pdf'],
  },
];

export const initialSchoolsList = [
  {
    id: 'SCH-001',
    name: 'Sai Motor & 2-Wheeler Academy',
    city: 'Pune',
    state: 'Maharashtra',
    rtoZone: 'MH-12',
    activeStudents: 142,
    rating: 4.9,
    reviews: 420,
    status: 'active',
  },
  {
    id: 'SCH-002',
    name: 'Apex Rider & Safety Academy',
    city: 'Mumbai',
    state: 'Maharashtra',
    rtoZone: 'MH-02',
    activeStudents: 118,
    rating: 4.8,
    reviews: 312,
    status: 'active',
  },
  {
    id: 'SCH-003',
    name: 'Deccan Safe Steer Motor Institute',
    city: 'Pune',
    state: 'Maharashtra',
    rtoZone: 'MH-14',
    activeStudents: 86,
    rating: 4.9,
    reviews: 285,
    status: 'active',
  },
  {
    id: 'SCH-004',
    name: 'Nagpur Central Rider School',
    city: 'Nagpur',
    state: 'Maharashtra',
    rtoZone: 'MH-31',
    activeStudents: 64,
    rating: 4.7,
    reviews: 198,
    status: 'active',
  },
  {
    id: 'SCH-005',
    name: 'Nashik Godavari Motor Training',
    city: 'Nashik',
    state: 'Maharashtra',
    rtoZone: 'MH-15',
    activeStudents: 52,
    rating: 4.8,
    reviews: 165,
    status: 'active',
  },
  {
    id: 'SCH-006',
    name: 'Thane Lake City Driving Academy',
    city: 'Thane',
    state: 'Maharashtra',
    rtoZone: 'MH-04',
    activeStudents: 78,
    rating: 4.7,
    reviews: 220,
    status: 'active',
  },
];

// Operational States & Hubs (v3 Dependent Switch Shape)
export const initialAllSchools = initialSchoolsList;
export const initialVerificationQueue = initialVerificationRequests;
export const initialStates = [
  { id: 1, name: 'Maharashtra', cityCount: 6, schoolCount: 42, status: 'active' },
  { id: 2, name: 'Karnataka', cityCount: 0, schoolCount: 0, status: 'coming_soon' },
  { id: 3, name: 'Gujarat', cityCount: 0, schoolCount: 0, status: 'coming_soon' },
];

// Offers & Wallet Oversight Data (v3 NEW)
export const walletLiabilityStats = [
  {
    id: 'liability',
    label: 'Total Wallet Liability',
    value: '₹21,300',
    trend: '1,420 Users × ₹15',
    trendType: 'neutral',
    icon: 'Wallet',
  },
  {
    id: 'today-signups',
    label: 'Active Signups Today',
    value: '48',
    trend: '+12% vs yesterday',
    trendType: 'up',
    icon: 'Users',
  },
  {
    id: 'bonus-amount',
    label: 'Current Signup Bonus',
    value: '₹15.00',
    trend: 'Configured in Settings',
    trendType: 'neutral',
    icon: 'Sparkles',
  },
  {
    id: 'offer-window',
    label: 'Subsidized ₹999 Window',
    value: '31 Aug 2026',
    trend: '10 Days Remaining',
    trendType: 'warning',
    icon: 'Calendar',
  },
];

export const initialFlaggedSignups = [
  {
    id: 'FLG-01',
    phone: '98XXXXXX12',
    email: 'rohit.s99@gmail.com',
    device: 'Device-A1B2-Android',
    claimCount: 3,
    flaggedReason: 'Same device fingerprint, 3 account signups',
    status: 'under review',
    timestamp: '2026-08-21 14:22',
  },
  {
    id: 'FLG-02',
    phone: '91XXXXXX84',
    email: 'temp.user44@yahoo.com',
    device: 'Device-C3D4-iOS',
    claimCount: 4,
    flaggedReason: 'Repeated signup pattern from single IP',
    status: 'blocked',
    timestamp: '2026-08-20 18:05',
  },
  {
    id: 'FLG-03',
    phone: '97XXXXXX55',
    email: 'ananya.desh@outlook.com',
    device: 'Device-E5F6-Android',
    claimCount: 2,
    flaggedReason: 'Matching Aadhaar OTP verified previously',
    status: 'under review',
    timestamp: '2026-08-21 09:12',
  },
];

export const initialWalletTransactions = [
  {
    id: 'WTX-901',
    user: 'Amit Joshi (Pune)',
    type: 'Credit',
    amount: 15,
    reason: 'Introductory Signup Bonus',
    date: '2026-08-21 16:40',
  },
  {
    id: 'WTX-902',
    user: 'Sneha Patil (Mumbai)',
    type: 'Debit',
    amount: 15,
    reason: 'Course Enrollment Checkout (₹984 Paid)',
    date: '2026-08-21 15:15',
  },
  {
    id: 'WTX-903',
    user: 'Kiran More (Nagpur)',
    type: 'Credit',
    amount: 15,
    reason: 'Introductory Signup Bonus',
    date: '2026-08-21 12:30',
  },
  {
    id: 'WTX-904',
    user: 'Rahul Varma (Thane)',
    type: 'Debit',
    amount: 15,
    reason: 'Course Enrollment Checkout (₹984 Paid)',
    date: '2026-08-21 10:05',
  },
];

export const subscriptionStats = [
  { id: 'mrr', label: 'Monthly Recurring Revenue', value: '₹84,000', trend: '+14.2%', trendType: 'up', icon: 'CreditCard' },
  { id: 'active-subs', label: 'Active Subscriptions', value: '42 Schools', trend: '100% active', trendType: 'up', icon: 'ShieldCheck' },
  { id: 'starter', label: 'Starter Tier (₹1,500/mo)', value: '18 Schools', trend: '42.8%', trendType: 'neutral', icon: 'Building2' },
  { id: 'pro', label: 'Pro Tier (₹2,500/mo)', value: '24 Schools', trend: '57.2%', trendType: 'up', icon: 'Award' },
];

export const initialSubscriptions = [
  { id: 'SUB-01', school: 'Sai Motor Academy (Pune)', plan: 'Pro', amount: 2500, renewalDate: '2026-08-28', status: 'expiring soon' },
  { id: 'SUB-02', school: 'Apex Rider Academy (Mumbai)', plan: 'Pro', amount: 2500, renewalDate: '2026-09-12', status: 'active' },
  { id: 'SUB-03', school: 'Deccan Safe Steer (Pune)', plan: 'Starter', amount: 1500, renewalDate: '2026-09-04', status: 'active' },
  { id: 'SUB-04', school: 'Nagpur Central School', plan: 'Starter', amount: 1500, renewalDate: '2026-08-25', status: 'expiring soon' },
];

export const paymentStats = [
  { id: 'p1', label: 'Gross Volume (August)', value: '₹18,42,000', trend: '+22.5%', trendType: 'up', icon: 'CreditCard' },
  { id: 'p2', label: 'Platform Commission (10%)', value: '₹1,84,200', trend: 'Retained Net', trendType: 'up', icon: 'TrendingUp' },
  { id: 'p3', label: 'School Payouts Disbursed', value: '₹16,57,800', trend: 'Automated IMPS', trendType: 'neutral', icon: 'Building2' },
  { id: 'p4', label: 'Pending Settlement', value: '₹48,200', trend: 'Clearing Tomorrow', trendType: 'warning', icon: 'AlertCircle' },
];

export const initialTransactions = [
  { id: 'TXN-8801', txnId: 'TXN-8801-MH', school: 'Sai Motor Academy', amount: 984, date: '2026-08-21 15:45', status: 'settled' },
  { id: 'TXN-8802', txnId: 'TXN-8802-MH', school: 'Apex Rider Academy', amount: 3984, date: '2026-08-21 14:12', status: 'settled' },
  { id: 'TXN-8803', txnId: 'TXN-8803-MH', school: 'Deccan Safe Steer', amount: 984, date: '2026-08-21 11:20', status: 'processing' },
  { id: 'TXN-8804', txnId: 'TXN-8804-MH', school: 'Nagpur Central School', amount: 4684, date: '2026-08-20 18:30', status: 'settled' },
];

// Support Tickets with Category (v3 Addition)
export const initialTickets = [
  {
    id: 'TCK-4471',
    from: 'CityDrive Academy (Pune)',
    subject: 'Unable to update female instructor slot availability in portal',
    priority: 'medium',
    category: 'General',
    status: 'open',
  },
  {
    id: 'TCK-4472',
    from: 'Rohit S. (Learner, Pune)',
    subject: 'Didn’t receive ₹15 wallet bonus credit after completing signup OTP',
    priority: 'high',
    category: 'Wallet',
    status: 'open',
  },
  {
    id: 'TCK-4473',
    from: 'Ananya D. (Learner, Mumbai)',
    subject: 'Charged ₹1,500 full fee instead of subsidized ₹999 launch price',
    priority: 'high',
    category: 'Payment',
    status: 'open',
  },
  {
    id: 'TCK-4474',
    from: 'Apex Rider Academy (Mumbai)',
    subject: 'Requesting RTO Form 11 dual-brake re-inspection slot',
    priority: 'low',
    category: 'General',
    status: 'resolved',
  },
];

export const initialAuditLogs = [
  { id: 'LOG-1', admin: 'Rajesh Kulkarni (Super Admin)', action: 'Blocked Flagged Signup Account', target: 'Device-C3D4-iOS (temp.user44@yahoo.com)', timestamp: '2026-08-21 16:15' },
  { id: 'LOG-2', admin: 'Rajesh Kulkarni (Super Admin)', action: 'Verified Partner Driving School', target: 'Sai Motor Academy (MH-12 Pune)', timestamp: '2026-08-21 14:00' },
  { id: 'LOG-3', admin: 'Pooja Varma (Admin)', action: 'Resolved Support Grievance TCK-4474', target: 'Apex Rider Academy', timestamp: '2026-08-21 11:30' },
  { id: 'LOG-4', admin: 'System Engine', action: 'Automated 10% Revenue Split Disbursed', target: 'Disbursement Batch #4412 (₹16.57L)', timestamp: '2026-08-20 23:59' },
];

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'Flagged Wallet Claim Pattern',
    message: 'Device-A1B2 attempted 3 bonus claims in 10 minutes.',
    timestamp: '5m ago',
    read: false,
    link: '/admin/offers',
  },
  {
    id: 'notif-2',
    title: 'New Verification Request',
    message: 'Sai Motor Academy submitted Form 11 and dual-control inspection certificate.',
    timestamp: '15m ago',
    read: false,
    link: '/admin/verification',
  },
  {
    id: 'notif-3',
    title: 'Urgent Wallet Grievance (TCK-4472)',
    message: 'Learner Rohit S. reported missing ₹15 wallet bonus after signup.',
    timestamp: '1h ago',
    read: false,
    link: '/admin/support',
  },
];
