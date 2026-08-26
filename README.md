# DriveLearn India 🏍️🚗

> **Standardized Driver Training & RTO Certification Platform** — Built for Maharashtra's 2-Wheeler & 4-Wheeler Driving Schools, Instructors, and Learners.

---

## 🌟 Platform Architecture (4 Multi-Sided Portals)

DriveLearn India is designed with a unified Deep Red (`#B91C1C`) design system, strict single-writer data access, and a unified state machine:

### 1. 🌐 Public Marketing Website (`/`)
- **Focus:** Maharashtra strategic launch, certified school directory (Pune, Mumbai, Nashik, Nagpur, Thane), pricing breakdown, interactive 5-question RTO Mock Test, and direct MoRTH Sarathi Parivahan integration.
- **Key Routes:** `/`, `/find-school`, `/schools/:id`, `/pricing`, `/terms-and-offers`, `/privacy-policy`, `/login`, `/signup`, `/forgot-password`.

### 2. 🛡️ Super Admin Control Center (`/admin/*`)
- **Focus:** Platform governance, Maharashtra driving school & instructor Form 5A license verification, liability & fraud monitoring for the ₹15 introductory wallet bonus, SaaS subscriptions, and compliance audit logs.
- **Key Routes:** `/admin/dashboard`, `/admin/verification`, `/admin/schools`, `/admin/locations`, `/admin/offers`, `/admin/subscriptions`, `/admin/payments`, `/admin/support`, `/admin/audit-log`, `/admin/settings`.

### 3. 🏢 School Owner Operational Hub (`/owner/*`)
- **Focus:** Complete operational control for partner schools (e.g. *Sai Motor & 2-Wheeler Academy, Pune*). Fleet compliance with automated 30-day insurance/fitness warnings, interactive Day/Week/Month batch scheduler, subsidized launch course fee locking (₹999), 90% net payout statements, and student review responses.
- **Key Routes:** `/owner/dashboard`, `/owner/students`, `/owner/instructors`, `/owner/vehicles`, `/owner/courses`, `/owner/bookings`, `/owner/payments`, `/owner/subscription`, `/owner/reviews`, `/owner/settings`.

### 4. 🎓 Learner Portal (`/learner/*`)
- **Focus:** Personal student dashboard for registered riders (e.g. *Pooja Kulkarni*). 6-stage competency `<ProgressStepper>`, monthly attendance calendar grid, ₹15 signup bonus wallet ledger, state-gated slot rescheduling, verified student reviews, and regional language preferences (*English / Marathi / Kannada*).
- **Key Routes:** `/learner/dashboard`, `/learner/bookings`, `/learner/progress`, `/learner/wallet`, `/learner/certificates`, `/learner/profile`.

### 5. 🏍️ Instructor Mobile-First Portal (`/instructor/*`)
- **Focus:** Roadside training dashboard for certified instructors (e.g. *Sunita Deshmukh*). Highlighted "Up Next" batch badge, live in-session timer triggering the `confirmed → completed` status transition, session feedback writer, and recurring availability timetable with leave date blockers.
- **Key Routes:** `/instructor/dashboard`, `/instructor/students`, `/instructor/schedule`, `/instructor/availability`, `/instructor/profile`.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, React Router v6, Vanilla CSS Design System, Lucide React Icons, Recharts
- **Backend:** Node.js, Express REST API, JWT Authentication, Role-based Access Control (RBAC)
- **Database / ORM:** PostgreSQL with Prisma ORM

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Setup Backend Server
```bash
cd server
npm install
npm run dev
```

### 2. Setup Frontend Client
```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## 🔑 Demo Credentials for Testing

| Role | Email | Password | Landing Route |
|---|---|---|---|
| **Learner** | `pooja.kulkarni@gmail.com` | `learner123` | `/learner/dashboard` |
| **Instructor** | `sunita.trainer@saimotors.in` | `trainer123` | `/instructor/dashboard` |
| **School Owner** | `owner@saimotorspune.in` | `owner123` | `/owner/dashboard` |
| **Super Admin** | `admin@drivelearn.in` | `superadmin123` | `/admin/dashboard` |
