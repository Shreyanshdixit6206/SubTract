import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'rupee' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  icon,
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm h-10',
    md: 'px-6 py-3 text-base h-12',
    lg: 'px-8 py-4 text-lg h-14'
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] text-white shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105',
    ghost: 'border border-slate-300 dark:border-white/20 bg-transparent hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white',
    rupee: 'bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-105',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/40 hover:shadow-xl hover:shadow-red-500/50 hover:scale-105'
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
