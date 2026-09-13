import 'dotenv/config';
import bcrypt from 'bcryptjs';
import prisma from '../shared/config/db.js';

async function main() {
  console.log('🌱 Seeding Complete Maharashtra Ecosystem to Supabase PostgreSQL...');

  // 1. Password Hashing Helper
  const salt = await bcrypt.genSalt(10);
  const hash = async (pwd) => bcrypt.hash(pwd, salt);

  // 2. Create / Upsert Users
  console.log('  👤 Creating Core Demo Users...');
  const ownerUser = await prisma.user.upsert({
    where: { email: 'owner@saimotorspune.in' },
    update: {},
    create: {
      name: 'Rajesh Patil',
      email: 'owner@saimotorspune.in',
      phone: '+91 98230 45678',
      password: await hash('owner123'),
      role: 'OWNER',
      city: 'Pune',
      state: 'Maharashtra',
      wallet: {
        create: {
          balance: 15.0,
          transactions: {
            create: { amount: 15.0, type: 'CREDIT', description: 'Welcome Wallet Credit' },
          },
        },
      },
    },
  });

  const trainerUser = await prisma.user.upsert({
    where: { email: 'sunita.trainer@saimotors.in' },
    update: {},
    create: {
      name: 'Sunita Deshmukh',
      email: 'sunita.trainer@saimotors.in',
      phone: '+91 98230 99887',
      password: await hash('trainer123'),
      role: 'INSTRUCTOR',
      city: 'Pune',
      state: 'Maharashtra',
      wallet: {
        create: {
          balance: 15.0,
          transactions: {
            create: { amount: 15.0, type: 'CREDIT', description: 'Welcome Wallet Credit' },
          },
        },
      },
    },
  });

  const trainerUser2 = await prisma.user.upsert({
    where: { email: 'sachin.shinde@saimotors.in' },
    update: {},
    create: {
      name: 'Sachin Shinde',
      email: 'sachin.shinde@saimotors.in',
      phone: '+91 98230 77665',
      password: await hash('trainer123'),
      role: 'INSTRUCTOR',
      city: 'Pune',
      state: 'Maharashtra',
      wallet: {
        create: {
          balance: 15.0,
          transactions: {
            create: { amount: 15.0, type: 'CREDIT', description: 'Welcome Wallet Credit' },
          },
        },
      },
    },
  });

  const learnerUser = await prisma.user.upsert({
    where: { email: 'pooja.kulkarni@gmail.com' },
    update: {},
    create: {
      name: 'Pooja Kulkarni',
      email: 'pooja.kulkarni@gmail.com',
      phone: '+91 98230 11223',
      password: await hash('learner123'),
      role: 'LEARNER',
      city: 'Pune',
      state: 'Maharashtra',
      emergencyContact: '+91 98230 44556 (Sunil Kulkarni - Father)',
      wallet: {
        create: {
          balance: 0.0,
          transactions: {
            create: [
              { amount: 15.0, type: 'CREDIT', description: '🎉 Introductory Signup Bonus Deposit' },
              { amount: -15.0, type: 'DEBIT', description: 'Applied on 2-Wheeler Course Checkout (Sai Motors)' },
            ],
          },
        },
      },
    },
  });

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@drivelearn.in').trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@DriveLearn2026';

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: await hash(adminPassword),
      role: 'ADMIN',
    },
    create: {
      name: 'Super Admin',
      email: adminEmail,
      phone: '+91 98000 00001',
      password: await hash(adminPassword),
      role: 'ADMIN',
      city: 'Pune',
      state: 'Maharashtra',
      wallet: {
        create: { balance: 5000.0 },
      },
    },
  });

  // 3. Create Driving Schools
  console.log('  🏢 Seeding RTO-Approved Driving Schools...');
  const saiSchool = await prisma.school.upsert({
    where: { rtoApprovalNo: 'MH-12/DS/2014/889' },
    update: { ownerId: ownerUser.id },
    create: {
      ownerId: ownerUser.id,
      name: 'Sai Motor & 2-Wheeler Training School',
      tagline: 'RTO-Approved training on Karve Road with specialized 8-track ground practice',
      rtoApprovalNo: 'MH-12/DS/2014/889',
      establishedYear: 2014,
      phone: '+91 98230 45678',
      email: 'saimotors.pune12@gmail.com',
      address: 'Plot 14, Opposite Garware College Metro Station, Karve Road, Kothrud',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411038',
      rating: 4.9,
      reviewCount: 420,
      startingPrice: 999,
      verified: true,
      femaleInstructor: true,
      twoWheelerSpecialist: true,
      featuredImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      facilities: [
        'Dedicated RTO "8" & "H" ground track practice near Warje',
        'Dual-brake control Swift & WagonR safety cars',
        'Certified women instructors for female students',
        'Doorstep pickup & drop available in Kothrud, Deccan & Karve Nagar',
      ],
    },
  });

  const apexSchool = await prisma.school.upsert({
    where: { rtoApprovalNo: 'MH-02/DS/2016/412' },
    update: {},
    create: {
      name: 'Apex Rider & Motor Driving Academy',
      tagline: 'Special 8-figure ground training for Mumbai RTO test confidence',
      rtoApprovalNo: 'MH-02/DS/2016/412',
      establishedYear: 2016,
      phone: '+91 99201 88345',
      email: 'apexdriving.mumbai02@gmail.com',
      address: 'Shop 4, Greenfield Heights, Link Road, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      rating: 4.8,
      reviewCount: 312,
      startingPrice: 999,
      verified: true,
      femaleInstructor: true,
      twoWheelerSpecialist: true,
      featuredImage: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop&q=80',
      facilities: [
        'Dedicated RTO 8-track test practice ground',
        'Dual-brake Swift & i10 training cars',
        'Special Sunday-only working professional batches',
      ],
    },
  });

  // 4. Create Vehicles
  console.log('  🚗 Seeding Dual-Control Fleet Vehicles...');
  const activaVehicle = await prisma.vehicle.upsert({
    where: { registrationNo: 'MH-12-CD-8812' },
    update: {},
    create: {
      schoolId: saiSchool.id,
      name: 'Honda Activa 6G',
      model: 'Activa 6G Deluxe 2023',
      type: 'TWO_WHEELER',
      registrationNo: 'MH-12-CD-8812',
      fuelType: 'PETROL',
      dualControlFitted: true,
      chassisNo: 'ME4JF504BNK881290',
      engineNo: 'JF50E7781204',
      fitnessExpiry: new Date('2028-06-15'),
      insuranceExpiry: new Date('2027-04-10'),
      insurancePolicyNo: 'BAJAJ-ALLIANZ-2024-MH12-9901',
      status: 'ACTIVE',
      odometerKm: 8420,
    },
  });

  const swiftVehicle = await prisma.vehicle.upsert({
    where: { registrationNo: 'MH-12-PQ-4410' },
    update: {},
    create: {
      schoolId: saiSchool.id,
      name: 'Maruti Suzuki Swift Dual-Brake',
      model: 'Swift LXi Dual-Control 2024',
      type: 'FOUR_WHEELER',
      registrationNo: 'MH-12-PQ-4410',
      fuelType: 'PETROL',
      dualControlFitted: true,
      chassisNo: 'MA3EJC12S00994410',
      engineNo: 'K12M8830114',
      fitnessExpiry: new Date('2029-08-20'),
      insuranceExpiry: new Date('2027-05-18'),
      insurancePolicyNo: 'ICICI-LOMBARD-2024-MH12-4410',
      status: 'ACTIVE',
      odometerKm: 16800,
    },
  });

  // 5. Create Instructors
  console.log('  👩‍🏫 Seeding Certified Instructors...');
  const sunitaProfile = await prisma.instructorProfile.upsert({
    where: { userId: trainerUser.id },
    update: { assignedVehicleId: activaVehicle.id },
    create: {
      userId: trainerUser.id,
      schoolId: saiSchool.id,
      assignedVehicleId: activaVehicle.id,
      licenseNo: 'MDIR-MH12-2018-0994',
      experienceYears: 8,
      rating: 4.95,
      totalStudentsTrained: 340,
      isFemaleSpecialist: true,
      isRtoCertified: true,
      shiftTimings: '06:30 AM - 05:30 PM',
      status: 'ACTIVE',
    },
  });

  const sachinProfile = await prisma.instructorProfile.upsert({
    where: { userId: trainerUser2.id },
    update: { assignedVehicleId: swiftVehicle.id },
    create: {
      userId: trainerUser2.id,
      schoolId: saiSchool.id,
      assignedVehicleId: swiftVehicle.id,
      licenseNo: 'MDIR-MH12-2012-0442',
      experienceYears: 12,
      rating: 4.9,
      totalStudentsTrained: 520,
      isFemaleSpecialist: false,
      isRtoCertified: true,
      shiftTimings: '07:00 AM - 06:00 PM',
      status: 'ACTIVE',
    },
  });

  // 6. Create Courses & Packages
  console.log('  📦 Seeding Subsidized & Comprehensive Packages...');
  let course2W = await prisma.course.findFirst({
    where: { schoolId: saiSchool.id, title: 'Two-Wheeler Complete Course (MCWG / Scooty)' },
  });
  if (!course2W) {
    course2W = await prisma.course.create({
      data: {
        schoolId: saiSchool.id,
        title: 'Two-Wheeler Complete Course (MCWG / Scooty)',
        category: 'TWO_WHEELER',
        duration: '10 Days (45 mins/day)',
        practicalHours: 10,
        price: 999,
        originalPrice: 1800,
        isSubsidizedLaunch: true,
        walletDiscount: 15.0,
        popular: true,
        syllabus: [
          'Clutch biting point & throttle balance modulation',
          'RTO "8" figure ground test practice without foot down',
          'Slope stopping & half-clutch hill start',
          'Live traffic road confidence training on Karve Road',
          'School vehicle provided at Alandi Road RTO for test',
        ],
        batchTimings: ['Early Morning 6:30 AM', 'Morning 8:30 AM', 'Evening 4:00 PM', 'Sunset 5:00 PM'],
        pickupLandmark: 'Garware College Metro Gate 2 (Pillar 42)',
      },
    });
  }

  let course4W = await prisma.course.findFirst({
    where: { schoolId: saiSchool.id, title: 'Four-Wheeler Car Training (Swift / WagonR)' },
  });
  if (!course4W) {
    course4W = await prisma.course.create({
      data: {
        schoolId: saiSchool.id,
        title: 'Four-Wheeler Car Training (Swift / WagonR)',
        category: 'FOUR_WHEELER',
        duration: '15 Days (1 hour/day)',
        practicalHours: 15,
        price: 3999,
        originalPrice: 5500,
        isSubsidizedLaunch: false,
        walletDiscount: 15.0,
        popular: false,
        syllabus: [
          'Dual-brake control Swift & WagonR steering & gears',
          'Reverse "S" track & parallel parking between cones',
          '1 Night driving session & highway overtaking rules',
          'Basic bonnet inspection, coolant & puncture guide',
          'Permanent DL test car provided on RTO trial day',
        ],
        batchTimings: ['Morning 7:30 AM', 'Morning 9:30 AM', 'Evening 4:30 PM', 'Weekend Batch'],
        pickupLandmark: 'Warje RTO 8-Track Ground Gate 1',
      },
    });
  }

  // 7. Create Learner Profile
  console.log('  🎓 Seeding Student Profile for Pooja Kulkarni...');
  const poojaProfile = await prisma.learnerProfile.upsert({
    where: { userId: learnerUser.id },
    update: {
      schoolId: saiSchool.id,
      activeCourseId: course2W.id,
      assignedInstructorId: sunitaProfile.id,
      assignedVehicleId: activaVehicle.id,
    },
    create: {
      userId: learnerUser.id,
      schoolId: saiSchool.id,
      activeCourseId: course2W.id,
      assignedInstructorId: sunitaProfile.id,
      assignedVehicleId: activaVehicle.id,
      sarathiLearnerLicenseNo: 'MH-12/LL/2026/088192',
      sarathiForm2Verified: true,
      llExpiryDate: new Date('2027-02-14'),
      preferredLanguage: 'Marathi',
      currentStage: 3,
      attendancePercent: 88.0,
      lessonsCompleted: 8,
      totalLessons: 10,
    },
  });

  // 8. Create Practical Bookings
  console.log('  📅 Seeding Practical Lesson Bookings...');
  const bookingsData = [
    {
      bookingRef: 'BKG-503',
      date: '2026-08-25',
      timeSlot: '04:00 PM - 04:45 PM',
      location: 'Garware College Track Ground, Karve Rd',
      topic: 'Traffic Merge & Turning Indicator Drills',
      pickupLandmark: 'Garware College Metro Gate 2 (Pillar 42)',
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
    },
    {
      bookingRef: 'BKG-507',
      date: '2026-08-27',
      timeSlot: '08:00 AM - 08:45 AM',
      location: 'Warje RTO 8-Track Ground',
      topic: 'Simulated RTO 8-Track Exam Trial',
      pickupLandmark: 'Warje RTO 8-Track Ground Gate 1',
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
    },
    {
      bookingRef: 'BKG-500',
      date: '2026-08-21',
      timeSlot: '04:00 PM - 04:45 PM',
      location: 'Karve Road Traffic Stretch',
      topic: 'Bumper-to-Bumper Clutch Crawling',
      pickupLandmark: 'Garware College Metro Gate 2 (Pillar 42)',
      status: 'COMPLETED',
      paymentStatus: 'PAID',
      instructorNotes: 'Pooja handled the busy evening traffic with great composure. Remember blind-spot checks before turns.',
      checklistDone: { helmet: true, clutch: true, indicators: true },
      studentRating: 5,
    },
    {
      bookingRef: 'BKG-498',
      date: '2026-08-19',
      timeSlot: '04:00 PM - 04:45 PM',
      location: 'Warje RTO 8-Track Ground',
      topic: 'Tight Figure-8 Ground Maneuvers',
      pickupLandmark: 'Garware College Metro Gate 2 (Pillar 42)',
      status: 'COMPLETED',
      paymentStatus: 'PAID',
      instructorNotes: 'Flawless execution on the 8-track ground! Foot did not touch the ground even once during tight curves.',
      checklistDone: { helmet: true, eightTrack: true, braking: true },
      studentRating: 5,
    },
  ];

  for (const b of bookingsData) {
    await prisma.booking.upsert({
      where: { bookingRef: b.bookingRef },
      update: {},
      create: {
        ...b,
        learnerId: poojaProfile.id,
        schoolId: saiSchool.id,
        instructorId: sunitaProfile.id,
        vehicleId: activaVehicle.id,
        courseId: course2W.id,
      },
    });
  }

  // 9. Create CMVR Form 5 Certificate
  console.log('  📜 Seeding CMVR Form 5 Certificate...');
  await prisma.certificate.upsert({
    where: { certificateNo: 'MH-12-CMVR-2026-8819' },
    update: {},
    create: {
      certificateNo: 'MH-12-CMVR-2026-8819',
      learnerId: poojaProfile.id,
      schoolId: saiSchool.id,
      ruleReference: 'CMVR 1989 Rule 27 Form 5',
      vehicleCategory: 'MCWG (Two-Wheeler with Gear)',
      qrVerificationHash: 'DL-MH12-2026-8819-VERIFIED',
      status: 'ISSUED',
    },
  });

  // 10. Create Fuel Ledger for Owner
  console.log('  ⛽ Seeding Operational Fuel Ledger...');
  const existingFuel = await prisma.fuelLedger.findFirst({
    where: { schoolId: saiSchool.id },
  });
  if (!existingFuel) {
    await prisma.fuelLedger.createMany({
      data: [
        {
          schoolId: saiSchool.id,
          vehicleId: activaVehicle.id,
          fuelType: 'PETROL',
          quantityLiters: 4.8,
          amountPaid: 512.0,
          odometerReading: 8420,
          receiptNo: 'HP-KV-88210',
          fuelStation: 'HP Petrol Pump, Karve Road',
        },
        {
          schoolId: saiSchool.id,
          vehicleId: swiftVehicle.id,
          fuelType: 'PETROL',
          quantityLiters: 18.5,
          amountPaid: 1980.0,
          odometerReading: 16800,
          receiptNo: 'BPCL-DECCAN-4419',
          fuelStation: 'BPCL Auto Care, Deccan Gymkhana',
        },
      ],
    });
  }

  // 11. Create Student Review
  console.log('  ⭐ Seeding Student Reviews...');
  const existingReview = await prisma.review.findFirst({
    where: { learnerId: poojaProfile.id },
  });
  if (!existingReview) {
    await prisma.review.create({
      data: {
        learnerId: poojaProfile.id,
        schoolId: saiSchool.id,
        instructorId: sunitaProfile.id,
        rating: 5,
        courseName: 'Two-Wheeler Complete Course (MCWG)',
        comment: 'Sunita ma’am taught me how to balance an Activa in just 3 days! She is very patient. The ₹999 launch fee is really helpful for college students.',
      },
    });
  }

  console.log('🎉 Complete Database Seeding Finished Successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
