# DriveLearn India — Full Build Roadmap
**Stack:** React (frontend) + Node.js/Express (backend) + PostgreSQL (database, via Prisma ORM)
**Goal:** Build the whole platform page-by-page, learning core concepts at each stage.

---

## 0. Project Setup (Day 1)
- Feature-based skeleton: `client/` and `server/`
- Health check ping (`GET /api/health` -> "Connected ✅")

## Phase 1 — Public Website (No auth)
1. Navbar + Footer + Layout shell
2. Home / Hero + Search widget
3. School Listing Cards (static data)
4. Find Driving School (search + filter)
5. School Detail Page
6. Pricing / Courses page
7. Wire school data to PostgreSQL (Prisma + `GET /api/schools`)

## Phase 2 — Auth Foundations
8. User table (`schema.prisma`, role ENUM, password hash)
9. Register/Login pages + JWT issuing
10. AuthContext + protected routes (`PrivateRoute`)
11. Role-based route guarding (`verifyToken`, `requireRole`)

## Phase 3 — Learner Portal
12. Sidebar layout for logged-in app
13. Dashboard (stat cards + horizontal stepper)
14. My Bookings (tabs: All/Upcoming/Completed/Cancelled + status pills)
15. Progress page (skill checklist)
16. Payments page (invoice stub)
17. Profile page (PATCH update)
18. Booking model + real booking flow (Foreign keys)

## Phase 4 — Instructor Portal
19. Dashboard (filtered by `instructorId`)
20. My Students / Today's Schedule
21. Availability page (array-of-objects schedule)
22. Profile

## Phase 5 — School Owner Portal
23. Dashboard (SQL aggregates: `COUNT`, `SUM`, `GROUP BY`)
24. Students table (progress bars, search/filter)
25. Instructors (card grid + CRUD)
26. Vehicles (expiry alerts < 30 days)
27. Courses & Packages
28. Bookings & Schedule (calendar view)
29. Payments & Revenue aggregation
30. Subscription / Billing page
31. Reviews & ratings (`AVG()`)
32. Settings

## Phase 6 — Super Admin Portal
33. Platform Dashboard
34. School Verification queue (status workflow)
35. Driving Schools directory
36. States & Cities reference data
37. Platform Subscriptions & Payments
38. Support tickets
39. Platform Settings (commission %, GST %)

## Phase 7 — Polish & Production
- Unified icon-tint design system
- Recharts analytics
- Loading skeletons & empty states
- Mobile responsiveness
- Deployment (Vercel, Render, Neon/Supabase)
