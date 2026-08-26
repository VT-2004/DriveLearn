import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_MOCK_USERS = [
  {
    email: 'admin@drivelearn.in',
    password: 'superadmin123',
    user: {
      id: 'usr-admin-1',
      name: 'Platform Control Admin',
      email: 'admin@drivelearn.in',
      phone: '+91 98000 00001',
      role: 'ADMIN',
      city: 'Pune',
      state: 'Maharashtra',
    },
  },
  {
    email: 'pooja.kulkarni@gmail.com',
    password: 'learner123',
    user: {
      id: 'usr-learner-1',
      name: 'Pooja Kulkarni',
      email: 'pooja.kulkarni@gmail.com',
      phone: '+91 98230 11223',
      role: 'LEARNER',
      city: 'Pune',
      state: 'Maharashtra',
      wallet: { balance: 15.0, transactions: [] },
    },
  },
  {
    email: 'owner@saimotorspune.in',
    password: 'owner123',
    user: {
      id: 'usr-owner-1',
      name: 'Rajesh Patil (Sai Motors Owner)',
      email: 'owner@saimotorspune.in',
      phone: '+91 98230 45678',
      role: 'OWNER',
      city: 'Pune',
      state: 'Maharashtra',
    },
  },
  {
    email: 'sunita.trainer@saimotors.in',
    password: 'trainer123',
    user: {
      id: 'usr-trainer-1',
      name: 'Sunita Deshmukh',
      email: 'sunita.trainer@saimotors.in',
      phone: '+91 98230 99887',
      role: 'INSTRUCTOR',
      city: 'Pune',
      state: 'Maharashtra',
    },
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('drivelearn_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('drivelearn_token') || null);
  const [loading, setLoading] = useState(false);

  // Restore user session on page refresh
  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Token expired or offline');
          return res.json();
        })
        .then((data) => {
          if (data?.data?.user) {
            setUser(data.data.user);
            localStorage.setItem('drivelearn_user', JSON.stringify(data.data.user));
          }
        })
        .catch(() => {
          // Keep existing saved demo session if backend is offline
        });
    }
  }, [token]);

  // 1. Login action (with seamless demo fallback)
  const login = async (emailOrPhone, password) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await res.json();

      if (res.ok && data?.data?.user) {
        localStorage.setItem('drivelearn_token', data.token);
        localStorage.setItem('drivelearn_user', JSON.stringify(data.data.user));
        setToken(data.token);
        setUser(data.data.user);
        return data.data.user;
      }
    } catch (err) {
      console.warn('Backend offline or unavailable, checking demo credentials fallback...', err);
    }

    // Demo / Offline Fallback Authentication
    const normalizedInput = emailOrPhone.trim().toLowerCase();
    const demoMatch = DEMO_MOCK_USERS.find(
      (u) =>
        (u.email.toLowerCase() === normalizedInput || u.user.phone === emailOrPhone.trim()) &&
        u.password === password
    );

    if (demoMatch) {
      const mockToken = `mock-jwt-token-${demoMatch.user.role.toLowerCase()}-${Date.now()}`;
      localStorage.setItem('drivelearn_token', mockToken);
      localStorage.setItem('drivelearn_user', JSON.stringify(demoMatch.user));
      setToken(mockToken);
      setUser(demoMatch.user);
      return demoMatch.user;
    }

    throw new Error('Invalid email/phone or password. Click the role tabs above to auto-fill valid credentials.');
  };

  // 2. Register action (With ₹15 Wallet Bonus)
  const register = async (userData) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (res.ok && data?.data?.user) {
        localStorage.setItem('drivelearn_token', data.token);
        localStorage.setItem('drivelearn_user', JSON.stringify(data.data.user));
        setToken(data.token);
        setUser(data.data.user);
        return data.data.user;
      }
    } catch (err) {
      console.warn('Backend offline, creating local learner demo session...', err);
    }

    // Local Fallback Registration
    const newDemoUser = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'Maharashtra Learner',
      email: userData.email,
      phone: userData.phone,
      role: (userData.role || 'LEARNER').toUpperCase(),
      city: userData.city || 'Pune',
      state: 'Maharashtra',
      wallet: { balance: 15.0, transactions: [] },
    };

    const mockToken = `mock-jwt-token-${newDemoUser.role.toLowerCase()}-${Date.now()}`;
    localStorage.setItem('drivelearn_token', mockToken);
    localStorage.setItem('drivelearn_user', JSON.stringify(newDemoUser));
    setToken(mockToken);
    setUser(newDemoUser);
    return newDemoUser;
  };

  // 3. Logout action
  const logout = () => {
    localStorage.removeItem('drivelearn_token');
    localStorage.removeItem('drivelearn_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
