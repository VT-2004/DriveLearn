import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/context/AuthContext';
import ErrorBoundary from './shared/components/ErrorBoundary';

// Public Pages (Maharashtra Launch)
import PublicLayout from './public/pages/PublicLayout';
import Home from './public/pages/Home';
import FindSchool from './public/pages/FindSchool';
import SchoolDetail from './public/pages/SchoolDetail';
import Pricing from './public/pages/Pricing';
import TermsAndOffers from './public/pages/TermsAndOffers';
import PrivacyPolicy from './public/pages/PrivacyPolicy';
import Login from './public/pages/Login';
import Signup from './public/pages/Signup';
import ForgotPassword from './public/pages/ForgotPassword';
import NotFound from './public/pages/NotFound';

// 1. Learner Portal (Full Plan Spec)
import LearnerLayout from './learner/layouts/LearnerLayout';
import LearnerDashboard from './learner/pages/Dashboard';
import LearnerBookings from './learner/pages/MyBookings';
import LearnerProgress from './learner/pages/Progress';
import LearnerWallet from './learner/pages/Wallet';
import LearnerCertificates from './learner/pages/Certificates';
import LearnerProfile from './learner/pages/Profile';
import LearnerMessages from './learner/pages/Messages';
import LearnerRtoMockTest from './learner/pages/RtoMockTest';

// 2. Instructor Portal (Full Plan Spec)
import InstructorLayout from './instructor/layouts/InstructorLayout';
import InstructorDashboard from './instructor/pages/Dashboard';
import InstructorStudents from './instructor/pages/MyStudents';
import InstructorSchedule from './instructor/pages/TodaysSchedule';
import InstructorAvailability from './instructor/pages/Availability';
import InstructorProfile from './instructor/pages/Profile';
import InstructorMessages from './instructor/pages/Messages';

// 3. Super Admin Portal (Full Plan v3 Spec)
import AdminLayout from './admin/layouts/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import SchoolVerification from './admin/pages/SchoolVerification';
import DrivingSchools from './admin/pages/DrivingSchools';
import StatesAndCities from './admin/pages/StatesAndCities';
import OffersAndWallet from './admin/pages/OffersAndWallet';
import Subscriptions from './admin/pages/Subscriptions';
import Payments from './admin/pages/Payments';
import Support from './admin/pages/Support';
import AuditLog from './admin/pages/AuditLog';
import Settings from './admin/pages/Settings';
import AdminMessages from './admin/pages/Messages';

// 4. School Owner Portal (Full Plan Spec)
import OwnerLayout from './owner/layouts/OwnerLayout';
import OwnerDashboard from './owner/pages/Dashboard';
import OwnerStudents from './owner/pages/Students';
import OwnerInstructors from './owner/pages/Instructors';
import OwnerVehicles from './owner/pages/Vehicles';
import OwnerCourses from './owner/pages/CoursesAndPackages';
import OwnerBookings from './owner/pages/BookingsAndSchedule';
import OwnerPayments from './owner/pages/Payments';
import OwnerSubscription from './owner/pages/Subscription';
import OwnerReviews from './owner/pages/Reviews';
import OwnerSettings from './owner/pages/Settings';
import OwnerMessages from './owner/pages/Messages';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 1. Public Website Routes (Maharashtra Launch) */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="find-school" element={<FindSchool />} />
              <Route path="schools/:id" element={<SchoolDetail />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="terms-and-offers" element={<TermsAndOffers />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* 2. Learner Portal (Flat Sidebar + 8 Pages) */}
            <Route path="/learner" element={<LearnerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<LearnerDashboard />} />
              <Route path="bookings" element={<LearnerBookings />} />
              <Route path="progress" element={<LearnerProgress />} />
              <Route path="rto-mock-test" element={<LearnerRtoMockTest />} />
              <Route path="wallet" element={<LearnerWallet />} />
              <Route path="certificates" element={<LearnerCertificates />} />
              <Route path="messages" element={<LearnerMessages />} />
              <Route path="profile" element={<LearnerProfile />} />
            </Route>

            {/* 3. Instructor Portal (Mobile-First + 6 Pages) */}
            <Route path="/instructor" element={<InstructorLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<InstructorDashboard />} />
              <Route path="students" element={<InstructorStudents />} />
              <Route path="schedule" element={<InstructorSchedule />} />
              <Route path="availability" element={<InstructorAvailability />} />
              <Route path="messages" element={<InstructorMessages />} />
              <Route path="profile" element={<InstructorProfile />} />
            </Route>

            {/* 4. Super Admin Portal (Full v3 Spec) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="verification" element={<SchoolVerification />} />
              <Route path="schools" element={<DrivingSchools />} />
              <Route path="locations" element={<StatesAndCities />} />
              <Route path="offers" element={<OffersAndWallet />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route path="payments" element={<Payments />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="support" element={<Support />} />
              <Route path="audit-log" element={<AuditLog />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 5. School Owner Portal (Full 11-Page Operational Hub) */}
            <Route path="/owner" element={<OwnerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<OwnerDashboard />} />
              <Route path="students" element={<OwnerStudents />} />
              <Route path="instructors" element={<OwnerInstructors />} />
              <Route path="vehicles" element={<OwnerVehicles />} />
              <Route path="courses" element={<OwnerCourses />} />
              <Route path="bookings" element={<OwnerBookings />} />
              <Route path="messages" element={<OwnerMessages />} />
              <Route path="payments" element={<OwnerPayments />} />
              <Route path="subscription" element={<OwnerSubscription />} />
              <Route path="reviews" element={<OwnerReviews />} />
              <Route path="settings" element={<OwnerSettings />} />
            </Route>

            {/* 6. Catch-All 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
