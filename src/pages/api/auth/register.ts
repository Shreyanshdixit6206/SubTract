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

  const { name, email, phone, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and password are required',
    });
  }

  // Dummy registration - in production, this would create a new user in database
  const token = `dummy-jwt-token-${Date.now()}`;
  const user = {
    ...DUMMY_USER,
    id: Date.now().toString(),
    name,
    email,
    phone: phone || '',
    token,
    joinedDate: new Date().toISOString(),
  };

  return res.status(201).json({
    success: true,
    data: { user, token },
    message: 'Registration successful',
  });
}
