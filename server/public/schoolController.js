import prisma from '../shared/config/db.js';

// 1. GET /api/schools (With optional query params: ?city=Pune&q=Sai&femaleOnly=true)
export const getAllSchools = async (req, res) => {
  try {
    const { city, state, q, femaleOnly, twoWheelerOnly } = req.query;

    const whereClause = {};

    if (state) {
      whereClause.state = { equals: state, mode: 'insensitive' };
    }

    if (city) {
      whereClause.city = { equals: city, mode: 'insensitive' };
    }

    if (femaleOnly === 'true') {
      whereClause.femaleInstructor = true;
    }

    if (twoWheelerOnly === 'true') {
      whereClause.twoWheelerSpecialist = true;
    }

    if (q) {
      whereClause.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { address: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
      ];
    }

    const schools = await prisma.school.findMany({
      where: whereClause,
      orderBy: { rating: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch driving schools from database',
      error: error.message,
    });
  }
};

// 2. GET /api/schools/:id
export const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await prisma.school.findUnique({
      where: { id },
    });

    if (!school) {
      return res.status(404).json({
        status: 'fail',
        message: `No driving school found with ID: ${id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: school,
    });
  } catch (error) {
    console.error('Error fetching school by ID:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch school details',
      error: error.message,
    });
  }
};
