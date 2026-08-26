import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

// 1. Protect Route: Verifies Bearer Token
export const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to get access.',
            });
        }

        // Verify token validity
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || 'fallback_secret_key_drivelearn'
        );

        // Check if user still exists in PostgreSQL
        const currentUser = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: { wallet: true },
        });

        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer exists.',
            });
        }

        // Grant access to protected route by attaching user to request
        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid or expired token. Please log in again.',
            error: error.message,
        });
    }
};

// 2. Role-Based Access Control (RBAC)
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: `Forbidden: You do not have permission as a ${req.user.role} to perform this action.`,
            });
        }
        next();
    };
};
