# 🚀 SubTract - Quick Reference Card

## ⚡ Quick Start (30 seconds)

```bash
npm install
npm run dev
```
Visit: http://localhost:3000  
Login: user@subtract.com / password123

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/pages/_app.tsx` | Main app with providers |
| `src/pages/index.tsx` | Landing/Login page |
| `src/context/AuthContext.tsx` | Authentication state |
| `src/context/SubscriptionContext.tsx` | Subscription state |
| `src/utils/dummyData.ts` | Mock data (18 subs) |
| `src/hooks/useAuth.ts` | Auth hook |
| `src/hooks/useSubscriptions.ts` | Subscription hook |
| `next.config.js` | Next.js config |
| `tailwind.config.js` | Design system |
| `package-next.json` | Dependencies |

---

## 🎨 CSS Classes (Glassmorphism)

```css
/* Glassmorphism */
.glass                 /* Light glass effect */
.glass-strong          /* Strong glass effect */
.glass-card            /* Glass card with rounded corners */
.frosted-glass         /* Frosted glass effect */

/* Gradients */
.gradient-text-purple  /* Purple gradient text */
.gradient-text-cyan    /* Cyan gradient text */
.gradient-text-gold    /* Gold gradient text */
.gradient-bg-primary   /* Purple-cyan gradient background */

/* Animations */
.animate-float         /* Floating animation */
.animate-shimmer       /* Shimmer effect */
.animate-pulse-alert   /* Alert pulse */
.animate-glow          /* Glow effect */
.spring-transition     /* Spring physics */
```

---

## 🎭 React Hooks

```tsx
// Authentication
import { useAuth } from '@/hooks/useAuth';
const { user, login, logout, isAuthenticated } = useAuth();

// Subscriptions
import { useSubscriptions } from '@/hooks/useSubscriptions';
const { 
  subscriptions, 
  stats, 
  addSubscription,
  updateSubscription,
  cancelSubscription 
} = useSubscriptions();

// Toast Notifications
import { useToast } from '@/hooks/useToast';
const toast = useToast();
toast.success('Success!');
toast.error('Error!');

// LocalStorage
import { useLocalStorage } from '@/hooks/useLocalStorage';
const [value, setValue] = useLocalStorage('key', initialValue);
```

---

## 🌐 API Endpoints

```typescript
// Authentication
POST   /api/auth/login       { email, password }
POST   /api/auth/logout
POST   /api/auth/register    { name, email, password }

// Subscriptions
GET    /api/subscriptions
POST   /api/subscriptions/create
GET    /api/subscriptions/[id]
PUT    /api/subscriptions/[id]
DELETE /api/subscriptions/[id]

// User
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/stats
```

---

## 📊 Dummy Data Stats

- **Active Subscriptions:** 12
- **Monthly Total:** ₹4,847
- **Yearly Total:** ₹58,164
- **Total Saved:** ₹18,470
- **Budget:** ₹5,000
- **Budget Usage:** 93%

---

## 🎨 Colors

```css
Primary:   #8B5CF6  /* Purple */
Secondary: #06B6D4  /* Cyan */
Accent:    #F97316  /* Orange */
Success:   #10B981  /* Green */
Warning:   #F59E0B  /* Amber */
Error:     #EF4444  /* Red */
Dark:      #0f0f1e  /* Navy */
```

---

## 💻 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Lint code

# Deployment
git add .
git commit -m "Deploy"
git push
vercel --prod           # Deploy via CLI

# Troubleshooting
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

---

## 🎯 Component Integration

### Old Way (Vite)
```tsx
const [subscriptions, setSubscriptions] = useState([]);
```

### New Way (Next.js)
```tsx
import { useSubscriptions } from '@/hooks/useSubscriptions';
const { subscriptions } = useSubscriptions();
```

---

## 🎬 Framer Motion Quick Start

```tsx
import { motion } from 'framer-motion';

// Button with interactions
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>

// Page transition
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
>
  {content}
</motion.div>

// Stagger list
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

<motion.div variants={container} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 🔐 Login Credentials

```
Email:    user@subtract.com
Password: password123
```

---

## 📱 Responsive Breakpoints

- **Mobile:** 320px - 767px (bottom nav)
- **Tablet:** 768px - 1023px (toggle sidebar)
- **Desktop:** 1024px+ (permanent sidebar)

---

## 🚀 Deployment Steps

1. **Install:** `npm install`
2. **Test:** `npm run dev`
3. **Commit:** `git push`
4. **Deploy:** Import in Vercel
5. **Done!** ✅

---

## 🐛 Quick Fixes

| Issue | Solution |
|-------|----------|
| Module not found `@/...` | Restart VS Code TypeScript server |
| window is not defined | Add `typeof window !== 'undefined'` check |
| Hydration mismatch | Use `useEffect` for client-only code |
| API route not working | Check file is in `src/pages/api/` |

---

## 📚 Documentation

- **IMPLEMENTATION-SUMMARY.md** - Complete overview
- **DEPLOYMENT-GUIDE.md** - Step-by-step guide
- **README-DEPLOYMENT.md** - Full documentation
- **CHECKLIST.md** - Deployment checklist

---

## ✨ Key Features

- ✅ Next.js 14 with TypeScript
- ✅ Serverless API (8 endpoints)
- ✅ Context state management
- ✅ 18 pre-loaded subscriptions
- ✅ Glassmorphism UI
- ✅ 20+ animations
- ✅ Indian formatting (₹1,00,000)
- ✅ Vercel deployment ready
- ✅ Mobile responsive
- ✅ Toast notifications

---

## 🎯 Success Checklist

- [ ] `npm install` completed
- [ ] `npm run dev` works
- [ ] Login successful
- [ ] Dashboard shows 12 subscriptions
- [ ] Navigation works
- [ ] No console errors
- [ ] Mobile responsive works
- [ ] Ready to deploy!

---

**Made with 💜 | SubTract**
