import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import React from 'react';

/**
 * Dynamic import with loading fallback
 * Reduces initial bundle size by lazy loading components
 */
export const createDynamicComponent = <P extends object>(
  componentImport: () => Promise<{ default: ComponentType<P> }>,
  options?: {
    loadingComponent?: () => JSX.Element | null;
    ssr?: boolean;
  }
) => {
  return dynamic(componentImport, {
    loading: options?.loadingComponent,
    ssr: options?.ssr ?? true,
  });
};

/**
 * Dynamic import for heavy components that appear below the fold
 */
export const DynamicInsights = dynamic(
  () => import('@/components/Insights').then(mod => ({ default: mod.Insights })),
  {
    ssr: true,
    loading: () => {
      return <div className="w-full h-96 bg-slate-900/10 dark:bg-white/5 rounded-2xl animate-pulse" />;
    },
  }
);

export const DynamicPaymentMethods = dynamic(
  () => import('@/components/PaymentMethods').then(mod => ({ default: mod.PaymentMethods })),
  {
    ssr: true,
    loading: () => { return <div className="w-full h-96 bg-slate-900/10 dark:bg-white/5 rounded-2xl animate-pulse" />; },
  }
);

export const DynamicSavingsMandir = dynamic(
  () => import('@/components/SavingsMandir').then(mod => ({ default: mod.SavingsMandir })),
  {
    ssr: true,
    loading: () => { return <div className="w-full h-96 bg-slate-900/10 dark:bg-white/5 rounded-2xl animate-pulse" />; },
  }
);

export const DynamicSubscriptionDetails = dynamic(
  () => import('@/components/SubscriptionDetails').then(mod => ({ default: mod.SubscriptionDetails })),
  {
    ssr: true,
    loading: () => { return <div className="w-full h-96 bg-slate-900/10 dark:bg-white/5 rounded-2xl animate-pulse" />; },
  }
);

export const DynamicAddSubscription = dynamic(
  () => import('@/components/AddSubscription').then(mod => ({ default: mod.AddSubscription })),
  {
    ssr: false, // This is a modal/form, no need for SSR
    loading: () => null,
  }
);

export const DynamicNotifications = dynamic(
  () => import('@/components/Notifications').then(mod => ({ default: mod.Notifications })),
  {
    ssr: true,
    loading: () => { return <div className="w-full h-96 bg-slate-900/10 dark:bg-white/5 rounded-2xl animate-pulse" />; },
  }
);

export const DynamicSettings = dynamic(
  () => import('@/components/Settings').then(mod => ({ default: mod.Settings })),
  {
    ssr: true,
    loading: () => { return <div className="w-full h-96 bg-slate-900/10 dark:bg-white/5 rounded-2xl animate-pulse" />; },
  }
);

export const DynamicHelp = dynamic(
  () => import('@/components/Help').then(mod => ({ default: mod.Help })),
  {
    ssr: true,
    loading: () => { return <div className="w-full h-96 bg-slate-900/10 dark:bg-white/5 rounded-2xl animate-pulse" />; },
  }
);

export const DynamicProfile = dynamic(
  () => import('@/components/Profile').then(mod => ({ default: mod.Profile })),
  {
    ssr: true,
    loading: () => { return <div className="w-full h-96 bg-slate-900/10 dark:bg-white/5 rounded-2xl animate-pulse" />; },
  }
);
