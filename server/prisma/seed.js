import bcrypt from 'bcryptjs';
import prisma from '../shared/config/db.js';

const MAHARASHTRA_SCHOOLS = [
  {
    name: 'Sai Motor & 2-Wheeler Training School',
    tagline: 'Pune’s top rated 2-wheeler & car training center with dedicated female trainers',
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
      'Dedicated RTO "8" & "H" track practice',
      'Dual-brake safety control vehicles',
      'Certified women instructors available',
      'Doorstep pickup & drop available in Kothrud',
    ],
  },
  {
    name: 'Apex Rider & Motor Driving Academy',
    tagline: 'Special 8-figure track training for RTO test confidence in Mumbai',
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
      'RTO test track simulator',
      'Dual-brake Swift & i10 training cars',
      'Special Sunday-only working professional batches',
    ],
  },
];

const DEMO_USERS = [
  {
    name: 'Pooja Kulkarni',
    email: 'pooja.kulkarni@gmail.com',
    phone: '+91 98230 11223',
    plainPassword: 'learner123',
    role: 'LEARNER',
    city: 'Pune',
  },
  {
    name: 'Rajesh Patil (Sai Motors Owner)',
    email: 'owner@saimotorspune.in',
    phone: '+91 98230 45678',
    plainPassword: 'owner123',
    role: 'OWNER',
    city: 'Pune',
  },
  {
    name: 'Sunita Deshmukh',
    email: 'sunita.trainer@saimotors.in',
    phone: '+91 98230 99887',
    plainPassword: 'trainer123',
    role: 'INSTRUCTOR',
    city: 'Pune',
  },
  {
    name: 'DriveLearn Admin',
    email: 'admin@drivelearn.in',
    phone: '+91 98000 00001',
    plainPassword: 'superadmin123',
    role: 'ADMIN',
    city: 'Pune',
  },
];

async function main() {
  console.log('🌱 Seeding Maharashtra Schools and Demo Users to Supabase...');

  // 1. Seed Driving Schools
  for (const school of MAHARASHTRA_SCHOOLS) {
    await prisma.school.upsert({
      where: { rtoApprovalNo: school.rtoApprovalNo },
      update: school,
      create: school,
    });
  }

  // 2. Seed Users with Wallets
  for (const user of DEMO_USERS) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.plainPassword, salt);

    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: hashedPassword,
          role: user.role,
          city: user.city,
          wallet: {
            create: {
              balance: 15.0,
              transactions: {
                create: {
                  amount: 15.0,
                  type: 'CREDIT',
                  description: '🎉 Introductory Signup Bonus credited to Wallet',
                },
              },
            },
          },
        },
      });
      console.log(`  👤 Created ${user.role} user: ${user.email} (Password: ${user.plainPassword})`);
    }
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
