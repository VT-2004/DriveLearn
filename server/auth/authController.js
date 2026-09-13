import bcrypt from 'bcryptjs';
import prisma from '../shared/config/db.js';
import { generateToken } from '../shared/utils/jwt.js';

// 1. POST /api/auth/register
export const register = async (req, res) => {
    try {
        const { name, email, phone, password, role = 'LEARNER', city = 'Pune', state = 'Maharashtra' } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide your full name, email, phone number, and password.',
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: normalizedEmail }, { phone: normalizedPhone }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: existingUser.email === normalizedEmail
                    ? 'An account with this email address already exists.'
                    : 'An account with this mobile number already exists.',
            });
        }

        // Hash password securely with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with welcome wallet bonus
        const newUser = await prisma.user.create({
            data: {
                name,
                email: normalizedEmail,
                phone: normalizedPhone,
                password: hashedPassword,
                role: role.toUpperCase(),
                city,
                state,
                wallet: {
                    create: {
                        balance: 15.0,
                        transactions: {
                            create: {
                                amount: 15.0,
                                type: 'CREDIT',
                                description: '🎉 Introductory Signup Bonus credited to Wallet',
                            },
                        },
                    },
                },
            },
            include: {
                wallet: {
                    include: {
                        transactions: true,
                    },
                },
            },
        });

        const token = generateToken(newUser.id, newUser.role);
        const { password: _, ...userWithoutPassword } = newUser;

        return res.status(201).json({
            status: 'success',
            message: 'Account created successfully! ₹15 credited to your wallet.',
            token,
            data: { user: userWithoutPassword },
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create account. Please verify your connection and try again.',
            error: error.message,
        });
    }
};

// 2. POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;

        if (!emailOrPhone || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide your registered email/phone and password.',
            });
        }

        const normalizedInput = emailOrPhone.trim().toLowerCase();
        const trimmedInput = emailOrPhone.trim();

        // 1. Query Prisma PostgreSQL Database
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: normalizedInput },
                    { phone: trimmedInput },
                ],
            },
            include: {
                wallet: {
                    include: {
                        transactions: {
                            orderBy: { createdAt: 'desc' },
                            take: 10,
                        },
                    },
                },
            },
        });

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email/phone or password. Please verify your credentials.',
            });
        }

        // 2. Compare hashed password with bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email/phone or password. Please verify your credentials.',
            });
        }

        // 3. Issue genuine signed JWT
        const token = generateToken(user.id, user.role);
        const { password: _, ...userWithoutPassword } = user;

        return res.status(200).json({
            status: 'success',
            message: `Welcome back, ${user.name}!`,
            token,
            data: { user: userWithoutPassword },
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Authentication failed due to a server error.',
            error: error.message,
        });
    }
};

// 3. GET /api/auth/me (Protected Route)
export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                wallet: {
                    include: {
                        transactions: {
                            orderBy: { createdAt: 'desc' },
                            take: 10,
                        },
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ status: 'fail', message: 'User account not found.' });
        }

        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            status: 'success',
            data: {
                user: userWithoutPassword,
            },
        });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch user profile.',
            error: error.message,
        });
    }
};
