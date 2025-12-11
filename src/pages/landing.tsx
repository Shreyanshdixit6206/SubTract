import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ArrowRight, Sparkles, TrendingDown, Shield, Bell, PieChart, Wallet, CheckCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function LandingPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: TrendingDown,
      title: 'Track All Subscriptions',
      description: 'Never forget a subscription payment. Track all your recurring expenses in one place.'
    },
    {
      icon: Bell,
      title: 'Smart Reminders',
      description: 'Get notified before charges hit your account. Never be surprised by subscription fees.'
    },
    {
      icon: PieChart,
      title: 'Spending Insights',
      description: 'Visualize your spending patterns with beautiful charts and actionable insights.'
    },
    {
      icon: Wallet,
      title: 'Budget Management',
      description: 'Set monthly budgets and get alerts when you\'re approaching your limits.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely. We never share your information.'
    },
    {
      icon: Sparkles,
      title: 'Savings Goals',
      description: 'Track cancelled subscriptions and see how much you\'re saving over time.'
    }
  ];

  const stats = [
    { value: '₹5.2L+', label: 'Money Saved' },
    { value: '10K+', label: 'Active Users' },
    { value: '50K+', label: 'Subscriptions Tracked' },
    { value: '4.9★', label: 'User Rating' }
  ];

  return (
    <>
      <Head>
        <title>SubTract - Manage Your Subscriptions Smartly</title>
        <meta name="description" content="Track, manage, and optimize your recurring subscriptions. Save money by eliminating unused subscriptions." />
      </Head>

      <div
        className={`min-h-screen transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2ff] text-slate-900'
            : 'bg-gradient-to-br from-[#0F0F1E] via-[#1a1a2e] to-[#0F0F1E] text-white'
        }`}
      >
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl ${
            theme === 'light'
              ? 'bg-white/80 border-slate-200/70 text-slate-900'
              : 'glass-strong border-white/10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  theme === 'light'
                    ? 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white'
                    : 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white'
                }`}
              >
                <TrendingDown className="w-6 h-6" />
              </div>
              <h1
                className={`text-2xl font-bold ${
                  theme === 'light' ? 'text-slate-900' : 'gradient-text-purple'
                }`}
              >
                SubTract
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 text-sm shadow-sm"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                <span
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                    theme === 'dark' ? 'bg-purple-500/70' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${
                      theme === 'dark' ? 'translate-x-4' : 'translate-x-1'
                    }`}
                  />
                </span>
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/login')}
                className={`px-6 py-2 transition-colors ${
                  theme === 'light' ? 'text-slate-700 hover:text-slate-900' : 'text-white/80 hover:text-white'
                }`}
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/login')}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/50"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-700 dark:text-purple-200">Subtract the unnecessary, Add the valuable</span>
              </motion.div>

              <h1
                className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
                  theme === 'light' ? 'text-slate-900' : ''
                }`}
              >
                <span className="gradient-text-purple">Take Control</span> of Your
                <br />
                <span className="gradient-text-cyan">Subscription Spending</span>
              </h1>

              <p
                className={`text-xl mb-12 max-w-2xl mx-auto ${
                  theme === 'light' ? 'text-slate-600' : 'text-purple-200/80'
                }`}
              >
                Track all your subscriptions in one place. Get smart reminders, analyze spending patterns, 
                and save money by canceling what you don't use.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/login')}
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-cyan-500 text-white font-semibold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all inline-flex items-center gap-3"
              >
                Start Saving Money
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Hero Image/Dashboard Preview */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-20 relative"
              >
                <div className="glass rounded-3xl p-8 border-2 border-white/10 shadow-2xl shadow-purple-500/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="glass rounded-2xl p-6 text-center"
                      >
                        <div className="text-4xl font-bold gradient-text-purple mb-2">{stat.value}</div>
                        <div className="text-slate-600 dark:text-purple-200/60 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text-purple">Everything You Need</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-purple-200/80 max-w-2xl mx-auto">
                Powerful features to help you manage subscriptions and save money effortlessly.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="glass rounded-2xl p-8 border border-slate-200 dark:border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-purple-200/70">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text-cyan">How It Works</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-purple-200/80">
                Get started in minutes. No credit card required.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { step: '01', title: 'Create Your Account', desc: 'Sign up for free in seconds. No payment details needed.' },
                { step: '02', title: 'Add Your Subscriptions', desc: 'Manually add or import subscriptions from your bank statements.' },
                { step: '03', title: 'Track & Optimize', desc: 'Get insights, set budgets, and cancel unused subscriptions.' },
                { step: '04', title: 'Watch Your Savings Grow', desc: 'See how much money you\'re saving every month in your Savings Mandir.' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6 glass rounded-2xl p-8 border border-slate-200 dark:border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className="text-5xl font-bold text-slate-400 dark:text-purple-400">{item.step}</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="text-slate-600 dark:text-purple-200/70">{item.desc}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0 mt-2" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-12 text-center border-2 border-purple-500/30 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
              <div className="relative z-10">
                <Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-purple">
                  Ready to Save Money?
                </h2>
                <p className="text-xl text-slate-600 dark:text-purple-200/80 mb-8">
                  Join thousands of users who are already saving lakhs every year
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/login')}
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-cyan-500 text-white font-semibold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all inline-flex items-center gap-3"
                >
                  Get Started for Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-slate-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold gradient-text-purple">SubTract</h3>
            </div>
            <p className="text-slate-600 dark:text-purple-200/60 mb-6">
              Subtract the unnecessary, Add the valuable
            </p>
            <p className="text-slate-500 dark:text-purple-200/40 text-sm">
              © 2025 SubTract. Made with 💜 in India
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
