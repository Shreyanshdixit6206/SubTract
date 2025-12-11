import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types/api';
import { DUMMY_SUBSCRIPTIONS } from '@/utils/dummyData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid subscription ID',
    });
  }

  const subscription = DUMMY_SUBSCRIPTIONS.find(sub => sub.id === id);

  if (!subscription) {
    return res.status(404).json({
      success: false,
      error: 'Subscription not found',
    });
  }

  // GET - Fetch single subscription
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      data: subscription,
    });
  }

  // PUT - Update subscription
  if (req.method === 'PUT') {
    const updateData = req.body;
    
    // In a real app, this would update the database
    const updatedSubscription = {
      ...subscription,
      ...updateData,
      id, // Ensure ID doesn't change
    };

    return res.status(200).json({
      success: true,
      data: updatedSubscription,
      message: 'Subscription updated successfully',
    });
  }

  // DELETE - Cancel/delete subscription
  if (req.method === 'DELETE') {
    // In a real app, this would mark as cancelled in database
    return res.status(200).json({
      success: true,
      message: 'Subscription cancelled successfully',
    });
  }

  return res.status(405).json({ 
    success: false, 
    error: 'Method not allowed' 
  });
}
