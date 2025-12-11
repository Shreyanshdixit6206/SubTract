import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { SubscriptionDetails } from '@/components/SubscriptionDetails';
import { Navigation } from '@/components/Navigation';

export default function SubscriptionsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router, mounted]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Subscriptions - SubTract</title>
      </Head>
      <div className="flex min-h-screen bg-white dark:bg-[#0F0F1E]">
        <Navigation activeScreen="subscriptions" onNavigate={(screen) => router.push(`/${screen}`)} />
        
        <main className="flex-1 lg:ml-64 bg-white dark:bg-[#0F0F1E]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SubscriptionDetails 
              onBack={() => router.push('/dashboard')}
              onEdit={() => {}}
              onCancel={() => router.push('/dashboard')}
            />
          </motion.div>
        </main>
      </div>
    </>
  );
}
