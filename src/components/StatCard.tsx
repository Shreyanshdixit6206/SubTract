import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'gold' | 'green' | 'orange';
  className?: string;
}

export function StatCard({ 
  value, 
  label, 
  icon,
  trend,
  trendValue,
  variant = 'default',
  className = ''
}: StatCardProps) {
  const variantClasses = {
    default: 'gradient-text-purple',
    gold: 'gradient-text-gold shimmer-gold',
    green: 'text-green-400',
    orange: 'text-orange-400'
  };
  
  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→'
  };
  
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400'
  };
  
  return (
    <div className={`glass rounded-2xl p-5 spring hover:scale-105 ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-slate-600 dark:text-white/70 text-sm">{label}</span>
        {icon && <span className="text-purple-400 text-xl">{icon}</span>}
      </div>
      <div className={`text-3xl font-bold ${variantClasses[variant]} mb-1`}>
        {value}
      </div>
      {trend && trendValue && (
        <div className={`flex items-center gap-1 text-sm ${trendColors[trend]}`}>
          <span>{trendIcons[trend]}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
