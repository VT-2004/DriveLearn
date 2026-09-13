import express from 'express';
import prisma from '../shared/config/db.js';
import { protect, restrictTo } from '../shared/middleware/authMiddleware.js';

const router = express.Router();

// -----------------------------------------------------------------------------
// 1. GET /api/instructor/schedule — Today's Driving Sessions Queue
// -----------------------------------------------------------------------------
router.get('/schedule', protect, restrictTo('INSTRUCTOR', 'ADMIN'), async (req, res) => {
  try {
    const instructor = await prisma.instructorProfile.findUnique({
      where: { userId: req.user.id },
      include: {
        assignedVehicle: true,
        school: { select: { name: true, city: true } },
      },
    });

    if (!instructor) {
      return res.status(200).json({ status: 'success', data: { instructor: null, schedule: [] } });
    }

    const schedule = await prisma.booking.findMany({
      where: { instructorId: instructor.id },
      include: {
        learner: {
          include: {
            user: { select: { name: true, phone: true, emergencyContact: true } },
          },
        },
        vehicle: true,
        course: { select: { title: true } },
      },
      orderBy: { date: 'asc' },
    });

    res.status(200).json({
      status: 'success',
      data: {
        instructor,
        schedule,
      },
    });
  } catch (error) {
    console.error('Error fetching instructor schedule:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch schedule', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 2. POST /api/instructor/lessons/:id/complete — In-Cockpit Console Sign-Off
// -----------------------------------------------------------------------------
router.post('/lessons/:id/complete', protect, restrictTo('INSTRUCTOR', 'ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { instructorNotes, checklistDone } = req.body;

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        instructorNotes: instructorNotes || 'Practical session completed successfully.',
        checklistDone: checklistDone || {},
      },
      include: { learner: true },
    });

    // Increment learner's completed lessons count
    if (booking.learnerId) {
      await prisma.learnerProfile.update({
        where: { id: booking.learnerId },
        data: {
          lessonsCompleted: { increment: 1 },
          attendancePercent: { increment: 10 },
        },
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Practical lesson verified and marked completed in cockpit!',
      data: { booking },
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({ status: 'error', message: 'Failed to complete lesson', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 3. POST /api/instructor/weather-alert — Broadcast Monsoon Rain Delay
// -----------------------------------------------------------------------------
router.post('/weather-alert', protect, restrictTo('INSTRUCTOR', 'OWNER', 'ADMIN'), async (req, res) => {
  try {
    const { zone, headline, message, severity = 'WARNING' } = req.body;

    // Deactivate previous alerts
    await prisma.weatherAlert.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    const newAlert = await prisma.weatherAlert.create({
      data: {
        postedById: req.user.id,
        zone: zone || 'Pune MH-12 (Kothrud / Karve Road / Warje)',
        headline: headline || 'Heavy Monsoon Waterlogging & Rain Delay',
        message: message || 'Track sessions near Warje delayed by 45 mins. Safety first.',
        severity,
        rescheduleLinkEnabled: true,
        isActive: true,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Monsoon weather delay alert broadcasted to students successfully!',
      data: { alert: newAlert },
    });
  } catch (error) {
    console.error('Error posting weather alert:', error);
    res.status(500).json({ status: 'error', message: 'Failed to broadcast alert', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 4. DELETE /api/instructor/weather-alert — Lift / Clear Weather Delay
// -----------------------------------------------------------------------------
router.delete('/weather-alert', protect, restrictTo('INSTRUCTOR', 'OWNER', 'ADMIN'), async (req, res) => {
  try {
    await prisma.weatherAlert.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    res.status(200).json({
      status: 'success',
      message: 'Weather delay lifted. Regular training operations resumed.',
    });
  } catch (error) {
    console.error('Error lifting weather alert:', error);
    res.status(500).json({ status: 'error', message: 'Failed to lift alert', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 5. GET /api/instructor/students — Student Skill Evaluation Roster
// -----------------------------------------------------------------------------
router.get('/students', protect, restrictTo('INSTRUCTOR', 'ADMIN'), async (req, res) => {
  try {
    const instructor = await prisma.instructorProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!instructor) {
      return res.status(200).json({ status: 'success', data: { students: [] } });
    }

    const students = await prisma.learnerProfile.findMany({
      where: { assignedInstructorId: instructor.id },
      include: {
        user: { select: { name: true, phone: true, email: true, emergencyContact: true } },
        activeCourse: { select: { title: true } },
        assignedVehicle: { select: { name: true, registrationNo: true } },
      },
    });

    res.status(200).json({
      status: 'success',
      data: { students },
    });
  } catch (error) {
    console.error('Error fetching instructor students:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch students', error: error.message });
  }
});

export default router;
