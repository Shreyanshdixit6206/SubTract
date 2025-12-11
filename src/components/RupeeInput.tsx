import React, { useState } from 'react';

interface RupeeInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export function RupeeInput({ 
  value, 
  onChange, 
  label,
  placeholder = '0',
  error,
  className = ''
}: RupeeInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const formatIndianNumber = (num: string) => {
    if (!num) return '';
    const parts = num.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{2})+(?!\d))/g, ',').replace(/^(\d{1,3}),/, '$1');
    return parts.join('.');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    onChange(val);
  };
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label 
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            isFocused || value 
              ? 'top-2 text-xs text-cyan-400' 
              : 'top-1/2 -translate-y-1/2 text-base text-white/70'
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl rupee-symbol font-semibold">
          ₹
        </span>
        <input
          type="text"
          value={value ? formatIndianNumber(value) : ''}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full h-14 pl-12 pr-4 ${label ? 'pt-6 pb-2' : 'py-4'} glass rounded-xl text-xl font-semibold text-white placeholder:text-white/30 focus:border-2 focus:border-purple-500 focus:outline-none transition-all duration-200 ${
            error ? 'border-2 border-red-500 animate-shake' : ''
          }`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1 ml-1">{error}</p>
      )}
    </div>
  );
}
