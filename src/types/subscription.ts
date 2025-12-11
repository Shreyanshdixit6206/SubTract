export interface Subscription {
  id: string;
  name: string;
  logo: string;
  category: SubscriptionCategory;
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'quarterly' | 'weekly';
  nextBilling: string;
  paymentMethod: PaymentMethod;
  status: 'active' | 'cancelled' | 'paused' | 'expired';
  startDate: string;
  usageScore?: number;
  hoursUsed?: number;
  lastUsed?: string;
  autoRenewal?: boolean;
  reminder?: boolean;
  notes?: string;
}

export interface CancelledSubscription extends Omit<Subscription, 'status' | 'nextBilling'> {
  cancelledDate: string;
  reason?: string;
  savedAmount: number;
  monthsCancelled: number;
}

export type SubscriptionCategory = 
  | 'Entertainment'
  | 'Music'
  | 'Food'
  | 'Finance'
  | 'Fitness'
  | 'Education'
  | 'Productivity'
  | 'Shopping'
  | 'Cloud Storage'
  | 'Gaming'
  | 'News'
  | 'Other';

export type PaymentMethod = 
  | 'UPI'
  | 'Credit Card'
  | 'Debit Card'
  | 'Net Banking'
  | 'Wallet'
  | 'Auto Debit';

export interface SubscriptionStats {
  totalActive: number;
  totalMonthly: number;
  totalYearly: number;
  totalSaved: number;
  upcomingPayments: number;
  categories: Record<string, number>;
  averagePerSubscription: number;
  mostExpensive: Subscription | null;
  budgetUsagePercentage: number;
}

export interface UpcomingCharge {
  subscription: Subscription;
  dueDate: string;
  daysLeft: number;
  amount: number;
}
