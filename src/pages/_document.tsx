import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Meta tags for performance and SEO */}
        <meta name="description" content="SubTract - Subtract the unnecessary, Add the valuable. Manage your subscriptions with ease." />
        <meta name="theme-color" content="#0f0f1e" />
        
        {/* Favicon and PWA */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SubTract" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Performance optimizations */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Disable unused features for performance */}
        <meta name="format-detection" content="telephone=no" />

        {/* Prefetch Next.js chunks (optional, enables faster navigation) */}
        <link rel="prefetch" href="/_next/static/chunks/main.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
