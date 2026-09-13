import express from 'express';
import prisma from '../shared/config/db.js';
import { protect, restrictTo } from '../shared/middleware/authMiddleware.js';

const router = express.Router();

// Helper to get owner's primary school
async function getOwnerSchool(userId) {
  let school = await prisma.school.findFirst({ where: { ownerId: userId } });
  if (!school) {
    school = await prisma.school.findFirst();
  }
  return school;
}

// -----------------------------------------------------------------------------
// 1. GET /api/owner/overview — Executive Dashboard Summary
// -----------------------------------------------------------------------------
router.get('/overview', protect, restrictTo('OWNER', 'ADMIN'), async (req, res) => {
  try {
    const school = await getOwnerSchool(req.user.id);
    if (!school) {
      return res.status(404).json({ status: 'fail', message: 'No driving school associated with this account.' });
    }

    const [learnersCount, instructorsCount, vehiclesCount, bookingsCount] = await Promise.all([
      prisma.learnerProfile.count({ where: { schoolId: school.id } }),
      prisma.instructorProfile.count({ where: { schoolId: school.id } }),
      prisma.vehicle.count({ where: { schoolId: school.id } }),
      prisma.booking.count({ where: { schoolId: school.id } }),
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        school,
        stats: {
          activeLearners: learnersCount,
          totalInstructors: instructorsCount,
          fleetVehicles: vehiclesCount,
          totalBookings: bookingsCount,
          monthlyRevenue: learnersCount * 999,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching owner overview:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch overview', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 2. GET /api/owner/vehicles — Fleet Compliance Dossier
// -----------------------------------------------------------------------------
router.get('/vehicles', protect, restrictTo('OWNER', 'ADMIN'), async (req, res) => {
  try {
    const school = await getOwnerSchool(req.user.id);
    const vehicles = await prisma.vehicle.findMany({
      where: { schoolId: school?.id },
      include: {
        instructors: { include: { user: { select: { name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      data: { vehicles },
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch fleet', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 3. POST /api/owner/vehicles — Register New Fleet Vehicle
// -----------------------------------------------------------------------------
router.post('/vehicles', protect, restrictTo('OWNER', 'ADMIN'), async (req, res) => {
  try {
    const school = await getOwnerSchool(req.user.id);
    const { name, model, type, registrationNo, fuelType, chassisNo, engineNo, insurancePolicyNo } = req.body;

    const newVehicle = await prisma.vehicle.create({
      data: {
        schoolId: school.id,
        name: name || 'Maruti Suzuki WagonR Dual-Brake',
        model: model || 'WagonR VXi 2024',
        type: type || 'FOUR_WHEELER',
        registrationNo,
        fuelType: fuelType || 'PETROL',
        dualControlFitted: true,
        chassisNo,
        engineNo,
        insurancePolicyNo,
        status: 'ACTIVE',
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Vehicle added to school fleet dossier successfully!',
      data: { vehicle: newVehicle },
    });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ status: 'error', message: 'Failed to register vehicle', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 4. GET /api/owner/fuel-ledger — Fuel / CNG Operational Audit
// -----------------------------------------------------------------------------
router.get('/fuel-ledger', protect, restrictTo('OWNER', 'ADMIN'), async (req, res) => {
  try {
    const school = await getOwnerSchool(req.user.id);
    const ledgers = await prisma.fuelLedger.findMany({
      where: { schoolId: school?.id },
      include: {
        vehicle: { select: { name: true, registrationNo: true } },
      },
      orderBy: { date: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      data: { fuelLedgers: ledgers },
    });
  } catch (error) {
    console.error('Error fetching fuel ledger:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch fuel ledger', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 5. POST /api/owner/fuel-ledger — Log Fuel / CNG Receipt
// -----------------------------------------------------------------------------
router.post('/fuel-ledger', protect, restrictTo('OWNER', 'ADMIN'), async (req, res) => {
  try {
    const school = await getOwnerSchool(req.user.id);
    const { vehicleId, fuelType, quantityLiters, amountPaid, odometerReading, receiptNo, fuelStation } = req.body;

    const newEntry = await prisma.fuelLedger.create({
      data: {
        schoolId: school.id,
        vehicleId,
        fuelType: fuelType || 'PETROL',
        quantityLiters: parseFloat(quantityLiters),
        amountPaid: parseFloat(amountPaid),
        odometerReading: parseInt(odometerReading),
        receiptNo,
        fuelStation: fuelStation || 'HP Petrol Pump, Karve Road',
      },
      include: {
        vehicle: { select: { name: true, registrationNo: true } },
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Fuel transaction logged to audit ledger!',
      data: { fuelLedger: newEntry },
    });
  } catch (error) {
    console.error('Error logging fuel:', error);
    res.status(500).json({ status: 'error', message: 'Failed to log fuel entry', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 6. GET /api/owner/students — Student Admissions & Sarathi Form 2 Registry
// -----------------------------------------------------------------------------
router.get('/students', protect, restrictTo('OWNER', 'ADMIN'), async (req, res) => {
  try {
    const school = await getOwnerSchool(req.user.id);
    const students = await prisma.learnerProfile.findMany({
      where: { schoolId: school?.id },
      include: {
        user: { select: { name: true, email: true, phone: true, emergencyContact: true } },
        activeCourse: { select: { title: true, price: true } },
        assignedInstructor: { include: { user: { select: { name: true } } } },
        assignedVehicle: { select: { name: true, registrationNo: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      data: { students },
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch student admissions', error: error.message });
  }
});

// -----------------------------------------------------------------------------
// 7. GET /api/owner/instructors — Academy Staff & Trainer Roster
// -----------------------------------------------------------------------------
router.get('/instructors', protect, restrictTo('OWNER', 'ADMIN'), async (req, res) => {
  try {
    const school = await getOwnerSchool(req.user.id);
    const instructors = await prisma.instructorProfile.findMany({
      where: { schoolId: school?.id },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        assignedVehicle: { select: { name: true, registrationNo: true } },
        assignedLearners: { select: { id: true } },
      },
    });

    res.status(200).json({
      status: 'success',
      data: { instructors },
    });
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch instructor roster', error: error.message });
  }
});

export default router;
