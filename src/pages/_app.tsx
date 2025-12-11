import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { SubscriptionProvider } from '@/context/SubscriptionContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { initCoreWebVitals, logPerformanceMetrics } from '@/utils/performance';
import '@/styles/globals.css';
import '@/styles/optimization.css';

function AppContent({ Component, pageProps }: AppProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Initialize Core Web Vitals tracking
    initCoreWebVitals((metrics) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📈 Core Web Vitals:', metrics);
      }
    });

    // Log performance metrics on page load
    window.addEventListener('load', logPerformanceMetrics);

    return () => {
      window.removeEventListener('load', logPerformanceMetrics);
    };
  }, []);

  if (!mounted) {
    return <Component {...pageProps} />;
  }

  const toasterStyle = theme === 'light' ? {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    color: '#1a1a2e',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '16px',
    fontSize: '14px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  } : {
    background: 'rgba(15, 15, 30, 0.95)',
    backdropFilter: 'blur(20px)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '16px',
    fontSize: '14px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  };

  return (
    <>
      <Component {...pageProps} />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: toasterStyle,
        }}
      />
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <AppContent {...props} />
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
