import express from 'express';
import prisma from '../shared/config/db.js';
import { protect, restrictTo } from '../shared/middleware/authMiddleware.js';

const router = express.Router();

// -----------------------------------------------------------------------------
// 1. GET /api/learner/profile — Student Dashboard & Sarathi Dossier
// -----------------------------------------------------------------------------
router.get('/profile', protect, restrictTo('LEARNER', 'ADMIN'), async (req, res) => {
  try {
    let profile = await prisma.learnerProfile.findUnique({
      where: { userId: req.user.id },
      include: {
        user: { select: { name: true, email: true, phone: true, city: true, emergencyContact: true } },
        school: { select: { id: true, name: true, address: true, city: true, phone: true } },
        activeCourse: true,
        assignedInstructor: {
          include: {
            user: { select: { name: true, phone: true } },
          },
        },
        assignedVehicle: true,
      },
    });

    // If profile not yet created, generate a default one for this learner
    if (!profile) {
      profile = await prisma.learnerProfile.create({
        data: {
          userId: req.user.id,
          preferredLanguage: 'Marathi',
          currentStage: 0,
          attendancePercent: 0,
          lessonsCompleted: 0,
          totalLessons: 10,
        },
        include: {
          user: { select: { name: true, email: true, phone: true, city: true, emergencyContact: true } },
          school: true,
          activeCourse: true,
        },
      });
    }

    res.status(200).json({
      status: 'success',
      data: { profile },
    });
  } catch (error) {
    console.error('Error fetching learner profile:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch learner profile', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 2. GET /api/learner/bookings — Practical Driving Sessions List
// -----------------------------------------------------------------------------
router.get('/bookings', protect, restrictTo('LEARNER', 'ADMIN'), async (req, res) => {
  try {
    const profile = await prisma.learnerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!profile) {
      return res.status(200).json({ status: 'success', data: { bookings: [] } });
    }

    const bookings = await prisma.booking.findMany({
      where: { learnerId: profile.id },
      include: {
        school: { select: { name: true, address: true } },
        instructor: { include: { user: { select: { name: true, phone: true } } } },
        vehicle: { select: { name: true, registrationNo: true } },
        course: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      data: { bookings },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch bookings', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 3. POST /api/learner/bookings — Book Next Practical Slot
// -----------------------------------------------------------------------------
router.post('/bookings', protect, restrictTo('LEARNER', 'ADMIN'), async (req, res) => {
  try {
    const { date, timeSlot, location, topic, pickupLandmark, instructorId, vehicleId, courseId } = req.body;

    let profile = await prisma.learnerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!profile) {
      profile = await prisma.learnerProfile.create({
        data: { userId: req.user.id },
      });
    }

    // Default school to learner's school or first available
    let schoolId = profile.schoolId;
    if (!schoolId) {
      const defaultSchool = await prisma.school.findFirst();
      schoolId = defaultSchool?.id;
    }

    // Default instructor to assigned or first available
    let targetInstructorId = instructorId || profile.assignedInstructorId;
    if (!targetInstructorId) {
      const defaultInst = await prisma.instructorProfile.findFirst({ where: { schoolId } });
      targetInstructorId = defaultInst?.id;
    }

    const bookingRef = `BKG-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = await prisma.booking.create({
      data: {
        bookingRef,
        learnerId: profile.id,
        schoolId: schoolId || (await prisma.school.findFirst())?.id,
        instructorId: targetInstructorId || (await prisma.instructorProfile.findFirst())?.id,
        vehicleId: vehicleId || profile.assignedVehicleId,
        courseId: courseId || profile.activeCourseId,
        date: date || '2026-08-25',
        timeSlot: timeSlot || '08:00 AM - 08:45 AM',
        location: location || 'Warje RTO 8-Track Ground',
        topic: topic || 'Simulated RTO 8-Track Exam Trial',
        pickupLandmark: pickupLandmark || 'Garware College Metro Gate 2 (Pillar 42)',
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
      },
      include: {
        school: { select: { name: true } },
        instructor: { include: { user: { select: { name: true } } } },
        vehicle: { select: { name: true, registrationNo: true } },
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Practical slot reserved successfully!',
      data: { booking: newBooking },
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ status: 'error', message: 'Failed to book slot', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 4. PUT /api/learner/bookings/:id/reschedule — Reschedule Slot
// -----------------------------------------------------------------------------
router.put('/bookings/:id/reschedule', protect, restrictTo('LEARNER', 'ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { date, timeSlot, pickupLandmark } = req.body;

    const updated = await prisma.booking.update({
      where: { id },
      data: {
        date,
        timeSlot,
        pickupLandmark,
        status: 'CONFIRMED',
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Lesson slot rescheduled successfully!',
      data: { booking: updated },
    });
  } catch (error) {
    console.error('Error rescheduling booking:', error);
    res.status(500).json({ status: 'error', message: 'Failed to reschedule slot', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 5. GET /api/learner/courses — Native Courses Catalog & Exploration
// -----------------------------------------------------------------------------
router.get('/courses', protect, async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true },
      include: {
        school: { select: { id: true, name: true, city: true, address: true, rtoApprovalNo: true, rating: true } },
      },
      orderBy: { price: 'asc' },
    });

    res.status(200).json({
      status: 'success',
      data: { courses },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch courses', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 6. POST /api/learner/courses/enroll — Enroll in Course & Apply Wallet Credit
// -----------------------------------------------------------------------------
router.post('/courses/enroll', protect, restrictTo('LEARNER', 'ADMIN'), async (req, res) => {
  try {
    const { courseId, applyWalletDiscount = true } = req.body;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { school: true },
    });

    if (!course) {
      return res.status(404).json({ status: 'fail', message: 'Course package not found' });
    }

    let profile = await prisma.learnerProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!profile) {
      profile = await prisma.learnerProfile.create({
        data: { userId: req.user.id },
      });
    }

    // Update Learner Profile active course & school
    const updatedProfile = await prisma.learnerProfile.update({
      where: { id: profile.id },
      data: {
        activeCourseId: course.id,
        schoolId: course.schoolId,
        lessonsCompleted: 0,
        attendancePercent: 0,
      },
    });

    // Handle Wallet deduction if requested and balance available
    const wallet = await prisma.wallet.findUnique({ where: { userId: req.user.id } });
    if (applyWalletDiscount && wallet && wallet.balance > 0) {
      const discountAmount = Math.min(wallet.balance, course.walletDiscount || 15.0);
      await prisma.$transaction([
        prisma.wallet.update({
          where: { id: wallet.id },
          data: { balance: { decrement: discountAmount } },
        }),
        prisma.walletTransaction.create({
          data: {
            walletId: wallet.id,
            amount: -discountAmount,
            type: 'DEBIT',
            description: `Applied ₹${discountAmount} bonus on enrollment for ${course.title}`,
            referenceId: course.id,
          },
        }),
      ]);
    }

    res.status(200).json({
      status: 'success',
      message: `Enrolled successfully in ${course.title}!`,
      data: { profile: updatedProfile, course },
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ status: 'error', message: 'Enrollment failed', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 7. GET /api/learner/wallet — Wallet Balance & Ledger
// -----------------------------------------------------------------------------
router.get('/wallet', protect, async (req, res) => {
  try {
    let wallet = await prisma.wallet.findUnique({
      where: { userId: req.user.id },
      include: {
        transactions: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          userId: req.user.id,
          balance: 15.0,
          transactions: {
            create: {
              amount: 15.0,
              type: 'CREDIT',
              description: '🎉 Introductory Welcome Bonus credited on signup',
            },
          },
        },
        include: { transactions: true },
      });
    }

    res.status(200).json({
      status: 'success',
      data: { wallet },
    });
  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch wallet', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 8. GET /api/learner/certificates — Form 5 Passing Certificates
// -----------------------------------------------------------------------------
router.get('/certificates', protect, restrictTo('LEARNER', 'ADMIN'), async (req, res) => {
  try {
    const profile = await prisma.learnerProfile.findUnique({ where: { userId: req.user.id } });
    if (!profile) {
      return res.status(200).json({ status: 'success', data: { certificates: [] } });
    }

    const certificates = await prisma.certificate.findMany({
      where: { learnerId: profile.id },
      include: {
        school: { select: { name: true, rtoApprovalNo: true, address: true, city: true } },
      },
    });

    res.status(200).json({
      status: 'success',
      data: { certificates },
    });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch certificates', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 9. GET /api/learner/weather-alert — Active Monsoon Weather Alert
// -----------------------------------------------------------------------------
router.get('/weather-alert', async (req, res) => {
  try {
    const activeAlert = await prisma.weatherAlert.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      include: { school: { select: { name: true } } },
    });

    res.status(200).json({
      status: 'success',
      data: { alert: activeAlert },
    });
  } catch (error) {
    console.error('Error fetching weather alert:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch weather alert', error: error.message });
  }
});

export default router;
