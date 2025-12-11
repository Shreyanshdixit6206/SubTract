import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { TrendingUp, Calendar, Award, Coffee, ShoppingBag, Utensils, Plane, BookOpen, Film } from 'lucide-react';
import { CANCELLED_SUBSCRIPTIONS } from '@/utils/dummyData';
import { PlatformIcon } from '@/utils/platformIcons';

interface SavingsMandirProps {
  onBack: () => void;
}

export function SavingsMandir({ onBack }: SavingsMandirProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'year'>('year');

  const totalSaved = CANCELLED_SUBSCRIPTIONS.reduce(
    (sum, sub) => sum + (sub.savedAmount || 0),
    0
  );

  const cancelledSubscriptions = CANCELLED_SUBSCRIPTIONS.map((sub) => {
    const monthsAgo = Math.max(
      0,
      Math.floor(
        (new Date().getTime() - new Date(sub.cancelledDate).getTime()) /
          (1000 * 60 * 60 * 24 * 30)
      )
    );

    return {
      id: sub.id,
      logo: sub.logo,
      name: sub.name,
      cancelledDate: `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`,
      saved: sub.savedAmount || 0,
      reason: sub.reason || 'Not needed',
    };
  });

  const savingsBreakdown = [
    { icon: <Film className="w-5 h-5" />, category: 'Entertainment', amount: 8988, percentage: 49 },
    { icon: <Utensils className="w-5 h-5" />, category: 'Food Delivery', amount: 4990, percentage: 27 },
    { icon: <Coffee className="w-5 h-5" />, category: 'Music & Audio', amount: 3991, percentage: 22 },
    { icon: <ShoppingBag className="w-5 h-5" />, category: 'Other', amount: 501, percentage: 2 },
  ];

  const equivalents = [
    { icon: <Plane className="w-5 h-5" />, text: 'Round trip flight to Goa', value: '1 trip' },
    { icon: <Utensils className="w-5 h-5" />, text: 'Restaurant dinners', value: '92 meals' },
    { icon: <BookOpen className="w-5 h-5" />, text: 'Books on Amazon', value: '23 books' },
    { icon: <Film className="w-5 h-5" />, text: 'Movie tickets', value: '46 shows' },
  ];

  return (
    <div className="min-h-screen p-6 md:p-8 max-w-6xl mx-auto bg-white dark:bg-[#0F0F1E]">
      {/* Header - clean minimal */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Savings Overview</h1>
            <p className="text-slate-600 dark:text-white/70">Track money saved from cancelled subscriptions</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedPeriod === 'month'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-purple-200 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setSelectedPeriod('year')}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedPeriod === 'year'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-purple-200 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              Year
            </button>
          </div>
        </div>

        {/* Total Saved */}
        <GlassCard variant="strong" className="mb-8 bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-white/70 mb-1">Total Saved</p>
              <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-2">₹{totalSaved.toLocaleString('en-IN')}</h2>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">From {cancelledSubscriptions.length} cancelled subscriptions</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-green-500/10 flex items-center justify-center">
                <Award className="w-16 h-16 text-emerald-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Savings Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {savingsBreakdown.map((item, index) => (
            <GlassCard key={index} className="hover:scale-105 transition-transform bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-purple-600 dark:text-purple-400">{item.icon}</div>
                <span className="text-sm text-slate-600 dark:text-white/70">{item.category}</span>
              </div>
              <div className="mb-2">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{item.amount.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-white/5 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </GlassCard>
          ))}
        </div>

        {/* What you could buy */}
        <GlassCard className="mb-8 bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">What your savings could buy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {equivalents.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="text-cyan-600 dark:text-cyan-400">{item.icon}</div>
                  <span className="text-slate-800 dark:text-white">{item.text}</span>
                </div>
                <span className="text-purple-600 dark:text-purple-400 font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Cancelled Subscriptions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Cancelled Subscriptions</h2>

        <div className="space-y-3">
          {cancelledSubscriptions.map((sub) => (
            <GlassCard key={sub.id} className="hover:bg-white/70 dark:hover:bg-white/5 transition-colors bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <PlatformIcon id={sub.logo} name={sub.name} className="w-12 h-12" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{sub.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-white/70">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Cancelled {sub.cancelledDate}</span>
                      </div>
                      <span className="text-slate-400 dark:text-white/50">•</span>
                      <span>{sub.reason}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600 dark:text-green-400">₹{sub.saved.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-slate-600 dark:text-white/70">saved</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Bottom message */}
      <GlassCard className="text-center bg-white/90 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
        <p className="text-lg text-slate-700 dark:text-white/70">Keep tracking your subscriptions to maximize savings</p>
      </GlassCard>
    </div>
  );
}
