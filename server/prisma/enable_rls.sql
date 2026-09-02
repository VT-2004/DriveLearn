-- ==========================================================================
-- DriveLearn India - Supabase Row-Level Security (RLS) Lockdown Script
-- Fixes: rls_disabled_in_public & sensitive_columns_exposed
-- ==========================================================================
-- 
-- Why this is needed:
-- Supabase exposes all tables in the "public" schema to PostgREST HTTP APIs by default.
-- Enabling RLS prevents the public/anon API key from reading sensitive user passwords,
-- wallet balances, and school records directly from Supabase's REST endpoints.
--
-- Your Node.js backend connects as the database owner (postgres), which bypasses
-- RLS, allowing Prisma and Express routes to operate normally with full security.
-- ==========================================================================

-- 1. Enable RLS on User (Protects bcrypt password hashes, emails, phone numbers)
ALTER TABLE "public"."User" ENABLE ROW LEVEL SECURITY;

-- 2. Enable RLS on Wallet (Protects user financial balances)
ALTER TABLE "public"."Wallet" ENABLE ROW LEVEL SECURITY;

-- 3. Enable RLS on WalletTransaction (Protects audit ledger of ₹15 credits/debits)
ALTER TABLE "public"."WalletTransaction" ENABLE ROW LEVEL SECURITY;

-- 4. Enable RLS on School (Protects school directory records from unauthorized modification)
ALTER TABLE "public"."School" ENABLE ROW LEVEL SECURITY;

-- Optional: Allow public read-only access to certified schools via PostgREST if desired:
-- CREATE POLICY "Public schools viewable by everyone" ON "public"."School" FOR SELECT USING (true);
