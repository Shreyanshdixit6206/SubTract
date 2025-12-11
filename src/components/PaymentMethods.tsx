import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Plus, Trash2, Check, Building2, Smartphone, X, Shield } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

interface PaymentMethod {
  id: string;
  type: 'upi' | 'card' | 'netbanking';
  name: string;
  identifier: string; // UPI ID, last 4 digits, or bank name
  isDefault: boolean;
  expiryDate?: string;
  cardType?: 'visa' | 'mastercard' | 'rupay';
}

interface PaymentMethodsProps {
  onBack?: () => void;
}

export function PaymentMethods({ onBack }: PaymentMethodsProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'upi',
      name: 'Google Pay',
      identifier: 'rahul@oksbi',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      name: 'HDFC Credit Card',
      identifier: '4532',
      isDefault: false,
      expiryDate: '12/25',
      cardType: 'visa',
    },
    {
      id: '3',
      type: 'netbanking',
      name: 'ICICI Bank',
      identifier: 'ICICI',
      isDefault: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMethodType, setNewMethodType] = useState<'upi' | 'card' | 'netbanking'>('upi');

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(m => m.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(m => ({
        ...m,
        isDefault: m.id === id,
      }))
    );
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'upi':
        return <Smartphone className="w-5 h-5" />;
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'netbanking':
        return <Building2 className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Payment Methods</h1>
          <p className="text-slate-600 dark:text-purple-200">
            Manage your UPI, cards, and net banking accounts
          </p>
        </div>

        {/* Add Payment Method Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="w-full mb-6"
        >
          <GlassCard className="p-4 border-2 border-dashed border-slate-200 dark:border-purple-300/50 hover:border-cyan-400/50 transition-all">
            <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-purple-200">
              <Plus className="w-5 h-5" />
              <span>Add New Payment Method</span>
            </div>
          </GlassCard>
        </motion.button>

        {/* Payment Methods List */}
        <div className="space-y-4">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-5">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    method.type === 'upi'
                      ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                      : method.type === 'card'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                      : 'bg-gradient-to-br from-cyan-500 to-cyan-600'
                  }`}>
                    {getMethodIcon(method.type)}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-slate-900 dark:text-white mb-1">{method.name}</h3>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-purple-200 text-sm">
                          {method.type === 'upi' && (
                            <span>{method.identifier}</span>
                          )}
                          {method.type === 'card' && (
                            <>
                              <span>•••• {method.identifier}</span>
                              {method.expiryDate && (
                                <span className="text-purple-300/70">Exp: {method.expiryDate}</span>
                              )}
                            </>
                          )}
                          {method.type === 'netbanking' && (
                            <span>{method.identifier} Net Banking</span>
                          )}
                        </div>
                        {method.isDefault && (
                          <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-600 dark:text-green-400">
                            <Check className="w-3 h-3" />
                            <span className="text-xs">Default</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSetDefault(method.id)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/20 text-sm text-slate-700 dark:text-purple-200 transition-all"
                          >
                            Set Default
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(method.id)}
                          className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-red-50 dark:hover:bg-red-500/20 border border-slate-200 dark:border-white/20 hover:border-red-200 dark:hover:border-red-400/30 text-slate-700 dark:text-purple-200 hover:text-red-500 dark:hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Security Notice */}
        <GlassCard className="p-4 mt-6 bg-white/80 dark:bg-purple-500/10 border border-slate-200 dark:border-purple-400/30">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 dark:text-white mb-1">Secure & Encrypted</h4>
              <p className="text-sm text-slate-600 dark:text-purple-200">
                All payment information is encrypted and stored securely. We never store your CVV or PIN.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Add Payment Method Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <GlassCard className="p-6 bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/15">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Add Payment Method</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-purple-200 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Method Type Selection */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <button
                    onClick={() => setNewMethodType('upi')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      newMethodType === 'upi'
                        ? 'border-orange-400 bg-orange-50 dark:bg-orange-400/15'
                        : 'border-slate-200 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <Smartphone className={`w-6 h-6 mx-auto mb-2 ${
                      newMethodType === 'upi' ? 'text-orange-500' : 'text-slate-500 dark:text-purple-300'
                    }`} />
                    <p className={`text-xs ${
                      newMethodType === 'upi' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-purple-300'
                    }`}>UPI</p>
                  </button>
                  <button
                    onClick={() => setNewMethodType('card')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      newMethodType === 'card'
                        ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-400/15'
                        : 'border-slate-200 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                      newMethodType === 'card' ? 'text-indigo-500' : 'text-slate-500 dark:text-purple-300'
                    }`} />
                    <p className={`text-xs ${
                      newMethodType === 'card' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-purple-300'
                    }`}>Card</p>
                  </button>
                  <button
                    onClick={() => setNewMethodType('netbanking')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      newMethodType === 'netbanking'
                        ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-400/15'
                        : 'border-slate-200 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/20'
                    }`}
                  >
                    <Building2 className={`w-6 h-6 mx-auto mb-2 ${
                      newMethodType === 'netbanking' ? 'text-cyan-500' : 'text-slate-500 dark:text-purple-300'
                    }`} />
                    <p className={`text-xs ${
                      newMethodType === 'netbanking' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-purple-300'
                    }`}>Bank</p>
                  </button>
                </div>

                {/* UPI Form */}
                {newMethodType === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block">UPI ID</label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        className="w-full px-4 py-3 rounded-xl bg-white/85 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all"
                      />
                    </div>
                    <Button className="w-full">
                      Add UPI ID
                    </Button>
                  </div>
                )}

                {/* Card Form */}
                {newMethodType === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 rounded-xl bg-white/85 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-3 rounded-xl bg-white/85 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block">CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-3 rounded-xl bg-white/85 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="RAHUL SHARMA"
                        className="w-full px-4 py-3 rounded-xl bg-white/85 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all"
                      />
                    </div>
                    <Button className="w-full">
                      Add Card
                    </Button>
                  </div>
                )}

                {/* Net Banking Form */}
                {newMethodType === 'netbanking' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-slate-700 dark:text-purple-200 mb-2 block">Select Bank</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white/85 dark:bg-white/10 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all">
                        <option value="" className="bg-white dark:bg-slate-900">Choose your bank</option>
                        <option value="sbi" className="bg-white dark:bg-slate-900">State Bank of India</option>
                        <option value="hdfc" className="bg-white dark:bg-slate-900">HDFC Bank</option>
                        <option value="icici" className="bg-white dark:bg-slate-900">ICICI Bank</option>
                        <option value="axis" className="bg-white dark:bg-slate-900">Axis Bank</option>
                        <option value="kotak" className="bg-white dark:bg-slate-900">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                    <Button className="w-full">
                      Link Bank Account
                    </Button>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
