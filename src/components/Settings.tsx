import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { User, Bell, Shield, Globe, LogOut, CreditCard, Download, Trash2 } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('english');
  const [currency, setCurrency] = useState('inr');
  
  return (
    <div className="min-h-screen p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold gradient-text-purple mb-8 text-slate-900 dark:text-white">Settings</h1>
      
      {/* Profile Section */}
      <GlassCard className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <User className="w-5 h-5 text-purple-400" />
          <span>Profile</span>
        </h2>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
            RS
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Rahul Sharma</h3>
            <p className="text-sm text-slate-700 dark:text-white/70">user@subtract.com</p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Premium User
            </span>
          </div>
        </div>
        
        <Button variant="ghost" className="w-full">
          Edit Profile
        </Button>
      </GlassCard>
      
      {/* Preferences */}
      <GlassCard className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <Globe className="w-5 h-5 text-purple-600 dark:text-cyan-400" />
          <span>Preferences</span>
        </h2>
        
        <div className="space-y-4">
          {/* Notifications */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-orange-400" />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Push Notifications</p>
                <p className="text-sm text-slate-700 dark:text-white/70">Get alerts for upcoming payments</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 rounded-full transition-all relative ${
                notifications ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                  notifications ? 'left-8' : 'left-1'
                }`}
              />
            </button>
          </div>
          
          {/* Language */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5">
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-purple-200">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none transition-all bg-white dark:bg-[#0F0F1E]/80 hover:bg-slate-50 dark:hover:bg-[#0F0F1E] cursor-pointer"
            >
              <option value="english" className="bg-white dark:bg-[#1a1a2e] text-slate-900 dark:text-white py-2">English</option>
              <option value="hindi" className="bg-white dark:bg-[#1a1a2e] text-slate-900 dark:text-white py-2">हिन्दी (Hindi)</option>
              <option value="tamil" className="bg-white dark:bg-[#1a1a2e] text-slate-900 dark:text-white py-2">தமிழ் (Tamil)</option>
              <option value="bengali" className="bg-white dark:bg-[#1a1a2e] text-slate-900 dark:text-white py-2">বাংলা (Bengali)</option>
            </select>
          </div>
          
          {/* Currency */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5">
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-purple-200">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none transition-all bg-white dark:bg-[#0F0F1E]/80 hover:bg-slate-50 dark:hover:bg-[#0F0F1E] cursor-pointer"
            >
              <option value="inr" className="bg-white dark:bg-[#1a1a2e] text-slate-900 dark:text-white py-2">₹ INR - Indian Rupee</option>
              <option value="usd" className="bg-white dark:bg-[#1a1a2e] text-slate-900 dark:text-white py-2">$ USD - US Dollar</option>
              <option value="eur" className="bg-white dark:bg-[#1a1a2e] text-slate-900 dark:text-white py-2">€ EUR - Euro</option>
            </select>
          </div>
        </div>
      </GlassCard>
      
      {/* Data & Privacy */}
      <GlassCard className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
          <Shield className="w-5 h-5 text-green-400" />
          <span>Data & Privacy</span>
        </h2>
        
        <div className="space-y-3">
          <Button variant="ghost" icon={<Download className="w-5 h-5" />} className="w-full justify-start">
            Export My Data
          </Button>
          <Button variant="ghost" icon={<CreditCard className="w-5 h-5" />} className="w-full justify-start">
            Payment Methods
          </Button>
          <Button variant="danger" icon={<Trash2 className="w-5 h-5" />} className="w-full justify-start">
            Delete Account
          </Button>
        </div>
      </GlassCard>
      
      {/* Subscription Plan */}
      <GlassCard className="mb-6 border-2 border-amber-500/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💎</div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1 gradient-text-gold">Upgrade to Premium</h3>
            <p className="text-sm text-slate-700 dark:text-white/70 mb-4">
              Unlock unlimited subscriptions, advanced analytics, and export features
            </p>
            <ul className="space-y-2 mb-4 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-800 dark:text-white/90">Unlimited subscriptions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-800 dark:text-white/90">Advanced insights & AI recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-800 dark:text-white/90">Export reports in PDF/Excel</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-800 dark:text-white/90">Family sharing (up to 5 members)</span>
              </li>
            </ul>
            <Button variant="rupee" className="w-full">
              Upgrade for ₹99/month
            </Button>
          </div>
        </div>
      </GlassCard>
      
      {/* Logout */}
      <Button variant="ghost" icon={<LogOut className="w-5 h-5" />} className="w-full">
        Log Out
      </Button>
      
      {/* App Info */}
      <div className="mt-8 text-center text-sm text-slate-700 dark:text-white/70">
        <p>SubTract v1.0.0</p>
        <p className="mt-1">Made with 💜 in India</p>
      </div>
    </div>
  );
}
