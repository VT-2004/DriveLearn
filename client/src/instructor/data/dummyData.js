/* Scoped Dummy Dataset for Instructor Portal
   User: Sunita Deshmukh (Senior Two-Wheeler & City Road Specialist)
   School: Sai Motor & 2-Wheeler Academy, Pune
*/

export const instructorProfileData = {
  id: 'INS-02',
  name: 'Sunita Deshmukh',
  role: 'Senior Driving Trainer (Two-Wheeler Specialist)',
  phone: '+91 98230 99887',
  email: 'sunita.trainer@saimotors.in',
  licenseNo: 'MH-12-INS-2019-332',
  experience: 7, // years
  specialization: 'Two-Wheeler Balance, Female Specialist & Karve Road Clutch Navigation',
  rating: 4.9,
  assignedSchool: 'Sai Motor & 2-Wheeler Academy (Kothrud, Pune)',
  activeVehicle: 'Honda Activa 6G (MH-12-CD-8812)',
};

export const instructorSummaryStats = [
  { id: 'today-lessons', label: "Today's Lessons", value: '5', trend: '2 Completed', trendType: 'up', icon: 'Clock' },
  { id: 'assigned-students', label: 'Assigned Learners', value: '11', trend: 'Active batches', trendType: 'neutral', icon: 'Users' },
  { id: 'completed-lessons', label: 'Completed Lessons', value: '84', trend: 'This month', trendType: 'up', icon: 'CheckCircle' },
  { id: 'pending-lessons', label: 'Pending Today', value: '3', trend: 'Next: 04:00 PM', trendType: 'warning', icon: 'Calendar' },
];

export const instructorTodaysLessons = [
  {
    id: 'BKG-501',
    student: 'Aarav Patil',
    time: '08:00 AM - 08:45 AM',
    course: '2-Wheeler Special',
    location: 'Warje RTO 8-Track Ground',
    vehicle: 'Honda Activa 6G',
    status: 'completed',
    topic: 'Slope Stop & Restart Drills',
    isUpNext: false,
  },
  {
    id: 'BKG-502',
    student: 'Neha Shinde',
    time: '09:00 AM - 09:45 AM',
    course: '2-Wheeler Special',
    location: 'Warje RTO 8-Track Ground',
    vehicle: 'Honda Activa 6G',
    status: 'completed',
    topic: 'Figure-8 Curves Mastery',
    isUpNext: false,
  },
  {
    id: 'BKG-503',
    student: 'Pooja Kulkarni',
    time: '04:00 PM - 04:45 PM',
    course: '2-Wheeler Special',
    location: 'Garware College Track Ground, Karve Rd',
    vehicle: 'Honda Activa 6G',
    status: 'confirmed', // upcoming
    topic: 'Traffic Merge & Turning Indicator Drills',
    isUpNext: true, // "Up Next" highlighted
  },
  {
    id: 'BKG-504',
    student: 'Rohan Deshpande',
    time: '05:00 PM - 05:45 PM',
    course: '2-Wheeler Special',
    location: 'Karve Road Stretch',
    vehicle: 'Honda Activa 6G',
    status: 'confirmed',
    topic: 'Peak Evening Traffic Navigation',
    isUpNext: false,
  },
  {
    id: 'BKG-505',
    student: 'Tanvi Joshi',
    time: '06:00 PM - 06:45 PM',
    course: '2-Wheeler Special',
    location: 'Garware College Ground',
    vehicle: 'Honda Activa 6G',
    status: 'confirmed',
    topic: 'Night Headlight & High-Beam Reaction Drills',
    isUpNext: false,
  },
];

export const instructorAssignedStudents = [
  {
    id: 'STU-001',
    name: 'Pooja Kulkarni',
    course: '2-Wheeler Special',
    progress: 80,
    status: 'active',
    phone: '+91 98230 11223',
    lastSession: '21 Aug (Session 8)',
    latestFeedback: 'Pooja handled the busy evening traffic near Garware Metro with great composure.',
  },
  {
    id: 'STU-003',
    name: 'Aarav Patil',
    course: '2-Wheeler Special',
    progress: 60,
    status: 'active',
    phone: '+91 98230 33445',
    lastSession: 'Today 8:00 AM (Session 6)',
    latestFeedback: 'Good progress on slope balance. Needs more practice on steep gradients.',
  },
  {
    id: 'STU-004',
    name: 'Neha Shinde',
    course: '2-Wheeler Special',
    progress: 90,
    status: 'active',
    phone: '+91 98230 44556',
    lastSession: 'Today 9:00 AM (Session 9)',
    latestFeedback: 'Ready for simulated RTO final trial.',
  },
  {
    id: 'STU-006',
    name: 'Rohan Deshpande',
    course: '2-Wheeler Special',
    progress: 40,
    status: 'active',
    phone: '+91 98230 66778',
    lastSession: '19 Aug (Session 4)',
    latestFeedback: 'Working on handlebar grip relaxation during turns.',
  },
  {
    id: 'STU-007',
    name: 'Tanvi Joshi',
    course: '2-Wheeler Special',
    progress: 20,
    status: 'active',
    phone: '+91 98230 77889',
    lastSession: '18 Aug (Session 2)',
    latestFeedback: 'Started basic throttle control drills.',
  },
];

export const weeklyAvailabilityData = [
  { day: 'Monday', enabled: true, from: '07:00', to: '19:00' },
  { day: 'Tuesday', enabled: true, from: '07:00', to: '19:00' },
  { day: 'Wednesday', enabled: true, from: '07:00', to: '19:00' },
  { day: 'Thursday', enabled: true, from: '07:00', to: '19:00' },
  { day: 'Friday', enabled: true, from: '07:00', to: '19:00' },
  { day: 'Saturday', enabled: true, from: '07:00', to: '19:00' },
  { day: 'Sunday', enabled: false, from: '07:00', to: '19:00' }, // Weekly rest day
];

export const instructorExceptionsData = [
  { id: 'exc-1', date: '2026-08-15', reason: 'Independence Day National Holiday' },
  { id: 'exc-2', date: '2026-08-29', reason: 'Personal Family Leave (Pre-notified)' },
];
