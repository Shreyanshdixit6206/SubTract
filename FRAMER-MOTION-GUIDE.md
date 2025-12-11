# 🎭 Framer Motion Implementation Guide for SubTract

## Overview

This guide shows you exactly how to add Framer Motion animations to your existing SubTract components.

---

## 📦 Already Included

Framer Motion is already in `package-next.json`:
```json
"framer-motion": "^11.0.0"
```

---

## 🎬 Animation Examples for Your Components

### 1. Dashboard Component

**Location:** `src/components/Dashboard.tsx`

**Add these imports:**
```tsx
import { motion } from 'framer-motion';
```

**Wrap the main container:**
```tsx
export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-6 md:p-8 max-w-7xl mx-auto"
    >
      {/* Your existing content */}
    </motion.div>
  );
}
```

**Animate subscription cards with stagger:**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

// In your JSX:
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
>
  {subscriptions.map((sub) => (
    <motion.div key={sub.id} variants={cardVariants}>
      <SubscriptionCard {...sub} onClick={() => onNavigate?.('details')} />
    </motion.div>
  ))}
</motion.div>
```

---

### 2. SubscriptionCard Component

**Location:** `src/components/SubscriptionCard.tsx`

**Add hover and tap animations:**
```tsx
import { motion } from 'framer-motion';

export function SubscriptionCard({ 
  logo, name, price, period, nextBilling, category, onClick 
}: SubscriptionCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass rounded-3xl p-6 cursor-pointer"
    >
      {/* Your existing content */}
    </motion.div>
  );
}
```

---

### 3. AddSubscription Component

**Location:** `src/components/AddSubscription.tsx`

**Add step transitions:**
```tsx
import { motion, AnimatePresence } from 'framer-motion';

export function AddSubscription({ onBack, onSuccess }: AddSubscriptionProps) {
  const [step, setStep] = useState<'method' | 'details' | 'success'>('method');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 'method' && <MethodStep />}
        {step === 'details' && <DetailsStep />}
        {step === 'success' && <SuccessStep />}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Success animation:**
```tsx
// In your success step:
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ 
    type: "spring",
    stiffness: 260,
    damping: 20 
  }}
  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-green-600"
>
  <CheckCircle2 className="w-12 h-12 text-white" />
</motion.div>
```

---

### 4. Navigation Component

**Location:** `src/components/Navigation.tsx`

**Animate active indicator:**
```tsx
import { motion } from 'framer-motion';

// In your navigation items:
<motion.button
  key={item.id}
  onClick={() => onNavigate(item.id)}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
    isActive ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20' : ''
  }`}
  whileHover={{ x: 4 }}
  whileTap={{ scale: 0.98 }}
>
  <Icon className="w-5 h-5" />
  <span>{item.label}</span>
  
  {isActive && (
    <motion.span
      layoutId="activeIndicator"
      className="ml-auto w-2 h-2 rounded-full bg-purple-400"
      initial={false}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
  )}
</motion.button>
```

---

### 5. SavingsMandir Component

**Location:** `src/components/SavingsMandir.tsx`

**Floating diya animation:**
```tsx
import { motion } from 'framer-motion';

<motion.div
  animate={{ 
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0]
  }}
  transition={{ 
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="text-8xl mb-4"
>
  🪔
</motion.div>
```

**Coin animations:**
```tsx
{[0, 1, 2, 3].map((i) => (
  <motion.div
    key={i}
    className="absolute text-2xl"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 360],
      scale: [1, 1.2, 1]
    }}
    transition={{
      duration: 2 + i * 0.5,
      repeat: Infinity,
      delay: i * 0.5
    }}
  >
    💰
  </motion.div>
))}
```

---

### 6. Insights Component

**Location:** `src/components/Insights.tsx`

**Animate charts on load:**
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={monthlyTrend}>
      {/* Your chart components */}
    </LineChart>
  </ResponsiveContainer>
</motion.div>
```

**Animate stat cards:**
```tsx
{insights.map((insight, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <GlassCard>
      {/* Insight content */}
    </GlassCard>
  </motion.div>
))}
```

---

### 7. Login/Signup Components

**Location:** `src/components/auth/Login.tsx`

**Animated form appearance:**
```tsx
import { motion } from 'framer-motion';

export function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center"
    >
      <GlassCard className="p-8 max-w-md w-full">
        {/* Form content */}
      </GlassCard>
    </motion.div>
  );
}
```

**Button with loading animation:**
```tsx
<motion.button
  type="submit"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  disabled={isLoading}
  className="w-full btn-primary"
>
  {isLoading ? (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
    />
  ) : (
    'Login'
  )}
</motion.button>
```

---

### 8. Onboarding Component

**Location:** `src/components/Onboarding.tsx`

**Slide transitions:**
```tsx
import { motion, AnimatePresence } from 'framer-motion';

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Step content */}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Progress dots animation:**
```tsx
<div className="flex gap-2 justify-center">
  {steps.map((_, index) => (
    <motion.div
      key={index}
      className={`h-2 rounded-full ${
        index === currentStep ? 'bg-purple-500' : 'bg-white/20'
      }`}
      animate={{
        width: index === currentStep ? 32 : 8
      }}
      transition={{ duration: 0.3 }}
    />
  ))}
</div>
```

---

## 🎨 Reusable Animation Variants

Create a file: `src/utils/animations.ts`

```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

// Usage:
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations';

<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  {/* Content */}
</motion.div>
```

---

## 🎯 Page Transitions

Update `src/pages/_app.tsx`:

```tsx
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ThemeProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
          <Toaster />
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

---

## 🎬 Advanced Animations

### Number Counter Animation

```tsx
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

export function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, value, { duration: 1 });
    return animation.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
}

// Usage:
<AnimatedNumber value={4847} />
```

### Circular Progress Animation

```tsx
<motion.svg className="w-48 h-48">
  <motion.circle
    cx="96"
    cy="96"
    r="80"
    fill="none"
    stroke="url(#gradient)"
    strokeWidth="12"
    strokeDasharray={`${2 * Math.PI * 80}`}
    initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
    animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - 0.93) }}
    transition={{ duration: 1, ease: "easeInOut" }}
  />
</motion.svg>
```

### Confetti Effect

```tsx
import { motion } from 'framer-motion';

const confettiColors = ['#8B5CF6', '#06B6D4', '#F97316', '#10B981'];

{Array.from({ length: 50 }).map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-2 h-2 rounded-full"
    style={{
      backgroundColor: confettiColors[i % confettiColors.length],
      left: `${Math.random() * 100}%`,
      top: '-10%'
    }}
    animate={{
      y: [0, window.innerHeight + 100],
      x: [0, (Math.random() - 0.5) * 200],
      rotate: [0, Math.random() * 720],
      opacity: [1, 0]
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.5,
      ease: "easeOut"
    }}
  />
))}
```

---

## 📱 Pull-to-Refresh Animation

```tsx
import { motion, useDragControls } from 'framer-motion';
import { useState } from 'react';

export function PullToRefresh({ onRefresh, children }: any) {
  const [isPulling, setIsPulling] = useState(false);
  
  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 100 }}
      dragElastic={0.3}
      onDrag={(_, info) => {
        if (info.offset.y > 80) {
          setIsPulling(true);
        }
      }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 80) {
          onRefresh();
        }
        setIsPulling(false);
      }}
    >
      {isPulling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ↻
          </motion.div>
        </motion.div>
      )}
      {children}
    </motion.div>
  );
}
```

---

## 🎯 Performance Tips

1. **Use `layout` prop for automatic layout animations:**
```tsx
<motion.div layout>
  {/* Content */}
</motion.div>
```

2. **Use `layoutId` for shared element transitions:**
```tsx
<motion.div layoutId="card-1">
  {/* Will smoothly transition between positions */}
</motion.div>
```

3. **Optimize with `will-change`:**
```tsx
<motion.div style={{ willChange: 'transform' }}>
  {/* Animated content */}
</motion.div>
```

4. **Reduce motion for accessibility:**
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
>
  {/* Content */}
</motion.div>
```

---

## ✅ Implementation Checklist

- [ ] Add Framer Motion to Dashboard
- [ ] Animate subscription cards with stagger
- [ ] Add hover effects to buttons
- [ ] Implement page transitions
- [ ] Add loading animations
- [ ] Animate numbers (counter effect)
- [ ] Add success animations
- [ ] Implement pull-to-refresh
- [ ] Add confetti on achievements
- [ ] Optimize for performance

---

**Made with 💜 | Ready to animate!** 🎭
