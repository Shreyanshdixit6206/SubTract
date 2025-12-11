import { Subscription, SubscriptionStats, UpcomingCharge, CancelledSubscription } from '@/types/subscription';
import { getDaysUntil } from './formatters';

/**
 * Calculate total monthly spending from subscriptions
 */
export function calculateMonthlySpending(subscriptions: Subscription[]): number {
  return subscriptions.reduce((total, sub) => {
    if (sub.status !== 'active') return total;
    
    switch (sub.billingCycle) {
      case 'monthly':
        return total + sub.amount;
      case 'yearly':
        return total + sub.amount / 12;
      case 'quarterly':
        return total + sub.amount / 3;
      case 'weekly':
        return total + sub.amount * 4;
      default:
        return total;
    }
  }, 0);
}

/**
 * Calculate total yearly spending projection
 */
export function calculateYearlySpending(subscriptions: Subscription[]): number {
  return calculateMonthlySpending(subscriptions) * 12;
}

/**
 * Calculate total saved from cancelled subscriptions
 */
export function calculateTotalSaved(cancelledSubscriptions: CancelledSubscription[]): number {
  return cancelledSubscriptions.reduce((total, sub) => total + sub.savedAmount, 0);
}

/**
 * Get upcoming charges within next N days
 */
export function getUpcomingCharges(subscriptions: Subscription[], days: number = 7): UpcomingCharge[] {
  const upcoming: UpcomingCharge[] = [];
  
  subscriptions
    .filter(sub => sub.status === 'active')
    .forEach(sub => {
      const daysLeft = getDaysUntil(sub.nextBilling);
      
      if (daysLeft >= 0 && daysLeft <= days) {
        upcoming.push({
          subscription: sub,
          dueDate: sub.nextBilling,
          daysLeft,
          amount: sub.amount,
        });
      }
    });
  
  return upcoming.sort((a, b) => a.daysLeft - b.daysLeft);
}

/**
 * Calculate category-wise spending
 */
export function calculateCategorySpending(subscriptions: Subscription[]): Record<string, number> {
  const categories: Record<string, number> = {};
  
  subscriptions
    .filter(sub => sub.status === 'active')
    .forEach(sub => {
      const monthlyAmount = convertToMonthly(sub.amount, sub.billingCycle);
      categories[sub.category] = (categories[sub.category] || 0) + monthlyAmount;
    });
  
  return categories;
}

/**
 * Convert any billing cycle to monthly amount
 */
export function convertToMonthly(amount: number, cycle: string): number {
  switch (cycle) {
    case 'monthly':
      return amount;
    case 'yearly':
      return amount / 12;
    case 'quarterly':
      return amount / 3;
    case 'weekly':
      return amount * 4;
    default:
      return amount;
  }
}

/**
 * Convert any billing cycle to yearly amount
 */
export function convertToYearly(amount: number, cycle: string): number {
  return convertToMonthly(amount, cycle) * 12;
}

/**
 * Calculate subscription statistics
 */
export function calculateSubscriptionStats(
  subscriptions: Subscription[],
  cancelledSubscriptions: CancelledSubscription[],
  budget?: number
): SubscriptionStats {
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const totalMonthly = calculateMonthlySpending(activeSubscriptions);
  const totalYearly = calculateYearlySpending(activeSubscriptions);
  const totalSaved = calculateTotalSaved(cancelledSubscriptions);
  const upcomingPayments = getUpcomingCharges(activeSubscriptions, 7).length;
  const categories = calculateCategorySpending(activeSubscriptions);
  
  const mostExpensive = activeSubscriptions.reduce((max, sub) => {
    const monthlyAmount = convertToMonthly(sub.amount, sub.billingCycle);
    const maxMonthly = max ? convertToMonthly(max.amount, max.billingCycle) : 0;
    return monthlyAmount > maxMonthly ? sub : max;
  }, null as Subscription | null);
  
  const budgetUsagePercentage = budget ? Math.round((totalMonthly / budget) * 100) : 0;
  
  return {
    totalActive: activeSubscriptions.length,
    totalMonthly: Math.round(totalMonthly),
    totalYearly: Math.round(totalYearly),
    totalSaved: Math.round(totalSaved),
    upcomingPayments,
    categories,
    averagePerSubscription: activeSubscriptions.length > 0 
      ? Math.round(totalMonthly / activeSubscriptions.length) 
      : 0,
    mostExpensive,
    budgetUsagePercentage,
  };
}

/**
 * Calculate usage score based on hours used and subscription cost
 */
export function calculateUsageScore(hoursUsed: number, amount: number, billingCycle: string): number {
  const monthlyAmount = convertToMonthly(amount, billingCycle);
  const costPerHour = monthlyAmount / (hoursUsed || 1);
  
  // Lower cost per hour = higher score
  if (costPerHour < 5) return 95;
  if (costPerHour < 10) return 85;
  if (costPerHour < 20) return 75;
  if (costPerHour < 30) return 65;
  if (costPerHour < 50) return 50;
  if (costPerHour < 100) return 35;
  return 20;
}

/**
 * Get spending trend for last N months
 */
export function getSpendingTrend(subscriptions: Subscription[], months: number = 6) {
  const trend = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthIndex = date.getMonth();
    
    // Simulate varying spending (in real app, this would come from historical data)
    const baseSpending = calculateMonthlySpending(subscriptions);
    const variation = Math.random() * 0.2 - 0.1; // ±10% variation
    
    trend.push({
      month: monthNames[monthIndex],
      amount: Math.round(baseSpending * (1 + variation)),
      subscriptions: subscriptions.filter(s => s.status === 'active').length,
    });
  }
  
  return trend;
}

/**
 * Get category breakdown with percentages
 */
export function getCategoryBreakdown(subscriptions: Subscription[]) {
  const categorySpending = calculateCategorySpending(subscriptions);
  const total = Object.values(categorySpending).reduce((sum, amount) => sum + amount, 0);
  
  const colors: Record<string, string> = {
    Entertainment: '#8B5CF6',
    Music: '#F59E0B',
    Food: '#F97316',
    Finance: '#10B981',
    Fitness: '#06B6D4',
    Education: '#3B82F6',
    Productivity: '#EC4899',
    Shopping: '#EF4444',
    'Cloud Storage': '#6366F1',
    Gaming: '#8B5CF6',
    News: '#64748B',
    Other: '#94A3B8',
  };
  
  return Object.entries(categorySpending)
    .map(([category, amount]) => ({
      category,
      amount: Math.round(amount),
      percentage: Math.round((amount / total) * 100),
      subscriptions: subscriptions.filter(s => s.category === category && s.status === 'active').length,
      color: colors[category] || '#94A3B8',
    }))
    .sort((a, b) => b.amount - a.amount);
}

/**
 * Calculate life goals based on saved amount
 */
export function calculateLifeGoals(savedAmount: number) {
  return [
    {
      icon: '✈️',
      text: 'Weekend trip to Goa',
      count: Math.floor(savedAmount / 8000),
      unitCost: 8000,
    },
    {
      icon: '🍕',
      text: 'Meals at your fav place',
      count: Math.floor(savedAmount / 200),
      unitCost: 200,
    },
    {
      icon: '📚',
      text: 'Books from Amazon',
      count: Math.floor(savedAmount / 300),
      unitCost: 300,
    },
    {
      icon: '🎬',
      text: 'Movie tickets at PVR',
      count: Math.floor(savedAmount / 400),
      unitCost: 400,
    },
    {
      icon: '⛽',
      text: 'Months of petrol',
      count: Math.floor(savedAmount / 3000),
      unitCost: 3000,
    },
  ];
}
