import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingDown, Bell, BarChart3, Flame, ArrowRight, Check } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { useTheme } from '@/context/ThemeContext';

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    icon: Sparkles,
    title: 'Welcome to SubTract',
    subtitle: 'Subtract the unnecessary, Add the valuable',
    description: 'Take control of your subscriptions with India\'s most premium subscription management app',
    gradient: 'from-indigo-500 to-purple-600',
    illustration: '✨',
  },
  {
    icon: TrendingDown,
    title: 'Track All Subscriptions',
    subtitle: 'Netflix, Hotstar, Spotify & More',
    description: 'Manage all your Indian & global subscriptions in one beautiful place. Support for UPI, cards, and net banking.',
    gradient: 'from-purple-500 to-fuchsia-500',
    illustration: '📱',
  },
  {
    icon: Bell,
    title: 'Never Miss a Payment',
    subtitle: 'Smart Reminders & Alerts',
    description: 'Get notified before renewals, detect duplicate subscriptions, and catch festival season offers.',
    gradient: 'from-cyan-400 to-cyan-600',
    illustration: '🔔',
  },
  {
    icon: BarChart3,
    title: 'Insights & Analytics',
    subtitle: 'See Where Your Money Goes',
    description: 'Beautiful charts showing your spending patterns, category breakdowns, and savings opportunities.',
    gradient: 'from-orange-500 to-orange-600',
    illustration: '📊',
  },
  {
    icon: Flame,
    title: 'Savings Mandir',
    subtitle: 'Celebrate Your Smart Decisions',
    description: 'Light a digital diya for every cancelled subscription and watch your savings grow. Financial Zen awaits!',
    gradient: 'from-yellow-500 to-orange-500',
    illustration: '🏛️',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { theme } = useTheme();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white dark:bg-[#0F0F1E]">
      {/* Animated Background */}
      {theme === 'dark' && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-500 opacity-90" />
      )}
      
      {/* Light Mode Background */}
      {theme === 'light' && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
      )}
      
      {/* Floating Orbs */}
      <motion.div
        className={theme === 'dark' ? 'absolute top-20 left-20 w-64 h-64 bg-cyan-400 rounded-full blur-3xl opacity-20' : 'absolute top-20 left-20 w-64 h-64 bg-indigo-300 rounded-full blur-3xl opacity-10'}
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
        className={theme === 'dark' ? 'absolute bottom-20 right-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl opacity-20' : 'absolute bottom-20 right-20 w-80 h-80 bg-pink-300 rounded-full blur-3xl opacity-10'}
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

      {/* Onboarding Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Skip Button */}
        {currentStep < onboardingSteps.length - 1 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSkip}
              className="text-purple-600 hover:text-purple-800 dark:text-purple-200 dark:hover:text-white transition-colors px-4 py-2"
            >
              Skip
            </button>
          </div>
        )}

        <GlassCard className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} mb-6`}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>

              {/* Illustration */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl mb-6"
              >
                {step.illustration}
              </motion.div>

              {/* Content */}
              <h1 className="text-slate-900 dark:text-white mb-2">{step.title}</h1>
              <h3 className="text-purple-600 dark:text-cyan-400 mb-4">{step.subtitle}</h3>
              <p className="text-slate-700 dark:text-purple-200 text-lg leading-relaxed max-w-md mx-auto">
                {step.description}
              </p>

              {/* Progress Dots */}
              <div className="flex items-center justify-center gap-2 mt-8 mb-8">
                {onboardingSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className="group"
                  >
                    <motion.div
                      className={`h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'w-8 bg-purple-600 dark:bg-cyan-400'
                          : index < currentStep
                          ? 'w-2 bg-green-400'
                          : 'w-2 bg-slate-300 dark:bg-white/30 group-hover:bg-slate-400 dark:group-hover:bg-white/50'
                      }`}
                      layoutId={`dot-${index}`}
                    />
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className={`group ${currentStep === 0 ? 'w-full' : 'flex-1'}`}
                >
                  {currentStep === onboardingSteps.length - 1 ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Get Started
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </GlassCard>

        {/* Step Counter */}
        <p className="text-slate-700 dark:text-purple-300/60 text-center text-sm mt-4">
          Step {currentStep + 1} of {onboardingSteps.length}
        </p>
      </motion.div>
    </div>
  );
}
