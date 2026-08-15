import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : {
      id: 2,
      email: 'alex.chen@stanford.edu',
      fullName: 'Alex Chen',
      college: 'Stanford University',
      role: 'ROLE_USER',
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      credits: 120,
      rating: 4.9,
      streakDays: 7
    };
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || 'demo-jwt-token-alex-chen');
  const [wallet, setWallet] = useState({ balance: 120, totalEarned: 85, totalSpent: 45 });
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Session Confirmed!', message: 'Priya Sharma confirmed your Spring Boot Mentorship session.', type: 'BOOKING', isRead: false },
    { id: 2, title: 'Certificate Issued!', message: 'You earned a verified certificate in Docker & Kubernetes Deployment.', type: 'SYSTEM', isRead: true }
  ]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (email, password) => {
    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      if (res.success && res.data) {
        setToken(res.data.token);
        const userData = {
          id: res.data.id,
          email: res.data.email,
          fullName: res.data.fullName,
          college: res.data.college,
          role: res.data.role,
          avatarUrl: res.data.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
          credits: 120,
          rating: 4.9,
          streakDays: 7
        };
        setUser(userData);
        return { success: true };
      }
    } catch (e) {
      // Mock Login fallback for demo
      const mockUser = {
        id: email.includes('admin') ? 1 : 2,
        email: email,
        fullName: email.includes('admin') ? 'SkillSwap Admin' : 'Alex Chen',
        college: 'Stanford University',
        role: email.includes('admin') ? 'ROLE_ADMIN' : 'ROLE_USER',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
        credits: 120,
        rating: 4.9,
        streakDays: 7
      };
      setToken('demo-token-' + Date.now());
      setUser(mockUser);
      return { success: true };
    }
  };

  const register = async (registerData) => {
    try {
      const res = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerData)
      });
      if (res.success && res.data) {
        setToken(res.data.token);
        setUser({
          id: res.data.id,
          email: res.data.email,
          fullName: res.data.fullName,
          college: res.data.college,
          role: res.data.role,
          avatarUrl: res.data.avatarUrl,
          credits: 50,
          rating: 5.0,
          streakDays: 1
        });
        return { success: true };
      }
    } catch (e) {
      const newUser = {
        id: Date.now(),
        email: registerData.email,
        fullName: registerData.fullName,
        college: registerData.college || 'Stanford University',
        role: 'ROLE_USER',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        credits: 50,
        rating: 5.0,
        streakDays: 1
      };
      setToken('demo-register-token-' + Date.now());
      setUser(newUser);
      return { success: true };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  const updateCredits = (amount) => {
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount
    }));
    setUser(prev => prev ? ({ ...prev, credits: prev.credits + amount }) : null);
  };

  return (
    <AuthContext.Provider value={{ user, token, wallet, notifications, login, register, logout, updateCredits }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
