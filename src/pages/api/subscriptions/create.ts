import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types/api';
import { Subscription } from '@/types/subscription';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  const subscriptionData = req.body;

  // Validate required fields
  if (!subscriptionData.name || !subscriptionData.amount || !subscriptionData.billingCycle) {
    return res.status(400).json({
      success: false,
      error: 'Name, amount, and billing cycle are required',
    });
  }

  // Create new subscription
  const newSubscription: Subscription = {
    id: Date.now().toString(),
    name: subscriptionData.name,
    logo: subscriptionData.logo || '📱',
    category: subscriptionData.category || 'Other',
    amount: parseFloat(subscriptionData.amount),
    currency: '₹',
    billingCycle: subscriptionData.billingCycle,
    nextBilling: subscriptionData.nextBilling || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    paymentMethod: subscriptionData.paymentMethod || 'UPI',
    status: 'active',
    startDate: subscriptionData.startDate || new Date().toISOString(),
    autoRenewal: subscriptionData.autoRenewal !== false,
    reminder: subscriptionData.reminder !== false,
    notes: subscriptionData.notes || '',
  };

  // In a real app, this would save to database
  return res.status(201).json({
    success: true,
    data: newSubscription,
    message: 'Subscription created successfully',
  });
}
