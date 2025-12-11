import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../Button';

interface ResetPasswordProps {
  onPasswordReset: (newPassword: string) => void;
}

export function ResetPassword({ onPasswordReset }: ResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const passwordStrength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const allRequirementsMet = passwordStrength && hasUpperCase && hasLowerCase && hasNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch || !allRequirementsMet) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onPasswordReset(password);
    setIsLoading(false);
  };

  const requirements = [
    { label: 'At least 8 characters', met: passwordStrength },
    { label: 'One uppercase letter', met: hasUpperCase },
    { label: 'One lowercase letter', met: hasLowerCase },
    { label: 'One number', met: hasNumber },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500 opacity-90" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 80, 0],
          y: [0, -80, 0],
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
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 mb-4"
            >
              <CheckCircle2 className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-white mb-2">Create New Password</h1>
            <p className="text-purple-200">
              Your new password must be different from previous passwords
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm text-purple-200 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="text-sm text-purple-200 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
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

            {/* Password Requirements */}
            {password.length > 0 && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-sm text-purple-200 mb-2">Password must contain:</p>
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${req.met ? 'bg-green-400' : 'bg-purple-400/50'}`} />
                    <span className={req.met ? 'text-green-400' : 'text-purple-300'}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !passwordsMatch || !allRequirementsMet}
              className="w-full group mt-6"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}
