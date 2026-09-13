import express from 'express';
import prisma from '../shared/config/db.js';
import { protect, restrictTo } from '../shared/middleware/authMiddleware.js';

const router = express.Router();

// -----------------------------------------------------------------------------
// 1. GET /api/admin/stats — Statewide Transport Regulator Overview
// -----------------------------------------------------------------------------
router.get('/stats', protect, restrictTo('ADMIN'), async (req, res) => {
  try {
    const [totalSchools, totalLearners, totalInstructors, totalVehicles, totalBookings] = await Promise.all([
      prisma.school.count(),
      prisma.learnerProfile.count(),
      prisma.instructorProfile.count(),
      prisma.vehicle.count(),
      prisma.booking.count(),
    ]);

    const verifiedSchools = await prisma.school.count({ where: { verified: true } });

    res.status(200).json({
      status: 'success',
      data: {
        totalSchools,
        verifiedSchools,
        pendingVerifications: totalSchools - verifiedSchools,
        totalLearners,
        totalInstructors,
        totalVehicles,
        totalBookings,
        platformVolumeINR: totalLearners * 999,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch admin stats', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 2. GET /api/admin/schools — All Registered Driving Schools
// -----------------------------------------------------------------------------
router.get('/schools', protect, restrictTo('ADMIN'), async (req, res) => {
  try {
    const schools = await prisma.school.findMany({
      include: {
        _count: {
          select: { learners: true, instructors: true, vehicles: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      data: { schools },
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch schools', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 3. PUT /api/admin/schools/:id/verify — Approve / Reject Driving School
// -----------------------------------------------------------------------------
router.put('/schools/:id/verify', protect, restrictTo('ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;

    const updated = await prisma.school.update({
      where: { id },
      data: { verified: Boolean(verified) },
    });

    res.status(200).json({
      status: 'success',
      message: `School ${verified ? 'verified and approved' : 'flagged / unverified'} successfully!`,
      data: { school: updated },
    });
  } catch (error) {
    console.error('Error verifying school:', error);
    res.status(500).json({ status: 'error', message: 'Failed to update verification', error: error.message });
  }
});

export default router;
