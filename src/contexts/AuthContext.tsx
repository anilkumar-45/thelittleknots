
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import bcrypt from 'bcryptjs';

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  loginWithPassword: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin password for simplicity
// const ADMIN_PASSWORD = 'admin123';

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

  const loginWithPassword = async (email: string, password: string) => {
    try {
      const {data, error} = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

      if(error || !data || !data.password_hash) {
        return {error: {message: 'Invalid admin credentials'}};
      }

      const passwordMatch = await bcrypt.compare(password, data.password_hash);
      if(passwordMatch) {
        setIsAdmin(true);
        localStorage.setItem('admin_logged_in','true');
        return {error: null};
      }else {
        return {error: {message: 'Invalid admin password'}}
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
