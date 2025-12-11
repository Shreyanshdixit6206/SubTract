import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../Button';
import { Logo } from '../Logo';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/router';

interface LoginProps {
  onSwitchToSignup?: () => void;
  onForgotPassword?: () => void;
}

export function Login({ onSwitchToSignup, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('user@subtract.com');
  const [password, setPassword] = useState('Demo@2025Secure!');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Attempting login...');
    const success = await login({ email, password });
    console.log('Login success:', success);
    
    if (success) {
      console.log('Redirecting to dashboard...');
      // Small delay to ensure state is updated
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white dark:bg-[#0F0F1E]">
      {/* Dark Mode Background */}
      {theme === 'dark' && (
        <>
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
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
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
            className="absolute top-20 left-20 w-64 h-64 bg-indigo-300 rounded-full blur-3xl opacity-10"
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
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-10"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <GlassCard className="p-8">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <Logo size="md" showText={true} />
            </motion.div>
            <h2 className="text-slate-900 dark:text-white mt-4 mb-2">Welcome Back</h2>
            <p className="text-slate-700 dark:text-purple-200">Login to your SubTract account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm text-slate-700 dark:text-purple-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-cyan-400/50 transition-all"
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
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => onForgotPassword?.()}
                className="text-sm text-purple-600 dark:text-cyan-400 hover:text-purple-700 dark:hover:text-cyan-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full group"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 dark:border-white/30 border-t-white dark:border-t-white rounded-full"
                />
              ) : (
                <>
                  Login
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-300 dark:bg-white/20" />
            <span className="text-slate-600 dark:text-purple-300 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-300 dark:bg-white/20" />
          </div>

          {/* Google Quick Login */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-white dark:bg-white text-slate-900 dark:text-gray-700 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-white/50 dark:hover:shadow-white/50 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login with Google
          </motion.button>

          {/* Signup Link */}
          <p className="text-center text-slate-700 dark:text-purple-200 mt-6">
            Don't have an account?{' '}
            <button
              onClick={() => onSwitchToSignup?.()}
              className="text-purple-600 dark:text-cyan-400 hover:text-purple-700 dark:hover:text-cyan-300 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </GlassCard>

        {/* Footer Note */}
        <p className="text-center text-slate-600 dark:text-purple-300/60 text-sm mt-4">
          By continuing, you agree to SubTract's Terms & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}