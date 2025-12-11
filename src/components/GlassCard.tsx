import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'neumorphic';
  floating?: boolean;
  onClick?: () => void;
}

export function GlassCard({ 
  children, 
  className = '', 
  variant = 'default',
  floating = false,
  onClick 
}: GlassCardProps) {
  const baseClasses = 'rounded-[24px] p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'glass',
    strong: 'glass-strong',
    neumorphic: 'neumorphic'
  };
  
  const floatingClasses = floating ? 'floating-card cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${floatingClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
