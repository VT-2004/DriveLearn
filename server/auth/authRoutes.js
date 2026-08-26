import express from 'express';
import { register, login, getMe } from './authController.js';
import { protect } from '../shared/middleware/authMiddleware.js';

const router = express.Router();

// Public Auth Endpoints
router.post('/register', register);
router.post('/login', login);

// Protected Auth Endpoints (Requires valid Bearer Token)
router.get('/me', protect, getMe);

export default router;
