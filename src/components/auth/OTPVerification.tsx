import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, ArrowRight } from 'lucide-react';
import { GlassCard } from '../GlassCard';
import { Button } from '../Button';

interface OTPVerificationProps {
  onBack: () => void;
  onVerified: (otp: string) => void;
  emailOrPhone: string;
  method: 'email' | 'phone';
}

export function OTPVerification({ onBack, onVerified, emailOrPhone, method }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;
    
    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    
    const nextEmptyIndex = newOtp.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpString = otp.join('');
    if (otpString.length !== 6) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onVerified(otpString);
    setIsLoading(false);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    setResendTimer(60);
    // Simulate resend API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const otpComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500 opacity-90" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* OTP Card */}
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
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-white mb-2">Verify Code</h1>
            <p className="text-purple-200">
              Enter the 6-digit code sent to
            </p>
            <p className="text-white mt-1">
              {method === 'email' ? emailOrPhone : `+91 ${emailOrPhone}`}
            </p>
          </div>

          {/* OTP Input */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl rounded-xl bg-white/10 backdrop-blur-md border-2 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                />
              ))}
            </div>

            {/* Resend */}
            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-purple-300 text-sm">
                  Resend code in {resendTimer}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  Resend Code
                </button>
              )}
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              disabled={!otpComplete || isLoading}
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
                  Verify & Continue
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Security Note */}
          <div className="mt-6 p-4 rounded-xl bg-purple-500/10 border border-purple-400/30">
            <p className="text-sm text-purple-100">
              🔒 This code expires in 10 minutes for security
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
