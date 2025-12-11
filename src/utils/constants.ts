// App configuration constants
export const APP_NAME = 'SubTract';
export const APP_TAGLINE = 'Subtract the unnecessary, Add the valuable';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REGISTER: '/api/auth/register',
  
  // Subscriptions
  SUBSCRIPTIONS: '/api/subscriptions',
  SUBSCRIPTION_BY_ID: (id: string) => `/api/subscriptions/${id}`,
  CREATE_SUBSCRIPTION: '/api/subscriptions/create',
  
  // User
  USER_PROFILE: '/api/user/profile',
  USER_STATS: '/api/user/stats',
} as const;

// LocalStorage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'subtract_auth_token',
  USER_DATA: 'subtract_user_data',
  SUBSCRIPTIONS: 'subtract_subscriptions',
  CANCELLED_SUBSCRIPTIONS: 'subtract_cancelled_subscriptions',
  PREFERENCES: 'subtract_preferences',
  ONBOARDING_COMPLETED: 'subtract_onboarding_completed',
} as const;

// Subscription categories with icons and colors
export const SUBSCRIPTION_CATEGORIES = [
  { value: 'Entertainment', icon: '📺', color: '#8B5CF6', label: 'Entertainment' },
  { value: 'Music', icon: '🎵', color: '#F59E0B', label: 'Music' },
  { value: 'Food', icon: '🍔', color: '#F97316', label: 'Food & Delivery' },
  { value: 'Finance', icon: '📈', color: '#10B981', label: 'Finance & Banking' },
  { value: 'Fitness', icon: '💪', color: '#06B6D4', label: 'Fitness & Health' },
  { value: 'Education', icon: '🎓', color: '#3B82F6', label: 'Education & Learning' },
  { value: 'Productivity', icon: '💼', color: '#EC4899', label: 'Productivity' },
  { value: 'Shopping', icon: '🛍️', color: '#EF4444', label: 'Shopping' },
  { value: 'Cloud Storage', icon: '☁️', color: '#6366F1', label: 'Cloud Storage' },
  { value: 'Gaming', icon: '🎮', color: '#8B5CF6', label: 'Gaming' },
  { value: 'News', icon: '📰', color: '#64748B', label: 'News & Media' },
  { value: 'Other', icon: '📱', color: '#94A3B8', label: 'Other' },
] as const;

// Payment methods with icons
export const PAYMENT_METHODS = [
  { value: 'UPI', label: 'UPI', icon: '💳', subtitle: 'GPay, PhonePe, Paytm' },
  { value: 'Credit Card', label: 'Credit Card', icon: '💳', subtitle: 'Visa, Mastercard, RuPay' },
  { value: 'Debit Card', label: 'Debit Card', icon: '💳', subtitle: 'Visa, Mastercard, RuPay' },
  { value: 'Net Banking', label: 'Net Banking', icon: '🏦', subtitle: 'All major banks' },
  { value: 'Wallet', label: 'Wallet', icon: '👛', subtitle: 'Paytm, Amazon Pay' },
  { value: 'Auto Debit', label: 'Auto Debit', icon: '🔄', subtitle: 'Bank mandate' },
] as const;

// Billing cycles
export const BILLING_CYCLES = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly (3 months)' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'weekly', label: 'Weekly' },
] as const;

// Animation durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  PAGE_TRANSITION: 300,
  STAGGER_DELAY: 80,
} as const;

// Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Default user preferences
export const DEFAULT_PREFERENCES = {
  currency: 'INR',
  language: 'en',
  theme: 'dark',
  notifications: {
    email: true,
    push: true,
    sms: false,
    reminderDays: 3,
  },
  budgetAlerts: true,
  weeklyReports: true,
} as const;

// Notification reminder days options
export const REMINDER_DAYS_OPTIONS = [
  { value: 1, label: '1 day before' },
  { value: 3, label: '3 days before' },
  { value: 7, label: '1 week before' },
  { value: 14, label: '2 weeks before' },
  { value: 30, label: '1 month before' },
] as const;

// Budget presets (in INR)
export const BUDGET_PRESETS = [
  { value: 2000, label: '₹2,000/month' },
  { value: 3000, label: '₹3,000/month' },
  { value: 5000, label: '₹5,000/month' },
  { value: 10000, label: '₹10,000/month' },
  { value: 15000, label: '₹15,000/month' },
] as const;

// Chart colors
export const CHART_COLORS = [
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
] as const;

// Indian festival dates (for themed UI)
export const FESTIVAL_DATES = {
  DIWALI: '2025-10-20',
  HOLI: '2025-03-14',
  DUSSEHRA: '2025-10-02',
  RAKSHA_BANDHAN: '2025-08-09',
  INDEPENDENCE_DAY: '2025-08-15',
  REPUBLIC_DAY: '2025-01-26',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  AUTH_FAILED: 'Authentication failed. Please try again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SUBSCRIPTION_NOT_FOUND: 'Subscription not found.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SUBSCRIPTION_ADDED: 'Subscription added successfully!',
  SUBSCRIPTION_UPDATED: 'Subscription updated successfully!',
  SUBSCRIPTION_CANCELLED: 'Subscription cancelled successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
} as const;
