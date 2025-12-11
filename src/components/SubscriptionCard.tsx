import React from 'react';
import { PlatformIcon } from '@/utils/platformIcons';

interface SubscriptionCardProps {
  logo: string;
  name: string;
  price: number;
  period: 'month' | 'year' | 'quarter';
  nextBilling?: string;
  category?: string;
  onClick?: () => void;
  className?: string;
}

export function SubscriptionCard({ 
  logo,
  name, 
  price, 
  period,
  nextBilling,
  category,
  onClick,
  className = ''
}: SubscriptionCardProps) {
  const periodLabels = {
    month: 'month',
    year: 'year',
    quarter: 'quarter'
  };
  
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };
  
  return (
    <div 
      className={`glass rounded-3xl p-6 floating-card cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <PlatformIcon id={logo} name={name} className="w-16 h-16" radiusClass="rounded-2xl" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl text-slate-900 dark:text-white mb-1">{name}</h3>
            {category && (
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-200">
                {category}
              </span>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-2xl font-bold gradient-text-gold">
              ₹{formatPrice(price)}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">/{periodLabels[period]}</span>
          </div>
          {nextBilling && (
            <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <span className="text-rose-500">⏰</span>
              <span>Due {nextBilling}</span>
            </p>
          )}
        </div>
      </div>
      
      {/* Hidden actions revealed on hover */}
      <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-sm text-slate-900 dark:text-white transition-colors">
          Cancel
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-sm text-slate-900 dark:text-white transition-colors">
          Remind
        </button>
      </div>
    </div>
  );
}
