import React from 'react';
import { GlassCard } from './GlassCard';
import { TrendingUp, Zap, Target, Calendar, Users, AlertCircle, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Button } from './Button';

interface InsightsProps {
  onBack: () => void;
}

export function Insights({ onBack }: InsightsProps) {
  const monthlyAverage = 4650;
  const yearlyProjection = 55800;
  
  const categoryData = [
    { name: 'Entertainment', amount: 2300, percentage: 49, color: '#8B5CF6' },
    { name: 'Food Delivery', amount: 1200, percentage: 26, color: '#F97316' },
    { name: 'Finance', amount: 499, percentage: 11, color: '#10B981' },
    { name: 'Fitness', amount: 532, percentage: 11, color: '#06B6D4' },
    { name: 'Music', amount: 119, percentage: 3, color: '#F59E0B' },
  ];
  
  const monthlyTrend = [
    { month: 'Jul', amount: 4200 },
    { month: 'Aug', amount: 4500 },
    { month: 'Sep', amount: 4300 },
    { month: 'Oct', amount: 4800 },
    { month: 'Nov', amount: 4650 },
    { month: 'Dec', amount: 5200 },
  ];
  
  const insights = [
    {
      type: 'warning',
      icon: <AlertCircle className="w-5 h-5" />,
      title: 'Potential Savings Opportunity',
      message: 'You have 3 OTT subscriptions but only use Netflix regularly. Consider cancelling Hotstar & Zee5 to save ₹1,098/month',
      color: 'orange',
      action: 'View Details'
    },
    {
      type: 'success',
      icon: <Sparkles className="w-5 h-5" />,
      title: 'Great Job!',
      message: 'You\'re spending 12% less than users in Delhi. Keep up the smart spending!',
      color: 'green',
      action: 'Share Achievement'
    },
    {
      type: 'info',
      icon: <Calendar className="w-5 h-5" />,
      title: 'IPL Season Coming',
      message: 'Hotstar annual plan at ₹899 (save ₹5,089) - Perfect timing before IPL 2025 starts!',
      color: 'cyan',
      action: 'Explore Offer'
    },
  ];
  
  const budgetData = {
    budget: 5000,
    current: 4650,
    remaining: 350,
    percentage: 93
  };
  
  const peerComparison = {
    cityAverage: 5200,
    yourSpending: 4650,
    saving: 550
  };
  
  return (
    <div className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text-purple mb-2">
          Your Spending Story
        </h1>
        <p className="text-slate-600 dark:text-white/70 text-lg">
          Deep insights into your subscription spending patterns
        </p>
      </div>
      
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <GlassCard variant="strong">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-600 dark:text-white/70 mb-2">Monthly Average</p>
              <h2 className="text-5xl font-bold gradient-text-purple">
                ₹{monthlyAverage.toLocaleString('en-IN')}
              </h2>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-sm text-slate-600 dark:text-white/70">
            Yearly Projection: <span className="text-xl font-semibold gradient-text-gold">₹{yearlyProjection.toLocaleString('en-IN')}</span>
          </p>
        </GlassCard>
        
        <GlassCard variant="strong">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-slate-600 dark:text-white/70 mb-2">Budget Status</p>
              <h2 className="text-5xl font-bold text-green-400">
                {budgetData.percentage}%
              </h2>
            </div>
            <Target className="w-8 h-8 text-green-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000"
                style={{ width: `${budgetData.percentage}%` }}
              />
            </div>
            <span className="text-sm text-green-400">₹{budgetData.remaining} left</span>
          </div>
        </GlassCard>
      </div>
      
      {/* Monthly Trend Chart */}
      <GlassCard className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <span>6-Month Spending Trend</span>
        </h2>
        <div className="w-full h-80 min-h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '2px solid #8B5CF6',
                  borderRadius: '12px',
                  color: '#1F2937',
                  padding: '12px 16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  fontWeight: 500
                }}
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Spending']}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', r: 6 }}
                fill="url(#colorAmount)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Breakdown */}
        <GlassCard>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <span>📊</span>
            <span>Category Breakdown</span>
          </h2>
          
          <div className="mb-6 w-full h-64 min-h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '2px solid #8B5CF6',
                    borderRadius: '12px',
                    color: '#1F2937',
                    padding: '12px 16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    fontWeight: 500
                  }}
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            {categoryData.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm text-slate-900 dark:text-white">{cat.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">₹{cat.amount.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-slate-600 dark:text-white/70 w-12 text-right">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        
        {/* Peer Comparison */}
        <GlassCard>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <Users className="w-6 h-6 text-cyan-400" />
            <span>How You Compare</span>
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 dark:text-white/70">Users in Delhi</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">₹{peerComparison.cityAverage.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div className="h-full w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600 dark:text-white/70">Your Spending</span>
                <span className="text-xl font-bold gradient-text-purple">₹{peerComparison.yourSpending.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="h-3 rounded-full bg-white/10">
                <div className="h-full w-[90%] bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
              </div>
            </div>
            
            <GlassCard variant="strong" className="text-center">
              <p className="text-green-400 text-3xl font-bold mb-2">
                ₹{peerComparison.saving.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-slate-600 dark:text-white/70">
                You&apos;re saving more than average!
              </p>
            </GlassCard>
          </div>
        </GlassCard>
      </div>
      
      {/* AI-Powered Insights */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
          <Zap className="w-6 h-6 text-amber-400" />
          <span>Smart Recommendations</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, index) => {
            const colorClasses = {
              orange: 'border-orange-500/20 bg-orange-500/5',
              green: 'border-green-500/20 bg-green-500/5',
              cyan: 'border-cyan-500/20 bg-cyan-500/5'
            };
            
            const iconColors = {
              orange: 'text-orange-400',
              green: 'text-green-400',
              cyan: 'text-cyan-400'
            };
            
            return (
              <GlassCard 
                key={index}
                className={`border-2 ${colorClasses[insight.color as keyof typeof colorClasses]}`}
              >
                <div className={`mb-4 ${iconColors[insight.color as keyof typeof iconColors]}`}>
                  {insight.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">{insight.title}</h3>
                <p className="text-sm text-slate-600 dark:text-white/70 mb-4">{insight.message}</p>
                <Button variant="ghost" size="sm" className="w-full">
                  {insight.action}
                </Button>
              </GlassCard>
            );
          })}
        </div>
      </div>
      
      {/* Festival Season Alert */}
      <GlassCard className="mt-8 border-2 border-amber-500/20" variant="strong">
        <div className="flex items-start gap-4">
          <div className="text-4xl animate-float">🏛️</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 gradient-text-gold">Diwali Offer Alert!</h3>
            <p className="text-slate-600 dark:text-white/70 mb-4">
              Multiple platforms offering annual subscriptions at discounted rates. Save up to 40% on yearly plans!
            </p>
            <Button variant="rupee">Explore Diwali Deals</Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}