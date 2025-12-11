import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, ArrowRight, Smartphone, Key } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../Button';

interface ForgotPasswordProps {
  onBack: () => void;
  onResetRequested: (emailOrPhone: string) => void;
}

export function ForgotPassword({ onBack, onResetRequested }: ForgotPasswordProps) {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onResetRequested(value);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500 opacity-90" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Reset Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <GlassCard className="p-8">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-4"
            >
              <Key className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-white mb-2">Reset Password</h1>
            <p className="text-purple-200">
              We'll send you a verification code to reset your password
            </p>
          </div>

          {/* Method Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setMethod('email')}
              className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                method === 'email'
                  ? 'border-cyan-400 bg-cyan-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-purple-300 hover:border-white/30'
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setMethod('phone')}
              className={`py-3 px-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                method === 'phone'
                  ? 'border-cyan-400 bg-cyan-400/20 text-white'
                  : 'border-white/20 bg-white/5 text-purple-300 hover:border-white/30'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Phone
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {method === 'email' ? (
              <div className="space-y-2">
                <label className="text-sm text-purple-200">Email Address</label>
                <input
                  type="email"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm text-purple-200">Phone Number</label>
                <div className="flex gap-2">
                  <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={value}
                    onChange={(e) => setValue(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    required
                    pattern="[0-9]{10}"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full group"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Send Code
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/30">
            <p className="text-sm text-cyan-100">
              💡 You'll receive a 6-digit code to verify your identity
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
