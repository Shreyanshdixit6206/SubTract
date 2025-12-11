import { NextApiRequest, NextApiResponse } from 'next';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type ApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<T>>
) => Promise<void> | void;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface SpendingTrend {
  month: string;
  amount: number;
  subscriptions: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  subscriptions: number;
  color: string;
}
