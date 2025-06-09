"use client";

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from 'firebase/auth'; // Using User type for compatibility

// Mock User type, can be expanded
interface AppUser extends Pick<User, 'uid' | 'email' | 'displayName' | 'photoURL'> {
  // Add any custom roles or properties here
  isAdmin?: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email?: string, password?: string) => Promise<void>; // Make params optional for mock
  logout: () => Promise<void>;
  signup: (email?: string, password?: string) => Promise<void>; // Make params optional for mock
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock initial auth check
    const mockUserJson = localStorage.getItem('mockUser');
    if (mockUserJson) {
      setUser(JSON.parse(mockUserJson));
    }
    setLoading(false);
  }, []);

  const login = async (email?: string, password?: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: AppUser = { 
      uid: 'mock-user-uid', 
      email: email || 'test@example.com', 
      displayName: 'Test User',
      photoURL: `https://placehold.co/100x100.png?text=${(email || "T")[0].toUpperCase()}`,
      isAdmin: email === 'admin@formflow.com' // Example admin role
    };
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('mockUser');
    setUser(null);
    setLoading(false);
  };

  const signup = async (email?: string, password?: string) => {
    // For mock, signup behaves like login
    await login(email, password);
  };


  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
