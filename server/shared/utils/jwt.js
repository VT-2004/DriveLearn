import jwt from 'jsonwebtoken';

// Generate a signed JWT containing user ID and role
export const generateToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role },
        process.env.JWT_SECRET || 'fallback_secret_key_drivelearn',
        { expiresIn: '7d' } // Token remains valid for 7 days
    );
};
