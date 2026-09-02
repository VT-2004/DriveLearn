import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Client } = pg;

export async function checkAndEnableRLS() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('Connecting to Supabase PostgreSQL database...');
    await client.connect();
    console.log('Connected successfully.\n');

    // 1. Query all tables in public schema and their current RLS status
    const query = `
      SELECT 
        tablename, 
        rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public';
    `;
    const res = await client.query(query);

    console.log('--- Current Tables in "public" schema & RLS status ---');
    for (const row of res.rows) {
      console.log(`Table: "${row.tablename}" | RLS Enabled: ${row.rowsecurity}`);
    }
    console.log('------------------------------------------------------\n');

    // 2. Enable RLS on all public tables
    for (const row of res.rows) {
      const tableName = row.tablename;
      console.log(`Enabling Row-Level Security on "${tableName}"...`);
      await client.query(`ALTER TABLE "public"."${tableName}" ENABLE ROW LEVEL SECURITY;`);
    }

    console.log('\n--- Re-verifying RLS status after update ---');
    const verifyRes = await client.query(query);
    let allSecure = true;
    for (const row of verifyRes.rows) {
      console.log(`Table: "${row.tablename}" | RLS Enabled: ${row.rowsecurity}`);
      if (!row.rowsecurity) {
        allSecure = false;
      }
    }
    console.log('--------------------------------------------');

    if (allSecure) {
      console.log('\nSUCCESS: All tables in "public" schema now have Row-Level Security (RLS) ENABLED!');
      console.log('Supabase PostgREST API access is now fully locked down against unauthorized public access.');
    } else {
      console.warn('\nWARNING: Some tables could not enable RLS.');
    }

  } catch (err) {
    console.error('Error enabling RLS:', err);
  } finally {
    await client.end();
  }
}

checkAndEnableRLS();
