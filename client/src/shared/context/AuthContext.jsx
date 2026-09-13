import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

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
          if (!res.ok) throw new Error('Token expired or invalid');
          return res.json();
        })
        .then((data) => {
          if (data?.data?.user) {
            setUser(data.data.user);
            localStorage.setItem('drivelearn_user', JSON.stringify(data.data.user));
          }
        })
        .catch(() => {
          // Token expired or server unreachable
        });
    }
  }, [token]);

  // 1. Live Database Login
  const login = async (emailOrPhone, password) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrPhone, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Invalid email/phone or password.');
    }

    if (data?.token && data?.data?.user) {
      localStorage.setItem('drivelearn_token', data.token);
      localStorage.setItem('drivelearn_user', JSON.stringify(data.data.user));
      setToken(data.token);
      setUser(data.data.user);
      return data.data.user;
    }

    throw new Error('Unexpected response from authentication server.');
  };

  // 2. Live Database Registration (With ₹15 Wallet Bonus)
  const register = async (userData) => {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Failed to register account.');
    }

    if (data?.token && data?.data?.user) {
      localStorage.setItem('drivelearn_token', data.token);
      localStorage.setItem('drivelearn_user', JSON.stringify(data.data.user));
      setToken(data.token);
      setUser(data.data.user);
      return data.data.user;
    }

    throw new Error('Registration failed.');
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
