import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types/api';
import { DUMMY_SUBSCRIPTIONS, CANCELLED_SUBSCRIPTIONS, DUMMY_USER } from '@/utils/dummyData';
import { calculateSubscriptionStats } from '@/utils/calculations';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  // Calculate comprehensive statistics
  const stats = calculateSubscriptionStats(
    DUMMY_SUBSCRIPTIONS,
    CANCELLED_SUBSCRIPTIONS,
    DUMMY_USER.budget
  );

  return res.status(200).json({
    success: true,
    data: stats,
  });
}
