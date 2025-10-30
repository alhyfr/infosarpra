import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../libs/api';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Tambahkan delay kecil untuk memastikan localStorage sudah siap di mobile
    const initializeAuth = async () => {
      try {
        // Tunggu sebentar untuk memastikan localStorage sudah siap
        await new Promise(resolve => setTimeout(resolve, 50));
        
        const token = localStorage.getItem('token');
        if (token) {
          await checkUserSession();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);
  const checkUserSession = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        logout();
        setLoading(false);
        return;
      }
      const response = await api.get('/current-user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCurrentUser(response.data.data); // sesuai struktur backend Anda
      setLoading(false);
    } catch (error) {
      console.error('Session check failed:', error);
      logout();
      setLoading(false);
    }
  };
  const login = async (email, password, rememberMe) => {
    try {
      setLoading(true);
      setError('');
      const response = await api.post('/login', { email, password });
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', email);
      } else {
        localStorage.removeItem('rememberedUsername');
      }
      // Jangan langsung set currentUser, biarkan LoginPage yang handle
      // setCurrentUser(user);
      setLoading(false);
      return { success: true, user, setUser: () => setCurrentUser(user) };
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Login gagal. Silakan coba lagi.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ currentUser, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}