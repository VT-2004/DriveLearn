import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// 1. Create resilient PostgreSQL connection pool for Supabase
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    max: 10,
    idleTimeoutMillis: 20000,
    connectionTimeoutMillis: 10000,
});

// 2. Prevent unhandled idle connection termination crashes
pool.on('error', (err) => {
    console.error('⚠️ Supabase pool idle client reconnecting:', err.message);
});

// 3. Wrap with Prisma adapter
const adapter = new PrismaPg(pool);

// 4. Initialize Prisma Client
const prisma = new PrismaClient({ adapter });

export default prisma;
