import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types/api';
import { DUMMY_SUBSCRIPTIONS } from '@/utils/dummyData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // GET - Fetch all subscriptions
  if (req.method === 'GET') {
    const { status, category } = req.query;
    
    let filtered = [...DUMMY_SUBSCRIPTIONS];
    
    // Filter by status
    if (status && typeof status === 'string') {
      filtered = filtered.filter(sub => sub.status === status);
    }
    
    // Filter by category
    if (category && typeof category === 'string') {
      filtered = filtered.filter(sub => sub.category === category);
    }
    
    return res.status(200).json({
      success: true,
      data: filtered,
    });
  }

  return res.status(405).json({ 
    success: false, 
    error: 'Method not allowed' 
  });
}
