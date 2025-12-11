import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types/api';

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

  // In a real app, this would clear the session/token from the database
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}
