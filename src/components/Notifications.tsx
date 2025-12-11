import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, TrendingDown, Gift, AlertCircle, CheckCircle2, Sparkles, Trash2, Calendar } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface Notification {
  id: string;
  type: 'renewal' | 'savings' | 'offer' | 'alert' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  amount?: number;
  subscriptionName?: string;
}

export function Notifications({ onBack }: { onBack?: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'renewal',
      title: 'Netflix Premium Due Soon',
      message: 'Your Netflix Premium subscription will renew in 3 days',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false,
      amount: 649,
      subscriptionName: 'Netflix',
    },
    {
      id: '2',
      type: 'offer',
      title: 'Diwali Special Offer!',
      message: 'Get 25% off on Spotify Premium annual plan during the festival season',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: false,
    },
    {
      id: '3',
      type: 'savings',
      title: 'Great Job!',
      message: 'You saved ₹1,200 this month by cancelling unused subscriptions',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      isRead: false,
      amount: 1200,
    },
    {
      id: '4',
      type: 'alert',
      title: 'Duplicate Subscription Detected',
      message: 'You have 2 active music streaming subscriptions: Spotify and YouTube Music',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true,
    },
    {
      id: '5',
      type: 'success',
      title: 'Payment Successful',
      message: 'Your Hotstar subscription has been renewed successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      isRead: true,
      amount: 499,
      subscriptionName: 'Hotstar',
    },
    {
      id: '6',
      type: 'renewal',
      title: 'Swiggy One Renewal',
      message: 'Your Swiggy One membership will renew in 7 days',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      isRead: true,
      amount: 149,
      subscriptionName: 'Swiggy One',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifs => notifs.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifs => notifs.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifs => notifs.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'renewal':
        return { Icon: Calendar, color: 'from-cyan-500 to-cyan-600' };
      case 'savings':
        return { Icon: TrendingDown, color: 'from-green-500 to-green-600' };
      case 'offer':
        return { Icon: Gift, color: 'from-orange-500 to-orange-600' };
      case 'alert':
        return { Icon: AlertCircle, color: 'from-yellow-500 to-yellow-600' };
      case 'success':
        return { Icon: CheckCircle2, color: 'from-purple-500 to-purple-600' };
      default:
        return { Icon: Bell, color: 'from-indigo-500 to-purple-600' };
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-IN');
  };

  const filteredNotifications = notifications.filter(n => (filter === 'all' ? true : !n.isRead));
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filterButtonClasses = (active: boolean) =>
    `px-4 py-2 rounded-xl text-sm transition-all border ${
      active
        ? 'bg-slate-900/10 dark:bg-white/15 text-slate-900 dark:text-white border-slate-300 dark:border-white/30'
        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-purple-200 border-transparent hover:bg-slate-200 dark:hover:bg-white/10'
    }`;

  return (
    <div className="min-h-screen p-6 md:p-8 bg-white dark:bg-[#0F0F1E]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
            {unreadCount > 0 && (
              <div className="px-3 py-1 rounded-full bg-orange-500 text-white text-sm">
                {unreadCount} new
              </div>
            )}
          </div>
          <p className="text-slate-600 dark:text-purple-200">
            Stay updated with your subscription alerts and offers
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => setFilter('all')} className={filterButtonClasses(filter === 'all')}>
              All
            </button>
            <button onClick={() => setFilter('unread')} className={filterButtonClasses(filter === 'unread')}>
              Unread
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-700 dark:text-cyan-200 hover:bg-cyan-500/20 transition-all text-sm"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/15 mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">All caught up!</h3>
            <p className="text-slate-600 dark:text-purple-200">You have no unread notifications.</p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => {
              const { Icon, color } = getNotificationIcon(notification.type);
              const isUnread = !notification.isRead;

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GlassCard
                    className={`p-4 cursor-pointer transition-all hover:scale-[1.01] bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${
                      isUnread ? 'shadow-lg shadow-cyan-500/10' : ''
                    }`}
                    onClick={() => isUnread && handleMarkAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className={`text-base font-semibold ${isUnread ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-purple-200'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-slate-500 dark:text-purple-300 flex-shrink-0">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-purple-200 mb-2">
                          {notification.message}
                        </p>
                        {notification.amount && (
                          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-xs text-slate-700 dark:text-white">
                            <span>{notification.type === 'savings' ? 'Saved' : 'Amount'}:</span>
                            <span className="font-semibold">₹{notification.amount.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isUnread && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(notification.id);
                          }}
                          className="p-2 rounded-lg hover:bg-red-500/15 text-slate-500 dark:text-purple-200 hover:text-red-500 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Notification Settings */}
        <GlassCard className="p-6 mt-6 bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { label: 'Renewal reminders', sublabel: '3 days before renewal', enabled: true },
              { label: 'Payment confirmations', sublabel: 'After successful payments', enabled: true },
              { label: 'Festival offers', sublabel: 'Special deals during festivals', enabled: true },
              { label: 'Savings alerts', sublabel: 'Monthly savings summary', enabled: true },
              { label: 'Duplicate warnings', sublabel: 'Detect similar subscriptions', enabled: true },
            ].map((pref, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{pref.label}</p>
                  <p className="text-xs text-slate-600 dark:text-purple-300">{pref.sublabel}</p>
                </div>
                <button
                  aria-label={`${pref.label} toggle`}
                  className={`w-12 h-6 rounded-full transition-all border ${
                    pref.enabled
                      ? 'bg-cyan-500 border-cyan-500'
                      : 'bg-slate-200 dark:bg-white/10 border-slate-200 dark:border-white/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow transition-all ${
                      pref.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
