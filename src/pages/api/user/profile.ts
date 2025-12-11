import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types/api';
import { DUMMY_USER } from '@/utils/dummyData';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'GET') {
    // Return user profile
    return res.status(200).json({
      success: true,
      data: DUMMY_USER,
    });
  }

  if (req.method === 'PUT') {
    // Update user profile
    const updateData = req.body;
    
    const updatedUser = {
      ...DUMMY_USER,
      ...updateData,
    };

    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully',
    });
  }

  return res.status(405).json({ 
    success: false, 
    error: 'Method not allowed' 
  });
}
