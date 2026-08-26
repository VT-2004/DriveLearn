import express from 'express';
import { getAllSchools, getSchoolById } from './schoolController.js';

const router = express.Router();

// Public School Discovery Routes
router.get('/', getAllSchools);
router.get('/:id', getSchoolById);

export default router;
