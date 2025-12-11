/**
 * Format number in Indian numbering system
 * Example: 100000 -> 1,00,000
 */
export function formatIndianNumber(num: number): string {
  const numStr = num.toString();
  const lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  
  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return lastThree;
}

/**
 * Format currency in Indian Rupees
 * Example: 100000 -> ₹1,00,000
 */
export function formatCurrency(amount: number, currency: string = '₹'): string {
  return `${currency}${formatIndianNumber(Math.round(amount))}`;
}

/**
 * Format date in DD/MM/YYYY format
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Format date in relative time (e.g., "in 2 days", "3 days ago")
 */
export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diffTime = d.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1) return `in ${diffDays} days`;
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
  
  return formatDate(date);
}

/**
 * Format billing cycle display
 */
export function formatBillingCycle(cycle: string): string {
  const map: Record<string, string> = {
    monthly: 'month',
    yearly: 'year',
    quarterly: 'quarter',
    weekly: 'week',
  };
  
  return map[cycle] || cycle;
}

/**
 * Get days until a date
 */
export function getDaysUntil(date: string | Date): number {
  const d = new Date(date);
  const now = new Date();
  const diffTime = d.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format phone number (Indian format)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  
  return phone;
}

/**
 * Abbreviate large numbers
 * Example: 1000 -> 1K, 1000000 -> 10L
 */
export function abbreviateNumber(num: number): string {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)}Cr`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(1)}L`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Format duration (hours to human readable)
 */
export function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} mins`;
  }
  if (hours < 24) {
    return `${Math.round(hours)} hrs`;
  }
  const days = Math.floor(hours / 24);
  return `${days} days`;
}
