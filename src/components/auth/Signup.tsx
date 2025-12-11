import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Sparkles, Lock, Mail, User, ArrowRight, Phone, Check } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { useTheme } from '@/context/ThemeContext';

interface SignupProps {
  onSignup: (name: string, email: string, phone: string, password: string) => void;
  onSwitchToLogin: () => void;
}

export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { theme } = useTheme();

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const passwordStrength = password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      alert('Passwords do not match');
      return;
    }

    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSignup(name, email, phone, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white dark:bg-[#0F0F1E]">
      {/* Dark Mode Background */}
      {theme === 'dark' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500 opacity-90" />
          
          {/* Floating Orbs */}
          <motion.div
            className="absolute top-10 right-10 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, 80, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Light Mode Background */}
      {theme === 'light' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
          
          {/* Floating Orbs */}
          <motion.div
            className="absolute top-10 right-10 w-64 h-64 bg-indigo-300 rounded-full blur-3xl opacity-10"
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-10"
            animate={{
              x: [0, 80, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md my-8"
      >
        <GlassCard className="p-8">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <Logo size="md" showText={true} />
            </motion.div>
            <h2 className="text-slate-900 dark:text-white mt-4 mb-2">Join SubTract</h2>
            <p className="text-slate-700 dark:text-purple-200">Start your financial zen journey</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm text-slate-700 dark:text-purple-200 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-cyan-400/50 transition-all"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm text-slate-700 dark:text-purple-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-cyan-400/50 transition-all"
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-sm text-slate-700 dark:text-purple-200 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone (for UPI)
              </label>
              <div className="flex gap-2">
                <div className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white flex items-center">
                  +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  required
                  pattern="[0-9]{10}"
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-cyan-400/50 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm text-slate-700 dark:text-purple-200 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-cyan-400/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-purple-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${passwordStrength ? 'bg-green-400' : 'bg-orange-400'}`} />
                  <span className={passwordStrength ? 'text-green-400' : 'text-orange-400'}>
                    {passwordStrength ? 'Strong password' : 'At least 8 characters required'}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="text-sm text-slate-700 dark:text-purple-200 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-cyan-400/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 dark:text-purple-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${passwordsMatch ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className={passwordsMatch ? 'text-green-400' : 'text-red-400'}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded border-2 border-slate-300 dark:border-white/30 bg-slate-100 dark:bg-white/10 peer-checked:bg-gradient-to-br peer-checked:from-cyan-400 peer-checked:to-cyan-500 peer-checked:border-cyan-400 transition-all flex items-center justify-center">
                  {acceptedTerms && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm text-slate-700 dark:text-purple-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                I accept the Terms of Service and Privacy Policy
              </span>
            </label>

            {/* Signup Button */}
            <Button
              type="submit"
              disabled={isLoading || !passwordsMatch || !acceptedTerms}
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
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-600 dark:text-purple-200 mt-6">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-600 dark:text-cyan-400 hover:text-purple-700 dark:hover:text-cyan-300 transition-colors"
            >
              Login
            </button>
          </p>
        </GlassCard>

        {/* Footer Note */}
        <p className="text-center text-slate-700 dark:text-purple-300/60 text-sm mt-4">
          🇮🇳 Built for India • Supports UPI, Cards & Net Banking
        </p>
      </motion.div>
    </div>
  );
}
