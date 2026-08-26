import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './shared/config/db.js';
import schoolRoutes from './public/schoolRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Essential Middleware
app.use(cors()); // Allows frontend on port 5173 to fetch data from this server
app.use(express.json()); // Parses incoming JSON payloads in req.body

// 1. Server Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'DriveLearn India Server is Connected & Running ✅',
        timestamp: new Date().toISOString(),
    });
});

// 2. Database Health check route (Tests Supabase connection)
app.get('/api/db-health', async (req, res) => {
    try {
        const result = await prisma.$queryRaw`SELECT NOW() as db_time;`;
        res.status(200).json({
            status: 'success',
            message: 'Connected to Supabase PostgreSQL successfully! 🐘⚡',
            db_time: result[0].db_time,
        });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to connect to database',
            error: error.message,
        });
    }
});

import authRoutes from './auth/authRoutes.js';

// 3. Mount Public School Routes
app.use('/api/schools', schoolRoutes);

// 4. Mount Authentication & User Routes (Phase 2 Milestone)
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

