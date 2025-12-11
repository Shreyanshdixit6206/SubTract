import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Subscription, CancelledSubscription, SubscriptionStats } from '@/types/subscription';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS, API_ENDPOINTS } from '@/utils/constants';
import { DUMMY_SUBSCRIPTIONS, CANCELLED_SUBSCRIPTIONS, DUMMY_USER } from '@/utils/dummyData';
import { calculateSubscriptionStats, getUpcomingCharges } from '@/utils/calculations';
import { useToast } from '@/hooks/useToast';

interface SubscriptionContextType {
  subscriptions: Subscription[];
  cancelledSubscriptions: CancelledSubscription[];
  stats: SubscriptionStats;
  isLoading: boolean;
  error: string | null;
  addSubscription: (subscription: Omit<Subscription, 'id' | 'status' | 'startDate'>) => Promise<boolean>;
  updateSubscription: (id: string, updates: Partial<Subscription>) => Promise<boolean>;
  cancelSubscription: (id: string, reason?: string) => Promise<boolean>;
  refreshSubscriptions: () => Promise<void>;
  getSubscriptionById: (id: string) => Subscription | undefined;
}

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [subscriptions, setSubscriptions] = useLocalStorage<Subscription[]>(
    STORAGE_KEYS.SUBSCRIPTIONS,
    DUMMY_SUBSCRIPTIONS
  );
  const [cancelledSubscriptions, setCancelledSubscriptions] = useLocalStorage<CancelledSubscription[]>(
    STORAGE_KEYS.CANCELLED_SUBSCRIPTIONS,
    CANCELLED_SUBSCRIPTIONS
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  // Calculate stats whenever subscriptions change
  const stats = calculateSubscriptionStats(subscriptions, cancelledSubscriptions, DUMMY_USER.budget);

  const refreshSubscriptions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.SUBSCRIPTIONS);
      const data = await response.json();

      if (data.success) {
        setSubscriptions(data.data);
      }
    } catch (err) {
      setError('Failed to fetch subscriptions');
    } finally {
      setIsLoading(false);
    }
  };

  const addSubscription = async (
    subscriptionData: Omit<Subscription, 'id' | 'status' | 'startDate'>
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.CREATE_SUBSCRIPTION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      const data = await response.json();

      if (data.success && data.data) {
        setSubscriptions([...subscriptions, data.data]);
        toast.success('Subscription added successfully! 🎉');
        return true;
      } else {
        toast.error(data.error || 'Failed to add subscription');
        return false;
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscription = async (id: string, updates: Partial<Subscription>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.SUBSCRIPTION_BY_ID(id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        setSubscriptions(
          subscriptions.map(sub => (sub.id === id ? { ...sub, ...updates } : sub))
        );
        toast.success('Subscription updated! ✅');
        return true;
      } else {
        toast.error(data.error || 'Failed to update subscription');
        return false;
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async (id: string, reason?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const subscription = subscriptions.find(sub => sub.id === id);
      if (!subscription) {
        toast.error('Subscription not found');
        return false;
      }

      const response = await fetch(API_ENDPOINTS.SUBSCRIPTION_BY_ID(id), {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Remove from active subscriptions
        setSubscriptions(subscriptions.filter(sub => sub.id !== id));

        // Add to cancelled subscriptions
        const cancelledSub: CancelledSubscription = {
          ...subscription,
          cancelledDate: new Date().toISOString(),
          reason: reason || 'No reason provided',
          savedAmount: 0, // Would be calculated based on remaining billing cycles
          monthsCancelled: 0,
        };
        setCancelledSubscriptions([...cancelledSubscriptions, cancelledSub]);

        toast.success('Subscription cancelled successfully');
        return true;
      } else {
        toast.error(data.error || 'Failed to cancel subscription');
        return false;
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getSubscriptionById = useCallback(
    (id: string) => {
      return subscriptions.find(sub => sub.id === id);
    },
    [subscriptions]
  );

  const value: SubscriptionContextType = {
    subscriptions,
    cancelledSubscriptions,
    stats,
    isLoading,
    error,
    addSubscription,
    updateSubscription,
    cancelSubscription,
    refreshSubscriptions,
    getSubscriptionById,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}
