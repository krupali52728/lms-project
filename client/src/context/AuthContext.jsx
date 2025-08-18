import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile } from '../Api/userApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Fetch user profile data
      fetchUserProfile();
    }
    setLoading(false);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response.success) {
        setUser(response.user);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // If token is invalid, clear it
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    // Fetch user profile after login
    fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    loading,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;