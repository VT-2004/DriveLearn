// Centralized API Client for DriveLearn India (Frontend to Backend Bridge)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('drivelearn_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && !token.startsWith('mock-') ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP Error ${response.status}`);
    }

    return data;
  } catch (error) {
    console.warn(`API [${options.method || 'GET'} ${endpoint}] failed:`, error.message);
    throw error;
  }
}

export const api = {
  // 1. Public & Schools
  getSchools: () => request('/schools'),
  getSchoolById: (id) => request(`/schools/${id}`),

  // 2. Authentication
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request('/auth/me'),

  // 3. Learner Portal
  learner: {
    getProfile: () => request('/learner/profile'),
    getBookings: () => request('/learner/bookings'),
    bookSlot: (slotData) => request('/learner/bookings', { method: 'POST', body: JSON.stringify(slotData) }),
    rescheduleBooking: (id, rescheduleData) => request(`/learner/bookings/${id}/reschedule`, { method: 'PUT', body: JSON.stringify(rescheduleData) }),
    getCourses: () => request('/learner/courses'),
    enrollCourse: (enrollData) => request('/learner/courses/enroll', { method: 'POST', body: JSON.stringify(enrollData) }),
    getWallet: () => request('/learner/wallet'),
    getCertificates: () => request('/learner/certificates'),
    getWeatherAlert: () => request('/learner/weather-alert'),
  },

  // 4. Instructor Portal
  instructor: {
    getSchedule: () => request('/instructor/schedule'),
    completeLesson: (id, lessonData) => request(`/instructor/lessons/${id}/complete`, { method: 'POST', body: JSON.stringify(lessonData) }),
    postWeatherAlert: (alertData) => request('/instructor/weather-alert', { method: 'POST', body: JSON.stringify(alertData) }),
    liftWeatherAlert: () => request('/instructor/weather-alert', { method: 'DELETE' }),
    getStudents: () => request('/instructor/students'),
  },

  // 5. School Owner Portal
  owner: {
    getOverview: () => request('/owner/overview'),
    getVehicles: () => request('/owner/vehicles'),
    addVehicle: (vehicleData) => request('/owner/vehicles', { method: 'POST', body: JSON.stringify(vehicleData) }),
    getFuelLedger: () => request('/owner/fuel-ledger'),
    addFuelEntry: (fuelData) => request('/owner/fuel-ledger', { method: 'POST', body: JSON.stringify(fuelData) }),
    getStudents: () => request('/owner/students'),
    getInstructors: () => request('/owner/instructors'),
  },

  // 6. Super Admin Portal
  admin: {
    getStats: () => request('/admin/stats'),
    getSchools: () => request('/admin/schools'),
    verifySchool: (id, verified) => request(`/admin/schools/${id}/verify`, { method: 'PUT', body: JSON.stringify({ verified }) }),
  },
};

export default api;
