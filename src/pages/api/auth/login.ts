import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '@/types/api';
import { DUMMY_USER } from '@/utils/dummyData';

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

  const { email, password } = req.body;

  // Dummy validation - in production, this would validate against a database
  if (email === 'user@subtract.com' && password === 'Demo@2025Secure!') {
    const token = `dummy-jwt-token-${Date.now()}`;
    const user = {
      ...DUMMY_USER,
      token,
    };

    return res.status(200).json({
      success: true,
      data: { user, token },
      message: 'Login successful',
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid credentials. Use email: user@subtract.com, password: Demo@2025Secure!',
  });
}
