import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, SignupData, AuthResponse } from '@/types/user';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS, API_ENDPOINTS } from '@/utils/constants';
import { useToast } from '@/hooks/useToast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (data: SignupData) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.USER_DATA, null);
  const [token, setToken] = useLocalStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const isAuthenticated = !!user && !!token;

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: any = await response.json();

      // Extract user and token from data.data if it's nested, or from data directly
      const user = data.data?.user || data.user;
      const token = data.data?.token || data.token;

      if (data.success && user && token) {
        setUser(user);
        setToken(token);
        toast.success('Welcome back! 👋');
        return true;
      } else {
        setError(data.message || 'Login failed');
        toast.error(data.message || 'Login failed');
        return false;
      }
    } catch (err) {
      const errorMessage = 'Network error. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: any = await response.json();

      // Extract user and token from result.data if it's nested, or from result directly
      const user = result.data?.user || result.user;
      const token = result.data?.token || result.token;

      if (result.success && user && token) {
        setUser(user);
        setToken(token);
        toast.success('Welcome to SubTract! 🎉');
        return true;
      } else {
        setError(result.message || 'Signup failed');
        toast.error(result.message || 'Signup failed');
        return false;
      }
    } catch (err) {
      const errorMessage = 'Network error. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setToken(null);
      toast.success('Logged out successfully');
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    signup,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
