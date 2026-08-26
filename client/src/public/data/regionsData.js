// Centralized Region & Geographic Data for Public Website
export const statesData = [
  { code: 'MH', name: 'Maharashtra', status: 'active' },
  { code: 'KA', name: 'Karnataka', status: 'coming_soon' },
  { code: 'GJ', name: 'Gujarat', status: 'coming_soon' },
];

export const citiesData = [
  // Maharashtra (Live Launch Region)
  { id: 'pune', name: 'Pune', state: 'Maharashtra', areaCount: 42, activeSchools: 18 },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', areaCount: 56, activeSchools: 24 },
  { id: 'nagpur', name: 'Nagpur', state: 'Maharashtra', areaCount: 22, activeSchools: 9 },
  { id: 'nashik', name: 'Nashik', state: 'Maharashtra', areaCount: 18, activeSchools: 7 },
  { id: 'thane', name: 'Thane', state: 'Maharashtra', areaCount: 28, activeSchools: 11 },

  // Karnataka (Coming Soon)
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', areaCount: 65, activeSchools: 0 },
  { id: 'mysuru', name: 'Mysuru', state: 'Karnataka', areaCount: 14, activeSchools: 0 },

  // Gujarat (Coming Soon)
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', areaCount: 38, activeSchools: 0 },
  { id: 'surat', name: 'Surat', state: 'Gujarat', areaCount: 26, activeSchools: 0 },
];

export const publicCoursesData = [
  {
    id: 'mcwg-subsidized',
    category: '2wheeler',
    badge: 'Most Popular in Pune & Mumbai',
    title: 'Two-Wheeler Practical Course (MCWG)',
    vehicle: 'Honda Activa 6G / Hero Splendor Plus (Dual-Control)',
    duration: '10 Days (30-45 mins daily practical drills)',
    originalFee: 1500,
    subsidizedFee: 999,
    walletDiscount: 15,
    finalFee: 984,
    features: [
      { text: 'Clutch friction point & half-clutch hill stopping', type: 'clutch' },
      { text: 'Warje RTO "8" Track ground simulation without footing', type: 'track' },
      { text: 'Option to train with certified female instructor', type: 'female' },
      { text: '100% dual-brake safety vehicles certified by RTO', type: 'safety' },
      { text: 'Parivahan Sarathi LL Form 2 test paperwork assistance', type: 'docs' },
    ],
  },
  {
    id: 'scooty-beginner',
    category: '2wheeler',
    badge: null,
    title: 'Scooty / Non-Gear Beginner Pack',
    vehicle: 'TVS Jupiter / Honda Activa 125',
    duration: '7 Days (40 mins/day)',
    originalFee: 1200,
    subsidizedFee: 899,
    walletDiscount: 15,
    finalFee: 884,
    features: [
      { text: 'Zero-balance handlebar control & posture drills', type: 'balance' },
      { text: 'Bumper-to-bumper city traffic & tight U-turns', type: 'traffic' },
      { text: 'Emergency dual-hand braking & side-stand habits', type: 'brake' },
      { text: 'Doorstep / nearest metro station pickup available', type: 'pickup' },
    ],
  },
  {
    id: 'lmv-car-complete',
    category: '4wheeler',
    badge: null,
    title: 'Four-Wheeler Car Training (LMV)',
    vehicle: 'Maruti Suzuki WagonR / Swift (Dual-Pedal)',
    duration: '15 Days (5 km road route/day)',
    originalFee: 4500,
    subsidizedFee: 3999,
    walletDiscount: 15,
    finalFee: 3984,
    features: [
      { text: 'Flyover slope starts without rolling back', type: 'slope' },
      { text: 'Parallel & reverse box parking drills between cones', type: 'parking' },
      { text: 'Night highway drive on Mumbai-Pune Expressway / NH-48', type: 'highway' },
      { text: 'MoRTH RTO Parivahan DL Form 4 guidance', type: 'docs' },
    ],
  },
  {
    id: 'combo-2w-4w',
    category: 'combo',
    badge: null,
    title: 'Complete 2-Wheeler + Car Combo',
    vehicle: 'Scooty / MCWG + LMV Car',
    duration: '21 Days Comprehensive Track',
    originalFee: 5500,
    subsidizedFee: 4699,
    walletDiscount: 15,
    finalFee: 4684,
    features: [
      { text: 'Full MCWG + LMV Parivahan license coverage', type: 'docs' },
      { text: 'Dedicated certified instructors with flexible time slots', type: 'trainer' },
      { text: 'Priority RTO test ground vehicle allocation', type: 'track' },
    ],
  },
];

export const featuredTestimonial = {
  id: 't-featured',
  name: 'Rohit Salunkhe',
  city: 'Kothrud, Pune',
  rtoCenter: 'MH-12 (Alandi Road RTO)',
  course: 'Two-Wheeler MCWG Course (₹999 Launch Package)',
  rating: 5,
  quote: 'I was terrified of stalling the motorcycle on the flyover slope test. Sunita Ma’am at Sai Motor School spent 3 full days coaching me exclusively on the clutch friction biting point at the Warje 8-track ground. Cleared my RTO test on the first attempt without putting my foot down once!',
  passedOn: 'First Attempt (August 2026)',
  highlight: 'Warje "8" Track Mastered in 3 Days',
};

export const secondaryTestimonials = [
  {
    id: 't2',
    name: 'Pooja Kulkarni',
    city: 'Andheri West, Mumbai',
    rtoCenter: 'MH-02 (Andheri RTO)',
    course: 'Scooty Beginner Training',
    rating: 5,
    quote: 'Applied the ₹15 introductory wallet bonus at checkout. Having a dual-brake scooter and doorstep pickup near Azad Nagar Metro gave me 100% confidence in heavy Link Road traffic.',
  },
  {
    id: 't3',
    name: 'Aakash Deshmukh',
    city: 'Dharampeth, Nagpur',
    rtoCenter: 'MH-31 (Nagpur Urban RTO)',
    course: 'LMV Car + Bike Combo',
    rating: 5,
    quote: 'Zero hidden fuel charges. The academy owner handled all Sarathi Form 2 paperwork directly so I didn’t have to pay a single rupee to middlemen at the RTO.',
  },
];

export const publicFaqs = [
  {
    question: 'How do I use the ₹15 introductory wallet credit?',
    answer: 'When you create an account on DriveLearn India, ₹15.00 is automatically deposited into your in-app wallet. When you reserve any course on the platform, ₹15 is instantly deducted from your total checkout fee (e.g. ₹999 subsidized fee becomes ₹984 payable).',
  },
  {
    question: 'What is included in the ₹999 subsidized 2-wheeler course?',
    answer: 'The ₹999 launch package includes 10 days of practical riding training on dual-control vehicles, clutch & balancing practice, Warje/RTO 8-track ground orientation, certified trainer fees, and Parivahan Sarathi LL Form 2 documentation guidance.',
  },
  {
    question: 'Can I request a certified female driving instructor?',
    answer: 'Yes! All partner driving schools registered on DriveLearn India offer dedicated female instructor slots for 2-wheeler (scooty/bike) and 4-wheeler training batches. You can filter schools by "Female Instructor Available".',
  },
  {
    question: 'Is DriveLearn India an official government RTO website?',
    answer: 'No. DriveLearn India is an independent educational training directory that connects students with licensed, RTO-authorized private driving schools. Official Driving Licenses are issued solely by State Transport Authorities / MoRTH via the central Parivahan Sarathi portal.',
  },
  {
    question: 'What happens if I miss a scheduled training class?',
    answer: 'Partner driving schools allow up to 2 rescheduled sessions at no extra charge if notified at least 12 hours prior to your assigned batch timing.',
  },
];
