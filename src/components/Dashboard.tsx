import React from 'react';
import { GlassCard } from './GlassCard';
import { StatCard } from './StatCard';
import { SubscriptionCard } from './SubscriptionCard';
import { Logo } from './Logo';
import { PlatformIcon } from '@/utils/platformIcons';
import { Bell, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { DUMMY_SUBSCRIPTIONS } from '@/utils/dummyData';

interface DashboardProps {
  onNavigate?: (screen: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const activeSubscriptions = DUMMY_SUBSCRIPTIONS.filter(sub => sub.status === 'active').slice(0, 6);
  
  const subscriptions = activeSubscriptions.map(sub => ({
    id: parseInt(sub.id),
    logo: sub.logo,
    name: sub.name,
    price: sub.amount,
    period: sub.billingCycle === 'monthly' ? 'month' as const : sub.billingCycle === 'yearly' ? 'year' as const : 'quarter' as const,
    nextBilling: new Date(sub.nextBilling).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    category: sub.category
  }));
  
  const upcomingCharges = [
    { logo: subscriptions[0]?.logo || 'netflix', name: subscriptions[0]?.name || 'Netflix', price: subscriptions[0]?.price || 649, daysLeft: 2 },
    { logo: subscriptions[1]?.logo || 'amazonprime', name: subscriptions[1]?.name || 'Amazon Prime', price: subscriptions[1]?.price || 1499, daysLeft: 5 },
  ];
  
  const totalMonthly = 4847;
  const totalYearly = 58164;
  const activeSubs = 12;
  const savedAmount = 2400;
  const alerts = 3;
  
  return (
    <div className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Logo size="sm" showText={true} className="lg:hidden" />
          <p className="text-slate-600 dark:text-white/70 mt-2">Welcome back, Rahul</p>
        </div>
        <button className="relative p-3 glass rounded-2xl hover:scale-110 transition-transform spring">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-xs flex items-center justify-center pulse-alert">
            {alerts}
          </span>
        </button>
      </div>
      
      {/* Hero Card */}
      <GlassCard className="mb-8 animate-float" variant="strong">
        <div className="text-center">
          <p className="text-slate-600 dark:text-white/70 mb-2">Total Monthly Spending</p>
          <h2 className="text-5xl md:text-6xl font-bold gradient-text-purple mb-2">
            ₹{totalMonthly.toLocaleString('en-IN')}
          </h2>
          <p className="text-orange-500 dark:text-orange-400 flex items-center justify-center gap-1 mb-6">
            <TrendingUp className="w-4 h-4" />
            <span>15% more than last month</span>
          </p>
          
          {/* Circular Progress Ring */}
          <div className="relative w-48 h-48 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="rgba(100,116,139,0.2)"
                strokeWidth="12"
              />
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 80 * 0.93} ${2 * Math.PI * 80}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold gradient-text-purple">93%</span>
              <span className="text-xs text-slate-600 dark:text-white/70">of budget</span>
            </div>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-white/70">
            Yearly Projection: <span className="font-semibold gradient-text-gold">₹{totalYearly.toLocaleString('en-IN')}</span>
          </p>
        </div>
      </GlassCard>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          value={activeSubs}
          label="Active Subscriptions"
          icon="📊"
          variant="default"
        />
        <StatCard
          value={`₹${savedAmount.toLocaleString('en-IN')}`}
          label="Money Saved"
          icon="₹"
          variant="gold"
          trend="up"
          trendValue="From cancelled subs"
        />
        <StatCard
          value={alerts}
          label="Needs Attention"
          icon="⚠️"
          variant="orange"
          className="pulse-alert"
        />
      </div>
      
      {/* Upcoming Charges */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <span>⏰</span>
          <span>Upcoming Charges</span>
        </h2>
        <div className="space-y-4">
          {upcomingCharges.map((charge, index) => (
            <GlassCard key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <PlatformIcon id={charge.logo} name={charge.name} className="w-12 h-12" />
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{charge.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-white/70">
                    Due in {charge.daysLeft} days
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold gradient-text-gold">
                  ₹{charge.price.toLocaleString('en-IN')}
                </p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400 text-sm hover:bg-red-500/30 transition-colors">
                    Cancel
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm hover:bg-cyan-500/30 transition-colors">
                    Remind
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      
      {/* Active Subscriptions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <span>📱</span>
          <span>Active Subscriptions</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions.map((sub) => (
            <SubscriptionCard
              key={sub.id}
              logo={sub.logo}
              name={sub.name}
              price={sub.price}
              period={sub.period}
              nextBilling={sub.nextBilling}
              category={sub.category}
              onClick={() => onNavigate?.('details')}
            />
          ))}
        </div>
      </div>
      
      {/* Add Subscription Button - Only show on mobile */}
      <div className="lg:hidden fixed bottom-24 right-8">
        <button 
          onClick={() => onNavigate?.('add')}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] shadow-xl shadow-purple-500/50 flex items-center justify-center text-3xl hover:scale-110 transition-transform spring"
        >
          +
        </button>
      </div>
    </div>
  );
}