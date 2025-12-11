import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Edit2, Camera, Save, X, Shield, Bell, CreditCard, LogOut, LifeBuoy } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface ProfileProps {
  onLogout?: () => void;
  onBack?: () => void;
}

export function Profile({ onLogout, onBack }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Rahul Sharma',
    email: 'user@subtract.com',
    phone: '+91 98765 43210',
    joinedDate: 'January 2024',
    totalSubscriptions: 12,
    totalSpent: 58164,
    totalSaved: 18470,
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const stats = [
    {
      label: 'Active Subscriptions',
      value: profileData.totalSubscriptions.toString(),
      icon: CreditCard,
      color: 'from-indigo-500 to-purple-600',
    },
    {
      label: 'Total Spent',
      value: `₹${profileData.totalSpent.toLocaleString('en-IN')}`,
      icon: Calendar,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      label: 'Total Saved',
      value: `₹${profileData.totalSaved.toLocaleString('en-IN')}`,
      icon: Shield,
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-slate-600 dark:text-purple-200">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <GlassCard className="p-6 md:p-8 mb-6">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h2 className="text-slate-900 dark:text-white">{profileData.name}</h2>
                {!isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-purple-200 hover:text-slate-900 dark:hover:text-white transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              <p className="text-slate-600 dark:text-purple-200 mb-1">{profileData.email}</p>
              <p className="text-slate-500 dark:text-purple-300 text-sm">Member since {profileData.joinedDate}</p>
            </div>
          </div>

          {/* Edit Form / Display */}
          {isEditing ? (
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                  >
                    <div className={`inline-flex w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} items-center justify-center mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-2xl text-slate-900 dark:text-white mb-1">{stat.value}</p>
                    <p className="text-sm text-slate-600 dark:text-purple-300">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-sm">Notification Settings</p>
                <p className="text-slate-600 dark:text-purple-300 text-xs">Manage alerts & reminders</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-sm">Payment Methods</p>
                <p className="text-slate-600 dark:text-purple-300 text-xs">UPI, Cards & Net Banking</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-sm">Privacy & Security</p>
                <p className="text-slate-600 dark:text-purple-300 text-xs">Password & 2FA</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 transition-all flex items-center gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <LifeBuoy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-sm">Help & Support</p>
                <p className="text-slate-600 dark:text-purple-300 text-xs">FAQs and contact options</p>
              </div>
            </motion.button>

          </div>
        </GlassCard>

        {/* Account Settings */}
        <GlassCard className="p-6 mb-6">
          <h3 className="text-slate-900 dark:text-white mb-4">Account Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div>
                <p className="text-slate-900 dark:text-white text-sm">Email Notifications</p>
                <p className="text-slate-600 dark:text-purple-300 text-xs">Receive updates via email</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-cyan-500">
                <div className="w-5 h-5 rounded-full bg-white translate-x-6 transition-all" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div>
                <p className="text-slate-900 dark:text-white text-sm">Two-Factor Authentication</p>
                <p className="text-slate-600 dark:text-purple-300 text-xs">Extra security for your account</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-slate-300 dark:bg-white/20">
                <div className="w-5 h-5 rounded-full bg-slate-600 dark:bg-white translate-x-0.5 transition-all" />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div>
                <p className="text-slate-900 dark:text-white text-sm">Auto-Renewal Alerts</p>
                <p className="text-slate-600 dark:text-purple-300 text-xs">Get notified 3 days before renewal</p>
              </div>
              <button className="w-12 h-6 rounded-full bg-cyan-500">
                <div className="w-5 h-5 rounded-full bg-white translate-x-6 transition-all" />
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Danger Zone */}
        <GlassCard className="p-6 border-2 border-red-500/30 bg-red-500/10">
          <h3 className="text-slate-900 dark:text-white mb-4">Danger Zone</h3>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-red-400/30 hover:bg-red-50 dark:hover:bg-red-500/20 transition-all text-left"
            >
              <p className="text-red-400 text-sm mb-1">Export My Data</p>
              <p className="text-slate-600 dark:text-purple-300 text-xs">Download all your subscription data</p>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 rounded-xl bg-white/5 border border-red-400/30 hover:bg-red-500/20 transition-all text-left"
            >
              <p className="text-red-400 text-sm mb-1">Delete Account</p>
              <p className="text-purple-300 text-xs">Permanently delete your account and data</p>
            </motion.button>
            {onLogout && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLogout}
                className="w-full p-4 rounded-xl bg-red-500/15 border border-red-400/40 hover:bg-red-500/25 transition-all text-left flex items-center justify-between"
              >
                <div>
                  <p className="text-red-300 text-sm mb-1">Logout</p>
                  <p className="text-purple-200 text-xs">Sign out of your account</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white">
                  <LogOut className="w-5 h-5" />
                </div>
              </motion.button>
            )}
          </div>
        </GlassCard>

        {onLogout && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={onLogout}
              size="md"
              className="bg-white/80 dark:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/20 shadow-none hover:bg-white dark:hover:bg-white/15"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
