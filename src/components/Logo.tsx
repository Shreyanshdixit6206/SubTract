import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeMap = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 48, text: 'text-2xl' },
    lg: { icon: 64, text: 'text-3xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Minus symbol with gradient circle */}
      <div className="relative">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Background circle gradient */}
          <defs>
            <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <linearGradient id="logoIcon" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0F4FF" />
            </linearGradient>
          </defs>

          {/* Outer circle - gradient */}
          <circle cx="32" cy="32" r="30" fill="url(#logoBg)" opacity="0.9" />

          {/* Inner circle - light */}
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Minus symbol (left side) */}
          <rect x="12" y="29" width="18" height="6" rx="3" fill="url(#logoIcon)" />

          {/* Plus symbol accent (right side) - rotated to show subtraction concept */}
          <g opacity="0.7">
            <rect x="34" y="26" width="18" height="4" rx="2" fill="url(#logoIcon)" />
            <rect x="40" y="20" width="4" height="16" rx="2" fill="url(#logoIcon)" />
          </g>

          {/* Decorative dots */}
          <circle cx="16" cy="16" r="2.5" fill="rgba(255,255,255,0.4)" />
          <circle cx="50" cy="50" r="2.5" fill="rgba(255,255,255,0.4)" />
        </svg>
      </div>

      {/* Text Logo */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-purple-700 dark:from-purple-400 dark:via-purple-300 dark:to-cyan-400 ${currentSize.text}`}>
            SubTract
          </span>
          <span className="text-xs font-medium text-slate-600 dark:text-white/70">Manage Wisely</span>
        </div>
      )}
    </div>
  );
}
