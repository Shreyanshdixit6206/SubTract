import React from 'react';
import { Home, CreditCard, PieChart, Trophy, Settings, Plus, Bell, User, HelpCircle, Wallet, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Logo } from './Logo';

interface NavigationProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function Navigation({ activeScreen, onNavigate }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { id: 'insights', icon: PieChart, label: 'Insights' },
    { id: 'mandir', icon: Trophy, label: 'Savings' },
    { id: 'payments', icon: Wallet, label: 'Payments' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-64 glass-strong border-r border-white/10 flex-col p-6 z-50 overflow-y-auto">
        {/* Logo */}
        <div className="mb-8">
          <Logo size="md" showText={true} />
        </div>

        {/* Theme toggle (compact switch) */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 mb-4 rounded-lg border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
          </div>
          <span
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              theme === 'dark' ? 'bg-purple-500/70' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${
                theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </span>
        </button>
        
        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-purple-500/50 text-purple-600 dark:text-white scale-105'
                    : 'text-slate-700 dark:text-white/70 hover:bg-slate-200 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Add Button */}
        <button
          onClick={() => onNavigate('add')}
          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] text-white font-medium shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Subscription</span>
        </button>
        
        {/* User Profile */}
        <div 
          onClick={() => onNavigate('profile')}
          className="mt-6 flex items-center gap-3 p-3 rounded-xl glass hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
            RS
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm text-slate-900 dark:text-white">Rahul Sharma</p>
            <p className="text-xs text-slate-600 dark:text-white/60">View Profile</p>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 glass-strong border-t border-white/10 p-4 z-50">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[navItems[0], navItems[2], navItems[5], navItems[6]].map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex flex-col items-center gap-1 transition-all duration-200"
              >
                <div
                  className={`p-2 rounded-xl transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 scale-110'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-purple-400' : ''}`} />
                  {item.id === 'notifications' && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full" />
                  )}
                </div>
                <span className={`text-xs ${isActive ? 'text-purple-600 dark:text-white' : 'text-slate-700 dark:text-white/70'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex justify-center">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-200 dark:bg-white/10 text-sm text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            <span
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                theme === 'dark' ? 'bg-purple-500/70' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${
                  theme === 'dark' ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile Floating Add Button */}
      <button
        onClick={() => onNavigate('add')}
        className="lg:hidden fixed bottom-24 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] shadow-2xl shadow-purple-500/50 flex items-center justify-center text-white text-3xl hover:scale-110 transition-transform spring z-50"
      >
        +
      </button>
    </>
  );
}