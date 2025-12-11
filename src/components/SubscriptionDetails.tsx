import React from 'react';
import { GlassCard } from './GlassCard';
import { PlatformIcon } from '@/utils/platformIcons';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, CreditCard, Share2, PauseCircle, XCircle, Zap } from 'lucide-react';
import { Button } from './Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';

interface SubscriptionDetailsProps {
  onBack: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
}

export function SubscriptionDetails({ onBack, onEdit, onCancel }: SubscriptionDetailsProps) {
  const subscription = {
    logo: '🎬',
    name: 'Netflix',
    price: 649,
    period: 'month',
    category: 'Entertainment',
    nextBilling: '15 Jan 2025',
    startDate: '15 Jan 2024',
    autoRenewal: true,
    paymentMethod: 'Google Pay UPI'
  };
  
  const usageData = [
    { month: 'Jul', hours: 28, cost: 649 },
    { month: 'Aug', hours: 32, cost: 649 },
    { month: 'Sep', hours: 25, cost: 649 },
    { month: 'Oct', hours: 30, cost: 649 },
    { month: 'Nov', hours: 27, cost: 649 },
    { month: 'Dec', hours: 30, cost: 649 },
  ];
  
  const usageScore = [
    {
      name: 'Usage',
      value: 85,
      fill: '#8B5CF6'
    }
  ];
  
  const paymentHistory = [
    { date: '15 Jan 2025', amount: 649, method: 'UPI', status: 'Success' },
    { date: '15 Dec 2024', amount: 649, method: 'Card', status: 'Success' },
    { date: '15 Nov 2024', amount: 649, method: 'UPI', status: 'Success' },
    { date: '15 Oct 2024', amount: 649, method: 'UPI', status: 'Success' },
  ];
  
  const costPerUse = (649 / 30).toFixed(2);
  const yearlyProjection = 649 * 12;
  const totalPaid = 649 * paymentHistory.length;
  
  return (
    <div className="min-h-screen p-6 md:p-8 max-w-6xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>
      
      {/* Hero Section */}
      <GlassCard variant="strong" className="mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-start gap-6 mb-6">
            <PlatformIcon id={subscription.logo} name={subscription.name} className="w-24 h-24" radiusClass="rounded-3xl" />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">{subscription.name}</h1>
              <span className="inline-block px-4 py-1 rounded-full text-sm bg-purple-500/20 text-purple-300 mb-3">
                {subscription.category}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold gradient-text-gold">
                  ₹{subscription.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xl text-slate-600 dark:text-white/70">/{subscription.period}</span>
              </div>
            </div>
          </div>
          
          {/* Mini Usage Chart */}
          <div className="h-32 w-full min-h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', r: 4 }}
                  fill="url(#colorUsage)"
                />
                <XAxis dataKey="month" stroke="#9CA3AF" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Cost Analysis */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span>Cost Analysis</span>
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
              <span className="text-slate-600 dark:text-white/70">Monthly Cost</span>
              <span className="text-2xl font-bold gradient-text-purple">₹{subscription.price}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
              <span className="text-slate-600 dark:text-white/70">Yearly Projection</span>
              <span className="text-2xl font-bold gradient-text-gold">₹{yearlyProjection.toLocaleString('en-IN')}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
              <span className="text-slate-600 dark:text-white/70">Cost Per Use</span>
              <span className="text-2xl font-bold text-purple-600 dark:text-cyan-400">₹{costPerUse}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 rounded-xl bg-white/5">
              <span className="text-slate-600 dark:text-white/70">Total Paid</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{totalPaid.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </GlassCard>
        
        {/* Usage Score */}
        <GlassCard>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Smart Insights</span>
          </h2>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-full h-52 min-h-52">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="60%" 
                  outerRadius="90%" 
                  data={usageScore}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                  />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-4xl font-bold fill-purple-400">
                    85%
                  </text>
                  <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-400">
                    Usage Score
                  </text>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-3 text-sm">
            <p className="p-3 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
              ✓ You watched 30 hours this month
            </p>
            <p className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              ℹ️ That&apos;s ₹{costPerUse} per hour of entertainment
            </p>
            <p className="p-3 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              💡 Competitors: Hotstar ₹499/mo (Save ₹150)
            </p>
          </div>
        </GlassCard>
      </div>
      
      {/* Payment History */}
      <GlassCard className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <CreditCard className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
          <span>Payment History</span>
        </h2>
        
        <div className="space-y-3">
          {paymentHistory.map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400">✓</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{payment.date}</p>
                  <p className="text-sm text-slate-600 dark:text-white/70">{payment.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold gradient-text-gold">₹{payment.amount}</p>
                <p className="text-xs text-green-400">{payment.status}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
      
      {/* Billing Info */}
      <GlassCard className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <Calendar className="w-5 h-5 text-orange-400" />
          <span>Billing Cycle</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-slate-600 dark:text-white/70 mb-1">Started</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{subscription.startDate}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-slate-600 dark:text-white/70 mb-1">Next Billing</p>
            <p className="text-lg font-semibold text-orange-400">{subscription.nextBilling}</p>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-slate-600 dark:text-white/70 mb-1">Auto-Renewal</p>
            <p className="text-lg font-semibold text-green-400">
              {subscription.autoRenewal ? 'ON' : 'OFF'}
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5">
            <p className="text-sm text-slate-600 dark:text-white/70 mb-1">Payment Method</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{subscription.paymentMethod}</p>
          </div>
        </div>
      </GlassCard>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="danger" icon={<XCircle className="w-5 h-5" />}>
          Cancel
        </Button>
        <Button variant="ghost" icon={<PauseCircle className="w-5 h-5" />}>
          Pause 1 Month
        </Button>
        <Button variant="rupee" icon={<TrendingDown className="w-5 h-5" />}>
          Switch Annual
        </Button>
        <Button variant="ghost" icon={<Share2 className="w-5 h-5" />}>
          Share Plan
        </Button>
      </div>
    </div>
  );
}