import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Help } from '@/components/Help';
import { Navigation } from '@/components/Navigation';

export default function HelpPage() {
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
        <title>Help & Support - SubTract</title>
      </Head>
      <div className="flex min-h-screen bg-white dark:bg-[#0F0F1E]">
        <Navigation activeScreen="help" onNavigate={(screen) => router.push(`/${screen}`)} />
        
        <main className="flex-1 lg:ml-64 bg-white dark:bg-[#0F0F1E]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Help onBack={() => router.push('/dashboard')} />
          </motion.div>
        </main>
      </div>
    </>
  );
}
