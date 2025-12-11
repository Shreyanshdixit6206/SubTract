export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  token: string;
  joinedDate: string;
  preferences: UserPreferences;
  budget?: number;
}

export interface UserPreferences {
  currency: 'INR' | 'USD' | 'EUR';
  language: 'en' | 'hi';
  theme: 'dark' | 'light';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    reminderDays: number;
  };
  budgetAlerts: boolean;
  weeklyReports: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}
