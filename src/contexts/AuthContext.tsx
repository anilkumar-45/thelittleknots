
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  loginWithPassword: (password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin password for simplicity
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in from localStorage
    try {
      const adminLoggedIn = localStorage.getItem('admin_logged_in');
      if (adminLoggedIn === 'true') {
        setIsAdmin(true);
        console.log('Admin session restored from localStorage');
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      // Clear any corrupted data
      localStorage.removeItem('admin_logged_in');
    }
    setLoading(false);
  }, []);

  const loginWithPassword = async (password: string) => {
    try {
      if (password === ADMIN_PASSWORD) {
        setIsAdmin(true);
        localStorage.setItem('admin_logged_in', 'true');
        console.log('Admin login successful');
        return { error: null };
      } else {
        console.log('Invalid password attempt');
        return { error: { message: 'Invalid password' } };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { error };
    }
  };

  const logout = async () => {
    try {
      setIsAdmin(false);
      localStorage.removeItem('admin_logged_in');
      console.log('Admin logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    isAdmin,
    loading,
    loginWithPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
