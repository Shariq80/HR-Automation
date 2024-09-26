import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setUser({ token, role });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
        } catch (error) {
          console.error('Authentication check failed', error);
          logout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};