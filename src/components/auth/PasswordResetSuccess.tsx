import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../Button';

interface PasswordResetSuccessProps {
  onBackToLogin: () => void;
}

export function PasswordResetSuccess({ onBackToLogin }: PasswordResetSuccessProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500 opacity-90" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl opacity-20"
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

      {/* Success Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <GlassCard className="p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          {/* Message */}
          <h1 className="text-white mb-3">Password Reset Successful!</h1>
          <p className="text-purple-200 mb-8">
            Your password has been reset successfully. You can now login with your new password.
          </p>

          {/* Back to Login Button */}
          <Button
            onClick={onBackToLogin}
            className="w-full group"
          >
            Back to Login
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </GlassCard>
      </motion.div>
    </div>
  );
}
