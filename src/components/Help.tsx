import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Mail, MessageCircle, Phone, Send, Search, BookOpen, Video, FileText } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I add a new subscription?',
        a: 'Click on the "+" button on the dashboard or navigate to Add Subscription. Enter your subscription details including name, amount, billing cycle, and payment method. SubTract supports UPI, cards, and net banking.',
      },
      {
        q: 'Can I track UPI payments automatically?',
        a: 'Yes! SubTract can detect UPI transactions from your linked accounts. Simply link your UPI ID and we\'ll automatically track payments to supported subscription services.',
      },
      {
        q: 'Which Indian services are supported?',
        a: 'We support all major Indian platforms including Netflix, Amazon Prime, Hotstar, Spotify, YouTube Premium, Swiggy One, Zomato Gold, PhonePe, and many more. You can also add custom subscriptions.',
      },
    ],
  },
  {
    category: 'Payments & Billing',
    questions: [
      {
        q: 'How do renewal reminders work?',
        a: 'SubTract sends you notifications 3 days before any subscription renewal. You\'ll get alerts via app notifications and email (if enabled) so you never miss a payment or get unexpected charges.',
      },
      {
        q: 'Can I use multiple payment methods?',
        a: 'Absolutely! Add multiple UPI IDs, credit/debit cards, and net banking accounts. Set a default payment method or assign specific methods to different subscriptions.',
      },
      {
        q: 'What if I cancel a subscription?',
        a: 'When you cancel a subscription, it moves to the Savings Mandir where you can celebrate your savings. We track how much you\'ve saved by cancelling unused subscriptions.',
      },
    ],
  },
  {
    category: 'Features',
    questions: [
      {
        q: 'What is the Savings Mandir?',
        a: 'The Savings Mandir is our unique celebration space for cancelled subscriptions. Inspired by Indian culture, you light a digital diya (lamp) for each cancelled subscription and track your total savings. It\'s Financial Zen!',
      },
      {
        q: 'How do I detect duplicate subscriptions?',
        a: 'SubTract automatically alerts you if you have similar subscriptions (e.g., Spotify and YouTube Music). Check the Insights page for duplicate detection and recommendations.',
      },
      {
        q: 'Can I export my subscription data?',
        a: 'Yes! Go to Profile → Export My Data to download all your subscription information in CSV format. Perfect for tax purposes or personal record-keeping.',
      },
    ],
  },
  {
    category: 'Security & Privacy',
    questions: [
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely! We use bank-grade encryption to protect your data. Payment details are tokenized and we never store your CVV or PIN. All data is encrypted both in transit and at rest.',
      },
      {
        q: 'Can I enable two-factor authentication?',
        a: 'Yes! Enable 2FA in your Profile settings for an extra layer of security. We support SMS OTP and authenticator apps.',
      },
      {
        q: 'What data do you collect?',
        a: 'We only collect subscription details, payment methods, and basic profile information. We never share your data with third parties. See our Privacy Policy for full details.',
      },
    ],
  },
];

const supportChannels = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email',
    action: 'support@subtract.app',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our team',
    action: 'Start Chat',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Call us (10 AM - 6 PM)',
    action: '+91 1800-123-4567',
    color: 'from-orange-500 to-orange-600',
  },
];

const resources = [
  {
    icon: BookOpen,
    title: 'User Guide',
    description: 'Complete documentation',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Learn with videos',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: FileText,
    title: 'Release Notes',
    description: 'What\'s new in SubTract',
    color: 'from-green-500 to-green-600',
  },
];

export function Help({ onBack }: { onBack?: () => void }) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen p-6 md:p-8 bg-white dark:bg-[#0F0F1E]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Help & Support</h1>
          <p className="text-slate-600 dark:text-purple-200 max-w-2xl mx-auto">
            Get answers to common questions or reach out to our support team
          </p>
        </div>

        {/* Search */}
        <GlassCard className="p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-purple-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            />
          </div>
        </GlassCard>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-5 h-full hover:border-cyan-400/50 transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white mb-1">{resource.title}</h3>
                  <p className="text-slate-600 dark:text-purple-200 text-sm">{resource.description}</p>
                </GlassCard>
              </motion.button>
            );
          })}
        </div>

        {/* FAQs */}
        <GlassCard className="p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600 dark:text-purple-200">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-cyan-500 dark:text-cyan-400 mb-3">{category.category}</h3>
                  <div className="space-y-2">
                    {category.questions.map((faq, index) => {
                      const faqId = `${categoryIndex}-${index}`;
                      const isExpanded = expandedFaq === faqId;
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => toggleFaq(faqId)}
                            className="w-full p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-white/90 dark:hover:bg-white/10 transition-all text-left"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-slate-900 dark:text-white">{faq.q}</span>
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-5 h-5 text-slate-500 dark:text-purple-300 flex-shrink-0" />
                              </motion.div>
                            </div>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-slate-600 dark:text-purple-200 text-sm mt-3 leading-relaxed">
                                    {faq.a}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Contact Support */}
        <GlassCard className="p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Contact Support</h2>
          <p className="text-slate-600 dark:text-purple-200 mb-6">
            Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
          </p>
          
          <div className="space-y-4">
            <textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Describe your issue or question..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-purple-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
            />
            <Button className="w-full md:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </GlassCard>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <GlassCard className="p-5 text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${channel.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-slate-900 dark:text-white mb-1">{channel.title}</h3>
                  <p className="text-slate-600 dark:text-purple-200 text-sm mb-3">{channel.description}</p>
                  <p className="text-cyan-600 dark:text-cyan-400 text-sm">{channel.action}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-slate-500 dark:text-purple-300/60 text-sm">
            🇮🇳 SubTract is proudly made in India for Indian users
          </p>
        </div>
      </div>
    </div>
  );
}
