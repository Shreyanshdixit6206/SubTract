import React, { useState } from 'react';

// Map normalized platform keys to their logo domains (used with Clearbit logos)
const PLATFORM_ICON_DOMAINS: Record<string, string> = {
  netflix: 'netflix.com',
  amazonprime: 'amazon.in',
  spotify: 'spotify.com',
  disneyhotstar: 'hotstar.com',
  youtubepremium: 'youtube.com',
  zerodhastreak: 'zerodha.com',
  swiggyone: 'swiggy.com',
  googleone: 'google.com',
  zee5premium: 'zee5.com',
  cultfit: 'cult.fit',
  audible: 'audible.in',
  linkedinpremium: 'linkedin.com',
  applemusic: 'apple.com',
  sonyliv: 'sonyliv.com',
  gaanaplus: 'gaana.com',
};

const normalizeKey = (input: string) => input?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';

export const getPlatformIconUrl = (input: string) => {
  const key = normalizeKey(input);
  return PLATFORM_ICON_DOMAINS[key];
};

export const getPlatformInitial = (input: string) => {
  if (!input) return '?';
  const words = input.trim().split(/\s+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
};

export const PlatformIcon = ({
  id,
  name,
  className = 'w-10 h-10',
  radiusClass = 'rounded-xl',
}: {
  id: string;
  name: string;
  className?: string;
  radiusClass?: string;
}) => {
  const [imageError, setImageError] = useState(false);
  const iconUrl = getPlatformIconUrl(id || name);
  const fallback = getPlatformInitial(name || id);

  if (!iconUrl || imageError) {
    return (
      <div
        className={`${className} ${radiusClass} flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-cyan-500/20 text-slate-900 dark:text-white font-semibold`}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={`https://logo.clearbit.com/${iconUrl}`}
      alt={`${name} logo`}
      className={`${className} ${radiusClass} object-contain bg-white shadow-sm`}
      loading="lazy"
      onError={() => setImageError(true)}
    />
  );
};
