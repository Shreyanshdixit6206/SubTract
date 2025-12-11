import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { RupeeInput } from './RupeeInput';
import { Button } from './Button';
import { Camera, Inbox, Calendar, Bell, CreditCard, Smartphone, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface AddSubscriptionProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function AddSubscription({ onBack, onSuccess }: AddSubscriptionProps) {
  const [step, setStep] = useState<'method' | 'details' | 'success'>('method');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: 'month',
    startDate: '',
    category: 'Entertainment',
    paymentMethod: 'upi-gpay',
    autoRenewal: true,
    reminder: true
  });
  
  const popularPlatforms = [
    { logo: '🎬', name: 'Netflix', price: '649' },
    { logo: '📺', name: 'Hotstar', price: '499' },
    { logo: '🎵', name: 'Spotify', price: '119' },
    { logo: '📦', name: 'Prime Video', price: '1499' },
    { logo: '▶️', name: 'YouTube Premium', price: '129' },
    { logo: '📱', name: 'Zee5', price: '299' },
  ];
  
  const categories = [
    { value: 'Entertainment', icon: '📺', color: 'purple' },
    { value: 'Music', icon: '🎵', color: 'pink' },
    { value: 'Food', icon: '🍔', color: 'orange' },
    { value: 'Finance', icon: '📈', color: 'green' },
    { value: 'Fitness', icon: '💪', color: 'cyan' },
    { value: 'Education', icon: '🎓', color: 'blue' },
  ];
  
  const paymentMethods = [
    { value: 'upi-gpay', label: 'Google Pay', icon: '💳', sublabel: 'UPI' },
    { value: 'upi-phonepe', label: 'PhonePe', icon: '📱', sublabel: 'UPI' },
    { value: 'upi-paytm', label: 'Paytm', icon: 'PT', sublabel: 'UPI' },
    { value: 'card', label: 'Credit/Debit Card', icon: '💳', sublabel: '•••• 4242' },
  ];
  
  const handleQuickSelect = (platform: typeof popularPlatforms[0]) => {
    setFormData({
      ...formData,
      name: platform.name,
      price: platform.price
    });
    setStep('details');
  };
  
  const handleSubmit = () => {
    setStep('success');
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };
  
  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-[#0F0F1E]">
        <GlassCard variant="strong" className="max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center animate-float">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text-purple mb-3">
            Subscription Added!
          </h2>
          <p className="text-slate-600 dark:text-white/70 mb-2">
            {formData.name} has been added to your dashboard
          </p>
          <div className="text-4xl font-bold gradient-text-gold mb-6">
            ₹{formData.price ? parseInt(formData.price).toLocaleString('en-IN') : '0'}
            <span className="text-lg text-slate-600 dark:text-white/70">/{formData.period}</span>
          </div>
          <p className="text-sm text-green-400">
            Redirecting to dashboard...
          </p>
        </GlassCard>
      </div>
    );
  }
  
  if (step === 'method') {
    return (
      <div className="min-h-screen p-6 md:p-8 max-w-4xl mx-auto bg-white dark:bg-[#0F0F1E]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text-purple mb-3">
            Add New Subscription
          </h1>
          <p className="text-slate-600 dark:text-white/70 text-lg">
            Choose how you&apos;d like to add your subscription
          </p>
        </div>
        
        {/* Smart Detection Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <GlassCard className="text-center cursor-pointer spring hover:scale-105">
            <Camera className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Scan Receipt</h3>
            <p className="text-sm text-slate-700 dark:text-white/80">
              Camera or UPI screenshot
            </p>
          </GlassCard>
          
          <GlassCard className="text-center cursor-pointer spring hover:scale-105">
            <Inbox className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Import from SMS</h3>
            <p className="text-sm text-slate-700 dark:text-white/80">
              Auto-detect from your inbox
            </p>
          </GlassCard>
          
          <GlassCard 
            className="text-center cursor-pointer spring hover:scale-105"
            onClick={() => setStep('details')}
          >
            <Smartphone className="w-12 h-12 mx-auto mb-4 text-amber-400" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Manual Entry</h3>
            <p className="text-sm text-slate-700 dark:text-white/80">
              Quick custom entry
            </p>
          </GlassCard>
        </div>
        
        {/* Popular Indian Platforms */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Popular Platforms</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularPlatforms.map((platform, index) => (
              <GlassCard 
                key={index}
                className="text-center cursor-pointer spring hover:scale-110"
                onClick={() => handleQuickSelect(platform)}
              >
                <div className="text-4xl mb-2">{platform.logo}</div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">{platform.name}</h4>
                <p className="text-xs gradient-text-gold">₹{platform.price}/mo</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Details Form
  return (
    <div className="min-h-screen p-6 md:p-8 max-w-3xl mx-auto bg-white dark:bg-[#0F0F1E]">
      <button 
        onClick={() => setStep('method')}
        className="flex items-center gap-2 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      
      <h1 className="text-4xl font-bold gradient-text-purple mb-8 text-center">
        Subscription Details
      </h1>
      
      <div className="space-y-6">
        {/* Subscription Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Subscription Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Netflix, Spotify, Prime Video"
            className="w-full h-14 px-4 glass rounded-xl text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-2 focus:border-purple-500 focus:outline-none transition-all bg-white dark:bg-transparent"
          />
        </div>
        
        {/* Price and Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RupeeInput
            label="Cost"
            value={formData.price}
            onChange={(value) => setFormData({ ...formData, price: value })}
            placeholder="649"
          />
          
          <div>
            <label className="block text-sm font-medium mb-2">Billing Period</label>
            <select
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="w-full h-14 px-4 glass rounded-xl text-slate-700 dark:text-white focus:border-2 focus:border-purple-500 focus:outline-none transition-all bg-white dark:bg-transparent"
            >
              <option value="month" className="bg-[#0F0F1E]">Monthly</option>
              <option value="quarter" className="bg-[#0F0F1E]">Quarterly</option>
              <option value="half-yearly" className="bg-[#0F0F1E]">Half-yearly</option>
              <option value="year" className="bg-[#0F0F1E]">Yearly</option>
            </select>
          </div>
        </div>
        
        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-3">Category</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFormData({ ...formData, category: cat.value })}
                className={`p-4 rounded-xl border-2 transition-all spring ${
                  formData.category === cat.value
                    ? 'border-purple-500 glass-strong scale-105'
                    : 'border-white/10 glass hover:border-white/20'
                }`}
              >
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <span className="text-sm font-medium">{cat.value}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <div className="relative">
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full h-14 px-4 glass rounded-xl text-white focus:border-2 focus:border-purple-500 focus:outline-none transition-all"
            />
            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-white/60 pointer-events-none" />
          </div>
        </div>
        
        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium mb-3">Payment Method</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.value}
                onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                className={`p-4 rounded-xl border-2 transition-all spring flex items-center gap-3 ${
                  formData.paymentMethod === method.value
                    ? 'border-purple-500 glass-strong scale-105'
                    : 'border-white/10 glass hover:border-white/20'
                }`}
              >
                <span className="text-2xl">{method.icon}</span>
                <div className="text-left">
                  <p className="font-medium">{method.label}</p>
                  <p className="text-xs text-slate-600 dark:text-white/70">{method.sublabel}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Settings */}
        <GlassCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="font-medium">Renewal Reminder</p>
                  <p className="text-sm text-slate-600 dark:text-white/70">3 days before billing</p>
                </div>
              </div>
              <button
                onClick={() => setFormData({ ...formData, reminder: !formData.reminder })}
                className={`w-14 h-7 rounded-full transition-all relative ${
                  formData.reminder ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                    formData.reminder ? 'left-8' : 'left-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium">Auto-Renewal</p>
                  <p className="text-sm text-slate-600 dark:text-white/70">Automatic payment</p>
                </div>
              </div>
              <button
                onClick={() => setFormData({ ...formData, autoRenewal: !formData.autoRenewal })}
                className={`w-14 h-7 rounded-full transition-all relative ${
                  formData.autoRenewal ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-white/20'
                }`}
              >
                <span
                  className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                    formData.autoRenewal ? 'left-8' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </GlassCard>
        
        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to dashboard</span>
          </button>
          <Button className="flex-1 h-14 text-base font-semibold" onClick={handleSubmit}>
            Add Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
