// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Set the base URL for all axios requests
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend API URL
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Here you might want to fetch the user profile to validate the token
      // For simplicity, we'll just set user if token exists.
      // A better approach: fetch '/api/auth/me' (a new protected route)
      setUser({ token }); // Simplified
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data);
      return data;
    } catch (error) {
      console.error('Login error', error.response.data);
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      const { data } = await api.post('/auth/signup', { email, password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data);
      return data;
    } catch (error) {
      console.error('Signup error', error.response.data);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading, api }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};